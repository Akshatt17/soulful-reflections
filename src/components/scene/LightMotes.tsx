import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  ShaderMaterial,
  Vector3,
} from "three";
import { MOTE_COLOR } from "@/lib/scene/scene-config";

interface LightMotesProps {
  count: number;
}

const MOTE_SPAN = 12;

const moteVertexShader = /* glsl */ `
uniform float uTime;
uniform float uSize;
attribute float aSeed;
varying float vSeed;
void main(){
  vSeed = aSeed;
  vec3 pos = position;
  // slow perpetual rise, wrapping through the column
  pos.y = mod(position.y + uTime * 0.12, ${MOTE_SPAN.toFixed(1)}) - ${(MOTE_SPAN / 2).toFixed(1)};
  pos.x += sin(uTime * 0.15 + aSeed * 6.2831) * 0.3;
  pos.z += cos(uTime * 0.12 + aSeed * 5.11) * 0.3;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uSize * mix(0.5, 1.3, aSeed) * (180.0 / max(-mv.z, 0.1));
  gl_Position = projectionMatrix * mv;
}
`;

const moteFragmentShader = /* glsl */ `
precision highp float;
uniform vec3 uColor;
varying float vSeed;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.0, d) * mix(0.2, 0.55, vSeed);
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(uColor, alpha);
}
`;

/**
 * Cheap additive point sprites drifting slowly upward — soft candle-light motes
 * that keep the depths feeling alive and warm.
 */
const LightMotes = ({ count }: LightMotesProps) => {
  const { geometry, material } = useMemo(() => {
    const geo = new BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * 5.0;
      pos[i * 3 + 1] = Math.random() * MOTE_SPAN - MOTE_SPAN / 2;
      pos[i * 3 + 2] = (Math.random() * 2 - 1) * 4.0;
      seed[i] = Math.random();
    }
    geo.setAttribute("position", new Float32BufferAttribute(pos, 3));
    geo.setAttribute("aSeed", new Float32BufferAttribute(seed, 1));

    const mat = new ShaderMaterial({
      vertexShader: moteVertexShader,
      fragmentShader: moteFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 1.0 },
        uColor: { value: new Vector3(MOTE_COLOR[0], MOTE_COLOR[1], MOTE_COLOR[2]) },
      },
    });

    return { geometry: geo, material: mat };
  }, [count]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
};

export default LightMotes;
