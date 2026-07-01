import { Canvas } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import WaterSurface from "@/components/scene/WaterSurface";
import CameraRig from "@/components/scene/CameraRig";
import { CAMERA_START } from "@/lib/scene/scene-config";

interface SceneCanvasProps {
  ripples: MutableRefObject<Float32Array>;
  progress: MutableRefObject<number>;
  startTime: MutableRefObject<number>;
  /** Pause the render loop when the tab is hidden. */
  visible: boolean;
}

/**
 * The R3F <Canvas> layer, lazy-loaded so three/fiber stay out of the eager bundle
 * (and off other routes). `linear flat` keeps colour output matching the old ogl
 * pass for exact water parity. CameraRig sinks the camera as scroll progresses.
 */
const SceneCanvas = ({ ripples, progress, startTime, visible }: SceneCanvasProps) => (
  <Canvas
    className="h-full w-full"
    frameloop={visible ? "always" : "never"}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: false }}
    camera={{ position: [...CAMERA_START], fov: 50 }}
    performance={{ min: 0.5 }}
    linear
    flat
  >
    <CameraRig progress={progress} />
    <WaterSurface ripples={ripples} progress={progress} startTime={startTime} />
  </Canvas>
);

export default SceneCanvas;
