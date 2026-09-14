// Extract studio-surfaces src/lib/content.ts -> posts.json (block content -> HTML).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SRC = path.resolve('src/lib/content.ts');
const OUT = path.resolve('wordpress-theme/marino-ceramic-native/tools/posts.json');

let ts = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
ts = ts.replace(/import\s+(\w+)\s+from\s+"@\/assets\/([^"]+)";/g, 'const $1 = "$2";');
ts = ts.replace(/export type BlogPost = \{[\s\S]*?\n\};\n/, '');
ts = ts.replace(/:\s*BlogPost\[\]/g, '');
ts = ts.replace(/\((\w+):\s*[A-Za-z0-9_<>\[\]]+(?:,\s*\w+\s*=\s*\d+)?\)/g, (m) => m.replace(/:\s*[A-Za-z0-9_<>\[\]]+/g, ''));
ts = ts.replace(/\nexport const \w+\s*=\s*\([^)]*\)\s*=>[\s\S]*$/, '\n');
const tmp = path.resolve('src/lib/_content.mjs');
fs.writeFileSync(tmp, ts);
const mod = await import(pathToFileURL(tmp).href);
fs.unlinkSync(tmp);

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function block(b) {
  switch (b.type) {
    case 'p': return `<p>${esc(b.text)}</p>`;
    case 'h2': return `<h2>${esc(b.text)}</h2>`;
    case 'h3': return `<h3>${esc(b.text)}</h3>`;
    case 'quote': return `<blockquote>${esc(b.text)}</blockquote>`;
    case 'ul': return `<ul>${(b.items || []).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
    default: return '';
  }
}
const posts = (mod.POSTS || []).map((p) => ({
  slug: p.slug,
  title: p.title,
  seoTitle: p.seoTitle || '',
  excerpt: p.excerpt || '',
  category: p.category || '',
  author: p.author || 'Marino Ceramic Tile',
  date: p.date || '',
  readingTime: p.readingTime || '',
  cover: p.cover || '',
  content: (p.content || []).map(block).join('\n'),
  faqs: (p.faq || []).map((f) => [f.question, f.answer]),
}));
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(posts, null, 2));
console.log(`Wrote ${posts.length} posts`);
console.log('categories:', [...new Set(posts.map((p) => p.category))].join(', '));
console.log('external covers:', posts.filter((p) => /^https?:/.test(p.cover)).length, '/ local:', posts.filter((p) => p.cover && !/^https?:/.test(p.cover)).length);
console.log('with faq:', posts.filter((p) => p.faqs.length).length);
