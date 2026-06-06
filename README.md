# Frontend Template

Scaffold an opinionated Vite + React + TypeScript frontend with strict checks,
curated defaults, and package-age gating.

## What This Is

This repo has two roles:

- `create-hsi-app`: the published CLI entrypoint for starting a new app
- `frontend-template`: the source template that the CLI clones and rewrites

The generated app stays intentionally small, but it comes with enough structure
to start building immediately.

## What You Get

Every generated app includes:

- Vite
- React 19
- TypeScript 6
- TanStack React Query
- Lucide React
- ESLint with `eslint-config-complete`
- Prettier with sorted imports
- VS Code recommendations and settings
- Package-manager-specific package-age gating defaults

## Getting Started

Run any one of these:

### npm

```bash
npm create hsi-app@latest
```

### yarn

```bash
yarn create hsi-app
```

### pnpm

```bash
pnpm create hsi-app@latest
```

### bun

```bash
bun create hsi-app@latest
```

You can also pass a target directory:

```bash
npm create hsi-app@latest my-app
```

After scaffolding:

```bash
cd my-app
bun install
bun run dev
```

## Package Manager Choice

The CLI can tailor the generated app for a specific package manager:

- `--bun`: default
- `--npm`: writes `.npmrc` with `min-release-age=7`
- `--pnpm`: writes `pnpm-workspace.yaml` with `minimumReleaseAge: 10080`
- `--yarn`: writes `.yarnrc.yml` with `npmMinimalAgeGate: 7d`

Examples:

```bash
pnpm create hsi-app my-app --pnpm
yarn create hsi-app my-app --yarn
bun create hsi-app my-app --bun
```

## Defaults

This template is opinionated in a few specific ways:

- strict `typecheck`, `lint`, `format:check`, and `build` coverage through
  `check`
- package-manager-aware package-age gating to reduce supply-chain risk
- minimal starter surface, with repo-only tooling stripped from generated apps

## GitHub Template Fallback

If you want the raw template repository instead of the CLI flow:

```bash
gh repo create my-app --template Hsiii/frontend-template --clone
```

Use this as a fallback. The `create-hsi-app` path is cleaner because it rewrites
app identity, applies package-manager-specific config, and removes repo-only
tooling.

## FAQ

### Why `hsi-app` for `create` but `create-hsi-app` on npm?

`npm create hsi-app`, `pnpm create hsi-app`, `yarn create hsi-app`, and
`bun create hsi-app` resolve to the package named `create-hsi-app`.

### Why is package-age gating part of the template?

It is one of the few defaults here that directly reduces risk. New apps start
with a delay gate for freshly published packages instead of leaving that choice
to every downstream repo.

### Why use the CLI instead of cloning the template repo directly?

The CLI removes `.git`, `.github`, `packages/`, and other repo-only files,
rewrites package metadata, and keeps the generated app closer to what you
actually want to ship.

## Scripts

- `dev`: start the Vite dev server
- `build`: create a production build
- `preview`: serve the build locally
- `check`: run typecheck, lint, format verification, and production build
- `release`: bump versions, update `templateTag`, run checks, commit, tag, and
  push

Maintainer docs live in [docs/releasing.md](docs/releasing.md).
