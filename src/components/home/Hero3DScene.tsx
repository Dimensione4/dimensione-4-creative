import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useEffect, useState } from "react";
import * as THREE from "three";

// Logo symbol circle data - manually traced from the original logo
// Ring of circles going clockwise from top-left, dark teal to bright cyan
const SYMBOL_DATA = [
  // Left side - dark teal
  { x: -0.85, y: 0.15, r: 0.14, color: "#1A8B7C" },  // Large left
  { x: -0.82, y: -0.12, r: 0.11, color: "#188F80" }, // Medium left
  { x: -0.78, y: 0.42, r: 0.09, color: "#1A9385" },  // Medium upper-left
  { x: -0.72, y: -0.35, r: 0.07, color: "#199489" }, // Small lower-left
  
  // Bottom-left - teal
  { x: -0.58, y: -0.52, r: 0.08, color: "#1A9B8E" },
  { x: -0.68, y: -0.62, r: 0.05, color: "#1A9889" },
  { x: -0.45, y: -0.68, r: 0.06, color: "#1AA396" },
  
  // Bottom - transitioning
  { x: -0.25, y: -0.78, r: 0.10, color: "#1AAD9F" },
  { x: -0.02, y: -0.82, r: 0.07, color: "#1CB8AB" },
  { x: 0.18, y: -0.85, r: 0.04, color: "#1DC2B6" },
  { x: 0.32, y: -0.82, r: 0.06, color: "#1ECDC2" },
  
  // Bottom-right - cyan
  { x: 0.50, y: -0.72, r: 0.10, color: "#1FD8CE" },
  { x: 0.65, y: -0.58, r: 0.09, color: "#20E0D8" },
  { x: 0.75, y: -0.42, r: 0.06, color: "#22E6E0" },
  
  // Right side - bright cyan
  { x: 0.85, y: -0.20, r: 0.04, color: "#24EBE7" },
  { x: 0.88, y: 0.02, r: 0.10, color: "#26F0ED" },
  { x: 0.90, y: 0.25, r: 0.05, color: "#28F4F2" },
  { x: 0.85, y: 0.45, r: 0.08, color: "#2AF6F5" },
  { x: 0.82, y: 0.65, r: 0.04, color: "#2CF8F7" },
  
  // Top-right - bright cyan
  { x: 0.72, y: 0.78, r: 0.10, color: "#2EFAF9" },
  { x: 0.52, y: 0.85, r: 0.07, color: "#28F2F0" },
  { x: 0.35, y: 0.88, r: 0.04, color: "#24EAE7" },
  
  // Top - transitioning back
  { x: 0.15, y: 0.90, r: 0.09, color: "#20E0DC" },
  { x: -0.08, y: 0.88, r: 0.05, color: "#1CD4CE" },
  { x: -0.28, y: 0.82, r: 0.08, color: "#1AC8C0" },
  
  // Top-left - back to teal
  { x: -0.48, y: 0.72, r: 0.06, color: "#18B8AC" },
  { x: -0.62, y: 0.58, r: 0.10, color: "#17A89C" },
  { x: -0.75, y: 0.55, r: 0.04, color: "#169C8E" },
  
  // Additional scattered dots for organic feel
  { x: -0.92, y: 0.32, r: 0.035, color: "#188C7D" },
  { x: -0.88, y: -0.28, r: 0.04, color: "#198E80" },
  { x: 0.78, y: -0.08, r: 0.035, color: "#25EDEA" },
  { x: 0.62, y: 0.68, r: 0.035, color: "#2CFCFB" },
  { x: -0.38, y: -0.72, r: 0.035, color: "#1BA89A" },
  { x: 0.42, y: -0.78, r: 0.035, color: "#1DD2C8" },
];

// Scale factor to fill the canvas appropriately
const SCALE = 3.5;

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
