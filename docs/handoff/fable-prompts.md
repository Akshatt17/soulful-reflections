# Fable prompts — Phase 2 (scene re-choreography + content redesign)

Paste these into a single Fable (or Claude) session **one at a time**, reviewing between each. Prompt 1 carries the shared context; 2 and 3 build on it. Baseline is committed and clean on `redesign/soulful-landing`.

Design intent: the dewdrop's formation point and travel path are **fully open** — it can enter from a corner, drift diagonally, drop down one side with content on the other, etc. The only fixed rule is that the **colours, glow, petals, and water effect must stay exactly as they are.**

---

## PROMPT 1 — Orientation + scene re-choreography

```markdown
# Soulful Reflections — landing polish (part 1 of 3): scene re-choreography

You're improving the landing page of **Soulful Reflections**, a psychiatrist's website: Vite + React 18 + TypeScript + Tailwind + shadcn. Branch: `redesign/soulful-landing` (baseline is committed and clean). Run with `npm run dev` (port 8080) and verify everything yourself in the browser preview — never ask me to check manually.

I'll give you this work in 3 messages. This first one is the 3D scene. **Do the scene work only, then stop and let me review before I paste part 2.**

## What exists
The landing (`src/pages/Index.tsx`) renders DOM content over a full-screen, scroll-scrubbed react-three-fiber "pond descent" scene fixed behind everything (`z-0`; content is `z-10`). A single normalized scroll-progress value (0→1) drives a camera descending into a pond; **pista-green + rose petals** and warm light motes drift perpetually; soft bloom/vignette/DoF post-processing; and a **brain-flower GLB** currently appears only at the final "settle" beat.

**I LOVE the look of the background — the colours, themes, glow, petals, and water effect. Do NOT change any of that.** Off-limits: the water shader and its tints (`src/lib/scene/water-surface-shader.ts`, `SURFACE_TINT`/`DEEP_TINT` in `src/lib/scene/scene-config.ts`, `src/components/scene/WaterSurface.tsx`), the `<Canvas linear flat>` colour pipeline, the pista-green petal colour, the glow/bloom, and the mote drift.

### Scene file map (react-three-fiber v8)
- `src/components/scene/ReflectionScene.tsx` — fixed backdrop + reduced-motion / no-WebGL fallback (`.water-tint`); **lazy-loads** the canvas so three.js stays off other routes (preserve this).
- `src/components/scene/SceneCanvas.tsx` — the `<Canvas>`; lights + all scene objects.
- `src/components/scene/CameraRig.tsx` — damped descent, `CAMERA_START [0,2.5,6]` → `CAMERA_END [0,-3.5,4]`.
- `src/components/scene/Centerpiece.tsx` + `src/lib/scene/{beats,morph-targets,centerpiece-shader}.ts` — a particle system morphing through 6 baked "beats" (dewdrop → release → bud → bloom → scatter → settle), driven by progress. `stageProgressFromP(p)` maps 0..1 → stage 0..5; `BEAT_ANCHORS` are each beat's progress point.
- `src/components/scene/CenterpieceModel.tsx` — loads the GLB (`public/models/brain-flower.glb`, already Draco+WebP compressed ~2.3MB; drei `useGLTF` auto-decodes). Currently rides the camera look-at and fades in only over beats 4→5.
- `src/components/scene/PetalField.tsx`, `LightMotes.tsx`, `PostFX.tsx`.
- Progress is published by `src/providers/SmoothScrollProvider.tsx` via `src/components/scene/useSceneProgress.ts`. NOTE: React context does NOT cross the R3F boundary here — refs are passed as **props** into `<Canvas>`.
- **Dev handles** (DEV only) for verifying in preview: `window.__sceneDebug` `{cameraY, progress}`, `window.__morphDebug` `{stage, beat}`, `window.__forceStage` (force stage 0..5), `window.__lenis` (scripted scroll, e.g. `window.__lenis.scrollTo(y,{immediate:true})`). To inspect the scene unobstructed, temporarily hide the `z-10` content layer.

## Task: re-choreograph the dewdrop + brain
The brain GLB isn't great on its own, so make it a supporting element, not a hero reveal:
- **Conceal the brain inside the descending dewdrop from the start**, and as the camera zooms/descends with scroll, have the brain **scale up and travel with it** (couple scale + position to the progress ref across the whole scroll, not just the final beat). It should feel like the droplet carries the brain down and gradually opens to reveal it.
- **Let petals hover around the brain and partially cover it** throughout — a soft floral veil that flatters/obscures the model's rougher parts.
- **The dewdrop's formation point and travel path are fully open — no hard limits.** It doesn't have to form dead-center and fall straight down. It can enter from a corner (e.g. form top-right and drift to bottom-left), drop down one side while leaving the other side open for content, follow a gentle diagonal or arc — whatever composes best. Surprise me. The ONLY constraint is that the colours, glow, petals, and water look stay exactly as they are.
- Keep it **serene**: slow, low-frequency motion (~1.5–3s easings). Keep the perpetual petal/mote drift.
- You may simplify or repurpose the 6-beat particle morph if it conflicts with this new choreography, as long as the descent still feels calm and continuous. Reuse the progress ref, `CameraRig`, and `stageProgressFromP`.

## Also fix: the brain's yellow tint (lighting only — never the water)
The brain reads yellow. Cause: warm model lighting added earlier — `hemisphereLight color="#fff1e6"` in `SceneCanvas.tsx`, plus a white `emissive` fill with `emissiveMap = base map` at `emissiveIntensity 0.3` in `CenterpieceModel.tsx`, under the `linear flat` (no tone-mapping) pipeline, which skews the cream base texture yellow. Neutralize it (cool the hemisphere sky toward neutral/white, lower/neutralize the emissive warmth, or slightly cool the material colour) so it reads as a natural cream brain. These lights/materials affect only the PBR model — the water + particles are custom `ShaderMaterial`s that ignore lights — so this is safe. Do NOT touch the Canvas `linear`/`flat` props or any water tint.

## Working rules (important)
- Write good code directly. **Do NOT run any code-review or QA agent, and do NOT run `npm run build` or per-edit checks yet** — we finalize in part 3.
- No tests, no coverage, no extra scaffolding.
- If a *trivial* change needs a quick visual confirmation, spawn a **Sonnet subagent** to check it in preview.
- Respect `prefers-reduced-motion` (page is wrapped in `<MotionConfig reducedMotion="user">`) and keep the no-WebGL `.water-tint` fallback and the lazy three.js chunk intact.
- Stay on branch `redesign/soulful-landing`. Don't commit yet, and never push/PR/merge unless I ask.

Start by running the app and scrolling through so you understand the current descent, then make the scene changes. Stop when the scene looks good and tell me what you did, so I can review before part 2.
```

