import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useEffect, useState } from "react";
import * as THREE from "three";

// Logo symbol circle data - exact positions from the logo
const SYMBOL_DATA = [
  { x: -0.757, y: -0.1546, r: 0.1192, color: "#188F80" },
  { x: -0.9786, y: -0.2059, r: 0.0345, color: "#1C8473" },
  { x: -0.9271, y: -0.3629, r: 0.0502, color: "#1A8576" },
  { x: -0.5743, y: -0.3991, r: 0.0838, color: "#199B8D" },
  { x: -0.788, y: -0.5665, r: 0.0838, color: "#188D7E" },
  { x: -0.5889, y: -0.6031, r: 0.05, color: "#199B8C" },
  { x: -0.7002, y: -0.7328, r: 0.0344, color: "#19998B" },
  { x: -0.3612, y: -0.7136, r: 0.0838, color: "#1AAE9F" },
  { x: -0.1921, y: -0.6814, r: 0.1193, color: "#18A595" },
  { x: -0.0132, y: -0.7335, r: 0.0838, color: "#1ABBAE" },
  { x: 0.1307, y: -0.8092, r: 0.0345, color: "#1CC8BD" },
  { x: 0.2201, y: -0.9066, r: 0.0501, color: "#1ECBC0" },
  { x: 0.3917, y: -0.9176, r: 0.1193, color: "#1CD7CD" },
  { x: 0.5438, y: -0.7493, r: 0.1193, color: "#19E1DD" },
  { x: 0.6892, y: -0.6288, r: 0.0838, color: "#1DE8E5" },
  { x: 0.7885, y: -0.4693, r: 0.0502, color: "#1FE8E6" },
  { x: 0.8837, y: -0.394, r: 0.0345, color: "#22F0EF" },
  { x: 0.8359, y: -0.1758, r: 0.0838, color: "#21F4F3" },
  { x: 0.9167, y: -0.0368, r: 0.1192, color: "#1FF4F2" },
  { x: 0.978, y: -0.0433, r: 0.0345, color: "#23FAF9" },
  { x: 0.9801, y: 0.1814, r: 0.0502, color: "#25FDFD" },
  { x: 0.787, y: 0.3209, r: 0.0838, color: "#1FF4F3" },
  { x: 0.9031, y: 0.4402, r: 0.0838, color: "#20F4F4" },
  { x: 0.976, y: 0.5195, r: 0.0345, color: "#1FF3F3" },
  { x: 0.8327, y: 0.6638, r: 0.1192, color: "#1CE7E4" },
  { x: 0.6407, y: 0.6465, r: 0.0838, color: "#1ADEDA" },
  { x: 0.4983, y: 0.7514, r: 0.0345, color: "#1ACAC0" },
  { x: 0.2344, y: 0.8204, r: 0.1192, color: "#1CCBC1" },
  { x: 0.0969, y: 0.9246, r: 0.0502, color: "#18C2B5" },
  { x: -0.0865, y: 0.8841, r: 0.0345, color: "#18B4A6" },
  { x: -0.2541, y: 0.826, r: 0.0838, color: "#19AFA1" },
  { x: -0.4643, y: 0.7676, r: 0.05, color: "#198C7C" },
  { x: -0.756, y: 0.3831, r: 0.05, color: "#188C7D" },
  { x: -0.8322, y: 0.1921, r: 0.0838, color: "#188D7E" },
  { x: -0.8321, y: 0.5147, r: 0.1192, color: "#199B8C" },
  { x: -0.8334, y: 0.1926, r: 0.1456, color: "#178A7A" }
];

// Scale factor to fill the canvas appropriately
const SCALE = 3.2;

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

// Single circle component
function SymbolCircle({ x, y, r, color, index }: { x: number; y: number; r: number; color: string; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef<number | null>(null);
  const entryDelay = index * 0.025;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Initialize start time
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }
    
    // Staggered entry animation
    const timeSinceStart = state.clock.elapsedTime - startTime.current;
    const entryTime = Math.max(0, timeSinceStart - entryDelay);
    const entryProgress = Math.min(1, entryTime / 0.4);
    
    // Ease out back for slight bounce
    const c1 = 1.70158;
    const c3 = c1 + 1;
    const eased = entryProgress === 1 
      ? 1 
      : 1 + c3 * Math.pow(entryProgress - 1, 3) + c1 * Math.pow(entryProgress - 1, 2);
    
    meshRef.current.scale.setScalar(Math.max(0, eased));
  });
  
  return (
    <mesh
      ref={meshRef}
      position={[x * SCALE, y * SCALE, 0]}
      scale={0}
    >
      <circleGeometry args={[r * SCALE, 64]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Main symbol group with subtle rotation
function SymbolGroup({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Very slow continuous rotation (optional enhancement)
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    
    // Parallax on scroll
    const scrollOffset = scrollY.current;
    groupRef.current.position.y = scrollOffset * -0.8;
  });
  
  return (
    <group ref={groupRef}>
      {SYMBOL_DATA.map((circle, i) => (
        <SymbolCircle
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
  
  // Orthographic camera frustum size
  const frustumSize = 8;
  const aspect = 1; // Square canvas
  
  return (
    <div className="absolute inset-0 flex items-center justify-end pointer-events-auto pr-[5%] md:pr-[10%]">
      <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-80">
        <Canvas
          orthographic
          camera={{
            zoom: 1,
            position: [0, 0, 10],
            left: -frustumSize * aspect,
            right: frustumSize * aspect,
            top: frustumSize,
            bottom: -frustumSize,
            near: 0.1,
            far: 100
          }}
          dpr={isMobile ? 1 : [1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
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
