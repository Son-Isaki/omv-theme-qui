import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import * as sass from 'sass';

const root = fileURLToPath(new URL('../', import.meta.url));

const pkg = JSON.parse(
    await readFile(path.join(root, 'package.json'), 'utf8')
);

const output = path.join(root, 'dist/omv-theme-qui.css');

const result = sass.compile(
    path.join(root, 'src/omv-theme-qui.scss'),
    {
        style: 'expanded',
        sourceMap: false,
        loadPaths: [path.join(root, 'src')]
    }
);

const author = typeof pkg.author === 'string' ? pkg.author : pkg.author?.name ?? 'Unknown';
const repository = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url ?? '';
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

await mkdir(path.dirname(output), {recursive: true});
await writeFile(output, result.css.replace('/* MARKER */', banner), 'utf8');

console.log(`✓ Built omv-theme-qui.css v${pkg.version}`);
