# Handoff docs

Portable context so a fresh Claude (on any machine, after `git clone`) can pick up this project without the original chat history. Start with the root [`CLAUDE.md`](../../CLAUDE.md), then read here as needed.

## Contents
- [`scene-architecture.md`](scene-architecture.md) — how the react-three-fiber "pond descent" landing scene is wired: files, the single scroll-progress ref, the 6-beat morph, the compressed brain-flower GLB, dev handles, and gotchas. **Most useful file for scene work.**
- [`polish-plan.md`](polish-plan.md) — the active polish plan. Phase 0 (GLB compression) and Phase 1 (scene colour) are **done**; Phase 2 (scene re-choreography + content glass redesign) is next.
- [`fable-prompts.md`](fable-prompts.md) — three ready-to-paste prompts for Phase 2, to run one at a time (scene → content → finalize).
- [`original-v2-build-spec.md`](original-v2-build-spec.md) — the original spec that produced the v2 scene (historical reference; the scene has since been built and refined).

## Current state (see root CLAUDE.md for detail)
- ✅ Phase 0 — brain-flower GLB compressed 18MB→2.3MB (Draco + WebP).
- ✅ Phase 1 — gold petals → bright pista green; brain brightened without touching the water.
- ⏭️ Phase 2 — dewdrop/brain re-choreography, brain yellow-tint fix, and compact translucent glass content redesign. Use `fable-prompts.md`.

## The one rule that matters most
The background scene's look — **water shader/tints, the `linear flat` colour pipeline, pista-green petals, bloom/glow, and mote drift — is approved and must not change.** Everything else (brain lighting/materials, choreography path, DOM content) is open.
