/** Number of concurrent ripples the shader tracks. */
export const RIPPLE_COUNT = 8;

export const waterVertexShader = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const waterFragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uScrollDepth;
uniform vec3 uTintSurface;
uniform vec3 uTintDeep;
uniform vec4 uR0;
uniform vec4 uR1;
uniform vec4 uR2;
uniform vec4 uR3;
uniform vec4 uR4;
uniform vec4 uR5;
uniform vec4 uR6;
uniform vec4 uR7;

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
  rip += ripple(uv, uR0, aspect, uTime);
  rip += ripple(uv, uR1, aspect, uTime);
  rip += ripple(uv, uR2, aspect, uTime);
  rip += ripple(uv, uR3, aspect, uTime);
  rip += ripple(uv, uR4, aspect, uTime);
  rip += ripple(uv, uR5, aspect, uTime);
  rip += ripple(uv, uR6, aspect, uTime);
  rip += ripple(uv, uR7, aspect, uTime);
  col += rip;

  gl_FragColor = vec4(col, 1.0);
}
`;
