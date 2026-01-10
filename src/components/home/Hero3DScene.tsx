import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

// Exact 36 circles from the Dimensione 4 logo
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

// Animated circle with staggered entry by arm
function AnimatedCircle({ 
  x, y, r, color, armIndex, indexInArm 
}: { 
  x: number; y: number; r: number; color: string; armIndex: number; indexInArm: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef<number | null>(null);
  
  // Each arm has a base delay, circles within arm have small stagger
  const armDelay = armIndex * 0.3;
  const circleDelay = indexInArm * 0.05;
  const totalDelay = armDelay + circleDelay;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }
    
    const elapsed = state.clock.elapsedTime - startTime.current;
    const entryTime = Math.max(0, elapsed - totalDelay);
    const progress = Math.min(1, entryTime / 0.3);
    
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    
    meshRef.current.scale.setScalar(eased);
  });
  
  return (
    <mesh ref={meshRef} position={[x * SCALE, y * SCALE, 0]} scale={0}>
      <circleGeometry args={[r * SCALE, 64]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Symbol group - organizes circles into 4 spiral arms
function SymbolGroup({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Sort circles by angle and divide into 4 arms
  const arms = useMemo(() => {
    const circlesWithAngle = SYMBOL_DATA.map((c, i) => ({
      ...c,
      originalIndex: i,
      angle: Math.atan2(c.y, c.x)
    }));
    
    // Sort by angle
    circlesWithAngle.sort((a, b) => a.angle - b.angle);
    
    // Divide into 4 arms (9 circles each)
    const armSize = 9;
    const result: typeof circlesWithAngle[] = [];
    for (let i = 0; i < 4; i++) {
      result.push(circlesWithAngle.slice(i * armSize, (i + 1) * armSize));
    }
    
    return result;
  }, []);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Very slow rotation
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    
    // Parallax on scroll
    groupRef.current.position.y = scrollY.current * -0.3;
  });
  
  return (
    <group ref={groupRef}>
      {arms.map((arm, armIndex) =>
        arm.map((circle, indexInArm) => (
          <AnimatedCircle
            key={circle.originalIndex}
            x={circle.x}
            y={circle.y}
            r={circle.r}
            color={circle.color}
            armIndex={armIndex}
            indexInArm={indexInArm}
          />
        ))
      )}
    </group>
  );
}

function Scene({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  return <SymbolGroup scrollY={scrollY} />;
}

export function Hero3DScene() {
  const isMobile = useIsMobile();
  const scrollY = useScrollPosition();
  
  const frustumSize = 6;
  
  return (
    <div className="absolute inset-0 flex items-center justify-end pointer-events-none pr-[2%] md:pr-[8%]">
      <div 
        className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px]"
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
