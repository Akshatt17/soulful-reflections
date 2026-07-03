# Landing v2 — polish pass: lighten the model, green the petals, open up the page

## Context

The v2 "Descent & Metamorphosis" R3F landing is functionally complete, but three things spoil it:

1. **The site is slow.** The brain-flower GLB is an 18 MB uncompressed asset (`public/models/brain-flower.glb`) — the dominant load/decode cost.
2. **The 3D model looks dull and dark** on the site vs. the source viewer (which is a bright cream brain with pink flowers). Cause: the `<Canvas linear flat>` (LinearSRGBColorSpace + NoToneMapping) was chosen to color-match the water shader, so the PBR model gets no tone-mapping/environment and reads flat. Also the **gold petals + the "golden ball" in the early beats look dirty/muddy.**
3. **The DOM content sections are too big and too opaque** (`bg-card` at ~97%, full-width `max-w-7xl`, tall `py-20/28`, opaque footer). They cover the whole viewport, so the beautiful background scene is never visible, and they sit there static.

**Intended outcome:** a fast-loading page where compact, translucent, animated content floats over a bright, green-accented, always-visible 3D scene.

**Locked decisions (from the user):**
- **Pista green is NOT yet in the theme** → add a new bright `--pista-green`; use it for the petals and as a shared accent.
- **Do NOT touch the water.** Brighten the model only via added lights / environment (the water + particle `ShaderMaterial`s ignore lights, so this is water-safe).
- **Bold** content redesign: compact floating glass cards, much more transparency, narrower widths, and BOTH entrance and exit (scroll-away) animations. Keep the "alive but serene" ethos — slow easings (~0.8–1.4 s), soft motion.

## Execution model (READ FIRST)

- **Phase 0 is done by Claude (Opus) — the GLB compression. Not Fable 5.**
- **Phases 1–3 are implemented by Fable 5.** Fable 5 writes good code directly — do **not** run a review agent, QA agent, or per-task code check after each task; that burns tokens.
- **One** code review + check happens **once, at the very end**, after the whole page is finalized (Opus).
- **No test cases, no coverage work, no extra scaffolding.**
- If a **trivial** change needs verification mid-stream (e.g. "does it still render / does the color look right"), Fable 5 should **launch a Sonnet sub-agent** to check via the preview tools, not do a full review loop.
- Fable 5 should verify its own visual work in the browser preview (`preview_start` / `preview_screenshot` / `preview_snapshot`) as it goes.

---

## Phase 0 — Compress the GLB  *(OWNER: Claude / Opus — do this first)*

Shrink `public/models/brain-flower.glb` from 18 MB to a target **< 4 MB** with no visible quality loss, using `npx @gltf-transform/cli` (no local install; Node 25 available).

