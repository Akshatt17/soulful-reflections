import { Canvas } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import WaterSurface from "@/components/scene/WaterSurface";

interface SceneCanvasProps {
  ripples: MutableRefObject<Float32Array>;
  scrollDepth: MutableRefObject<number>;
  startTime: MutableRefObject<number>;
  /** Pause the render loop when the tab is hidden. */
  visible: boolean;
}

/**
 * The R3F <Canvas> layer, lazy-loaded so three/fiber stay out of the eager bundle
 * (and off other routes). `linear flat` keeps colour output matching the old ogl
 * pass for exact water parity.
 */
const SceneCanvas = ({ ripples, scrollDepth, startTime, visible }: SceneCanvasProps) => (
  <Canvas
    className="h-full w-full"
    frameloop={visible ? "always" : "never"}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: false }}
    performance={{ min: 0.5 }}
    linear
    flat
  >
    <WaterSurface ripples={ripples} scrollDepth={scrollDepth} startTime={startTime} />
  </Canvas>
);

export default SceneCanvas;
