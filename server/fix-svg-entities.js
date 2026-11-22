import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, '..', 'public', 'assets');

function getSvgFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getSvgFiles(fullPath));
    } else if (file.endsWith('.svg')) {
      results.push(fullPath);
    }
  });
  return results;
}

const svgFiles = getSvgFiles(assetsDir);
console.log(`Found ${svgFiles.length} SVG files to inspect and fix...`);

let fixedCount = 0;

svgFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace any & that is NOT part of &amp;, &lt;, &gt;, &quot;, &apos;, or &#...;
  // Regex: &(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)
  content = content.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
    console.log(`[FIXED XML ENTITIES]: ${path.relative(assetsDir, filePath)}`);
  }
});

console.log(`✅ Fixed unescaped XML entities in ${fixedCount} SVG files.`);
