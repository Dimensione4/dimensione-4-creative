import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import {
  useRef,
  Suspense,
  useEffect,
  useState,
  useLayoutEffect,
  useMemo,
} from "react";
import * as THREE from "three";

function BlenderLogo({
  viewSize,
  padding = 0.35,
}: {
  viewSize: number;
  padding?: number;
}) {
  const gltf = useGLTF("/Logo3D_Dimensione4_Blender_Simbolo_O.gltf");
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useLayoutEffect(() => {
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.scale.set(1, 1, 1);
    scene.updateWorldMatrix(true, true);

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const smallestAxis =
      size.x <= size.y && size.x <= size.z
        ? "x"
        : size.y <= size.x && size.y <= size.z
          ? "y"
          : "z";

    if (smallestAxis === "x") {
      scene.rotation.y = -Math.PI / 2;
    } else if (smallestAxis === "y") {
      scene.rotation.x = Math.PI / 2;
    }

    scene.updateWorldMatrix(true, true);

    const box2 = new THREE.Box3().setFromObject(scene);
    const size2 = new THREE.Vector3();
    const center2 = new THREE.Vector3();
    box2.getSize(size2);
    box2.getCenter(center2);

    scene.position.sub(center2);

    const maxDim = Math.max(size2.x, size2.y) || 1;
    const scale = (viewSize * padding) / maxDim;
    scene.scale.setScalar(scale);
  }, [scene, viewSize, padding]);

  return <primitive object={scene} />;
}

useGLTF.preload("/Logo3D_Dimensione4_Blender_Simbolo_O.gltf");

// Hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// Scroll position hook for parallax
function useScrollPosition() {
  const scroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scroll.current = window.scrollY / window.innerHeight;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
}

// Symbol group with clockwise rotation and parallax
function SymbolGroup({
  scrollY,
  viewSize,
}: {
  scrollY: React.MutableRefObject<number>;
  viewSize: number;
}) {
  const tiltRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!tiltRef.current || !spinRef.current) return;

    const t = state.clock.elapsedTime;

    // Fixed tilt/position (as you set it)
    tiltRef.current.rotation.set(0.1, 5.8, 0);
    const orbitRadius = 0.6;
    const orbitSpeed = 0.08;
    tiltRef.current.position.x = Math.cos(t * orbitSpeed) * orbitRadius;
    tiltRef.current.position.z = Math.sin(t * orbitSpeed) * orbitRadius;
    tiltRef.current.position.y = -6;

    // Slow clockwise spin around its own Y axis (symmetry axis stays fixed)
    spinRef.current.rotation.y = -t * 0.12;
  });

  return (
    <group ref={tiltRef}>
      <group ref={spinRef}>
        <LightRig />
        <BlenderLogo viewSize={viewSize} />
      </group>
    </group>
  );
}

function Scene({
  scrollY,
  viewSize,
}: {
  scrollY: React.MutableRefObject<number>;
  viewSize: number;
}) {
  return (
    <>
      <SymbolGroup scrollY={scrollY} viewSize={viewSize} />
    </>
  );
}

