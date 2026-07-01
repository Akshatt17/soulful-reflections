import { curlNoiseGLSL } from "@/lib/scene/curl-noise";

/**
 * Instanced petal quads. Each instance sits at aBasePos and perpetually drifts on
 * curl noise (alive even when scroll is idle); quads are view-space billboarded
 * with a slow per-instance tumble and tinted from the brand palette. Morph targets
 * (gather/bloom/scatter) arrive in Phase 4.
 */
export const petalVertexShader = /* glsl */ `
${curlNoiseGLSL}

uniform float uTime;
uniform float uDriftAmp;
uniform float uDriftFreq;
uniform float uDriftSpeed;
uniform vec3 uPalette[4];

attribute vec3 aBasePos;
attribute float aSeed;

varying vec2 vUv;
varying vec3 vColor;

mat2 rot(float a){ float c = cos(a); float s = sin(a); return mat2(c, -s, s, c); }

void main(){
  vUv = uv;

  int idx = int(mod(aSeed * 4.0, 4.0));
  vColor = uPalette[idx];

  // perpetual, low-frequency curl drift around the rest position
  vec3 drift = curlNoise(aBasePos * uDriftFreq + uTime * uDriftSpeed) * uDriftAmp;
  vec3 center = aBasePos + drift;

  float size = mix(0.14, 0.34, fract(aSeed * 7.13));
  float angle = uTime * (0.08 + aSeed * 0.12) + aSeed * 6.2831;

  vec4 mv = modelViewMatrix * vec4(center, 1.0);
  mv.xy += rot(angle) * (position.xy * size);
  gl_Position = projectionMatrix * mv;
}
`;

export const petalFragmentShader = /* glsl */ `
precision highp float;

uniform float uOpacity;

varying vec2 vUv;
varying vec3 vColor;

void main(){
  // soft rounded petal falloff, slightly elongated
  vec2 p = vUv - 0.5;
  p.x *= 1.35;
  float d = length(p);
  float alpha = smoothstep(0.5, 0.12, d) * uOpacity;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(vColor, alpha);
}
`;
