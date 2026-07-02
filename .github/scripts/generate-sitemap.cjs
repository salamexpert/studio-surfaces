'use strict';

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const BASE_URL = 'https://marinoceramictile.com';

const MONTH_MAP = {
  January: '01', February: '02', March: '03', April: '04',
  May: '05', June: '06', July: '07', August: '08',
  September: '09', October: '10', November: '11', December: '12',
};

function toIsoDate(dateStr) {
  const m = dateStr.match(/^(\w+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!m) return new Date().toISOString().split('T')[0];
  const month = MONTH_MAP[m[1]] || '01';
  const day = String(m[2]).padStart(2, '0');
  return `${m[3]}-${month}-${day}`;
}

function getPostsMetadata() {
  const content = fs.readFileSync(
    path.join(PROJECT_ROOT, 'src/lib/content.ts'), 'utf8',
  );
  const slugs = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
  const dates = [...content.matchAll(/date:\s*["']([^"']+)["']/g)].map((m) => m[1]);
  return slugs.map((slug, i) => ({
    slug,
    date: toIsoDate(dates[i] || ''),
  }));
}

const STATIC_PAGES = [
  { loc: '/',                  changefreq: 'weekly',  priority: '1.0' },
  { loc: '/blog',              changefreq: 'daily',   priority: '0.9' },
  { loc: '/surfaces',          changefreq: 'weekly',  priority: '0.8' },
  { loc: '/architecture',      changefreq: 'weekly',  priority: '0.8' },
  { loc: '/about',             changefreq: 'monthly', priority: '0.6' },
  { loc: '/contact',           changefreq: 'monthly', priority: '0.5' },
  { loc: '/advertise',         changefreq: 'monthly', priority: '0.4' },
  { loc: '/privacy-policy',    changefreq: 'yearly',  priority: '0.2' },
  { loc: '/terms-of-service',  changefreq: 'yearly',  priority: '0.2' },
  { loc: '/editorial-policy',  changefreq: 'yearly',  priority: '0.2' },
  { loc: '/dmca-disclaimer',   changefreq: 'yearly',  priority: '0.1' },
  { loc: '/legal-disclaimer',  changefreq: 'yearly',  priority: '0.1' },
  { loc: '/cookies-policy',    changefreq: 'yearly',  priority: '0.1' },
];

function buildSitemap(posts) {
  const today = new Date().toISOString().split('T')[0];

  const staticEntries = STATIC_PAGES
    .map(({ loc, changefreq, priority }) =>
      `  <url>\n    <loc>${BASE_URL}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
    )
    .join('\n');

  const blogEntries = posts
    .map(({ slug, date }) =>
      `  <url>\n    <loc>${BASE_URL}/blog/${slug}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Core pages -->
${staticEntries}

  <!-- Blog posts -->
${blogEntries}

</urlset>`;
}

function main() {
  console.log('🗺️  Generating sitemap…');
  const posts = getPostsMetadata();
  console.log(`  Found ${posts.length} blog posts`);
  const xml = buildSitemap(posts);
  const outPath = path.join(PROJECT_ROOT, 'public/sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`  ✅ Written: public/sitemap.xml`);
}

main();
