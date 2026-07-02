# Soulful Reflections — Redesign Plan

## Context

The site is a Vite + React + TS + Tailwind + shadcn/ui site for a psychiatrist (Dr. Niharika). Most traffic comes from an established "Soulful Reflections" Instagram page, so the audience arrives expecting something visually beautiful and polished — a timid site would undersell her brand.

**Why we're redesigning:** the previous redesign attempt failed because (1) it "looked generic/template-y", (2) the homepage (`src/pages/Index.tsx`, 882 lines) hardcoded its own espresso/terracotta palette inline, bypassing the design tokens — so it clashed with the rest of the site, and (3) the page reads as separate sections stacked on top of one another.

**The concept (the soul of it):** "Soulful Reflections" → a still pond → you look in and see yourself reflected → scrolling = looking deeper, from the calm surface down into the water. The landing becomes a single continuous **scrollytelling "descent into reflection"**, not stacked sections. Content components float above a living water surface, cast soft reflections, and send concentric **circular ripples** as they settle.

**Confirmed decisions:**
- Aesthetic: warm, welcoming, cosy, soft — the confirmed "peony" palette. Rich/heavy graphics are wanted (not minimal).
- Primary goal: balanced (booking + education + personal brand).
- Build approach: clean theme + modular rebuild (single source of truth for tokens).
- Tech: GSAP + ScrollTrigger (scroll choreography) + Lenis (smooth scroll) + a light WebGL water layer (`ogl`). `framer-motion` stays for micro-interactions.
- Honor `prefers-reduced-motion` with a calm static fallback; stay performant on mobile.

**Scope of THIS plan:** theme/design system + the scrollytelling water landing only.
**Deferred to a later phase:** `/tools` page remodel (floral-brain glassmorphism, using the confirmed screenshot/section — needs the separate repo + image asset), articles content updates, and other functional work.

---

## Part A — Theme system (single source of truth)

Edit `src/index.css` (`:root` + `.dark`) and add a few things to `tailwind.config.ts`. The peony palette already exists as vars (`--olive-petal`, `--golden-clover`, `--artic-daisy`, `--rose-blush`, `--peach-blossom`) but the live theme is still burgundy — we promote the palette to the real semantic tokens.

**Add a deep anchor tone** (all five peony tones are soft mid-tones and fail AA for body text):
```
--deep-plum: 345 30% 18%;       /* headings + body text */
--deep-plum-soft: 345 22% 32%;  /* secondary/muted text, large text only */
```

**Remap `:root` semantic tokens (the water world):**
```
--background: 22 30% 90%;     /* artic-daisy, the pond surface */
--foreground: 345 30% 18%;    /* deep-plum */
--card: 22 30% 96%;           --card-foreground: 345 30% 18%;
--popover: 22 30% 97%;        --popover-foreground: 345 30% 18%;
--primary: 90 18% 52%;        /* olive-petal */   --primary-foreground: 22 30% 96%;
--secondary: 14 35% 73%;      /* rose-blush */     --secondary-foreground: 345 30% 18%;
--muted: 22 30% 87%;          --muted-foreground: 345 22% 32%;
--accent: 355 25% 63%;        /* peach-blossom */  --accent-foreground: 22 30% 96%;
--border: 14 25% 80%;  --input: 14 25% 80%;  --ring: 90 18% 52%;
```
- Keep `--golden-clover` as a tertiary "sun on water" accent.
- Re-tint shadows from burgundy → plum: replace `hsl(353 59% 30% / …)` with `hsl(345 30% 18% / …)`.
- Keep legacy `--burgundy/--blush/--sage/--beige/--cream` vars in place (other routes use `bg-cream` etc.) — do NOT delete; migrating every page is out of scope.
- `.dark`: keep a coherent deep-plum dark block so shadcn components stay sane, but the landing renders light regardless. No theme toggle in scope.

**New utility classes** (`src/index.css`):
- `.glass` / `.glass-strong` — glassmorphism cards (`backdrop-filter: blur(16px) saturate(140%)`, translucent `--card`, soft border). `glass-strong` keeps AA for text-heavy cards.
- `.water-tint` — static gradient (artic-daisy → rose-blush → olive-petal) used as the reduced-motion / no-WebGL fallback.
- `.depth-shadow` — large diffuse shadow to sell "floating above water."
- `.text-anchor` / `.text-anchor-soft` — deep-plum text helpers.

