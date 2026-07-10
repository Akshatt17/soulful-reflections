import { createContext, useContext } from "react";
import type { MutableRefObject } from "react";

/**
 * Single source of scroll progress (0..1) for the scene. Published once per frame
 * by SmoothScrollProvider (from the Lenis-smoothed scroll position) and read —
 * outside the R3F Canvas — by ReflectionScene, which forwards the ref down as a
 * prop (React context does not cross the R3F reconciler boundary in fiber v8).
 */
export const SceneProgressContext = createContext<MutableRefObject<number>>({
  current: 0,
});

export const useSceneProgress = (): MutableRefObject<number> =>
  useContext(SceneProgressContext);
