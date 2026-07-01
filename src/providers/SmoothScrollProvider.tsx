import { createContext, useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SceneProgressContext } from "@/components/scene/useSceneProgress";

const LenisContext = createContext<Lenis | null>(null);

/** Access the active Lenis instance (null when smooth scroll is disabled). */
export const useLenis = (): Lenis | null => useContext(LenisContext);

declare global {
  interface Window {
    /** Dev-only Lenis handle for scripted scroll verification. */
    __lenis?: Lenis;
  }
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/** Current scroll progress 0..1. window.scrollY already reflects the Lenis-smoothed
 * position, so this reads the interpolated value for free. */
const computeProgress = (): number => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
};

/**
 * Wraps a page in Lenis smooth scrolling and publishes a single scroll-progress
 * ref (0..1) for the scene. Mount per-page (not globally) so other routes keep
 * native scroll. Under prefers-reduced-motion, Lenis is skipped and progress is
 * tracked from native scroll instead.
 */
const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (reducedMotion) {
      const onScroll = () => {
        progressRef.current = computeProgress();
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    if (import.meta.env.DEV) window.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      progressRef.current = computeProgress();
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      <SceneProgressContext.Provider value={progressRef}>
        {children}
      </SceneProgressContext.Provider>
    </LenisContext.Provider>
  );
};

export default SmoothScrollProvider;
