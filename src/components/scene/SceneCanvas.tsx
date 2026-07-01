import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import type { MutableRefObject } from "react";
import WaterSurface from "@/components/scene/WaterSurface";
import CameraRig from "@/components/scene/CameraRig";
import PetalField from "@/components/scene/PetalField";
import LightMotes from "@/components/scene/LightMotes";
import PostFX from "@/components/scene/PostFX";
import {
  CAMERA_START,
  DESKTOP_TIER,
  MOBILE_TIER,
} from "@/lib/scene/scene-config";

interface SceneCanvasProps {
  ripples: MutableRefObject<Float32Array>;
  progress: MutableRefObject<number>;
  startTime: MutableRefObject<number>;
  /** Pause the render loop when the tab is hidden. */
  visible: boolean;
  /** Mobile viewport → lighter tier (fewer particles, DoF off, lower DPR cap). */
  mobile: boolean;
}

/**
 * The R3F <Canvas> layer, lazy-loaded so three/fiber stay out of the eager bundle
 * (and off other routes). `linear flat` keeps colour output matching the old ogl
 * pass for the water. CameraRig sinks the camera as scroll progresses; PetalField
 * and LightMotes drift perpetually; PostFX adds soft bloom / vignette / DoF.
 */
const SceneCanvas = ({
  ripples,
  progress,
  startTime,
  visible,
  mobile,
}: SceneCanvasProps) => {
  const tier = mobile ? MOBILE_TIER : DESKTOP_TIER;

  return (
    <Canvas
      className="h-full w-full"
      frameloop={visible ? "always" : "never"}
      dpr={[1, tier.dprMax]}
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [...CAMERA_START], fov: 50 }}
      performance={{ min: 0.5 }}
      linear
      flat
    >
      <AdaptiveDpr pixelated />
      <CameraRig progress={progress} />
      <WaterSurface ripples={ripples} progress={progress} startTime={startTime} />
      <PetalField count={tier.petals} />
      <LightMotes count={tier.motes} />
      <PostFX dof={tier.dof} />
    </Canvas>
  );
};

export default SceneCanvas;
