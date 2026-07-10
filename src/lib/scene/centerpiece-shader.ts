import { curlNoiseGLSL } from "@/lib/scene/curl-noise";

/**
 * The centerpiece morph shader. Each particle carries all six baked stage
 * positions (aStage0..aStage5); the vertex stage blends the two active stages by
 * uStageProgress (0..5) and adds curl drift scaled down by uFormTightness so
 * gathered forms stay crisp while scattered ones drift freely. Quads are
 * billboarded with a slow tumble and tinted from the brand palette.
 */
export const centerpieceVertexShader = /* glsl */ `
${curlNoiseGLSL}

uniform float uTime;
uniform float uStageProgress;
uniform float uFormTightness;
uniform float uDriftAmp;
uniform float uDriftFreq;
uniform float uDriftSpeed;
uniform vec3 uPalette[4];

attribute vec3 aStage0;
attribute vec3 aStage1;
attribute vec3 aStage2;
attribute vec3 aStage3;
attribute vec3 aStage4;
attribute vec3 aStage5;
attribute float aSeed;

varying vec2 vUv;
varying vec3 vColor;

mat2 rot(float a){ float c = cos(a); float s = sin(a); return mat2(c, -s, s, c); }

vec3 stageAt(int i){
  if (i <= 0) return aStage0;
  else if (i == 1) return aStage1;
  else if (i == 2) return aStage2;
  else if (i == 3) return aStage3;
  else if (i == 4) return aStage4;
  return aStage5;
}

void main(){
  vUv = uv;
  int cidx = int(mod(aSeed * 4.0, 4.0));
  vColor = uPalette[cidx];

  float sp = clamp(uStageProgress, 0.0, 5.0);
  float fl = floor(sp);
  int a = int(fl);
  int b = int(min(fl + 1.0, 5.0));
  float f = smoothstep(0.0, 1.0, fract(sp));
  vec3 base = mix(stageAt(a), stageAt(b), f);

  float driftScale = mix(0.9, 0.05, uFormTightness);
  vec3 drift = curlNoise(base * uDriftFreq + uTime * uDriftSpeed) * uDriftAmp * driftScale;
  vec3 center = base + drift;

  float size = mix(0.05, 0.14, fract(aSeed * 7.13));
  float angle = uTime * (0.05 + aSeed * 0.1) + aSeed * 6.2831;

  vec4 mv = modelViewMatrix * vec4(center, 1.0);
  mv.xy += rot(angle) * (position.xy * size);
  gl_Position = projectionMatrix * mv;
}
`;

export const centerpieceFragmentShader = /* glsl */ `
precision highp float;

uniform float uOpacity;

varying vec2 vUv;
varying vec3 vColor;

void main(){
  vec2 p = vUv - 0.5;
  float d = length(p);
  float alpha = smoothstep(0.5, 0.1, d) * uOpacity;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(vColor, alpha);
}
`;