function LightRig() {
  const orbitRefs = useRef<THREE.PointLight[]>([]);
  const innerRefs = useRef<THREE.PointLight[]>([]);
  const spotRefs = useRef<THREE.SpotLight[]>([]);
  const spotTargets = useRef<THREE.Object3D[]>([]);
  const topRef = useRef<THREE.PointLight>(null);
  const backRef = useRef<THREE.PointLight>(null);
  const rigRef = useRef<THREE.Group>(null);

  const orbitCount = 8;
  const innerCount = 4;
  const spotCount = 4;
  const colors = ["#22F0EF", "#1DE8E5", "#19E1DD", "#25FDFD"];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (rigRef.current) rigRef.current.rotation.y = t * 0.22; // CCW loop

    for (let i = 0; i < orbitCount; i++) {
      const light = orbitRefs.current[i];
      if (!light) continue;

      const phase = (i / orbitCount) * Math.PI * 2 + t * 0.55;
      const radius = 3.35 + Math.sin(t * 0.4 + i) * 0.2;
      const height = 0.85 + Math.sin(t * 0.35 + i * 0.9) * 0.4;

      light.position.set(
        Math.cos(phase) * radius,
        height,
        Math.sin(phase) * radius,
      );

      // Alternate emphasis (front / side / back sweep)
      const pulse = 0.85 + Math.sin(t * 0.8 + i * 1.4) * 0.18;
      light.intensity = 1.1 * pulse;
    }

    for (let i = 0; i < innerCount; i++) {
      const light = innerRefs.current[i];
      if (!light) continue;

      const phase = (i / innerCount) * Math.PI * 2 + t * 0.55 + Math.PI / 4;
      const radius = 2.55 + Math.sin(t * 0.3 + i) * 0.15;
      const height = -0.2 + Math.sin(t * 0.25 + i * 1.2) * 0.25;

      light.position.set(
        Math.cos(phase) * radius,
        height,
        Math.sin(phase) * radius,
      );

      const pulse = 0.9 + Math.sin(t * 0.7 + i * 1.9) * 0.12;
      light.intensity = 0.95 * pulse;
    }

    for (let i = 0; i < spotCount; i++) {
      const light = spotRefs.current[i];
      const target = spotTargets.current[i];
      if (!light || !target) continue;

      const angle = (i / spotCount) * Math.PI * 2;
      const radius = 3.6;
      const height = 0.8;

      light.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius,
      );

      target.position.set(0, 0.1, 0);
      light.target = target;

      const pulse = (Math.sin(t * 0.9 + i * (Math.PI / 2)) + 1) / 2;
      light.intensity = 2.0 * (0.25 + pulse * 0.75);
    }

    if (topRef.current) {
      topRef.current.intensity = 0.9 + Math.sin(t * 0.3) * 0.05;
    }
    if (backRef.current) {
      backRef.current.intensity = 0.9;
    }
  });

  return (
    <group ref={rigRef}>
      {Array.from({ length: orbitCount }).map((_, i) => (
        <pointLight
          key={`orbit-light-${i}`}
          ref={(el) => {
            if (el) orbitRefs.current[i] = el;
          }}
          intensity={1.15}
          distance={12}
          color={colors[i % colors.length]}
        />
      ))}
      {Array.from({ length: innerCount }).map((_, i) => (
        <pointLight
          key={`inner-light-${i}`}
          ref={(el) => {
            if (el) innerRefs.current[i] = el;
          }}
          intensity={0.95}
          distance={10}
          color={colors[(i + 1) % colors.length]}
        />
      ))}
      {Array.from({ length: spotCount }).map((_, i) => (
        <spotLight
          key={`spot-light-${i}`}
          ref={(el) => {
            if (el) spotRefs.current[i] = el;
          }}
          angle={0.35}
          penumbra={0.6}
          decay={2}
          distance={16}
          intensity={2.0}
          color={colors[i % colors.length]}
        />
      ))}
      {Array.from({ length: spotCount }).map((_, i) => (
        <object3D
          key={`spot-target-${i}`}
          ref={(el) => {
            if (el) spotTargets.current[i] = el;
          }}
        />
      ))}
      <pointLight
        ref={topRef}
        position={[0, 3.6, 0.6]}
        intensity={0.95}
        distance={13}
        color="#25FDFD"
      />
      <pointLight
        ref={backRef}
        position={[0, 0.4, -3.8]}
        intensity={0.9}
        distance={14}
        color="#1ABBAE"
      />
    </group>
  );
}

export function Hero3DScene() {
  const isMobile = useIsMobile();
  const scrollY = useScrollPosition();

  const frustumSize = 8;
  const viewSize = frustumSize * 2;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-end pr-[2%] md:pr-[6%] pointer-events-none">
      <div
        className="w-[380px] h-[380px] md:w-[500px] md:h-[500px] lg:w-[620px] lg:h-[620px] pointer-events-auto"
        style={{ aspectRatio: "1 / 1" }}
      >
        <Canvas
          orthographic
          camera={{
            zoom: 2.0,
            position: [0, 0, 12],
            left: -frustumSize,
            right: frustumSize,
            top: frustumSize,
            bottom: -frustumSize,
            near: 0.1,
            far: 100,
          }}
          dpr={isMobile ? 1 : [1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            {/* Adding Lights */}
            <ambientLight intensity={0.9} />
            <directionalLight position={[3, 5, 6]} intensity={1.1} />
            <pointLight
              position={[-11, -2, 6]}
              intensity={1.8}
              color="#22F0EF"
            />
            {/* Orbit Controls */}
            {!isMobile && (
              <OrbitControls
                makeDefault
                enableDamping
                dampingFactor={0.08}
                rotateSpeed={0.55}
                enablePan={true}
                panSpeed={0.6}
                enableZoom={true}
                zoomSpeed={0.9}
                minZoom={0.45}
                maxZoom={2.2}
                target={[0, 0, 0]}
              />
            )}
            <Scene scrollY={scrollY} viewSize={viewSize} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
