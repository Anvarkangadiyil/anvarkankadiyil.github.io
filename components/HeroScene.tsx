"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function RetroCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (meshRef.current && wireRef.current) {
      const rotX = state.clock.elapsedTime * 0.5;
      const rotY = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = rotX;
      meshRef.current.rotation.y = rotY;
      wireRef.current.rotation.x = rotX;
      wireRef.current.rotation.y = rotY;

      // Mouse parallax
      const targetX = pointer.x * 1.5;
      const targetY = pointer.y * 1.5;

      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetX,
        0.1,
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        0.1,
      );
      wireRef.current.position.x = meshRef.current.position.x;
      wireRef.current.position.y = meshRef.current.position.y;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      {/* Solid inner cube */}
      <mesh ref={meshRef} scale={1.8}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Wireframe outer edge */}
      <lineSegments ref={wireRef} scale={1.8}>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color="#39ff14" linewidth={2} />
      </lineSegments>
    </Float>
  );
}

function FloatingPixels() {
  const count = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  // Use a square texture for points to make them look like pixels
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 16, 16);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#0ff"
        map={texture}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <RetroCube />
      <FloatingPixels />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1]}
        gl={{ antialias: false, alpha: true }} // Disabling antialias helps with the retro look
      >
        <Scene />
      </Canvas>
    </div>
  );
}
