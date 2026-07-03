# v2 scene architecture (react-three-fiber "Descent & Metamorphosis")

The landing replaced an earlier `ogl` water background with a scroll-scrubbed react-three-fiber scene. Baseline v1 checkpoint is commit `ef4874a`.

**Stack (locked):** three ^0.169, @react-three/fiber ^8 (NOT v9 — needs React 19), @react-three/drei ^9, @react-three/postprocessing ^2, postprocessing, maath. React 18.3.

## File map
- `src/providers/SmoothScrollProvider.tsx` — owns Lenis; publishes ONE `progress` ref (0..1) per frame via `SceneProgressContext` (`src/components/scene/useSceneProgress.ts`). Reduced-motion → native scroll listener, no Lenis.
- `src/components/scene/ReflectionScene.tsx` — statically-imported provider/backdrop. Owns the ripple ring-buffer + `spawnRipple`, fires settle ripples on beat crossings, and **lazy-loads** the canvas (imports no three, keeping it off other routes). Fallback: `.water-tint` gradient when reduced-motion or no WebGL.
- `src/components/scene/SceneCanvas.tsx` — the lazy `<Canvas linear flat>`; picks a DESKTOP/MOBILE perf tier from `useIsMobile`. Holds lights + CameraRig, WaterSurface, PetalField, LightMotes, Centerpiece, CenterpieceModel, PostFX, drei AdaptiveDpr.
- `WaterSurface` = clip-space quad + ported ripple shader (`src/lib/scene/water-surface-shader.ts`), tint tracks damped progress. `CameraRig` = damped descent (maath). `PetalField`/`LightMotes` = instanced curl-noise drift (`src/lib/scene/{petal-shader,curl-noise}.ts`). `Centerpiece` = dense instanced morph through 6 baked stages (`src/lib/scene/{beats,morph-targets,centerpiece-shader}.ts`), rides camera look-at.
- **Progress/refs cross the R3F boundary via PROPS, not context** (fiber v8 doesn't bridge context into `<Canvas>`).

## 6 beats
`beats.ts` maps progress p → a continuous stage 0..5 eased across `BEAT_ANCHORS`: dewdrop → release → bud → bloom → scatter → settle.

## Brain-flower GLB
`public/models/brain-flower.glb` — **compressed 18.12MB→2.27MB** via
`npx @gltf-transform/cli optimize <in> <out> --compress draco --texture-compress webp --texture-size 2048 --simplify false`
(geometry kept full at ~296k verts; 3× 4096² JPEG → 2048² WebP). drei `useGLTF` auto-decodes Draco (gstatic CDN wasm) + WebP with **no code change**. `CenterpieceModel.tsx` centers/scales it, rides the camera look-at, fades in over beats 4→5, spins slowly.

## Phase 1 colour polish (done)
`--pista-green: 83 52% 62%` added to `src/index.css` + `tailwind.config.ts`. `PETAL_COLORS[3]` gold `[0.79,0.68,0.41]` → pista green `[0.67,0.82,0.42]` (flows via `uPalette[3]` into PetalField + the Centerpiece particle "ball" — the early "golden ball" is now green). Model brightened WITHOUT touching water: `SceneCanvas` lights raised (ambient 2.4, +hemisphereLight 1.6, key directional 2.6, +fill directional 1.3) and `CenterpieceModel` gives each `MeshStandardMaterial` a self-illum fill (`emissive` white, `emissiveMap = map`, `emissiveIntensity 0.3`) so concave crevices don't go black. Lights/emissive affect only the PBR model — the water/particle `ShaderMaterial`s ignore them.

**Known residual:** the brain reads slightly **yellow** — caused by the warm hemisphere sky (`#fff1e6`) + emissive fill on the cream base texture under `linear flat` (no tone-mapping). Fix = cool the model lighting; never touch the water. (Scheduled for Phase 2.)

## Gotchas learned
- manualChunks by package-array pulled react-dom into the r3f vendor chunk → the entry statically imported it → 1MB three loaded on every route. FIX: no manualChunks; Vite auto-splits three into the async SceneCanvas chunk (loaded only on the landing). Keep it this way.
- The automated preview tab runs backgrounded (`visibilityState` hidden, rAF paused) — this is the intended pause-when-hidden behavior; screenshots force paints. Use the dev handles to verify.
- Dev-only handles (`import.meta.env.DEV`): `window.__sceneDebug {cameraY,progress}`, `window.__lenis`, `window.__morphDebug {stage,beat}`, `window.__forceStage`.
- Reduced-motion: `Index.tsx` wraps content in framer `<MotionConfig reducedMotion="user">`.
- Pre-existing TS error: `PostFX.tsx` `disableNormalPass` should be `enableNormalPass`.
