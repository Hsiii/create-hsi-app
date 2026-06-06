# CLI Advanced Usage

- `[dir]`: scaffold into a new directory instead of the current one
- `--bun`: use Bun for the scaffolded app and write `bunfig.toml`
- `--npm`: use npm for the scaffolded app and write `.npmrc`
- `--pnpm`: use pnpm for the scaffolded app and write `pnpm-workspace.yaml`
- `--yarn`: use Yarn for the scaffolded app and write `.yarnrc.yml`
- `--noInstall`: skip the default dependency installation step
- `--noRepo`: skip the interactive repository prompt and leave git
  uninitialized

## Smoke Test

Run the local CLI end-to-end with a temporary target directory:

```bash
bun run smoke
```

That runs the full interactive flow, including git/GitHub setup when available.

Skip repo setup or pass through other CLI flags when needed:

```bash
bun run smoke -- --noRepo
bun run smoke -- --npm --noInstall
```
