import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

function copyStaticFiles(dir = SRC_DIR)
{
    for (const entry of fs.readdirSync(dir))
    {
        const fullPath = path.join(dir, entry);
        const relPath = path.relative(SRC_DIR, fullPath);
        const outPath = path.join(DIST_DIR, relPath);

        if (fs.statSync(fullPath).isDirectory())
        {
            fs.mkdirSync(outPath, { recursive: true });
            copyStaticFiles(fullPath);
        } else if (!fullPath.endsWith('.ts'))
        {
            fs.mkdirSync(path.dirname(outPath), { recursive: true });

            if (fullPath.endsWith('.html'))
            {
                const html = fs.readFileSync(fullPath, 'utf-8');
                const updated = html
                    // Fix script src="/src/filename.ts" → ./filename.js
                    .replace(/(<script[^>]*src=["'])\/src\/([^"']+)\.ts(["'])/g, '$1./$2.js$3')
                    // Fix link href="src/filename.css" → ./filename.css
                    .replace(/(<link[^>]*href=["'])src\/([^"']+)(["'])/g, '$1./$2$3');
                fs.writeFileSync(outPath, updated, 'utf-8');
            } else
            {
                fs.copyFileSync(fullPath, outPath);
            }
        }
    }
}

function getTsEntries(dir: string): string[]
{
    const entries: string[] = [];

    const walk = (folder: string) =>
    {
        for (const file of fs.readdirSync(folder))
        {
            const fullPath = path.join(folder, file);
            if (fs.statSync(fullPath).isDirectory())
            {
                walk(fullPath);
            } else if (file.endsWith('.ts'))
            {
                entries.push(fullPath);
            }
        }
    };

    walk(dir);
    return entries;
}

export default defineConfig({
    build: {
        emptyOutDir: true,
        outDir: 'dist',
        rollupOptions: {
            input: getTsEntries(SRC_DIR),
            output: {
                entryFileNames: (chunk) =>
                    path.relative(SRC_DIR, chunk.facadeModuleId!).replace(/\.ts$/, '.js'),
                chunkFileNames: '[name].js',
                assetFileNames: '[name][extname]',
                dir: 'dist',
            },
        },
    },
    plugins: [
        {
            name: 'copy-non-ts-assets',
            apply: 'build',
            closeBundle()
            {
                copyStaticFiles();
            },
        },
    ],
});
