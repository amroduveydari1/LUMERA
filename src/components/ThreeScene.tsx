import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function Model({ autoRotate = false }: { autoRotate?: boolean }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        <mesh>
          <boxGeometry args={[2, 0.5, 2]} />
          <meshStandardMaterial color="#C8B08A" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
          <meshStandardMaterial color="#F3F1EE" metalness={0.1} roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

export const Hero3D = () => {
  return (
    <div className="w-full h-full absolute inset-0 -z-10 opacity-60 pointer-events-none">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} shadows="contact">
            <Model autoRotate />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
};

export const ProductViewer = ({ modelUrl }: { modelUrl?: string }) => {
  return (
    <div className="w-full h-full bg-brand-bg/50 rounded-2xl overflow-hidden border border-white/5 cursor-grab active:cursor-grabbing">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <Stage environment="studio" intensity={1} shadows="contact" adjustCamera={false}>
            <Model />
          </Stage>
        </Suspense>
        <OrbitControls 
          makeDefault
          enableZoom={true} 
          enablePan={true} 
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.8}
          minDistance={2}
          maxDistance={10}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};
