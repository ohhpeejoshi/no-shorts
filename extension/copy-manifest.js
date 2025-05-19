// copy-manifest.js
import { copyFileSync, mkdirSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define paths
const publicDir = join(__dirname, 'public');
const distDir = join(__dirname, 'dist');

// Create icons directory in dist
const distIconsDir = join(distDir, 'icons');
if (!existsSync(distIconsDir)) {
    mkdirSync(distIconsDir, { recursive: true });
}

// Copy manifest.json from public to dist
console.log('Copying manifest.json to dist directory...');
copyFileSync(
    join(publicDir, 'manifest.json'),
    join(distDir, 'manifest.json')
);

// Look for icons in public/icons and copy them to dist/icons
const publicIconsDir = join(publicDir, 'icons');
if (existsSync(publicIconsDir)) {
    console.log('Copying icons to dist directory...');
    const iconFiles = readdirSync(publicIconsDir);
    iconFiles.forEach(file => {
        copyFileSync(
            join(publicIconsDir, file),
            join(distIconsDir, file)
        );
    });
}

console.log('Build process completed.');