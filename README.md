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

## Maintainers

The root package is intentionally private. Only `create-hsi-app` is meant to
be published.

Release flow:

1. Start from a clean worktree on `main`, then run `bun run release:create`.
2. Choose `patch`, `minor`, or `major` when prompted. The script bumps the
   root [`package.json`](/Users/hsi/Documents/Projects/Archive/frontend-template/package.json:1),
   [packages/create-hsi-app/package.json](/Users/hsi/Documents/Projects/Archive/frontend-template/packages/create-hsi-app/package.json:1),
   and `templateTag` in
   [packages/create-hsi-app/bin/create-hsi-app.mjs](/Users/hsi/Documents/Projects/Archive/frontend-template/packages/create-hsi-app/bin/create-hsi-app.mjs:12),
   then runs `bun run check`, commits, tags, pushes `main`, and pushes the tag.
   Use `bun run release:create -- --dry-run` to verify the flow without
   creating or pushing git objects.
3. Publish npm manually: `cd packages/create-hsi-app && npm publish --registry=https://registry.npmjs.org --otp=<current-code>`.
4. The matching `v*` tag publishes the GitHub Packages alias
   `@hsiii/create-hsi-app` automatically. GitHub Packages only supports scoped
   npm package names, so this mirror must stay scoped.
5. Keep `hsi-app` deprecated on npm. GitHub Packages does not offer the same
   npm deprecation flow; remove the legacy `@hsiii/hsi-app` package instead of
   trying to attach a deprecation message there.

The repo-only tooling under `.github/workflows/` and `scripts/` is ignored by
npm tarballs and removed by `create-hsi-app`. Direct GitHub template clones
will still include it.

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
