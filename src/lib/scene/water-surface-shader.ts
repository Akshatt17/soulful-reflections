import { RIPPLE_COUNT } from "@/lib/scene/scene-config";

/**
 * Fullscreen water shader ported from the ogl WaterScene. Rendered on a clip-space
 * quad (vertex passes NDC through, ignoring the camera) so Phase 1 reproduces the
 * original vertical tint + concentric ripples exactly. Ripples are packed into a
 * single `vec4[]` uniform: (x, y, startTime, strength) with y pointing up.
 */
export const waterVertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const waterFragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uScrollDepth;
uniform vec3 uTintSurface;
uniform vec3 uTintDeep;
uniform vec4 uRipples[${RIPPLE_COUNT}];

varying vec2 vUv;

// r = (x, y, startTime, strength)
float ripple(vec2 uv, vec4 r, float aspect, float time) {
  if (r.w <= 0.001) return 0.0;
  float age = time - r.z;
  if (age < 0.0 || age > 6.0) return 0.0;

  vec2 d = uv - r.xy;
  d.x *= aspect;
  float dist = length(d);

  float radius = age * 0.15;
  float ring = sin((dist - radius) * 50.0);
  float band = smoothstep(0.10, 0.0, abs(dist - radius));
  float fade = exp(-age * 0.65) * smoothstep(0.0, 0.55, age) * exp(-dist * 1.8);
  return ring * band * fade * r.w * 0.22;
}

void main() {
  vec2 uv = vUv;

  float depth = clamp((1.0 - uv.y) * 0.7 + uScrollDepth * 0.5, 0.0, 1.0);
  vec3 col = mix(uTintSurface, uTintDeep, depth);
  col += 0.012 * sin(uv.y * 30.0 - uTime * 0.6);

  float aspect = uResolution.x / uResolution.y;
  float rip = 0.0;
  for (int i = 0; i < ${RIPPLE_COUNT}; i++) {
    rip += ripple(uv, uRipples[i], aspect, uTime);
  }
  col += rip;

  gl_FragColor = vec4(col, 1.0);
}
`;
