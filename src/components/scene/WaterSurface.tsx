import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { ShaderMaterial, Vector2, Vector3 } from "three";
import {
  waterVertexShader,
  waterFragmentShader,
} from "@/lib/scene/water-surface-shader";
import { SURFACE_TINT, DEEP_TINT, SCENE_DAMP } from "@/lib/scene/scene-config";

interface WaterSurfaceProps {
  /** Flat ripple buffer, 4 floats per slot (x, y, startTime, strength). */
  ripples: MutableRefObject<Float32Array>;
  /** Scroll progress 0..1, deepens the tint as the camera descends. */
  progress: MutableRefObject<number>;
  /** Shared clock origin (ms) so ripple ages match spawnRipple. */
  startTime: MutableRefObject<number>;
}

/**
 * The water plane: a clip-space quad running the ported ripple shader. Camera-
 * independent for now (Phase 1 parity); the CameraRig descent lands in Phase 2.
 */
const WaterSurface = ({ ripples, progress, startTime }: WaterSurfaceProps) => {
  const matRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
      uScrollDepth: { value: 0 },
      uTintSurface: { value: new Vector3(...SURFACE_TINT) },
      uTintDeep: { value: new Vector3(...DEEP_TINT) },
      uRipples: { value: ripples.current },
    }),
    [ripples],
  );

  useFrame(({ size }, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = (performance.now() - startTime.current) / 1000;
    easing.damp(m.uniforms.uScrollDepth, "value", progress.current, SCENE_DAMP, delta);
    m.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

export default WaterSurface;
