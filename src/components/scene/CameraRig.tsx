import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import type { MutableRefObject } from "react";
import { CAMERA_START, CAMERA_END, SCENE_DAMP } from "@/lib/scene/scene-config";

declare global {
  interface Window {
    /** Dev-only scene readout for verification (camera depth + scroll progress). */
    __sceneDebug?: { cameraY: number; progress: number };
    /** Dev-only: snap all scroll damping instantly (for browser verification). */
    __sceneSnap?: boolean;
  }
}

/** Damping smooth-time, snappable to ~0 in DEV via window.__sceneSnap. */
export const sceneSmoothTime = (): number =>
  import.meta.env.DEV && window.__sceneSnap ? 0.0001 : SCENE_DAMP;

interface CameraRigProps {
  progress: MutableRefObject<number>;
}

/**
 * Sinks the camera through the pond as scroll progress rises, with a slow
 * perpetual wobble so the view is never perfectly static. Motion is damped
 * (maath/easing) so it lags the scroll input — serene, never abrupt.
 */
const CameraRig = ({ progress }: CameraRigProps) => {
  const camera = useThree((s) => s.camera);

  useFrame((_, delta) => {
    const p = progress.current;
    const t = performance.now() / 1000;

    const x = CAMERA_START[0] + Math.sin(t * 0.15) * 0.25;
    const y = CAMERA_START[1] + (CAMERA_END[1] - CAMERA_START[1]) * p;
    const z = CAMERA_START[2] + (CAMERA_END[2] - CAMERA_START[2]) * p;

    easing.damp3(camera.position, [x, y, z], sceneSmoothTime(), delta);
    camera.lookAt(0, camera.position.y - 1.5, 0);

    if (import.meta.env.DEV) {
      window.__sceneDebug = { cameraY: camera.position.y, progress: p };
    }
  });

  return null;
};

export default CameraRig;
