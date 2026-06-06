# Frontend Template

A reusable frontend baseline for new apps. The supported create entrypoints are
`npm create`, `pnpm create`, `yarn create`, and `bun create`.

The template includes:

- Bun, npm, pnpm, or Yarn package management
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

Create a new app with npm:

```bash
npm create hsi-app@latest my-app
cd my-app
bun install
bun run dev
```

Create a new app with pnpm:

```bash
pnpm create hsi-app my-app --pnpm
cd my-app
pnpm install
pnpm run dev
```

Create a new app with Yarn:

```bash
yarn create hsi-app my-app --yarn
cd my-app
yarn install
yarn dev
```

Create a new app with Bun:

```bash
bun create hsi-app my-app --bun
cd my-app
bun install
bun run dev
```

Create a new app from the GitHub template:

```bash
gh repo create my-app --template Hsiii/frontend-template --clone
cd my-app
bun install
bun run dev
```

Package-manager flags:

- `--bun`: default
- `--npm`: write `.npmrc` with `min-release-age=7`
- `--pnpm`: write `pnpm-workspace.yaml` with `minimumReleaseAge: 10080`
- `--yarn`: write `.yarnrc.yml` with `npmMinimalAgeGate: 7d`

## Maintainers

The root package is intentionally private. Only `create-hsi-app` is meant to
be published.

Release flow:

1. Start from a clean worktree on `main`, then run `npm run release:create`,
   `pnpm run release:create`, `yarn run release:create`, or
   `bun run release:create`.
2. Choose `patch`, `minor`, or `major` when prompted. The script bumps the
   root [`package.json`](/Users/hsi/Documents/Projects/Archive/frontend-template/package.json:1),
   [packages/create-hsi-app/package.json](/Users/hsi/Documents/Projects/Archive/frontend-template/packages/create-hsi-app/package.json:1),
   and `templateTag` in
   [packages/create-hsi-app/bin/create-hsi-app.mjs](/Users/hsi/Documents/Projects/Archive/frontend-template/packages/create-hsi-app/bin/create-hsi-app.mjs:12),
   then runs `check`, commits, tags, pushes `main`, and pushes the tag. Use
   `npm run release:create -- --dry-run`, `pnpm run release:create -- --dry-run`,
   `yarn run release:create --dry-run`, or `bun run release:create -- --dry-run`
   to verify the flow without creating or pushing git objects.
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
bun install
# or pnpm install
# or yarn install
```

For Bun users, this project uses `bunfig.toml` to enforce:

```toml
[install]
minimumReleaseAge = 604800
```

That blocks packages newer than 7 days to reduce exposure to supply-chain attacks.

## Scripts

- `bun run dev` / `pnpm dev` / `yarn dev`: starts the Vite dev server
- `bun run build` / `pnpm build` / `yarn build`: creates a production build
- `bun run preview` / `pnpm preview` / `yarn preview`: serves the built app locally
- `bun run typecheck` / `pnpm typecheck` / `yarn typecheck`: runs TypeScript without emitting files
- `bun run lint` / `pnpm lint` / `yarn lint`: runs ESLint across the repo
- `bun run lint:fix` / `pnpm lint:fix` / `yarn lint:fix`: applies auto-fixable ESLint changes
- `bun run format` / `pnpm format` / `yarn format`: formats the repo with Prettier
- `bun run format:check` / `pnpm format:check` / `yarn format:check`: verifies formatting without changing files
- `bun run check` / `pnpm run check` / `yarn run check`: runs typecheck, lint, format verification, and production build

## Source Structure

- `src/components/`: React components, including the root `App.tsx`
- `src/constants/`: shared constants and CSS tokens
- `src/hooks/`: reusable hooks
- `src/global.css`: the only stylesheet outside of `components/`
- `src/main.tsx`: app entry point
