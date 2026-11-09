import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import * as sass from 'sass';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'src/omv-theme-qui.scss');
const output = path.join(root, 'dist/omv-theme-qui.css');
const marker = '/* MARKER */';

const pkg = JSON.parse(
    await readFile(path.join(root, 'package.json'), 'utf8')
);

const result = await sass.compileAsync(
    source,
    {
        style: 'expanded',
        sourceMap: false,
        loadPaths: [path.join(root, 'src')]
    }
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

const markerCount = result.css.split(marker).length - 1;

if (markerCount !== 1) {
    throw new Error(`Expected exactly one ${marker} in ${source}, found ${markerCount}`);
}

await mkdir(path.dirname(output), {recursive: true});
await writeFile(output, result.css.replace(marker, banner), 'utf8');

console.log(`✓ Built omv-theme-qui.css v${pkg.version}`);
