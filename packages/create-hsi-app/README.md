# create-hsi-app

Scaffold a new Vite + React + TypeScript app from the frontend template.

## Usage

Use the create command, not the generated dependency install command shown by
GitHub Packages.

## GitHub Packages

GitHub Packages publishes this CLI as `@hsiii/create-hsi-app` because the
GitHub npm registry requires scoped package names. For npm, the equivalent
scoped create command is:

```bash
npm create @hsiii/hsi-app@latest --registry=https://npm.pkg.github.com
```

Pass the package manager flag after the initializer:

```bash
npm create @hsiii/hsi-app@latest --registry=https://npm.pkg.github.com -- --pnpm
```

Configure or authenticate to the GitHub Packages registry first if your npm
client is not already mapped to the `@hsiii` scope.

## Public npm

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
