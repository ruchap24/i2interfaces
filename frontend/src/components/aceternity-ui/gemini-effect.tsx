"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]}>
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={0.5}
        wireframe
      />
    </Sphere>
  );
}

export function GeminiEffect() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Build Your Future
          </h2>
          <p className="text-blue-400 text-lg">
            Connect, Create, and Grow Together
          </p>
        </div>
      </div>
    </div>
  );
}

