import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { useRef, Suspense, useEffect, useState } from "react";
import * as THREE from "three";

// Exact 36 circles from the Dimensione 4 logo - DO NOT MODIFY
const SYMBOL_DATA = [
  { x: -0.8078, y: -0.18, r: 0.1423, color: "#178A7A" },
  { x: -0.5534, y: -0.1926, r: 0.0338, color: "#1E9D90" },
  { x: -0.5057, y: -0.3462, r: 0.0489, color: "#1C9F92" },
  { x: -0.7347, y: -0.5124, r: 0.1169, color: "#188F80" },
  { x: -0.5559, y: -0.7544, r: 0.082, color: "#199B8D" },
  { x: -0.6383, y: -0.84, r: 0.0338, color: "#1AA092" },
  { x: -0.382, y: -0.7993, r: 0.082, color: "#1AAE9F" },
  { x: -0.1851, y: -0.7627, r: 0.1169, color: "#18A595" },
  { x: -0.0142, y: -0.8138, r: 0.082, color: "#1ABBAE" },
  { x: 0.107, y: -0.8922, r: 0.0338, color: "#1CC8BD" },
  { x: 0.1915, y: -0.9722, r: 0.0489, color: "#1ECBC0" },
  { x: 0.3775, y: -0.9687, r: 0.1169, color: "#1CD7CD" },
  { x: 0.5522, y: -0.8278, r: 0.1169, color: "#19E1DD" },
  { x: 0.7128, y: -0.6864, r: 0.082, color: "#1DE8E5" },
  { x: 0.8155, y: -0.5024, r: 0.0489, color: "#1FE8E6" },
  { x: 0.9067, y: -0.4086, r: 0.0338, color: "#22F0EF" },
  { x: 0.8768, y: -0.2052, r: 0.082, color: "#21F4F3" },
  { x: 0.9579, y: -0.0568, r: 0.1169, color: "#1FF4F2" },
  { x: 0.9723, y: 0.0011, r: 0.0338, color: "#23FAF9" },
  { x: 0.974, y: 0.1758, r: 0.0489, color: "#25FDFD" },
  { x: 0.8215, y: 0.3476, r: 0.082, color: "#1FF4F3" },
  { x: 0.9378, y: 0.469, r: 0.082, color: "#20F4F4" },
  { x: 0.986, y: 0.5447, r: 0.0338, color: "#1FF3F3" },
  { x: 0.8504, y: 0.6905, r: 0.1169, color: "#1CE7E4" },
  { x: 0.6517, y: 0.6774, r: 0.082, color: "#1ADEDA" },
  { x: 0.5046, y: 0.7777, r: 0.0338, color: "#1ACAC0" },
  { x: 0.2364, y: 0.8467, r: 0.1169, color: "#1CCBC1" },
  { x: 0.0899, y: 0.949, r: 0.0489, color: "#18C2B5" },
  { x: -0.0942, y: 0.9091, r: 0.0338, color: "#18B4A6" },
  { x: -0.2672, y: 0.8521, r: 0.082, color: "#19AFA1" },
  { x: -0.4742, y: 0.7928, r: 0.0489, color: "#198C7C" },
  { x: -0.8264, y: 0.5452, r: 0.1169, color: "#199B8C" },
  { x: -0.8123, y: 0.234, r: 0.082, color: "#188D7E" },
  { x: -0.7459, y: 0.1066, r: 0.0489, color: "#188C7D" },
  { x: -0.6678, y: 0.5954, r: 0.082, color: "#19998B" },
  { x: -0.571, y: 0.8323, r: 0.1423, color: "#178A7A" }
];

const SCALE = 4;

// Hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scroll;
}

// Interactive circle with glow effect
function GlowCircle({ x, y, r, color, index }: { x: number; y: number; r: number; color: string; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);
  const targetGlow = useRef(0.15);
  const currentScale = useRef(1);
  const currentGlow = useRef(0.15);
  
  useFrame((state) => {
    if (!groupRef.current || !glowRef.current || !glowMaterialRef.current) return;
    
    // Update targets based on hover
    targetScale.current = hovered ? 1.3 : 1;
    targetGlow.current = hovered ? 0.5 : 0.15;
    
    // Smooth interpolation
    currentScale.current += (targetScale.current - currentScale.current) * 0.15;
    currentGlow.current += (targetGlow.current - currentGlow.current) * 0.15;
    
    // Subtle pulse animation offset by index
    const pulse = Math.sin(state.clock.elapsedTime * 1.5 + index * 0.3) * 0.08 + 0.92;
    
    groupRef.current.scale.setScalar(currentScale.current);
    glowRef.current.scale.setScalar(pulse * (hovered ? 2.2 : 1.8));
    glowMaterialRef.current.opacity = currentGlow.current;
  });
  
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };
  
  return (
    <group 
      ref={groupRef} 
      position={[x * SCALE, y * SCALE, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Glow layer behind */}
      <mesh ref={glowRef} position={[0, 0, -0.01]}>
        <circleGeometry args={[r * SCALE, 64]} />
        <meshBasicMaterial 
          ref={glowMaterialRef}
          color={color} 
          transparent 
          opacity={0.15}
        />
      </mesh>
      {/* Main circle */}
      <mesh>
        <circleGeometry args={[r * SCALE, 64]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

// Symbol group with clockwise rotation and parallax
function SymbolGroup({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Clockwise rotation (negative direction)
    groupRef.current.rotation.z = -state.clock.elapsedTime * 0.01;
    
    // Parallax on scroll
    groupRef.current.position.y = scrollY.current * -0.3;
  });
  
  return (
    <group ref={groupRef}>
      {SYMBOL_DATA.map((circle, i) => (
        <GlowCircle
          key={i}
          index={i}
          x={circle.x}
          y={circle.y}
          r={circle.r}
          color={circle.color}
        />
      ))}
    </group>
  );
}

function Scene({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  return <SymbolGroup scrollY={scrollY} />;
}

export function Hero3DScene() {
  const isMobile = useIsMobile();
  const scrollY = useScrollPosition();
  
  const frustumSize = 8;
  
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-[2%] md:pr-[6%]">
      <div 
        className="w-[380px] h-[380px] md:w-[500px] md:h-[500px] lg:w-[620px] lg:h-[620px]"
        style={{ aspectRatio: '1 / 1' }}
      >
        <Canvas
          orthographic
          camera={{
            zoom: 1,
            position: [0, 0, 10],
            left: -frustumSize,
            right: frustumSize,
            top: frustumSize,
            bottom: -frustumSize,
            near: 0.1,
            far: 100
          }}
          dpr={isMobile ? 1 : [1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene scrollY={scrollY} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
