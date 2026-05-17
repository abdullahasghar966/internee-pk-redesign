import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Environment,
  Sparkles,
  Icosahedron,
  TorusKnot,
  Sphere,
} from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function CoreOrb() {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.18;
    meshRef.current.rotation.y = t * 0.24;
  });
  return (
    <group ref={meshRef}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <Sphere args={[1.55, 96, 96]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            distort={0.42}
            speed={1.6}
            roughness={0.05}
            metalness={0.85}
            emissive="#3b1f7a"
            emissiveIntensity={0.25}
          />
        </Sphere>
      </Float>
    </group>
  );
}

function GlassKnot() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.35;
    ref.current.rotation.z = t * 0.22;
    ref.current.position.x = 2.4 + Math.sin(t * 0.5) * 0.18;
    ref.current.position.y = 0.6 + Math.cos(t * 0.4) * 0.22;
  });
  return (
    <group ref={ref} position={[2.4, 0.6, -0.4]} scale={0.55}>
      <TorusKnot args={[0.8, 0.26, 220, 32]}>
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.4}
          chromaticAberration={0.4}
          anisotropy={0.4}
          distortion={0.2}
          distortionScale={0.4}
          temporalDistortion={0.1}
          roughness={0.06}
          color="#22d3ee"
        />
      </TorusKnot>
    </group>
  );
}

function ShardCluster() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.15;
  });
  return (
    <group ref={ref} position={[-2.5, -0.4, 0.2]}>
      <Float speed={2} rotationIntensity={1.4} floatIntensity={1.6}>
        <Icosahedron args={[0.42, 0]}>
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.9}
            roughness={0.15}
            emissive="#7c5400"
            emissiveIntensity={0.35}
          />
        </Icosahedron>
      </Float>
      <Float speed={1.6} rotationIntensity={1} floatIntensity={1.4} position={[0.7, 0.5, -0.4]}>
        <Icosahedron args={[0.28, 0]}>
          <meshStandardMaterial
            color="#f472b6"
            metalness={0.85}
            roughness={0.2}
            emissive="#5b1b3b"
            emissiveIntensity={0.3}
          />
        </Icosahedron>
      </Float>
      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.2} position={[-0.7, -0.6, 0.4]}>
        <Icosahedron args={[0.22, 0]}>
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.85}
            roughness={0.2}
            emissive="#0e3a48"
            emissiveIntensity={0.35}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

function ParallaxRig({ children }) {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.28, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.18, 0.04);
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#06060c']} />
      <fog attach="fog" args={['#06060c', 8, 16]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[-5, -3, 4]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[0, 4, -4]} intensity={0.7} color="#fbbf24" />
      <Suspense fallback={null}>
        <ParallaxRig>
          <CoreOrb />
          <GlassKnot />
          <ShardCluster />
          <Sparkles count={70} scale={[10, 6, 6]} size={2} speed={0.35} color="#c4b5fd" />
        </ParallaxRig>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
