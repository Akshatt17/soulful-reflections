# The Velvet Mind

Website for **Dr. Niharika Bhaskar**, a practicing psychiatrist. The site is deliberately
visually rich and calming — a full-screen, scroll-scrubbed "pond descent" 3D scene behind
translucent glass content panels. Most visitors arrive from her Instagram, so motion stays
"alive but serene."

Formerly branded *Soulful Reflections*; deploy paths still use the `soulful-reflections`
repo name.

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- react-three-fiber / three.js (the background scene)
- framer-motion + Lenis (motion & smooth scroll)
- `HashRouter` (routes are `/#/...`)

## Local development

Requires Node.js & npm.

```sh
# Install dependencies
npm install

# Start the dev server (http://localhost:8080)
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

## Deployment

Deployed to GitHub Pages at `https://Akshatt17.github.io/soulful-reflections/`. The Vite
`base` path and `package.json` `homepage` both reference `soulful-reflections` and must match
the GitHub repo name.

## Project layout

See [`CLAUDE.md`](CLAUDE.md) for architecture notes and [`docs/`](docs/) for the design system
and scene documentation.
