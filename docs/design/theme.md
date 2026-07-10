# The Velvet Mind — Theme & Design System

The single reference for how every page and section of the site should look,
move, and layer. The landing page already follows it; apply it to the other
routes section by section (they currently still use opaque backgrounds).

Mood in one line: **a calm pond you look into — content floats on glass above
living water.** Visually rich and polished, deliberately NOT minimal; motion is
"alive but serene" because the audience includes anxious patients.

---

## 1. The living background

Every page renders the same fixed, full-screen water scene behind its content
(`z-0`, content at `z-10`). It is provided by `ReflectionScene`
(`src/components/scene/ReflectionScene.tsx`), which takes a `variant`:

| Variant | Where | What renders |
|---|---|---|
| `descent` | Landing page only (`Index.tsx`) | Scroll-scrubbed camera descent into the pond + the morphing petal **centerpiece** (dewdrop → release → bud → bloom → scatter → settle) travelling upper-right → lower-left |
| `ambient` | Every other page (via `PageLayout`) | The same water, drifting pista-green + rose petals, warm light motes, and soft bloom/vignette — camera resting at the surface, **no centre object** |

Rules:
- Non-landing pages get this automatically by using `PageLayout` — never mount
  `ReflectionScene` yourself on a page.
- The scene's look is **approved and frozen**: water shader + tints
  (`SURFACE_TINT`/`DEEP_TINT`), the `<Canvas linear flat>` colour pipeline,
  petal palette (`PETAL_COLORS`, incl. pista green), bloom/glow, mote drift.
  Do not restyle them per page.
- three.js stays in the lazy `SceneCanvas` chunk; `ReflectionScene` must not
  import three directly.
- Fallbacks are built in and must keep working: `prefers-reduced-motion` and
  no-WebGL render the static `.water-tint` gradient instead.
- Cursor movement spawns gentle ripples on every page (comes free with
  `ReflectionScene`).

## 2. Palette

Defined as HSL CSS variables in `src/index.css`. Use tokens, never hex.

| Token | Role |
|---|---|
| `--background` / `--card` | Warm cream base / panel tint |
| `--foreground` (`--deep-plum`) | Primary text — deep plum, use for body text over glass |
| `--deep-plum-soft` | Secondary text, captions, bylines |
| `--primary` (rose) / `--berry` | Headings, links, buttons; berry is the hover shade |
| `--sage` / `--forest` | Icon chips and category accents (icon bg `sage/25`, icon `forest`) |
| `--accent-foreground` | Small-caps role lines ("Practicing Psychiatrist …") |
| `--pista-green` | Scene petals — background only, not UI text |

Text opacity scale over glass: `text-foreground` for emphasis, `/85` body,
`/80` supporting, `/70` captions, `/60` metadata, `/50` fine print.

## 3. Glass system

All content sits on the **approved glass pane**. The single source of truth is
the `.glass-panel` / `.glass-panel-hover` / `.radial-tint` classes in
`src/index.css`; `<GlassPanel>` is a thin wrapper over them. Never re-derive
the values:

```ts
background: "rgba(243, 235, 217, 0.55)",
backdropFilter: "blur(12px)",
WebkitBackdropFilter: "blur(12px)",
border: "1px solid rgba(243, 235, 217, 0.3)",
boxShadow: "0 8px 32px rgba(72, 35, 14, 0.08)",
borderRadius: 16,
```

- `<GlassPanel>` / class `glass-panel` — static pane for text/content blocks.
- `<GlassPanel hover>` / classes `glass-panel glass-panel-hover` — interactive
  cards: lift `-2px` and brighten to `rgba(243,235,217,0.7)` on hover.
- class `radial-tint` — a soft radial cream gradient placed behind headings
  that sit **outside** a panel, for legibility over the busy scene:
  `radial-gradient(ellipse at center, rgba(238,229,213,0.65) 0%, rgba(238,229,213,0) 70%)`.
