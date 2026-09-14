// Extract the 6 legal route files -> legal.json (title, intro, prose HTML).
import fs from 'node:fs';
import path from 'node:path';

const FILES = ['privacy-policy', 'terms-of-service', 'editorial-policy', 'dmca-disclaimer', 'legal-disclaimer', 'cookies-policy'];
const OUT = path.resolve('wordpress-theme/marino-ceramic-native/tools/legal.json');
const out = {};

for (const slug of FILES) {
  const src = fs.readFileSync(path.resolve('src/routes', slug + '.tsx'), 'utf8').replace(/\r\n/g, '\n');
  // PageHero title + intro
  const title = (src.match(/<PageHero[\s\S]*?title="([^"]*)"/) || [])[1] || slug;
  const intro = (src.match(/<PageHero[\s\S]*?intro="([^"]*)"/) || [])[1] || '';
  // grab everything inside prose-editorial <section>…</section> blocks
  let html = '';
  const re = /className="[^"]*prose-editorial[^"]*"[^>]*>([\s\S]*?)<\/section>/g;
  let m;
  while ((m = re.exec(src))) html += m[1] + '\n';
  // JSX -> HTML cleanup
  html = html
    .replace(/className="[^"]*"/g, '')          // drop class attrs
    .replace(/\{"\s*"\}/g, ' ')                    // {" "} -> space
    .replace(/<a\s+href=/g, '<a href=')
    .replace(/\s+>/g, '>')
    .replace(/\{`([^`]*)`\}/g, '$1')               // {`text`} -> text
    .replace(/<(strong|em|b|i)\s*>/g, '<$1>')
    .trim();
  out[slug] = { title, intro, content: html };
}
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log('legal:', Object.keys(out).map((k) => `${k}(${out[k].content.length})`).join(', '));
