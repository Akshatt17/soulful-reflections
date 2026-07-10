import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";
import { WaterContext, type WaterApi } from "@/components/water/useWater";
import { useSceneProgress } from "@/components/scene/useSceneProgress";
import { RIPPLE_COUNT } from "@/lib/scene/scene-config";
import { isWebGLAvailable } from "@/lib/scene/webgl";

const SceneCanvas = lazy(() => import("@/components/scene/SceneCanvas"));

interface ReflectionSceneProps {
  children: ReactNode;
  /**
   * "descent" — the landing experience: scroll-scrubbed camera descent with the
   * morphing petal centerpiece. "ambient" — every other page: the same water,
   * petals, motes and glow, resting at the surface with no centre object.
   */
  variant: "descent" | "ambient";
}

/**
 * Persistent water background behind the page. Owns the ripple ring buffer and the
 * `spawnRipple` contract (unchanged for DepthSection + cursor ripples), lazy-loads
 * the R3F canvas, and falls back to the static `.water-tint` gradient under
 * reduced-motion or when WebGL is unavailable. Deliberately imports no three code
 * so the 3D bundle stays in the lazy SceneCanvas chunk.
 */
const ReflectionScene = ({ children, variant }: ReflectionSceneProps) => {
  const reducedMotion = useReducedMotion();
  const mobile = useIsMobile();
  const [webglOk] = useState(
    () => typeof window !== "undefined" && isWebGLAvailable(),
  );
  const enabled = !reducedMotion && webglOk;

  const progress = useSceneProgress();

  // 4 floats per ripple: (x, y, startTime, strength).
  const ripples = useRef<Float32Array>(new Float32Array(RIPPLE_COUNT * 4));
  const writeIndex = useRef(0);
  const startTime = useRef(0);
  const [visible, setVisible] = useState(true);

  const api = useMemo<WaterApi>(
    () => ({
      spawnRipple: (x, y, strength = 0.6) => {
        const base = writeIndex.current * 4;
        const buf = ripples.current;
        buf[base] = x;
        buf[base + 1] = y;
        buf[base + 2] = (performance.now() - startTime.current) / 1000;
        buf[base + 3] = strength;
        writeIndex.current = (writeIndex.current + 1) % RIPPLE_COUNT;
      },
    }),
    [],
  );

  // Each settled beat sends a ripple out from the centerpiece at screen centre.
  const handleBeat = useCallback(() => {
    api.spawnRipple(0.5, 0.5, 1.4);
  }, [api]);

  useEffect(() => {
    startTime.current = performance.now();
    if (!enabled) return;

    let lastMove = 0;
    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMove < 45) return;
      lastMove = now;
      api.spawnRipple(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
        0.7,
      );
    };

    const onVisibility = () => setVisible(!document.hidden);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled, api]);

  return (
    <WaterContext.Provider value={api}>
      <div
        className="fixed inset-0 z-0 water-tint pointer-events-none"
        aria-hidden="true"
      >
        {enabled && (
          <Suspense fallback={null}>
            <SceneCanvas
              ripples={ripples}
              progress={progress}
              startTime={startTime}
              visible={visible}
              mobile={mobile}
              centerpiece={variant === "descent"}
              onBeat={handleBeat}
            />
          </Suspense>
        )}
      </div>
      {children}
    </WaterContext.Provider>
  );
};

export default ReflectionScene;
