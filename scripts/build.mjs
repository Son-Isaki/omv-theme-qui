import {readFile, readdir, mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import * as sass from 'sass';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceDir = path.join(root, 'src/scss');
const outputDir = path.join(root, 'dist/css');
const marker = '/* MARKER */';

const pkg = JSON.parse(
    await readFile(path.join(root, 'package.json'), 'utf8')
);

const author = typeof pkg.author === 'string' ? pkg.author : pkg.author?.name ?? 'Unknown';
const repository = typeof pkg.repository === 'string'
    ? pkg.repository
    : pkg.repository?.url ?? pkg.author?.url ?? '';
const url = repository.replace(/^git\+/, '').replace(/\.git$/, '');
const buildDate = new Date().toISOString().slice(0, 10);

const banner = `
/*
 * ${pkg.name}
 * OMV 8 / ThemeKit — ${pkg.description}
 *
 * Version: ${pkg.version}
 * Date: ${buildDate}
 * Author: ${author}
 * Repository: ${url}
 *
 * Install: System > Theme Kit > Custom CSS.
 * Keep the default theme enabled (Native OMV).
 * For quick rollback: disable Custom CSS in ThemeKit.
 */

:root {
  --qui-theme-version: "${pkg.version}";
}

`;

const entries = (await readdir(sourceDir, {withFileTypes: true}))
    .filter((entry) => entry.isFile() && path.extname(entry.name) === '.scss')
    .sort((a, b) => a.name.localeCompare(b.name));

if (entries.length === 0) {
    throw new Error(`No SCSS entry files found in ${sourceDir}`);
}

await mkdir(outputDir, {recursive: true});

await Promise.all(entries.map(async (entry) => {
    const source = path.join(sourceDir, entry.name);
    const outputName = `${path.basename(entry.name, '.scss')}.css`;
    const output = path.join(outputDir, outputName);
    const result = await sass.compileAsync(source, {
        style: 'expanded',
        sourceMap: false,
        loadPaths: [sourceDir]
    });
    const markerCount = result.css.split(marker).length - 1;

    if (markerCount !== 1) {
        throw new Error(`Expected exactly one ${marker} in ${source}, found ${markerCount}`);
    }

    await writeFile(output, result.css.replace(marker, banner), 'utf8');
    console.log(`✓ Built ${outputName} v${pkg.version}`);
}));
