import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import {
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Vector3,
} from "three";
import {
  centerpieceVertexShader,
  centerpieceFragmentShader,
} from "@/lib/scene/centerpiece-shader";
import { buildCenterpieceStages } from "@/lib/scene/morph-targets";
import {
  stageProgressFromP,
  formTightnessFromStage,
  smoothstep,
  STAGE_COUNT,
} from "@/lib/scene/beats";
import { PETAL_COLORS, SCENE_DAMP } from "@/lib/scene/scene-config";

/** Base opacity of the petal particles before the settle-beat fade-out. */
const BASE_OPACITY = 0.82;

declare global {
  interface Window {
    /** Dev-only centerpiece readout for verification (morph stage + settled beat). */
    __morphDebug?: { stage: number; beat: number };
    /** Dev-only override to force a morph stage (0..5) regardless of scroll. */
    __forceStage?: number;
  }
}

interface CenterpieceProps {
  count: number;
  progress: MutableRefObject<number>;
  /** Fired when the morph settles into a new beat, so a ripple can spread. */
  onBeat: (beat: number) => void;
}

/**
 * The particle-formed centerpiece: a dense petal system that morphs through the
 * six baked forms (dewdrop → release → bud → bloom → scatter → settle) scrubbed by
 * damped scroll progress. It rides the camera's look-at point so it stays framed
 * through the descent. A GLTF can later swap in here without touching callers.
 */
const Centerpiece = ({ count, progress, onBeat }: CenterpieceProps) => {
  const meshRef = useRef<Mesh>(null);
  const camera = useThree((s) => s.camera);
  const lastBeat = useRef(-1);

  const { geometry, material } = useMemo(() => {
    const { stages, seeds } = buildCenterpieceStages(count);
    const plane = new PlaneGeometry(1, 1);
    const geo = new InstancedBufferGeometry();
    geo.setIndex(plane.getIndex());
    geo.setAttribute("position", plane.getAttribute("position"));
    geo.setAttribute("uv", plane.getAttribute("uv"));
    for (let s = 0; s < STAGE_COUNT; s++) {
      geo.setAttribute(`aStage${s}`, new InstancedBufferAttribute(stages[s], 3));
    }
    geo.setAttribute("aSeed", new InstancedBufferAttribute(seeds, 1));
    geo.instanceCount = count;

    const mat = new ShaderMaterial({
      vertexShader: centerpieceVertexShader,
      fragmentShader: centerpieceFragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uStageProgress: { value: 0 },
        uFormTightness: { value: 0.55 },
        uDriftAmp: { value: 0.35 },
        uDriftFreq: { value: 0.4 },
        uDriftSpeed: { value: 0.06 },
        uOpacity: { value: 0.82 },
        uPalette: { value: PETAL_COLORS.map((c) => new Vector3(c[0], c[1], c[2])) },
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

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // stay framed at the camera's look-at point through the descent
    mesh.position.set(0, camera.position.y - 1.5, 0);

    material.uniforms.uTime.value = clock.elapsedTime;

    const forced = import.meta.env.DEV ? window.__forceStage : undefined;
    const target =
      typeof forced === "number" ? forced : stageProgressFromP(progress.current);
    easing.damp(material.uniforms.uStageProgress, "value", target, SCENE_DAMP, delta);

    const sp = material.uniforms.uStageProgress.value as number;
    material.uniforms.uFormTightness.value = formTightnessFromStage(sp);
    // dissolve the petals as the solid model reveals at the final beat
    material.uniforms.uOpacity.value = BASE_OPACITY * (1 - smoothstep(4.2, 4.9, sp));

    const beat = Math.min(Math.round(sp), STAGE_COUNT - 1);
    if (beat !== lastBeat.current) {
      lastBeat.current = beat;
      onBeat(beat);
    }

    if (import.meta.env.DEV) window.__morphDebug = { stage: sp, beat };
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} frustumCulled={false} />;
};

export default Centerpiece;
