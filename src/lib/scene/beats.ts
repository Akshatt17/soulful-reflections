/**
 * The 6-beat morph spine. Scroll progress p (0..1) maps to a continuous stage
 * value (0..5) that scrubs the centerpiece through its baked forms, cross-faded so
 * nothing snaps. Beat anchors sit at the centre of each beat's scroll range, where
 * that form is fully settled.
 */

export const BEAT_NAMES = [
  "dewdrop", // 0  surface
  "release", // 1  ripple / sink
  "bud", //     2  shallows
  "bloom", //   3  bloom
  "scatter", // 4  petals scatter
  "settle", //  5  brain-flower / still
] as const;

export const STAGE_COUNT = BEAT_NAMES.length;

/** p at which each stage is fully formed (centres of the plan's beat ranges). */
const BEAT_ANCHORS = [0.075, 0.235, 0.41, 0.59, 0.76, 0.92] as const;

/** How tightly gathered each form is (1 = crisp, damps drift; 0 = loose, free drift). */
const STAGE_TIGHTNESS = [0.55, 0.35, 0.9, 0.85, 0.12, 0.7] as const;

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

/** Interpolated form tightness for a continuous stage value. */
export const formTightnessFromStage = (sp: number): number => {
  const clamped = Math.min(Math.max(sp, 0), STAGE_COUNT - 1);
  const a = Math.floor(clamped);
  const b = Math.min(a + 1, STAGE_COUNT - 1);
  const f = clamped - a;
  return STAGE_TIGHTNESS[a] + (STAGE_TIGHTNESS[b] - STAGE_TIGHTNESS[a]) * f;
};
