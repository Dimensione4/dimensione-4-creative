import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

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

// Mouse tracking hook
function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return mouse;
}

interface SphereData {
  position: [number, number, number];
  scale: number;
  color: string;
  phaseOffset: number;
  entryDelay: number;
}

function LogoSpheres({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Generate spheres in circular pattern like the logo
  const spheres = useMemo(() => {
    const result: SphereData[] = [];
    const sphereCount = isMobile ? 20 : 32;
    
    // Create spheres in a circular arrangement
    for (let i = 0; i < sphereCount; i++) {
      const angle = (i / sphereCount) * Math.PI * 2;
      const radius = 2.8;
      
      // Vary sizes like in the logo (some big, some small)
      const sizePattern = [0.35, 0.15, 0.25, 0.1, 0.3, 0.12, 0.28, 0.08];
      const scale = sizePattern[i % sizePattern.length];
      
      // Gradient from teal (#12A6A3) to cyan (#23E6E6)
      const t = i / sphereCount;
      const color = t < 0.5 ? "#12A6A3" : "#23E6E6";
      
      result.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ],
        scale,
        color,
        phaseOffset: i * 0.2,
        entryDelay: i * 0.05 // Stagger delay for entry animation
      });
    }
    
    return result;
  }, [isMobile]);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth mouse following
      targetRotation.current.x = mouse.current.y * 0.3;
      targetRotation.current.y = mouse.current.x * 0.5;
      
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
      
      // Slow continuous rotation
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, i) => (
        <AnimatedSphere 
          key={i} 
          {...sphere} 
          index={i}
          isHovered={hoveredIndex === i}
          onHover={setHoveredIndex}
        />
      ))}
    </group>
  );
}

interface AnimatedSphereProps extends SphereData {
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

function AnimatedSphere({ position, scale, color, phaseOffset, entryDelay, index, isHovered, onHover }: AnimatedSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const entryProgress = useRef(0);
  const startTime = useRef<number | null>(null);
  const targetEmissive = useRef(0.3);
  const currentEmissive = useRef(0.3);
  const targetScale = useRef(0);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Initialize start time
      if (startTime.current === null) {
        startTime.current = state.clock.elapsedTime;
      }
      
      // Entry animation with stagger
      const timeSinceStart = state.clock.elapsedTime - startTime.current;
      const entryTime = Math.max(0, timeSinceStart - entryDelay);
      entryProgress.current = Math.min(1, entryTime / 0.6); // 0.6s animation duration
      
      // Easing function (ease out back for bounce effect)
      const easeOutBack = (t: number) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };
      const easedEntry = easeOutBack(entryProgress.current);
      
      // Gentle floating animation
      const offset = Math.sin(state.clock.elapsedTime * 0.8 + phaseOffset) * 0.1;
      meshRef.current.position.z = offset;
      
      // Smooth emissive intensity transition for glow (subtle)
      targetEmissive.current = isHovered ? 0.6 : 0.3;
      currentEmissive.current += (targetEmissive.current - currentEmissive.current) * 0.1;
      
      // Smooth scale transition for hover (subtle - only 15% increase)
      const hoverScale = isHovered ? scale * 1.15 : scale;
      targetScale.current = hoverScale * easedEntry;
      const currentScale = meshRef.current.scale.x;
      const newScale = currentScale + (targetScale.current - currentScale) * 0.15;
      
      // Subtle scale pulsing
      const pulseScale = newScale * (1 + Math.sin(state.clock.elapsedTime * 1.2 + phaseOffset) * 0.05);
      meshRef.current.scale.setScalar(pulseScale);
      
      // Update material emissive
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        material.emissiveIntensity = currentEmissive.current;
      }
      
      // Update glow sphere (subtle)
      if (glowRef.current) {
        glowRef.current.position.z = offset;
        glowRef.current.scale.setScalar(pulseScale * 1.5);
        const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
        glowMaterial.opacity = isHovered ? 0.2 : 0.05;
      }
    }
  });

  return (
    <group position={position}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>
      
      {/* Main sphere */}
      <mesh 
        ref={meshRef}
        onPointerEnter={() => onHover(index)}
        onPointerLeave={() => onHover(null)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = isMobile ? 30 : 60;
  const startTime = useRef<number | null>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.5 + Math.random() * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return pos;
  }, [particleCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Initialize start time
      if (startTime.current === null) {
        startTime.current = state.clock.elapsedTime;
      }
      
      // Fade in particles
      const timeSinceStart = state.clock.elapsedTime - startTime.current;
      const fadeIn = Math.min(1, timeSinceStart / 1.5);
      
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.opacity = fadeIn * 0.6;
      
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.04 : 0.03}
        color="#23E6E6"
        transparent
        opacity={0}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#23E6E6" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#12A6A3" />
      
      <LogoSpheres isMobile={isMobile} />
      <FloatingParticles isMobile={isMobile} />
    </>
  );
}

export function Hero3DScene() {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute inset-0 flex items-center justify-end pointer-events-auto pr-[5%] md:pr-[10%]">
      <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-70">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={isMobile ? 1 : [1, 2]}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}