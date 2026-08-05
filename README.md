# The Velvet Mind

Website for **Dr. Niharika Bhaskar**, a practicing psychiatrist. The site is deliberately
visually rich and calming — a full-screen, scroll-scrubbed "pond descent" 3D scene behind
translucent glass content panels. Most visitors arrive from her Instagram, so motion stays
"alive but serene."

Formerly branded *Soulful Reflections*.

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

Deployed to GitHub Pages at `https://Akshatt17.github.io/the-velvet-mind/` by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`.
The Vite `base` path and `package.json` `homepage` both reference `the-velvet-mind` and must
match the GitHub repo name.

### Moving to a custom domain

The site currently serves from a repo subpath. To move it to a root domain
(e.g. `thevelvetmind.com`), all three of these must happen together:

1. Set `base` to `"/"` in [`vite.config.ts`](vite.config.ts) and `homepage` to the domain in
   `package.json`.
2. Add `public/CNAME` containing the bare domain on one line (Vite copies `public/` verbatim
   into `dist/`, which is what Pages publishes).
3. Point DNS at GitHub Pages — four `A` records for the apex (`185.199.108.153`,
   `185.199.109.153`, `185.199.110.153`, `185.199.111.153`), or a `CNAME` to
   `akshatt17.github.io` for a `www` subdomain — then set the custom domain in the repo's
   Settings → Pages and enable "Enforce HTTPS" once the certificate is issued.

Do steps 1–2 only when DNS is ready: with `base: "/"` the Pages subpath build 404s on every
asset, so the site is blank in the gap.

## Project layout

See [`CLAUDE.md`](CLAUDE.md) for architecture notes and [`docs/`](docs/) for the design system
and scene documentation.
