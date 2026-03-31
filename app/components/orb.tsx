"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPos;
  uniform float uTime;

  void main() {
    vNormal = normal;
    vPos = position;
    vec3 pos = position;
    float d = sin(pos.x * 4.0 + uTime * 1.5) *
              sin(pos.y * 3.0 + uTime * 1.2) *
              sin(pos.z * 5.0 + uTime * 0.8) * 0.06;
    pos += normal * d;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPos;
  uniform float uTime;

  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
    vec3 core = vec3(1.0, 0.42, 0.22) * 0.4;
    vec3 rim = vec3(1.0, 0.55, 0.2) * fresnel * 0.8;
    float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
    vec3 color = (core + rim) * pulse;
    float alpha = 0.6 + fresnel * 0.3;
    gl_FragColor = vec4(color, alpha);
  }
`;

function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    uniforms.uTime.value = t;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 4]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

export default function Orb({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power", stencil: false, depth: false }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <GlowOrb />
      </Canvas>
    </div>
  );
}
