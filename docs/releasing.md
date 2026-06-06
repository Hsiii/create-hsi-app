# Releasing

This repo is template source plus release tooling. The root package is private.
Only `create-hsi-app` is published to public npm.

## Release Flow

1. Start from a clean worktree on `main`.
2. Run one of:
    - `npm run release`
    - `pnpm run release`
    - `yarn run release`
    - `bun run release`
3. Choose `patch`, `minor`, or `major`.
4. The script will:
    - bump the root `package.json` version
    - bump `packages/create-hsi-app/package.json`
    - update `templateTag` in
      `packages/create-hsi-app/bin/create-hsi-app.mjs`
    - run `check`
    - commit
    - create the matching `v*` tag
    - push `main`
    - push the tag
5. Publish the package to public npm manually.

## Dry Run

Use one of:

- `npm run release -- --dry-run`
- `pnpm run release -- --dry-run`
- `yarn run release --dry-run`
- `bun run release -- --dry-run`

The dry run updates files and runs checks, but skips commit, tag, and push.

## npm Publish

Public npm publish is manual:

```bash
cd packages/create-hsi-app
npm publish --registry=https://registry.npmjs.org --otp=<current-code>
```

## Legacy Package

Keep `hsi-app` deprecated on npm.

## Notes

- `scripts/` is ignored by npm tarballs.
- `create-hsi-app` removes repo-only tooling from generated apps.
- Direct GitHub template clones still include repo-only tooling by design.
