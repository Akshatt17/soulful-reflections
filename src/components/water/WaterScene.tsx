import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { WaterContext, type WaterApi } from "@/components/water/useWater";
import {
  RIPPLE_COUNT,
  waterVertexShader,
  waterFragmentShader,
} from "@/lib/water/ripple-shader";

const SURFACE: [number, number, number] = [0.949, 0.922, 0.867]; // cream
const DEEP: [number, number, number] = [0.86, 0.74, 0.75]; // soft dusty rose

interface WaterSceneProps {
  children: ReactNode;
}

/**
 * One persistent water surface behind the whole page. Floating content scrolls
 * over it; ripples spread from the cursor and from each section as it settles.
 * Falls back to a static gradient under reduced-motion or when WebGL is absent.
 */
const WaterScene = ({ children }: WaterSceneProps) => {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const slots = useRef<Float32Array[]>(
    Array.from({ length: RIPPLE_COUNT }, () => new Float32Array(4)),
  );
  const writeIndex = useRef(0);
  const scrollDepth = useRef(0);
  const startTime = useRef(performance.now());

  const api = useMemo<WaterApi>(
    () => ({
      spawnRipple: (x, y, strength = 0.6) => {
        const s = slots.current[writeIndex.current];
        const now = (performance.now() - startTime.current) / 1000;
        s[0] = x;
        s[1] = y;
        s[2] = now;
        s[3] = strength;
        writeIndex.current = (writeIndex.current + 1) % RIPPLE_COUNT;
      },
    }),
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (reducedMotion || !canvas) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        canvas,
        alpha: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      });
    } catch {
      return; // no WebGL → static fallback gradient stays visible
    }

    const gl = renderer.gl;
    const program = new Program(gl, {
      vertex: waterVertexShader,
      fragment: waterFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uScrollDepth: { value: 0 },
        uTintSurface: { value: SURFACE },
        uTintDeep: { value: DEEP },
        uR0: { value: slots.current[0] },
        uR1: { value: slots.current[1] },
        uR2: { value: slots.current[2] },
        uR3: { value: slots.current[3] },
        uR4: { value: slots.current[4] },
        uR5: { value: slots.current[5] },
        uR6: { value: slots.current[6] },
        uR7: { value: slots.current[7] },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };
    resize();

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollDepth.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    onScroll();

    let lastMove = 0;
    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMove < 45) return;
      lastMove = now;
      api.spawnRipple(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight, 0.7);
    };

    let rafId = 0;
    const loop = () => {
      program.uniforms.uTime.value = (performance.now() - startTime.current) / 1000;
      program.uniforms.uScrollDepth.value = scrollDepth.current;
      renderer.render({ scene: mesh });
      rafId = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!rafId) rafId = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, [reducedMotion, api]);

  return (
    <WaterContext.Provider value={api}>
      <div className="fixed inset-0 z-0 water-tint pointer-events-none" aria-hidden="true">
        {!reducedMotion && <canvas ref={canvasRef} className="h-full w-full" />}
      </div>
      {children}
    </WaterContext.Provider>
  );
};

export default WaterScene;