---

## PROMPT 2 — DOM content redesign

```markdown
# Part 2 of 3: redesign the DOM content so the scene shows through

Same session/rules as part 1 (don't review or build yet; no tests; Sonnet subagent for trivial checks; stay on branch; don't commit). Now redesign the page content that sits over the scene.

## The problem
`Index.tsx` renders `Header`, `LandingHero`, then sections wrapped in `DepthSection` (a `whileInView` reveal that also spawns a water ripple): `ReflectionOfWeek`, `AboutFounder`, `AssessmentTools`, `LatestArticles`, `MicroReflections`, `Newsletter`, then `Footer`. Today these are big and opaque (`bg-card` ~97%, full `max-w-7xl`, tall padding, fully-opaque footer) so they cover the whole viewport and the beautiful scene is never visible, and they sit static. Shared motion variants live in `src/lib/motion-variants.ts` (framer-motion v12 installed). Fonts already loaded: **Playfair Display** (display serif) + **Inter** (body).

## What to do
- **Shrink and open up** every section: narrower centered containers (compact cards, not full-width), less vertical bulk, and replace opaque backgrounds with translucent glass so the moving scene is visible around and behind the content at all times. Make the footer translucent too.
- **Compose with the scene choreography from part 1** — if the dewdrop/brain travels down one side, let the content favour the opposite side; asymmetric layouts are welcome so the scene and content share the screen instead of fighting.
- **Use these EXACT glass panes** (my approved treatment — reuse verbatim; adapt only text/icon colours for legibility):
  ```ts
  const glassPanel: React.CSSProperties = {
    background: "rgba(243, 235, 217, 0.55)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(243, 235, 217, 0.3)",
    boxShadow: "0 8px 32px rgba(72, 35, 14, 0.08)",
    borderRadius: 16,
  };
  // hover: background → "rgba(243,235,217,0.7)", plus a subtle framer-motion whileHover={{ y: -2 }}
  ```
  Where text needs more contrast over the busy scene, add a soft radial tint behind it: `radial-gradient(ellipse at center, rgba(238,229,213,0.65) 0%, rgba(238,229,213,0) 70%)`.
- **Typography & legibility:** Playfair Display for headings, Inter for body; choose sizes/weights/colours so text is crisp and clearly readable over the glass. The panels and text must be noticeably more visible than today.
- **Animation:** give sections both **entrance AND exit (scroll-away)** motion so the scene breathes in the gaps between them, and time the text reveal to the motion. Keep it calm and cohesive. framer-motion only; you may take inspiration from 21st.dev but don't add heavy new animation deps. Keep `prefers-reduced-motion` working.

I want strong, polished, calm aesthetic + animation choices here — surprise me. If a real either/or design fork needs my input, ask; otherwise pick good defaults and proceed. Stop when the content looks good and summarize, so I can review before part 3.
```

---

## PROMPT 3 — Finalize (single review + build + commit)

```markdown
# Part 3 of 3: finalize

Now that the scene and content both look right in the preview, finalize:
1. Fix the pre-existing TypeScript error: `src/components/scene/PostFX.tsx` uses `disableNormalPass` — it should be `enableNormalPass`.
2. Do ONE pass of code review over everything you changed in parts 1–2 (correctness, cleanliness, no leftover debug code, reduced-motion + no-WebGL fallback intact, three.js still lazy-loaded off other routes), and fix what you find.
3. Run `npm run build` and fix any errors until it passes.
4. Do a final scroll-through in the preview to confirm the scene + content look and perform well, then take a couple of screenshots to show me.
5. Commit on branch `redesign/soulful-landing`: imperative subject ≤50 chars, no AI signatures, no emojis. One or two logical commits are fine. Do NOT push, open a PR, merge, or rebase unless I explicitly ask.
```
