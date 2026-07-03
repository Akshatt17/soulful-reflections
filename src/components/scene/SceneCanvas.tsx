import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { Suspense } from "react";
import type { MutableRefObject } from "react";
import WaterSurface from "@/components/scene/WaterSurface";
import CameraRig from "@/components/scene/CameraRig";
import PetalField from "@/components/scene/PetalField";
import LightMotes from "@/components/scene/LightMotes";
import Centerpiece from "@/components/scene/Centerpiece";
import CenterpieceModel from "@/components/scene/CenterpieceModel";
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
  /** Fired when the centerpiece morph settles into a new beat. */
  onBeat: (beat: number) => void;
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
  onBeat,
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
      {/* Lighting only reaches the PBR brain-flower model — the water + particle
          systems are custom ShaderMaterials that ignore lights, so brightening
          here never shifts the water. Warm key + cool fill + hemisphere wash keep
          the model reading like its source render (cream brain, rose flowers). */}
      <ambientLight intensity={2.4} />
      <hemisphereLight color="#fff1e6" groundColor="#c7b8a8" intensity={1.6} />
      <directionalLight position={[3, 5, 4]} intensity={2.6} />
      <directionalLight position={[-4, 1, -3]} intensity={1.3} />
      <CameraRig progress={progress} />
      <WaterSurface ripples={ripples} progress={progress} startTime={startTime} />
      <PetalField count={tier.petals} />
      <LightMotes count={tier.motes} />
      <Centerpiece count={tier.centerpiece} progress={progress} onBeat={onBeat} />
      <Suspense fallback={null}>
        <CenterpieceModel progress={progress} />
      </Suspense>
      <PostFX dof={tier.dof} />
    </Canvas>
  );
};

export default SceneCanvas;
