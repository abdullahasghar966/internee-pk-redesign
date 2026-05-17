import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron, TorusKnot } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY || window.pageYOffset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

function ScrollShapes({ scrollY }) {
  const groupRef = useRef();
  useFrame(() => {
    if (!groupRef.current) return;
    const s = scrollY.current * 0.0009;
    groupRef.current.rotation.y = s;
    groupRef.current.rotation.x = s * 0.4;
  });
  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={1.2} floatIntensity={2} position={[-3, 1.5, -2]}>
        <Icosahedron args={[0.7, 0]}>
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.7}
            roughness={0.25}
            emissive="#2b1660"
            emissiveIntensity={0.5}
          />
        </Icosahedron>
      </Float>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={1.8} position={[3.2, -1.6, -1]}>
        <TorusKnot args={[0.6, 0.18, 160, 20]}>
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.85}
            roughness={0.18}
            emissive="#0a323d"
            emissiveIntensity={0.5}
          />
        </TorusKnot>
      </Float>
      <Float speed={1.1} rotationIntensity={1.5} floatIntensity={1.4} position={[2.8, 2.1, -3]}>
        <Octahedron args={[0.55, 0]}>
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.9}
            roughness={0.18}
            emissive="#3d2900"
            emissiveIntensity={0.45}
          />
        </Octahedron>
      </Float>
      <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.2} position={[-2.8, -2.1, -2.5]}>
        <Icosahedron args={[0.42, 0]}>
          <meshStandardMaterial
            color="#f472b6"
            metalness={0.8}
            roughness={0.22}
            emissive="#3a1228"
            emissiveIntensity={0.5}
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

function CameraRig({ scrollY }) {
  useFrame(({ camera, pointer }) => {
    const s = scrollY.current * 0.0006;
    const targetX = pointer.x * 0.6 + Math.sin(s) * 0.4;
    const targetY = -pointer.y * 0.4 + Math.cos(s * 0.7) * 0.3;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ScrollScene() {
  const scrollY = useRef(0);
  const rawY = useScrollY();
  scrollY.current = rawY;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 48 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#8b5cf6" />
      <pointLight position={[-5, -3, 4]} intensity={1} color="#22d3ee" />
      <pointLight position={[0, 5, -4]} intensity={0.7} color="#fbbf24" />
      <Suspense fallback={null}>
        <ScrollShapes scrollY={scrollY} />
        <CameraRig scrollY={scrollY} />
      </Suspense>
    </Canvas>
  );
}
