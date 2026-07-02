import { STAGE_COUNT } from "@/lib/scene/beats";

/**
 * Baked position buffers for the particle-formed centerpiece — one Float32Array of
 * `count * 3` per beat. Every particle keeps a coherent "character" (its random
 * seeds are reused across all stages) so the morph reads as one form transforming,
 * not a reshuffle. Stage 5 (settle) is a calm resolved bloom standing in for the
 * photographic brain-flower until that asset lands (Phase 5).
 */

/** Deterministic RNG so the forms are stable across reloads. */
const mulberry32 = (seed: number): (() => number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const TAU = Math.PI * 2;

interface ParticleRandoms {
  u: Float32Array;
  v: Float32Array;
  w: Float32Array;
  petal: Float32Array;
}

const dewdrop = (i: number, r: ParticleRandoms, out: Float32Array): void => {
  const rad = 0.14 * Math.cbrt(r.u[i]);
  const theta = Math.acos(2 * r.v[i] - 1);
  const phi = TAU * r.w[i];
  out[i * 3] = rad * Math.sin(theta) * Math.cos(phi);
  out[i * 3 + 1] = rad * Math.cos(theta) * 1.5 + 0.1;
  out[i * 3 + 2] = rad * Math.sin(theta) * Math.sin(phi);
};

const release = (i: number, r: ParticleRandoms, out: Float32Array): void => {
  const rad = 0.5 * Math.cbrt(r.u[i]);
  const theta = Math.acos(2 * r.v[i] - 1);
  const phi = TAU * r.w[i];
  out[i * 3] = rad * Math.sin(theta) * Math.cos(phi);
  out[i * 3 + 1] = rad * Math.cos(theta);
  out[i * 3 + 2] = rad * Math.sin(theta) * Math.sin(phi);
};

const bud = (i: number, r: ParticleRandoms, out: Float32Array): void => {
  const h = r.u[i]; // 0 bottom .. 1 top
  const angle = TAU * r.v[i];
  const rad = 0.33 * Math.pow(1 - h, 0.6) + 0.02 * r.w[i];
  out[i * 3] = rad * Math.cos(angle);
  out[i * 3 + 1] = h * 1.2 - 0.35;
  out[i * 3 + 2] = rad * Math.sin(angle);
};

const bloom = (i: number, r: ParticleRandoms, out: Float32Array): void => {
  const s = r.u[i]; // outward along petal
  const petalCount = 8;
  const k = Math.floor(r.petal[i] * petalCount);
  const ang = (k * TAU) / petalCount + (r.v[i] - 0.5) * 0.55;
  const rad = 0.15 + s * 1.15;
  out[i * 3] = rad * Math.cos(ang);
  out[i * 3 + 1] = -0.1 + s * 0.15 + 0.25 * Math.sin(Math.PI * s);
  out[i * 3 + 2] = rad * Math.sin(ang);
};

const scatter = (i: number, r: ParticleRandoms, out: Float32Array): void => {
  const rad = 2.8 * Math.cbrt(r.u[i]);
  const theta = Math.acos(2 * r.v[i] - 1);
  const phi = TAU * r.w[i];
  out[i * 3] = rad * Math.sin(theta) * Math.cos(phi);
  out[i * 3 + 1] = rad * Math.cos(theta) * 0.7;
  out[i * 3 + 2] = rad * Math.sin(theta) * Math.sin(phi);
};

const settle = (i: number, r: ParticleRandoms, out: Float32Array): void => {
  const s = r.u[i];
  const petalCount = 12;
  const k = Math.floor(r.petal[i] * petalCount);
  const ang = (k * TAU) / petalCount + (r.v[i] - 0.5) * 0.4;
  const rad = 0.2 + s * 1.4;
  out[i * 3] = rad * Math.cos(ang);
  out[i * 3 + 1] = -0.05 + 0.05 * Math.sin(Math.PI * s);
  out[i * 3 + 2] = rad * Math.sin(ang);
};

const GENERATORS = [dewdrop, release, bud, bloom, scatter, settle];

/** Build the STAGE_COUNT position buffers plus a per-particle seed buffer. */
export const buildCenterpieceStages = (
  count: number,
): { stages: Float32Array[]; seeds: Float32Array } => {
  const rng = mulberry32(0x50f7);
  const randoms: ParticleRandoms = {
    u: new Float32Array(count),
    v: new Float32Array(count),
    w: new Float32Array(count),
    petal: new Float32Array(count),
  };
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    randoms.u[i] = rng();
    randoms.v[i] = rng();
    randoms.w[i] = rng();
    randoms.petal[i] = rng();
    seeds[i] = rng();
  }

  const stages: Float32Array[] = [];
  for (let s = 0; s < STAGE_COUNT; s++) {
    const buf = new Float32Array(count * 3);
    const gen = GENERATORS[s];
    for (let i = 0; i < count; i++) gen(i, randoms, buf);
    stages.push(buf);
  }

  return { stages, seeds };
};
