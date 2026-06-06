#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline/promises';

const repoRoot = resolve(import.meta.dirname, '..');
const rootPackageJsonPath = resolve(repoRoot, 'package.json');
const createPackageJsonPath = resolve(
    repoRoot,
    'packages/create-hsi-app/package.json'
);
const createScriptPath = resolve(
    repoRoot,
    'packages/create-hsi-app/bin/create-hsi-app.mjs'
);

const releaseTypes = /** @type {const} */ (['patch', 'minor', 'major']);
const isDryRun = process.argv.includes('--dry-run');

main().catch((error) => {
    console.error(`release-create-hsi-app: ${error.message}`);
    process.exit(1);
});

async function main() {
    assertCleanWorktree();

    const rootPackageJson = readJson(rootPackageJsonPath);
    const createPackageJson = readJson(createPackageJsonPath);

    if (rootPackageJson.version !== createPackageJson.version) {
        throw new Error(
            `Version mismatch: root is ${rootPackageJson.version}, create package is ${createPackageJson.version}.`
        );
    }

    const releaseType = await promptReleaseType(rootPackageJson.version);
    const nextVersion = bumpVersion(rootPackageJson.version, releaseType);
    const nextTag = `v${nextVersion}`;

    rootPackageJson.version = nextVersion;
    createPackageJson.version = nextVersion;

    writeJson(rootPackageJsonPath, rootPackageJson);
    writeJson(createPackageJsonPath, createPackageJson);
    updateTemplateTag(nextTag);

    runPackageScript('check');
    run('git', ['add', 'package.json']);
    run('git', ['add', 'packages/create-hsi-app/package.json']);
    run('git', ['add', 'packages/create-hsi-app/bin/create-hsi-app.mjs']);
    if (isDryRun) {
        output.write(
            [
                '',
                `Dry run prepared ${nextTag}.`,
                'Skipped git commit, tag, and push.',
                '',
            ].join('\n')
        );
        return;
    }

    run('git', ['commit', '-m', `chore: release create-hsi-app ${nextTag}`]);
    run('git', ['tag', nextTag]);
    run('git', ['push', 'origin', 'main']);
    run('git', ['push', 'origin', nextTag]);

    output.write(
        [
            '',
            `Released ${nextTag}.`,
            'GitHub Packages publish should start from the tag push workflow.',
            'Public npm is still manual:',
            '  cd packages/create-hsi-app',
            '  npm publish --registry=https://registry.npmjs.org --otp=<current-code>',
            '',
        ].join('\n')
    );
}

function assertCleanWorktree() {
    const status = run('git', ['status', '--short'], { capture: true }).trim();

    if (status) {
        throw new Error(
            'Worktree is not clean. Commit, stash, or discard changes before running the release script.'
        );
    }
}

async function promptReleaseType(currentVersion) {
    const rl = readline.createInterface({ input, output });

    try {
        output.write(`Current version: ${currentVersion}\n`);
        output.write('Choose release type:\n');

        for (const [index, releaseType] of releaseTypes.entries()) {
            output.write(`  ${index + 1}. ${releaseType}\n`);
        }

        while (true) {
            const answer = (await rl.question('Selection [1-3]: ')).trim();
            const selectedIndex = Number.parseInt(answer, 10) - 1;
            const selectedReleaseType = releaseTypes[selectedIndex];

            if (selectedReleaseType) {
                output.write(
                    `Next version: ${bumpVersion(currentVersion, selectedReleaseType)}\n`
                );
                return selectedReleaseType;
            }

            output.write('Enter 1, 2, or 3.\n');
        }
    } finally {
        rl.close();
    }
}

function bumpVersion(version, releaseType) {
    const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);

    if (!match) {
        throw new Error(`Unsupported version format: ${version}`);
    }

    const major = Number.parseInt(match[1], 10);
    const minor = Number.parseInt(match[2], 10);
    const patch = Number.parseInt(match[3], 10);

    switch (releaseType) {
        case 'patch':
            return `${major}.${minor}.${patch + 1}`;
        case 'minor':
            return `${major}.${minor + 1}.0`;
        case 'major':
            return `${major + 1}.0.0`;
        default:
            throw new Error(`Unsupported release type: ${releaseType}`);
    }
}

function updateTemplateTag(nextTag) {
    const source = readFileSync(createScriptPath, 'utf8');
    const updatedSource = source.replace(
        /const templateTag = 'v\d+\.\d+\.\d+';/,
        `const templateTag = '${nextTag}';`
    );

    if (source === updatedSource) {
        throw new Error('Failed to update templateTag.');
    }

    writeFileSync(createScriptPath, updatedSource);
}

function readJson(filePath) {
    return JSON.parse(readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
    writeFileSync(filePath, `${JSON.stringify(value, null, 4)}\n`);
}

function run(command, args, options = {}) {
    const stdio = options.capture ? 'pipe' : 'inherit';

    try {
        return execFileSync(command, args, {
            cwd: repoRoot,
            encoding: 'utf8',
            stdio,
        });
    } catch (error) {
        throw new Error(
            `Failed to run: ${command} ${args.join(' ')}\n${error.stderr ?? error.message}`
        );
    }
}

function runPackageScript(scriptName) {
    const packageManager = detectPackageManager();

    switch (packageManager) {
        case 'bun':
            run('bun', ['run', scriptName]);
            return;
        case 'pnpm':
            run('pnpm', ['run', scriptName]);
            return;
        case 'yarn':
            run('yarn', ['run', scriptName]);
            return;
        default:
            run('npm', ['run', scriptName]);
    }
}

function detectPackageManager() {
    const userAgent = process.env.npm_config_user_agent ?? '';

    if (!userAgent) {
        return 'npm';
    }

    return userAgent.split(' ')[0].split('/')[0];
}
