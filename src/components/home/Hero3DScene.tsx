import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function AnimatedIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#12A6A3"
          emissive="#0a5a58"
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.8}
          distort={0.3}
          speed={2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function InnerCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#23E6E6"
        emissive="#23E6E6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function ParticleRing() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 3.5 + Math.random() * 0.5;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
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
        size={0.03}
        color="#23E6E6"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#23E6E6" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#12A6A3" />
          
          <AnimatedIcosahedron />
          <InnerCore />
          <ParticleRing />
        </Suspense>
      </Canvas>
    </div>
  );
}
