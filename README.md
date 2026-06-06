# Frontend Template

A reusable frontend baseline for new apps. The supported distribution path is
`npm create hsi-app@latest`.

The template includes:

- Bun package management
- Vite for dev/build
- React 19
- TypeScript 6
- TanStack React Query
- Lucide React for icons
- ESLint with eslint-config-complete
- Prettier with sorted imports
- VS Code extension recommendations for spellcheck and CSS nesting syntax highlighting
- VS Code settings for format-on-save and explicit ESLint fixes on save

## Usage

Create a new app from npm:

```bash
npm create hsi-app@latest my-app
cd my-app
bun i
bun run dev
```

Create a new app from the GitHub template:

```bash
gh repo create my-app --template Hsiii/frontend-template --clone
cd my-app
bun i
bun run dev
```

## Install

```bash
bun i
```

This project uses `bunfig.toml` to enforce:

```toml
[install]
minimumReleaseAge = 604800
```

That blocks packages newer than 7 days to reduce exposure to supply-chain attacks.

## Scripts

- `bun run dev`: starts the Vite dev server and opens the app automatically in
  the browser
- `bun run build`: creates a production build with Vite
- `bun run preview`: serves the built app locally
- `bun run typecheck`: runs TypeScript without emitting files
- `bun run lint`: runs ESLint across the repo
- `bun run lint:fix`: applies auto-fixable ESLint changes
- `bun run format`: formats the repo with Prettier
- `bun run format:check`: verifies formatting without changing files
- `bun run check`: runs typecheck, lint, format verification, and production
  build

## Source Structure

- `src/components/`: React components, including the root `App.tsx`
- `src/constants/`: shared constants and CSS tokens
- `src/hooks/`: reusable hooks
- `src/global.css`: the only stylesheet outside of `components/`
- `src/main.tsx`: app entry point
