import { createContext, useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LenisContext = createContext<Lenis | null>(null);

/** Access the active Lenis instance (null when smooth scroll is disabled). */
export const useLenis = (): Lenis | null => useContext(LenisContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Wraps a page in Lenis smooth scrolling. Mount per-page (not globally) so other
 * routes keep native scroll. Disabled under prefers-reduced-motion.
 */
const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
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
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScrollProvider;