**`tailwind.config.ts`:** add `deep-plum`/`deep-plum-soft` colors; add `reflection-wobble` and `surface-drift` keyframes + animations.

---

## Part B — Landing architecture

### Narrative beats ("depths" of the descent)
One continuous water column; the persistent water layer tints surface → shallows → deep driven by scroll progress.

| Depth | Beat | Reuses |
|---|---|---|
| 0 Surface | Hero: "Look into the pond" — title + reflected title beneath waterline, CTA | new copy |
| 1 First ripple | Reflection of the Week (quote drops + ripples) | `src/assets/Reflection_of_week` |
| 2 Shallows | About / The Founder (portrait reflected) | `dr-niharika-bhaskar.jpg` |
| 3 Drifting | Reflective Reads (3 latest articles, floating cards) | `LatestArticles` / `articles.json` |
| 4 Looking deeper | Self-assessment teaser → CTA to `/tools` | `AssessmentTools` / `tools.json` |
| 5 Micro-reflections | image/audio/video gallery | `MicroReflections` / `imageReflections.json` |
| 6 The still deep | Newsletter + support/contact | `Newsletter` |
| 7 Seabed | Footer (links, crisis line) | `Footer` |

Header = fixed translucent `.glass` overlay (restyle existing `Header.tsx`).

### Folder structure (new)
```
src/providers/SmoothScrollProvider.tsx     # Lenis + GSAP ScrollTrigger wiring
src/hooks/useReducedMotion.ts
src/hooks/useScrollDepth.ts                 # 0..1 scroll progress (ref, not state)
src/components/water/WaterScene.tsx         # ONE fixed canvas behind everything
src/components/water/RippleField.tsx        # ripple state manager
src/components/water/Reflected.tsx          # reusable CSS-reflection wrapper
src/components/water/useWater.ts            # context: spawnRipple()
src/lib/water/ripple-shader.ts             # GLSL as TS template strings
src/lib/water/reflection.ts
src/components/landing/DepthSection.tsx     # section shell: reveal + fire ripple on enter
src/components/landing/{LandingHero,ReflectionOfWeek,AboutFounder,ReflectiveReads,AssessmentTeaser,MicroReflectionsDepth,NewsletterSupport}.tsx
```

### How "one continuous world" is achieved
1. `WaterScene` = single `position: fixed; inset:0; z-0; pointer-events:none` canvas spanning the viewport; never unmounts, never per-section.
2. All `DepthSection`s are transparent at `z-10` → same water shows through the whole scroll.
3. Scroll progress drives the canvas tint uniform → water deepens as you descend (continuity, no section seams).
4. Per-section + cursor ripples draw into the same canvas.
5. Lenis smooth scroll removes the "jump between sections" feel.

### Key components
- **`Reflected`** — renders an `aria-hidden` flipped (`scaleY(-1)`), blurred, gradient-masked, gently-wobbling duplicate beneath its child. Pure CSS, no WebGL DOM capture. Used on hero title, founder portrait, key cards. Auto-disabled under reduced-motion.
- **`DepthSection`** — full-width transparent shell; on ScrollTrigger `onEnter` reveals children (framer `whileInView` via `src/lib/motion-variants.ts`) and calls `spawnRipple()` at its settle point.
- Section components are presentational, consume semantic tokens only (`bg-card`, `text-foreground`, `.glass`), and internally reuse existing `LatestArticles`/`AssessmentTools`/`MicroReflections`/`Newsletter` (restyled to tokens).

---

## Part C — Water / ripple technical approach

- **WebGL surface shader via `ogl` (~10KB)** for the water + concentric ripples — NOT canvas-2D (too slow full-viewport) and NOT three.js/r3f (too heavy for one quad). One full-screen quad, uniforms: `uTime`, `uScrollDepth`, `uRipples[N]` (center, startTime, strength), `uTintShallow`, `uTintDeep`, `uPointer`.
- **Circular ripples** (the hero motif): `DepthSection` fires on scroll-enter; throttled `pointermove` spawns small cursor-trail ripples (~30–40ms, cap N≈12 ring buffer); mobile `pointerdown` fires one stronger ripple (no continuous trail).
- **Reflections** = the `Reflected` CSS component (independent of canvas, always works).
- **Reduced-motion / fallback (required):** if reduced-motion OR no WebGL OR low-power mobile → don't mount the WebGL loop; render static `.water-tint` gradient; disable reflection wobble; reveals become instant opacity-only; disable Lenis (native scroll).
- **Perf guardrails:** cap DPR ~1.5 on mobile; pause rAF on `visibilitychange`; single program/draw call per frame.

