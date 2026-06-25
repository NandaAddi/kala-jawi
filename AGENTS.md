# Kala Jawi — AGENTS.md

## Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React SSR) + [TanStack Router](https://tanstack.com/router) + [TanStack Query](https://tanstack.com/query)
- **NOT** Next.js, Remix, or any other framework — don't create `pages/`, `app/`, or use `server-only`.
- **Package manager**: `bun` (has `bunfig.toml` with 24h release-age guard; `bun.lock` is source of truth)
- **UI**: shadcn/ui new-york style, non-RSC (`components.json`). Icons from `lucide-react`.
- **CSS**: Tailwind v4 (`@import "tailwindcss" source(none); @source "../src";`). Colors in `oklch`. Dark mode via `.dark` class. `cn()` utility at `@/lib/utils`.
- **Animation**: `motion` package (Framer Motion rebrand). Import from `motion/react`, NOT `framer-motion`.
- **Forms**: `react-hook-form` + `@hookform/resolvers` + `zod`
- **Charts**: `recharts`

## Commands

```sh
bun dev          # start dev server (Vite)
bun build        # production build
bun build:dev    # dev-mode build
bun preview      # preview production build
bun lint         # ESLint (no test runner installed)
bun format       # Prettier (100 width, double quotes, trailing commas)
```

No test framework is installed. Run `lint` before committing.

## Routing (TanStack Router — file-based)

- **Root layout**: `src/routes/__root.tsx` (the only layout; wraps `<Outlet />`)
- **Dynamic params**: bare `$` — `users/$id.tsx` → `/users/:id`
- **Optional segment**: `posts/{-$category}.tsx` → `/posts/:category?`
- **Splat**: `files/$.tsx` → `/files/*` (param name is `_splat`, never `*`)
- **Auto-generated**: `src/routeTree.gen.ts` — do not edit by hand
- More details in `src/routes/README.md`

## Vite config

Uses `@lovable.dev/vite-tanstack-config` — **do not** add `tanstackStart`, `viteReact`, `tailwindcss`, or `tsConfigPaths` plugins manually (duplicate-plugin errors).

## Entry points

- `src/start.ts` — creates the TanStack Start instance (with error middleware)
- `src/server.ts` — SSR entry; custom error wrapper that recovers stack traces from h3-swallowed errors
- `src/router.tsx` — creates the router + `QueryClient`

## ESLint constraints

- `no-restricted-imports`: importing `server-only` is **blocked** (use `*.server.ts` naming or `@tanstack/react-start/server-only` instead)
- `@typescript-eslint/no-unused-vars`: **off**

## Path alias

`@/*` → `./src/*` (configured in `tsconfig.json` paths and vite-tsconfig-paths).

## Brand colors & design tokens

Defined in `src/styles.css` under `@theme inline`. Use Tailwind classes, NOT inline hex:

| Token              | Hex       | Tailwind class                                 |
| ------------------ | --------- | ---------------------------------------------- |
| `brand-cream`      | `#fdf4e3` | `text-brand-cream`, `bg-brand-cream`           |
| `brand-dark`       | `#4a2c1a` | `text-brand-dark`, `bg-brand-dark`             |
| `brand-gold`       | `#c9953c` | `text-brand-gold`, `border-brand-gold`         |
| `brand-light-gold` | `#e8c878` | `text-brand-light-gold`, `bg-brand-light-gold` |
| `brand-tan`        | `#d9b482` | `text-brand-tan`, `bg-brand-tan`               |
| `brand-medium`     | `#b8895a` | `text-brand-medium`, `bg-brand-medium`         |

Fonts: `font-display` (Caveat), `font-body` (Inter).

## Motion (Framer Motion) gotchas

- Import from `motion/react`, NOT `framer-motion` (package is `motion` v12+).
- **Always set `initial` on `motion.div`** when using `animate` — otherwise framer-motion starts from `auto` causing layout shift/glitch on mount.
- **Never mix `transition-all` CSS class with framer-motion `animate`** on the same element — CSS transition fights framer-motion's transform/opacity control. Use inline `transition` for specific CSS properties or rely solely on framer-motion.
- `useSpring` from `motion/react` for magnetic/physics effects — default spring config `stiffness: 300, damping: 20` is responsive; lower values = slower/smoother.

## Build artifacts

`dist/`, `.output/`, `.vinxi/`, `.tanstack/`, `.nitro/` — all gitignored.

## Bun install guard

`bunfig.toml` enforces 24h `minimumReleaseAge` on all packages. Before adding new deps, confirm with user. Some `@lovable.dev/*` packages are excluded from the guard.
