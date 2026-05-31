<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Stack

- Next.js **16.2.3** (App Router), React **19.2.4**, React Compiler enabled
- Tailwind CSS **v4** — uses `@tailwindcss/postcss`, `@import "tailwindcss"`, `@plugin` syntax (NOT the old `tailwind.config.js` way)
- Sanity CMS — `next-sanity` + GROQ queries, client in `src/lib/sanity.client.ts`
- Node **>=22**

## Commands

```
npm run dev          # dev server
npm run build        # production build
npm run lint         # eslint (eslint-config-next flat config)
```

No test suite, typecheck script, or formatter configured.

## Environment

Copy `.env.example` → `.env.local`. Required:
- `SANITY_PROJECT_ID` (or `NEXT_PUBLIC_SANITY_PROJECT_ID`)
- `SANITY_DATASET` (or `NEXT_PUBLIC_SANITY_DATASET`)

Sanity client throws at import time if these are missing.

## Path Alias

`@/*` → `./src/*` (configured in `tsconfig.json`).

## Structure

```
src/
  app/           # App Router pages (home, blog, blog/[slug])
  components/    # Shared UI (Navbar, Footer, ThemeToggle, etc.)
  config/        # Site constants
  lib/           # Sanity client, queries, image builder, utils
```

## Conventions

- **Tailwind v4**: No `tailwind.config.js`. Theme tokens defined in `globals.css` via `@theme {}` block and CSS custom properties (`--primary`, `--background`, etc.)
- **Theme**: Dark/light via `data-theme` attribute on `<html>`, bootstrapped inline in `layout.tsx` to prevent flash. System default follows `prefers-color-scheme`.
- **Animations**: Use `motion-fade-up`, `motion-scale-in`, `motion-card-in` utility classes + delay variants (`motion-delay-1/2/3`). All respect `prefers-reduced-motion`.
- **UI class constants**: Button and blog styles extracted to `src/lib/ui.classes.ts` and `src/app/blog/blog.classes.ts` — reuse these, don't inline duplicates.
- **Sanity images**: Use `urlForImage()` from `src/lib/sanity.image.ts` with explicit `width`/`height`/`fit`/`quality`. The default client uses CDN in production; use `getFreshClient()` for uncached reads.
- **Blog posts**: Async params (`params: Promise<{ slug: string }>`). Use `getFreshClient()` for fresh data. `unstable_instant` export controls prefetch behavior.
- **Fonts**: Space_Grotesk (sans) + Space_Mono (mono) loaded via `next/font/google` with CSS variables.
- **Shiki**: Code blocks use Shiki with dark theme overrides via `data-theme` selectors in `globals.css`.
