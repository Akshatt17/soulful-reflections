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