Pipeline (order matters):
1. `inspect` the file to see texture sizes / mesh stats.
2. `weld` + `dedup` + `prune` to drop redundant data.
3. **Resize textures** to a sane cap (start at 2048, drop to 1024 if still heavy) and convert to **WebP** (`etc1s`/webp) — three's `GLTFLoader` reads `EXT_texture_webp` natively, so **no loader changes needed**.
4. **Draco-compress geometry** (`draco`). drei's `useGLTF` enables the Draco decoder by default (CDN), so `CenterpieceModel.tsx` needs **no code change**.
   - Do NOT use KTX2 (needs a transcoder drei doesn't wire up by default) — WebP keeps the loader path untouched.
5. Overwrite `public/models/brain-flower.glb` (keep the same path/filename so nothing else changes).

Verify (Opus, myself): file size dropped; `preview_start` the site, scroll/force to the settle beat, screenshot to confirm the model still renders correctly and is the bottleneck relief. If WebP/Draco somehow needs a loader flag, adjust `CenterpieceModel.tsx`'s `useGLTF` call minimally.

---

## Phase 1 — Scene color: green petals + bright model  *(OWNER: Fable 5)*

**Files (change together):** `src/index.css`, `tailwind.config.ts`, `src/lib/scene/scene-config.ts`, `src/components/scene/SceneCanvas.tsx`, `src/components/scene/CenterpieceModel.tsx`.

**1a. Add the pista green to the theme**
- `src/index.css` `:root`: add `--pista-green: 83 52% 62%;` (bright pistachio; tune to taste).
- `tailwind.config.ts` `theme.extend.colors`: add `"pista-green": "hsl(var(--pista-green))"`.

**1b. Replace the gold petal / "golden ball"**
- `src/lib/scene/scene-config.ts` line ~30: change `PETAL_COLORS[3]` from `[0.79, 0.68, 0.41]` (gold) to a bright pista green **≈ `[0.67, 0.82, 0.42]`** (these palette values act as display/sRGB because the Canvas is `linear`, so match the magnitude of the other three). This one change flows automatically through `uPalette[3]` into BOTH `PetalField` and the `Centerpiece` particle system (which is what makes the early "golden ball" look dirty) — **no shader edits needed.** Tune the green vs. the existing rose/peach/baby-pink so it reads bright but harmonious.

**1c. Brighten the model WITHOUT touching the water**
The water + all particle systems use custom `ShaderMaterial`s that ignore scene lights and environment, so the following only affects the PBR GLB model — water stays byte-identical:
- In `src/components/scene/SceneCanvas.tsx`: add fill lighting around the existing `ambientLight`/`directionalLight` — e.g. a `hemisphereLight` (warm sky / cool ground) and/or a second fill light, and bump intensities until the model reads like the bright viewer render. Optionally add a lightweight image-based light for PBR richness (drei `<Environment>` with `environmentIntensity`) — **only if** it can be done without a heavy CDN HDRI download; prefer extra lights first to protect load time.
- In `src/components/scene/CenterpieceModel.tsx`: if lights alone aren't enough, nudge each collected material's `envMapIntensity` and/or a small `emissiveIntensity`/`emissive` toward its base color inside the existing `traverse` in `useMemo`. Do **not** change the Canvas `linear`/`flat` props (that would shift the water).

Verify: Fable 5 previews the settle beat and confirms the model is bright/natural and the water tint is unchanged. If unsure whether water shifted, spawn a **Sonnet** sub-agent to screenshot beat 0 (water only) before/after.

---

## Phase 2 — Bold content redesign: shrink, open up, animate  *(OWNER: Fable 5)*

Goal: the 3D scene is visible through/around the content at all times; sections are compact floating glass cards that animate in on approach and animate out (scroll-away) as they leave.

**Files (change together):**
- Shared: `src/lib/motion-variants.ts`, `src/components/landing/DepthSection.tsx`, `src/index.css` (glass utilities).
- Sections: `src/components/landing/LandingHero.tsx`, `src/components/landing/ReflectionOfWeek.tsx`, `src/components/landing/AboutFounder.tsx`, `src/components/AssessmentTools.tsx`, `src/components/LatestArticles.tsx`, `src/components/MicroReflections.tsx`, `src/components/Newsletter.tsx`, `src/components/Footer.tsx`.

**2a. Open up the layout (let the scene through)**
- Replace opaque `bg-card` (~97%) on cards with a translucent glass treatment (reuse/extend the existing `glass` / `glass-strong` utilities in `index.css`, but push opacity **lower** — target ~40–60% — with backdrop-blur so text stays legible over the moving scene).
- Narrow the containers: move sections off full `max-w-7xl` toward compact centered cards (e.g. `max-w-3xl`/`max-w-4xl`, and inner card `max-w-xl/2xl`), so the scene shows on the sides.
- Reduce vertical bulk: trim `section-padding` heights and `LandingHero`'s `min-h-[88vh]` so sections don't each fill the viewport.
- **Footer** (`Footer.tsx`): swap opaque `bg-primary` for a translucent glass footer so the scene isn't hard-blocked at the bottom (keep text contrast).

**2b. Motion (entrance + exit, framer-motion — already installed v12)**
- Extend `src/lib/motion-variants.ts` with `exit` states and/or a scroll-linked pattern (framer-motion `useScroll` + `useTransform`) so each section fades/scales/translates **in as it enters and out as it leaves**, keeping the scene visible in the gaps. Keep serene easings (~0.8–1.4 s, soft cubic).
- `DepthSection.tsx`: it already does `whileInView` entrance + a water ripple on enter — upgrade it to also drive the exit/scroll-away animation so every wrapped section gets both for free. Keep the existing `spawnRipple` call.
- `LandingHero.tsx`: it currently uses ad-hoc inline `initial/animate`. Fine to keep bespoke, but align its easings/durations with the shared serene feel.
- 21st.dev / online components may be used as **inspiration**, but implement with framer-motion + existing utilities — **do not add heavy new animation dependencies.**

Verify: Fable 5 previews scrolling top-to-bottom and confirms the scene is visible between/around every section and nothing pops or blocks it. Respect `prefers-reduced-motion` (page is already wrapped in `<MotionConfig reducedMotion="user">`).

---

## Phase 3 — Scene performance tuning  *(OWNER: Fable 5, only if still slow after Phase 0)*

**Files:** `src/lib/scene/scene-config.ts` (the `DESKTOP_TIER` / `MOBILE_TIER` counts), `src/components/scene/SceneCanvas.tsx`, `src/components/scene/PostFX.tsx`.

After the GLB is compressed (Phase 0), re-check smoothness in preview. If still heavy: lower `petals`/`motes`/`centerpiece` counts per tier, tighten `dprMax`, and/or soften PostFX (reduce bloom/DoF cost or disable DoF on lower-end). Keep the serene look — don't over-cut particles.

---

## Final step — single review pass  *(OWNER: Opus, once, at the very end)*

Only after the whole page is finalized and looks right in preview: run **one** code review + check across the changed files (color pipeline, redesign, perf). Fix anything it surfaces. This is the only review — no per-phase review/QA loops.

## End-to-end verification (final)
1. `preview_start`; hard-reload `/`.
2. Confirm the GLB loads fast and the model renders bright/natural at the settle beat; water tint unchanged at beat 0.
3. Confirm gold is gone — petals + early "ball" now read pista green.
4. Scroll top→bottom: content is compact, translucent, animates in and out; the 3D scene is visible around/behind every section including the footer.
5. Check `prefers-reduced-motion` still yields the calm fallback.
6. Confirm `/about` (and other routes) still don't pull the three.js chunk.
