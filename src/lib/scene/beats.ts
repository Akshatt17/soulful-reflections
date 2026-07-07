/**
 * The 6-beat morph spine. Scroll progress p (0..1) maps to a continuous stage
 * value (0..5) that scrubs the centerpiece through its baked forms, cross-faded so
 * nothing snaps. Beat anchors sit at the centre of each beat's scroll range, where
 * that form is fully settled.
 *
 * The droplet choreography also lives here: the dewdrop forms upper-right above
 * the surface and arcs down the frame to rest just left of centre, keeping the
 * opposite side open for content.
 */

export const BEAT_NAMES = [
  "dewdrop", // 0  surface
  "release", // 1  ripple / sink
  "bud", //     2  shallows
  "bloom", //   3  bloom
  "scatter", // 4  petals scatter
  "settle", //  5  resolved bloom / still
] as const;

export const STAGE_COUNT = BEAT_NAMES.length;

/** p at which each stage is fully formed (centres of the plan's beat ranges). */
const BEAT_ANCHORS = [0.075, 0.235, 0.41, 0.59, 0.76, 0.92] as const;

/** How tightly gathered each form is (1 = crisp, damps drift; 0 = loose, free drift). */
const STAGE_TIGHTNESS = [0.55, 0.35, 0.9, 0.85, 0.12, 0.7] as const;

/** Droplet anchor offset (from the camera look-at) where it forms — upper right, above the surface. */
const DROP_OFFSET_START: readonly [number, number, number] = [1.7, 1.0, -0.7];

/** Droplet anchor offset where it comes to rest — left of centre, eased back in depth. */
const DROP_OFFSET_END: readonly [number, number, number] = [-0.9, -0.1, -0.6];

/** Sideways bulge at mid-travel so the descent reads as a gentle arc, not a straight drop. */
const DROP_ARC: readonly [number, number, number] = [0.35, 0, -0.2];

/** Map scroll progress 0..1 to a continuous stage 0..(STAGE_COUNT-1). */
export const stageProgressFromP = (p: number): number => {
  if (p <= BEAT_ANCHORS[0]) return 0;
  if (p >= BEAT_ANCHORS[STAGE_COUNT - 1]) return STAGE_COUNT - 1;
  for (let k = 0; k < STAGE_COUNT - 1; k++) {
    if (p < BEAT_ANCHORS[k + 1]) {
      const f = (p - BEAT_ANCHORS[k]) / (BEAT_ANCHORS[k + 1] - BEAT_ANCHORS[k]);
      return k + f;
    }
  }
  return STAGE_COUNT - 1;
};

/** Smooth Hermite interpolation, clamped to [0,1]. */
export const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
};

/**
 * Where the droplet (petal shell + brain) sits relative to the camera's look-at
 * point at progress p. Eased arc from upper-right to lower-left-of-centre, with a
 * slow low-frequency bob so it never hangs perfectly still.
 */
export const dropOffsetFromP = (
  p: number,
  time: number,
): [number, number, number] => {
  const t = smoothstep(0, 1, Math.min(Math.max(p, 0), 1));
  const arc = Math.sin(Math.PI * t);
  return [
    DROP_OFFSET_START[0] +
      (DROP_OFFSET_END[0] - DROP_OFFSET_START[0]) * t +
      DROP_ARC[0] * arc +
      Math.sin(time * 0.22) * 0.05,
    DROP_OFFSET_START[1] +
      (DROP_OFFSET_END[1] - DROP_OFFSET_START[1]) * t +
      DROP_ARC[1] * arc +
      Math.sin(time * 0.35) * 0.07,
    DROP_OFFSET_START[2] +
      (DROP_OFFSET_END[2] - DROP_OFFSET_START[2]) * t +
      DROP_ARC[2] * arc,
  ];
};

/** Interpolated form tightness for a continuous stage value. */
export const formTightnessFromStage = (sp: number): number => {
  const clamped = Math.min(Math.max(sp, 0), STAGE_COUNT - 1);
  const a = Math.floor(clamped);
  const b = Math.min(a + 1, STAGE_COUNT - 1);
  const f = clamped - a;
  return STAGE_TIGHTNESS[a] + (STAGE_TIGHTNESS[b] - STAGE_TIGHTNESS[a]) * f;
};
