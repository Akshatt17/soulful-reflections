/**
 * Shared scene constants for the R3F "Descent & Metamorphosis" background.
 * Tints mirror the brand water world (cream surface fading to soft dusty rose)
 * and match the ogl WaterScene they replace, so Phase 1 is visual parity.
 */

/** Cream — the pond surface. */
export const SURFACE_TINT: readonly [number, number, number] = [0.949, 0.922, 0.867];

/** Soft dusty rose — the depths. */
export const DEEP_TINT: readonly [number, number, number] = [0.86, 0.74, 0.75];

/** Concurrent ripples the water shader tracks (ring buffer). */
export const RIPPLE_COUNT = 8;

/** Camera world position at the surface (progress 0). */
export const CAMERA_START: readonly [number, number, number] = [0, 2.5, 6];

/** Camera world position deep in the pond (progress 1). */
export const CAMERA_END: readonly [number, number, number] = [0, -3.5, 4];

/** Damping smooth-time (seconds) for scroll-driven scene motion — higher = more serene lag. */
export const SCENE_DAMP = 0.6;

/** Soft brand tints for the drifting petals (rose, peach, baby-pink, pista green). */
export const PETAL_COLORS: readonly (readonly [number, number, number])[] = [
  [0.82, 0.68, 0.64],
  [0.72, 0.54, 0.55],
  [0.98, 0.68, 0.75],
  [0.67, 0.82, 0.42],
];

/** Warm candle-light tint for the drifting motes. */
export const MOTE_COLOR: readonly [number, number, number] = [1.0, 0.95, 0.82];

/** Performance tier: particle counts + effects, chosen from viewport size. */
export interface SceneTier {
  petals: number;
  motes: number;
  centerpiece: number;
  dof: boolean;
  dprMax: number;
}

export const DESKTOP_TIER: SceneTier = {
  petals: 1800,
  motes: 500,
  centerpiece: 3200,
  dof: true,
  dprMax: 1.75,
};

export const MOBILE_TIER: SceneTier = {
  petals: 500,
  motes: 160,
  centerpiece: 1000,
  dof: false,
  dprMax: 1.25,
};
