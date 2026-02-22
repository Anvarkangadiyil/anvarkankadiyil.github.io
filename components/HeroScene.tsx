"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function RetroCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();

  // Scale cube based on viewport width (smaller on mobile)
  const scale = Math.min(1, viewport.width / 6);

  useFrame((state) => {
    if (meshRef.current && wireRef.current) {
      const rotX = state.clock.elapsedTime * 0.5;
      const rotY = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = rotX;
      meshRef.current.rotation.y = rotY;
      wireRef.current.rotation.x = rotX;
      wireRef.current.rotation.y = rotY;

      // Mouse parallax — reduce effect on small screens
      const parallaxStrength = Math.min(1.5, viewport.width / 4);
      const targetX = pointer.x * parallaxStrength;
      const targetY = pointer.y * parallaxStrength;
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
    <Float speed={1.4} rotationIntensity={0} floatIntensity={0.5}>
      {/* Solid inner cube */}
      <mesh ref={meshRef} scale={scale}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.2}
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Wireframe outer edge */}
      <mesh ref={wireRef} scale={scale}>
        <boxGeometry args={[1.52, 1.52, 1.52]} />
        <meshBasicMaterial color="#00ffff" wireframe />
      </mesh>
    </Float>
  );
}

function FloatingPixels() {
  const { viewport } = useThree();

  // Use a fixed count to prevent React Three Fiber buffer attribute errors on window resize
  const count = 100;

  // Initialize random positions strictly once via state to satisfy React 19 purity rules
  // useMemo's factory function cannot handle impure random calls in strict mode
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  });

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  // Use a square texture for points to make them look like pixels
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, 16, 16);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    return tex;
  }, []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#39ff14"
        map={texture}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#39ff14" />
      <RetroCube />
      <FloatingPixels />
    </>
  );
}

export default function HeroScene() {
  return (
    <div
      className="canvas-container absolute inset-0 w-full h-full"
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
        dpr={[
          1,
          Math.min(
            2,
            typeof window !== "undefined" ? window.devicePixelRatio : 2,
          ),
        ]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
