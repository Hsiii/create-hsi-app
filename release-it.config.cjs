const syncCreateHsiAppVersion = `node -e ${JSON.stringify(`
const fs = require('node:fs');
const root = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = root.version;
const packagePath = 'packages/create-hsi-app/package.json';
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
packageJson.version = version;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 4) + '\\n');
const scriptPath = 'packages/create-hsi-app/bin/create-hsi-app.mjs';
const source = fs.readFileSync(scriptPath, 'utf8');
const next = source.replace(
    /const templateTag = 'v\\d+\\.\\d+\\.\\d+';/,
    "const templateTag = 'v" + version + "';"
);
if (source === next) {
    throw new Error('templateTag not found');
}
fs.writeFileSync(scriptPath, next);
`)}`;

module.exports = {
    git: {
        commitMessage: 'chore: release create-hsi-app v${version}',
        tagName: 'v${version}',
    },
    github: {
        autoGenerate: true,
        release: true,
    },
    hooks: {
        'before:bump': 'bun run check',
        'after:bump': syncCreateHsiAppVersion,
        'before:git:release':
            'git add packages/create-hsi-app/package.json packages/create-hsi-app/bin/create-hsi-app.mjs',
        'after:git:release':
            'npm publish packages/create-hsi-app --registry=https://registry.npmjs.org',
    },
    npm: false,
};
