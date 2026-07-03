# CLAUDE.md — Soulful Reflections

Context for any Claude working in this repo. For deep detail read [`docs/handoff/`](docs/handoff/README.md): the scene architecture, the active plan, and ready-to-paste prompts for the next phase.

## What this is
Website for **Dr. Niharika**, a psychiatrist, branded "Soulful Reflections". Most visitors come from her established Instagram, so the site is meant to be **visually rich, polished, and calming — deliberately NOT minimal**. The audience includes anxious patients, so motion must stay **"alive but serene"**: slow easings (~1.5–3s), low-frequency movement, soft glow.

Stack: **Vite + React 18.3 + TypeScript + Tailwind + shadcn**, `HashRouter` (routes are `/#/...`).

## Commands
- `npm run dev` — dev server on **port 8080**
- `npm run build` — production build (Vite)
- `npm run lint` — ESLint

## The landing page ("Descent & Metamorphosis")
`src/pages/Index.tsx` renders DOM content over a **full-screen, scroll-scrubbed react-three-fiber "pond descent" scene** fixed behind everything (`z-0`; content is `z-10`). A single normalized scroll-progress value (0→1) drives a camera descending into a pond; **pista-green + rose petals** and warm light motes drift perpetually; soft bloom / vignette / DoF post-processing; and a **brain-flower GLB** appears as the descent settles.

### Scene stack (react-three-fiber v8 — NOT v9, which needs React 19)
- `src/components/scene/ReflectionScene.tsx` — fixed backdrop + reduced-motion / no-WebGL fallback (`.water-tint`); **lazy-loads** the canvas so three.js stays off other routes (keep it lazy).
- `src/components/scene/SceneCanvas.tsx` — the `<Canvas linear flat>`; lights + all scene objects.
- `src/components/scene/CameraRig.tsx` — damped descent, `CAMERA_START [0,2.5,6]` → `CAMERA_END [0,-3.5,4]`.
- `src/components/scene/Centerpiece.tsx` + `src/lib/scene/{beats,morph-targets,centerpiece-shader}.ts` — particle system morphing through 6 beats (dewdrop→release→bud→bloom→scatter→settle); `stageProgressFromP(p)` maps 0..1→stage 0..5.
- `src/components/scene/CenterpieceModel.tsx` — the brain-flower GLB (`public/models/brain-flower.glb`, Draco+WebP ~2.3MB; drei `useGLTF` auto-decodes).
- `src/components/scene/{PetalField,LightMotes,PostFX,WaterSurface}.tsx`; shaders in `src/lib/scene/*.ts`.
- Progress is published by `src/providers/SmoothScrollProvider.tsx` via `src/components/scene/useSceneProgress.ts`. **React context does NOT cross the R3F boundary in fiber v8 — refs are passed as props into `<Canvas>`.**
- **Dev handles** (`import.meta.env.DEV` only) for verifying in the browser: `window.__sceneDebug` `{cameraY, progress}`, `window.__morphDebug` `{stage, beat}`, `window.__forceStage` (force a stage 0..5), `window.__lenis` (scripted scroll). To inspect the scene unobstructed, temporarily hide the `z-10` content layer.

### DOM content
`Index.tsx` → `Header`, `LandingHero`, then sections wrapped in `DepthSection` (a `whileInView` reveal that also spawns a water ripple): `ReflectionOfWeek`, `AboutFounder`, `AssessmentTools`, `LatestArticles`, `MicroReflections`, `Newsletter`, then `Footer`. Shared motion variants: `src/lib/motion-variants.ts` (framer-motion v12). Fonts: **Playfair Display** (display serif) + **Inter** (body).

## Current status
- ✅ **Phase 0 — GLB compression** (18MB→2.3MB, Draco geometry + 2048² WebP textures; drei decodes with no code change).
- ✅ **Phase 1 — scene colour**: gold petal → bright pista green (`--pista-green: 83 52% 62%`; `PETAL_COLORS[3]` in `src/lib/scene/scene-config.ts`); brain brightened via lights (`SceneCanvas`) + emissive fill (`CenterpieceModel`) **without touching the water**.
- ⏭️ **Phase 2 — NEXT (planned for Fable)**: (a) re-choreograph the dewdrop/brain (conceal the brain in the descending droplet, couple its scale/position to scroll, let petals veil it; the droplet's path/entry point is open); (b) neutralize a residual yellow tint on the brain (lighting only); (c) redesign the DOM content into compact translucent **glass panels** so the scene shows through, with legible typography and entrance+exit scroll animations. Ready-to-paste prompts: [`docs/handoff/fable-prompts.md`](docs/handoff/fable-prompts.md).

## Hard constraints (do not break)
- **Do NOT change the background scene's look** — the water shader + tints (`src/lib/scene/water-surface-shader.ts`, `SURFACE_TINT`/`DEEP_TINT`, `WaterSurface.tsx`), the `<Canvas linear flat>` colour pipeline, the pista-green petals, the bloom/glow, and the mote drift are all approved and liked. Brain lighting/materials are fine to change (they only affect the PBR model; water + particles are custom `ShaderMaterial`s that ignore lights).
- Keep `prefers-reduced-motion` working (page is wrapped in `<MotionConfig reducedMotion="user">`) and the no-WebGL `.water-tint` fallback intact.
- Keep three.js **lazy-loaded** — it must not leak onto other routes (e.g. `/about`).

## Conventions
- Strict TypeScript; type every signature; prefer functional, pure code; keep diffs minimal and scoped.
- Commit messages: imperative mood, subject ≤50 chars, **no AI signatures, no emojis**; one logical change per commit.
- Default working branch for this redesign: `redesign/soulful-landing` (and `redesign/soulful-landing-handoff`). Do not push, open PRs, merge, or rebase `main` without being asked.
- Known pre-existing issue to fix during the next build pass: `src/components/scene/PostFX.tsx` uses `disableNormalPass` — should be `enableNormalPass`.