---

## Part D — Scroll choreography (GSAP + Lenis in a Vite SPA)

- `SmoothScrollProvider` mounted **inside the landing page only** (not global in `App.tsx`). Wire Lenis to GSAP ticker so ScrollTrigger + Lenis share one rAF; `gsap.ticker.lagSmoothing(0)`.
- Use ScrollTrigger for **reveal triggers + the scroll-depth scrub only** — never hijack scroll position. Default: no pinning (avoids scroll-jacking); optionally pin only a short hero beat with a clear scroll-out.
- Each `DepthSection` creates its ScrollTrigger in `useLayoutEffect` with `gsap.context()` scoped to its ref; `ctx.revert()` on cleanup (StrictMode-safe).
- **Cleanup on unmount (critical w/ HashRouter):** `lenis.destroy()`, remove ticker fn, `ScrollTrigger.getAll().forEach(t => t.kill())`.
- `ScrollTrigger.refresh()` after fonts load + on debounced resize (Playfair shifts layout).

---

## Part E — Dependencies

```
npm i gsap lenis ogl
```
- `gsap` (ScrollTrigger bundled), `lenis` (current package name), `ogl` (minimal WebGL; ships types).
- Lazy-load the landing via `React.lazy` + `Suspense` so GSAP/Lenis/ogl are a separate chunk not loaded on other routes.
- No special Vite config; `base` already handled. Shaders as TS template strings (no `vite-plugin-glsl`).

---

## Part F — File changes & phasing

**New files:** see folder structure in Part B.
**Edited:** `src/index.css` (token remap + utilities + keyframes), `tailwind.config.ts` (colors + keyframes), `src/pages/Index.tsx` (REPLACE 882-line monolith with thin composition: `SmoothScrollProvider > WaterScene + Header + DepthSection(...) + Footer`), `src/components/Header.tsx` (→ `.glass` fixed overlay), light token cleanup on `Footer`/`Newsletter`/`LatestArticles`/`AssessmentTools`/`MicroReflections`. `src/App.tsx` unchanged (`/old-landing` stays); optionally lazy-import `Index`.

