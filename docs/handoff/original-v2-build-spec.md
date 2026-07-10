# Soulful Reflections — "Descent & Metamorphosis" Scroll Experience (v2 landing)

## Context

The v1 landing (theme tokens + modular sections + Lenis smooth scroll + ogl water + ripples + CSS reflections) is live and "okay," but the user — after sharing two reference Instagram reels — wants a clear step up: a **modern, advanced, scroll-scrubbed WebGL experience** where a **transforming centerpiece moves through space**, motion is **perpetual** (nothing fades in then sits still), and **scroll position scrubs** a continuous transformation that tells a story. Crucially this must stay **calm and serene** — the audience (a psychiatrist's patients, arriving from Instagram) may be anxious. "Alive but serene" is a hard constraint: slow easings (1.5–3s), low-frequency motion, soft bloom, no jump-cuts, generous reduced-motion fallback.

The reels (analyzed frame-by-frame) share a DNA: one persistent centerpiece that continuously morphs, a camera moving through space, constant ambient drift, and scroll-scrubbed control. We translate that into Soulful Reflections' soft botanical water world.

### Locked decisions
- **Metaphor:** blend of *The Descent* (camera sinks through the pond) + *The Metamorphosis* (dewdrop → ripple → bud → bloom → petals scatter → settle into the brain-flower → still water) = a journey of **growth/healing**. (Pure-orbit "Bloom" deferred.)
- **Botanicals:** stylized drifting **petals + light motes** for perpetual motion; photographic **brain-flower** as an anchored feature; the **centerpiece is particle-formed first** (no 3D asset dependency) — a generated GLTF can drop in later as an upgrade.
- **Tech:** migrate the background from `ogl` to **react-three-fiber** (true 3D scene, camera, particle morphing, GLTF, postprocessing). Keep theme, Lenis, GSAP, framer-motion.
- **Home page:** **moderate** trim — keep most current sections but lighter/smaller and woven into the scene; the 3D scene is the star.

## Tech stack

Add: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `postprocessing`, `maath`, `-D @types/three`. Remove `ogl` after Phase 1 verified. Keep `lenis`, `gsap`, `framer-motion`.

**Scroll-sync approach:** a fixed full-screen R3F `<Canvas>` behind the DOM (mirrors today's `WaterScene` pattern), driven by **one `scrollProgress` ref (0..1)** published from the existing Lenis instance — NOT drei `ScrollControls`/`r3f-scroll-rig` (they want to own the scroll and would fight our tuned Lenis, and we need real DOM content above the canvas). The ref is written once per frame, read inside `useFrame`, and damped (`maath/easing.damp`) so visuals lag input slightly = serene. GSAP ScrollTrigger is used only for discrete per-beat callbacks (fire settle ripples) — not the continuous value (avoid two scroll authorities). Reduced-motion path computes progress from native `scrollY` (same math already in `WaterScene.onScroll`).

## Scene architecture

New folders: `src/components/scene/` and `src/lib/scene/`.

Component tree (replaces `<WaterScene>` in `src/pages/Index.tsx`):
```
<ScrollProgressProvider>            // writes scrollProgress ref from Lenis
  <ReflectionScene>                 // fixed inset-0 z-0, lazy-loaded <Canvas>
    <CameraRig/>                    // scroll-driven descent + gentle continuous wobble
    <WaterSurface/>                 // 3D plane: depth tint + circular ripples (ported shader)
    <PetalField/>                   // instanced petal quads: curl-noise drift + gather/scatter
    <LightMotes/>                   // additive soft point sprites, slow upward drift
    <Centerpiece/>                  // particle-formed bloom now; GLTF swap later
    <PostFX/>                       // soft Bloom + DoF + Vignette + faint grain
  </ReflectionScene>
  <div className="relative z-10"> ...DOM glimpses... </div>
</ScrollProgressProvider>
```

Each frame, children map damped `p = scrollProgress.current` through `src/lib/scene/beats.ts`: CameraRig lerps `position.y` (sinks) + small `sin(t)` rotation; WaterSurface feeds `uScrollDepth`; PetalField/Centerpiece blend morph-target buffers via `smoothstep` over each beat's sub-range; PostFX bloom/DoF ride `p` (deeper = dreamier).

**Preserve the `useWater().spawnRipple(x, y, strength)` contract** ([src/components/water/useWater.ts](src/components/water/useWater.ts)) backed by the new water plane's uniforms, so [src/components/landing/DepthSection.tsx](src/components/landing/DepthSection.tsx) and cursor ripples need no changes. Port the ripple ring/band/fade math + per-ripple uniforms + cursor throttle + tab-hidden pause + WebGL-fail guard from [src/components/water/WaterScene.tsx](src/components/water/WaterScene.tsx) and [src/lib/water/ripple-shader.ts](src/lib/water/ripple-shader.ts).

## The spine — 6 beats (scroll 0..1, cross-faded so nothing snaps)

| # | Beat | p | Camera | Particles / morph | DOM glimpse |
|---|------|---|--------|-------------------|-------------|
| 0 | Surface / Dewdrop | 0–.15 | High, looking down, barely drifting | Luminous dewdrop; petals at rest; faint motes | Hero title + tagline + "Start Here" |
| 1 | Ripple / Sink | .15–.32 | Descends toward & through the plane | Dewdrop releases ripple; petals begin curl drift | One-line essence/founder → /about |
| 2 | Bud / Shallows | .32–.50 | Below surface, tint deepening | Petals **gather** into a closed bud | Compact reflection-of-the-week |
| 3 | Bloom | .50–.68 | Slow gentle orbit | Bud → open bloom (particle expansion) | Compact tools teaser → /tools |
| 4 | Petals scatter | .68–.84 | Pulls back, drifts deeper | Bloom releases; petals disperse on curl noise | Articles + media teasers → /articles, /media |
| 5 | Brain-flower / Still | .84–1 | Settles deep, motion calms to near-still | Petals **settle into the brain-flower**; water stills | Newsletter + Footer |

Emotionally resolves to **calm**, not climax — important for the audience.

## Particle / petal technique

Custom GLSL vertex-shader morph on one instanced petal-quad system (NOT a VFX library — full control of serene easings, zero bundle bloat). Per-particle `aSeed` for organic phase offsets; baked target buffers in `src/lib/scene/morph-targets.ts` (`rest`, `bud`, `bloom`, `scatter`, `settle`/brain-flower silhouette). Base position each frame = `mix(targetA, targetB, smoothstep(beat))` + an **always-on curl-noise drift** (low speed ~0.05, small amplitude) so the scene is alive even when scroll is idle. A `uFormTightness` uniform damps drift when "gathered" (crisp bud/bloom) and raises it during scatter. Petals = instanced quads with a soft petal alpha texture, billboarded with slight tilt; motes = cheap additive point sprites.

Perf budget (read from `src/lib/scene/scene-config.ts`, keyed off existing `src/hooks/use-mobile.tsx`): desktop ~1.5–2.5k petals / 400–600 motes / DPR≤1.75; mobile ~400–600 / 120–200 / DPR≤1.25 / DoF off; reduced-motion 0 (static). Use `drei/AdaptiveDpr` + `<Canvas performance={{min:0.5}}>`.

## Centerpiece (particle-formed first)

`src/components/scene/Centerpiece.tsx` renders the **particle-formed bloom** (dense small-radius instance of the morph system performing dewdrop→bud→bloom→brain-flower from baked buffers) — unblocks all phases without a 3D asset. Later, swap to drei `useGLTF` (draco) inside the same component: place decoder in `public/draco/`, model in `public/models/`, reference via `import.meta.env.BASE_URL` so it resolves under the GitHub Pages base (`/soulful-reflections/`). The photographic brain-flower image can serve as the textured anchor plane at beat 5 and/or as the silhouette sampled to generate the `settle` buffer.

## Home-page simplification (moderate)

Keep most sections but lighter/smaller, paced to the beats, each wrapped in a reveal wrapper that fires a settle ripple. Rebuild [src/pages/Index.tsx](src/pages/Index.tsx) glimpses:
1. Hero — `LandingHero` trimmed (drop the two blur-blob divs; the scene provides ambient light; keep `Reflected` title).
2. Founder/essence — `AboutFounder` slimmed (one serif line + name + "Read her story →" /about; portrait optional/smaller).
3. Reflection-of-week — `ReflectionOfWeek`, reduced padding.
4. Tools teaser — `AssessmentTools` trimmed to 2–3 compact chips → /tools.
5. Articles + media — `LatestArticles` reduced to 2 cards → /articles; one media line → /media.
6. Micro-reflections — keep but lighter (fewer items) ; then Newsletter (compact) + Footer.

Glass cards (`.glass-strong`) keep text legible over the scene; PostFX vignette + optional scrim help contrast (verify in a11y pass).

## Integration — keep vs replace

KEEP: theme tokens in [src/index.css](src/index.css) + [tailwind.config.ts](tailwind.config.ts) (also feed these HSL values into `scene-config.ts` so WebGL colors match the brand); `SmoothScrollProvider` (extend to publish the progress ref); GSAP; framer-motion (DOM only); `DepthSection` + `Reflected`; `useReducedMotion`.
REPLACE: `WaterScene.tsx` (ogl) → R3F `ReflectionScene` + `WaterSurface`; water becomes a 3D plane the camera descends through. Re-home `spawnRipple` onto the new water plane (signature unchanged).

## Performance + accessibility

Reduced-motion / no-WebGL → first-class static fallback: `.water-tint` gradient + photographic stills per beat, no canvas, no Lenis, DOM fully scrollable/legible. DPR caps + AdaptiveDpr; mobile-lite (lower counts, DoF off, possible CSS-only path under an FPS threshold). Pause rAF on `document.hidden` (port from current WaterScene). **Lazy-load the scene** (`React.lazy` + `Suspense`, imported only by `Index.tsx`) + `manualChunks` r3f vendor split so the ~600KB three/fiber/drei payload does NOT load on `/about`, `/tools`, etc. (HashRouter statically imports all routes today). Keep the 45ms pointer-ripple throttle.

## Dependencies + Vite

Add R3F stack (above); remove `ogl` after Phase 1. Shaders stay as TS template strings (`/* glsl */`, as today) — no `vite-plugin-glsl`. `vite.config.ts`: add `manualChunks` r3f vendor chunk; draco/models served from `public/` (base-aware). Import drei helpers individually (tree-shaking).

## File changes

NEW: `src/providers/ScrollProgressProvider.tsx` (or extend SmoothScrollProvider); `src/components/scene/{ReflectionScene,CameraRig,WaterSurface,PetalField,LightMotes,Centerpiece,PostFX}.tsx` + `useSceneProgress.ts`; `src/lib/scene/{beats,water-surface-shader,petal-shader,curl-noise.glsl,morph-targets,scene-config}.ts`; later `public/draco/*`, `public/models/centerpiece.glb`.
EDITED: `src/pages/Index.tsx` (swap scene + glimpse-ify); `src/providers/SmoothScrollProvider.tsx` (publish progress ref); `src/components/landing/{LandingHero,AboutFounder,ReflectionOfWeek}.tsx` (compact variants); `vite.config.ts` (manualChunks); `package.json`.
REMOVED (after Phase 1): `src/components/water/WaterScene.tsx`, `src/lib/water/ripple-shader.ts` (migrates to `lib/scene/water-surface-shader.ts`), `ogl`. Keep `useWater.ts` (re-homed) + `Reflected.tsx`.

## Build phasing

1. **R3F swap-in with water parity** — install stack; `ReflectionScene` + `WaterSurface` reproduce today's tint + ripples (cursor + settle) on a 3D plane; preserve `spawnRipple`; remove ogl. Visual ≈ current site, on R3F.
2. **Camera descent + scroll scrub** — `ScrollProgressProvider` (Lenis→ref) + `CameraRig`; camera sinks as `p` rises; depth tint tracks `p`.
3. **Ambient petals + motes + PostFX** — `PetalField` curl-noise perpetual drift + `LightMotes` + soft Bloom/Vignette/DoF. Now it's alive, never frantic.
4. **Morph stages / the spine** — `beats.ts` + `morph-targets.ts`; gather→bloom→scatter scrubbed by `p`; GSAP beat callbacks fire settle ripples; particle-formed Centerpiece.
5. **GLTF centerpiece (optional/deferred)** — drop-in `useGLTF` + draco; swap fallback → real model when asset exists. Non-blocking.
6. **Home trim + polish + mobile/a11y** — glimpse-ify `Index` (moderate); mobile-lite tier; reduced-motion static path; tab-hidden pause; lazy-chunk verification; contrast pass.

## Verification

`npm run dev` (port 8080, HashRouter `/#/`). Claude Preview MCP screenshots at p≈0,.2,.4,.6,.8,1 confirming each beat's camera + morph + correct glimpse; confirm perpetual motion when scroll idle. Chrome DevTools perf trace: 60fps desktop during auto-scroll, ≥30fps mobile-emulation floor, confirm DPR caps engage. Emulate `prefers-reduced-motion` → no `<canvas>`, static fallback, page legible/scrollable. Force WebGL failure → same fallback. A11y contrast on glass glimpses over the scene at each beat; keyboard nav of glimpse links; mobile tap targets. `npm run build` → confirm three/fiber/drei land in a separate chunk NOT fetched on `/#/about` (DevTools network). Smoke-test all existing routes still render (scene scoped to Index).

## Pending assets (non-blocking)
- Optional generated GLTF centerpiece (lotus/peony or 3D brain-flower) → `public/models/`.
- Brain-flower + logo image files → `src/assets/` (for the anchor plane + silhouette buffer).
- Still queued separately: `/tools` floral-glass remodel (from `soulful-sanctuary-07` repo), articles content + other functional work.