- Boxes nested **inside** a glass pane use plain translucent fills
  (`bg-card/50`–`/60`), not another blurred pane.
- The footer is the same glass as a full-width floating slab (see `Footer.tsx`).
- **Never** use opaque `bg-card` / `bg-muted` / `bg-background` section fills on
  pages — that's what the migration replaces.

## 4. Typography

Playfair Display (serif, display) + Inter (body). Both already loaded.

| Element | Treatment |
|---|---|
| Kicker / eyebrow | Inter, `text-[11px] uppercase tracking-[0.32em] text-primary` |
| Section heading | Playfair, `text-3xl sm:text-4xl font-bold text-primary` |
| Card heading | Playfair, `text-lg font-semibold text-primary` |
| Pull-quote | Playfair italic, `text-2xl sm:text-3xl leading-snug text-foreground` |
| Body | Inter, `text-sm`–`base leading-relaxed text-foreground/80–85` |
| Meta / bylines | Inter, `text-xs uppercase tracking-[0.2em] text-deep-plum-soft` |
| Text links | `text-sm font-medium uppercase tracking-[0.2em] text-primary hover:text-berry`, with `<ArrowRight className="h-4 w-4" />` |

## 5. Layout

- **Compact panels, open scene.** Panels are `max-w-md`–`max-w-2xl`, never
  `max-w-7xl`. At any scroll position most of the viewport should show scene.
- **Asymmetry from `md:` up.** Sections alternate sides so content and scene
  share the screen: lean left with `md:ml-[4%]`, lean right with
  `md:ml-auto md:mr-[4%]`. On the landing, side choice follows the centerpiece
  (it travels right → centre → rests left, so early sections lean left, late
  sections lean right). Below `md`, everything stacks full-width.
- Section wrapper spacing: `px-4 py-16 sm:px-6 lg:px-16 lg:py-24` — generous
  vertical gaps are intentional; the scene breathes between panels.
- Lists of items = stacked slim horizontal cards (icon or thumbnail left, text
  right), not 3-across grids.

## 6. Motion

framer-motion only; the page root is wrapped in
`<MotionConfig reducedMotion="user">`. No new animation dependencies.

- **Section entrance + exit:** wrap landing-style sections in `DepthSection`
  (`src/components/landing/DepthSection.tsx`). It scrubs opacity/y on both
  viewport edges (rises in over the first ~22% of its traverse, drifts up and
  fades over the last ~22%) and spawns a water ripple as it settles into view.
- **Text reveal:** `DepthSection` broadcasts a `hidden → show` variant wave
  (stagger 0.12s, replays on re-entry). Give inner elements
  `variants={fadeInUp}` from `src/lib/motion-variants.ts` — they inherit the
  wave automatically, including through `GlassPanel`.
- **Tempo:** entrances 0.6–0.9s `easeOut`; hovers ~0.3–0.4s; scene damping
  0.6s (`SCENE_DAMP`). Nothing snaps; slow, low-frequency movement only.
- **Reduced motion:** transforms drop away and only opacity crossfades remain
  (`useReducedMotion` gates any `useScroll`-driven styles — follow the pattern
  in `DepthSection`/`LandingHero`).

## 7. Applying the theme to an existing page (checklist)

1. The page already sits in `PageLayout` → the ambient scene is behind it.
2. Remove opaque section backgrounds (`bg-muted`, `bg-card`, `bg-background`).
3. Re-house each section's content in a `GlassPanel` (or `GlassPanel hover`
   cards) sized `max-w-md`–`2xl`, alternating `md:` left/right leans.
4. Headings outside panels get `style={radialTint}`.
5. Apply the typography table (§4) — body text moves from `text-muted-foreground`
   to `text-foreground/80–85` for legibility over glass.
6. Wrap sections in `DepthSection` (or replicate its scrub + variant wave) so
   they enter and exit with the house motion.
7. Check `md`-and-below stacking, `prefers-reduced-motion`, and that no
   horizontal overflow appears.
