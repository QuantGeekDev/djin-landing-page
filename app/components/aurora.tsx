"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  // Compact 2D noise — cheaper than full FBM
  float hash(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float f = 0.0;
    f += 0.5 * noise(p); p *= 2.02;
    f += 0.25 * noise(p); p *= 2.03;
    f += 0.125 * noise(p);
    return f / 0.875;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.06;

    float n1 = fbm(vec2(uv.x * 2.0 + t * 0.5, t * 0.3));
    float n2 = fbm(vec2(uv.x * 1.5 - t * 0.4, t * 0.2 + 3.0));

    float band1 = smoothstep(0.025, 0.0, abs(uv.y - 0.55 - n1 * 0.15));
    float band2 = smoothstep(0.035, 0.0, abs(uv.y - 0.65 - n2 * 0.12));

    vec3 col1 = vec3(1.0, 0.42, 0.22);
    vec3 col2 = vec3(1.0, 0.55, 0.15);

    vec3 aurora = band1 * col1 * 0.5 + band2 * col2 * 0.35;

    float edgeFade = smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x);
    float vertFade = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.75, uv.y);
    aurora *= edgeFade * vertFade * 0.4;

    gl_FragColor = vec4(aurora, 1.0);
  }
`;

function AuroraMesh() {
  const ref = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power", stencil: false, depth: false }}
        dpr={1}
        style={{ background: "transparent" }}
      >
        <AuroraMesh />
      </Canvas>
    </div>
  );
}