**Build phasing:**
1. **[DONE] Tokens first** — `index.css` + `tailwind.config.ts` remapped to the logo-derived palette (cream base, dusty-rose primary, sage secondary, deep-plum text; +sage/baby-pink/forest/berry/gold tints). Verified across routes.
2. **[DONE] Scaffold** — `Index.tsx` rewritten as a modular composition: `LandingHero`, `ReflectionOfWeek`, `AboutFounder` (new, in `src/components/landing/`) + reused `AssessmentTools`/`LatestArticles`/`MicroReflections`/`Newsletter`, each wrapped in `DepthSection` (framer `whileInView` reveal). Alternating baby-pink/sage depths. Verified in browser.
3. **[DONE] Smooth scroll** — `lenis` installed; `SmoothScrollProvider` (per-page, reduced-motion gated, rAF loop, cleanup on unmount) wraps `Index.tsx`; `useReducedMotion` hook added; `data-lenis-prevent` on the micro-reflections inner scroll list. GSAP deferred to Phase 4. (Note: `useScrollDepth` + reactive Lenis context to be added in Phase 4 when `WaterScene` consumes them.)
4. **[DONE] Water layer** — `ogl` + `gsap` installed. `WaterScene` (fixed WebGL canvas behind all content via `ogl`, reduced-motion/no-WebGL fallback to static `.water-tint`, DPR cap, tab-hidden pause, context-loss cleanup) + `useWater` ripple context + `ripple-shader.ts` (per-ripple uniforms uR0..uR7 — ogl `vec4[]` arrays warn/don't bind, so unrolled). Circular ripples fire on cursor (throttled pointermove) + on each `DepthSection` enter. Scroll-depth deepens the water tint. All section backgrounds made transparent so the one water surface shows through; cards stay opaque/glass for legibility. Verified in browser.
5. **[DONE] Reflections + polish** — `Reflected` (flip+blur+mask+wobble, reduced-motion gated, absolute = no layout shift) on hero title + founder portrait; softened ripple birth (smoothstep onset 0.12→0.55, per "too strong at start" feedback); glass header (translucent + deep-plum text; updated `Header`/`NavLink`); hero "reflection pool" spacing; fluid `clamp()` hero title sizing (fixed mobile overflow). Verified desktop + mobile (no overflow), no console errors. Reduced-motion path gated in code (toggle OS setting to confirm live).

**Palette note:** the literal palette-card tones were base tones only. Real brand palette is derived from the logo + brain image: cream parchment, dusty-rose/mauve (primary, matches logo lettering), sage/olive green (leaves), burgundy/berry + soft pink + muted gold accents. Avoid monotone — green and rose share the stage over cream.

**Asset TODO:** add `brain-flower` image + `logo` to `src/assets/` (grab brain from `soulful-sanctuary-07` repo or user provides files). Self-assessment section for `/tools` comes from `soulful-sanctuary-07`.

---

## Part G — Verification

- **Run:** `npm run dev` → `http://localhost:8080/#/` (HashRouter). Use Claude Preview / Chrome DevTools MCP to load + screenshot. Compare `/#/old-landing` still works on the new palette.
- **Theme:** confirm no burgundy/espresso remains anywhere; `bg-primary` is olive, text is deep-plum; run a11y/contrast (Lighthouse / a11y-debugging skill) for AA on body text over glass/tones.
- **Performance:** DevTools `performance_start_trace` while scrolling → 60fps, no long tasks from rAF, bounded GPU memory; `lighthouse_audit` confirms the water chunk is lazy (not on other routes).
- **Reduced-motion:** emulate `prefers-reduced-motion` → WebGL loop does NOT mount, static `.water-tint` shows, reflections stop, reveals instant, native scroll. Check mobile viewport DPR cap + tap ripples.
- **Cleanup:** navigate `/` → `/about` → `/`; confirm no duplicate ScrollTriggers / rAF leak (`ScrollTrigger.getAll().length` resets), no memory growth.
- **Console/network:** check for shader-compile errors + lazy-chunk 404s under production `base`.

---

## Pending input for later phases
- `/tools` remodel: the separate repo URL/path with the liked self-assessment section + the floral-brain image asset.
- The list of "other functional work" + which articles need updating.

---

# v2 — "Descent & Metamorphosis" scroll experience

The v1 landing above is superseded by a scroll-scrubbed react-three-fiber scene (spec: `~/.claude/plans/i-made-this-site-valiant-hummingbird.md`). The `ogl` water background was replaced by a full R3F scene the camera descends through, with a particle-formed centerpiece that morphs across 6 beats. Built on `redesign/soulful-landing` (v1 checkpoint `ef4874a`). Architecture details live in the memory note `v2-scene-architecture`.

**Phase status:**
1. **[DONE]** R3F swap-in at water parity (ReflectionScene + SceneCanvas + WaterSurface; ported ripple shader; `spawnRipple` preserved; ogl removed).
2. **[DONE]** Camera descent + scroll scrub (SmoothScrollProvider publishes one progress ref; CameraRig damped descent; depth tint tracks p).
3. **[DONE]** Ambient PetalField (curl-noise drift) + LightMotes + PostFX (soft Bloom/Vignette/DoF, DoF off on mobile); perf tiers via `useIsMobile` + AdaptiveDpr.
4. **[DONE]** Morph spine (beats + morph-targets + Centerpiece; dewdrop→release→bud→bloom→scatter→settle; beat-crossing settle ripples via the single progress ref).
5. **[DEFERRED]** GLTF centerpiece — swap a real `.glb` into `Centerpiece.tsx` (base-aware via `import.meta.env.BASE_URL`, draco in `public/draco/`, model in `public/models/`). Waiting on the asset.
6. **[DONE]** Home trim + a11y/mobile polish — hero blur-blobs removed; `MotionConfig reducedMotion="user"`; reduced-motion static `.water-tint` fallback verified (no canvas, legible, native scroll); mobile tier verified; lazy chunk fixed + verified (three not fetched on `/about`, only on `/`); all routes smoke-tested.

**Key fix (Phase 6):** array-form `manualChunks` pulled react-dom into the r3f vendor chunk, forcing the ~1MB three payload onto every route. Removed manualChunks — Vite auto-splits three into the async SceneCanvas chunk, loaded only when the scene mounts.

**Not done / next:** Phase 5 GLB (asset pending — user to provide); deeper content trim of shared sections (kept intact to avoid touching `/old-landing`); then the still-queued `/tools` floral-glass remodel + articles.
