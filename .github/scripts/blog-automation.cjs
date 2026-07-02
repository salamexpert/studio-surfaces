'use strict';

const Groq = require('groq-sdk');
const { google } = require('googleapis');
const sharp = require('sharp');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Project root is two levels up from .github/scripts/
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

// ==================== CONFIGURATION ====================
const CONFIG = {
  websiteName: 'Marino Ceramic Tile',
  websiteUrl: 'https://marinoceramictile.com',
  niche: 'ceramic tiles, porcelain surfaces, interior design, luxury bathrooms, modern architecture, and surface materials for contemporary homes',
  groqApiKey: process.env.GROQ_API_KEY,
  pexelsApiKey: process.env.PEXELS_API_KEY,
  unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
  googleCredentials: process.env.GOOGLE_CREDENTIALS,
  spreadsheetId: process.env.SPREADSHEET_ID,
  imageDelay: 1000,
  postsFile: 'src/lib/content.ts',
  imagesDir: 'public/blog-images',
  branch: 'main',
  sheetName: 'Sheet1',
  authors: [
    'Elena Marchetti', 'Joaquim Reyes', 'Saoirse Bennett', 'Mira Vannier',
    'Ines Aldana', 'Annika Holm', 'Theo Castellan', 'Pavel Krasnov',
    'Lior Avnet', 'Cosima Lindqvist',
  ],
  categories: ['Surfaces', 'Bathrooms', 'Kitchens', 'Architecture'],
  minWordCount: 1200,
  maxWordCount: 2500,
};

// ==================== VALIDATION ====================
function validateConfig() {
  const required = ['groqApiKey', 'pexelsApiKey', 'googleCredentials', 'spreadsheetId'];
  const missing = required.filter((key) => !CONFIG[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// ==================== UTILITIES ====================
function generateSlug(topic) {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
}

function formatDate(date) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function calculateReadTime(content) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return `${Math.max(5, Math.round(words / 200))} min read`;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getExistingSlugs() {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, CONFIG.postsFile), 'utf8');
  return [...content.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
}

function articleAlreadyExists(slug) {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, CONFIG.postsFile), 'utf8');
  return content.includes(`slug: "${slug}"`);
}

// ==================== GOOGLE SHEETS ====================
async function getGoogleSheetsClient() {
  const credentials = JSON.parse(CONFIG.googleCredentials);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();
  return google.sheets({ version: 'v4', auth: authClient });
}

async function getSheetData(sheetsClient) {
  const response = await sheetsClient.spreadsheets.values.get({
    spreadsheetId: CONFIG.spreadsheetId,
    range: `${CONFIG.sheetName}!A:F`,
  });
  return response.data.values || [];
}

async function updateSheetRow(sheetsClient, rowIndex, data) {
  await sheetsClient.spreadsheets.values.update({
    spreadsheetId: CONFIG.spreadsheetId,
    range: `${CONFIG.sheetName}!A${rowIndex}:F${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: { values: [data] },
  });
}

// ==================== GROQ AI ====================
async function generateBlogContent(topic, brief, attempt = 1) {
  const groq = new Groq({ apiKey: CONFIG.groqApiKey });

  const contentRequirements = brief
    ? `\n\nContent requirements — cover these points:\n${brief}`
    : '';

  const categoriesList = CONFIG.categories.join(' | ');

  const prompt = `You are an editorial writer for Marino Ceramic Tile (${CONFIG.websiteUrl}), an independent publication specialising in ${CONFIG.niche}.

Write a complete, expert editorial article about: "${topic}"${contentRequirements}

Return your response using EXACTLY these delimiters in this order:

META_DESCRIPTION: [150–160 character meta description including the primary keyword]

CATEGORY: [pick exactly one: ${categoriesList}]

EXCERPT: [1–2 sentence editorial hook that states what the reader will discover — under 160 characters]

CONTENT_START
[full article body — follow the FORMAT RULES below]
CONTENT_END

FAQ_START
Q: [Question 1 ending with ?]
A: [Answer 1, 2–3 sentences]
Q: [Question 2 ending with ?]
A: [Answer 2, 2–3 sentences]
Q: [Question 3 ending with ?]
A: [Answer 3, 2–3 sentences]
Q: [Question 4 ending with ?]
A: [Answer 4, 2–3 sentences]
Q: [Question 5 ending with ?]
A: [Answer 5, 2–3 sentences]
FAQ_END

=== FORMAT RULES FOR CONTENT (strictly follow) ===
Plain text paragraphs: one paragraph per line
Separate sections with a blank line above the heading
H2 heading: ## Heading text
H3 heading: ### Subheading text
Block quote: > Quote text (use sparingly, 1–2 per article, for memorable statements only)
Bullet list item: - item text
Bold within a paragraph: **bold text**
External link (sparingly, well-known sources only): [anchor text](https://example.com)
DO NOT use HTML tags
DO NOT use markdown tables
DO NOT use image placeholders
DO NOT wrap in code fences
Target ${CONFIG.minWordCount}–${CONFIG.maxWordCount} words
Tone: authoritative, editorial, warm — like a design publication, not a how-to manual
Start with a brief overview paragraph, then use ## sections for each major topic`;

  let text;
  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 4096,
    });
    text = (completion.choices[0]?.message?.content || '').trim();
  } catch (err) {
    const is429 = err?.message?.includes('429') || err?.status === 429;
    if (is429 && attempt <= 4) {
      const waitMs = attempt * 30000;
      console.warn(`  ⏳ Groq rate-limited. Waiting ${waitMs / 1000}s before retry ${attempt}/4…`);
      await delay(waitMs);
      return generateBlogContent(topic, brief, attempt + 1);
    }
    throw err;
  }

  if (text.startsWith('```')) {
    text = text.replace(/^[^\n]*\n?/, '').replace(/```\s*$/, '').trim();
  }

  return parseOutput(text);
}

function parseOutput(raw) {
  const get = (key) => {
    const match = raw.match(new RegExp(`${key}:\\s*(.+?)(?:\\n|$)`, 'i'));
    return match ? match[1].trim() : '';
  };

  const metaDescription = get('META_DESCRIPTION');
  const rawCategory = get('CATEGORY');
  const category = CONFIG.categories.find(
    (c) => c.toLowerCase() === rawCategory.toLowerCase(),
  ) || CONFIG.categories[0];
  const excerpt = get('EXCERPT');

  const contentMatch = raw.match(/CONTENT_START\n([\s\S]*?)\nCONTENT_END/);
  const content = contentMatch ? contentMatch[1].trim() : '';

  const faqMatch = raw.match(/FAQ_START\n([\s\S]*?)\nFAQ_END/);
  const faqs = [];
  if (faqMatch) {
    const qMatches = [...faqMatch[1].matchAll(/Q:\s*(.+?)\nA:\s*([\s\S]+?)(?=\nQ:|\s*$)/g)];
    for (const m of qMatches) {
      faqs.push({ q: m[1].trim(), a: m[2].trim().replace(/\n/g, ' ') });
    }
  }

  return { metaDescription, category, excerpt, content, faqs };
}

// ==================== MARKDOWN → CONTENT BLOCKS ====================
function stripInlineMarkdown(text) {
  // Remove **bold**, _italic_, `code` — keep [text](url) which renderInlineLinks handles
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/`(.+?)`/g, '$1');
}

function markdownToBlocks(content) {
  const lines = content.split('\n');
  const blocks = [];
  let ulItems = null;

  const flushUl = () => {
    if (ulItems && ulItems.length > 0) {
      blocks.push({ type: 'ul', items: ulItems });
      ulItems = null;
    }
  };

  for (const line of lines) {
    const t = line.trim();

    if (!t) {
      flushUl();
      continue;
    }

    if (t.startsWith('## ')) {
      flushUl();
      blocks.push({ type: 'h2', text: stripInlineMarkdown(t.slice(3).trim()) });
    } else if (t.startsWith('### ')) {
      flushUl();
      blocks.push({ type: 'h3', text: stripInlineMarkdown(t.slice(4).trim()) });
    } else if (t.startsWith('> ')) {
      flushUl();
      blocks.push({ type: 'quote', text: stripInlineMarkdown(t.slice(2).trim()) });
    } else if (t.startsWith('- ')) {
      if (!ulItems) ulItems = [];
      ulItems.push(stripInlineMarkdown(t.slice(2).trim()));
    } else if (/^\d+\.\s/.test(t)) {
      // Numbered lists → treat as bullet items (no ol type in BlogPost schema)
      if (!ulItems) ulItems = [];
      ulItems.push(stripInlineMarkdown(t.replace(/^\d+\.\s+/, '').trim()));
    } else {
      flushUl();
      const stripped = stripInlineMarkdown(t);
      if (stripped) blocks.push({ type: 'p', text: stripped });
    }
  }

  flushUl();
  return blocks;
}

// ==================== IMAGE HANDLING ====================
async function fetchPexelsImage(query) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.pexels.com',
      path: `/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`,
      headers: { Authorization: CONFIG.pexelsApiKey },
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.photos && response.photos.length > 0) {
            resolve(response.photos[0].src.large2x || response.photos[0].src.large);
          } else {
            reject(new Error('No Pexels images found'));
          }
        } catch (error) { reject(error); }
      });
    }).on('error', reject);
  });
}

async function fetchUnsplashImage(query) {
  return new Promise((resolve, reject) => {
    if (!CONFIG.unsplashAccessKey) return reject(new Error('No UNSPLASH_ACCESS_KEY'));
    const options = {
      hostname: 'api.unsplash.com',
      path: `/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      headers: {
        Authorization: `Client-ID ${CONFIG.unsplashAccessKey}`,
        'Accept-Version': 'v1',
      },
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.results && response.results.length > 0) {
            resolve(response.results[0].urls.regular);
          } else {
            reject(new Error('No Unsplash images found'));
          }
        } catch (error) { reject(error); }
      });
    }).on('error', reject);
  });
}

async function downloadImage(url) {
  const client = url.startsWith('https') ? https : http;
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (chunk) => { chunks.push(chunk); });
      res.on('end', () => { resolve(Buffer.concat(chunks)); });
    }).on('error', reject);
  });
}

async function fetchCoverImage(slug, topic) {
  const imagesDir = path.join(PROJECT_ROOT, CONFIG.imagesDir);
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

  const query = `${topic} interior design ceramic tile`;
  const fileName = `${slug}.jpg`;
  const filePath = path.join(imagesDir, fileName);

  console.log(`  📸 Fetching cover image: "${query.slice(0, 70)}…"`);

  try {
    let url;
    try {
      url = await fetchPexelsImage(query);
      console.log('    ✓ Pexels');
    } catch {
      console.log('    Pexels failed, trying Unsplash…');
      url = await fetchUnsplashImage(query);
      console.log('    ✓ Unsplash');
    }

    const buffer = await downloadImage(url);
    const processed = await sharp(buffer)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 88 })
      .toBuffer();

    fs.writeFileSync(filePath, processed);
    console.log(`    ✅ Saved: ${fileName}`);
    return `/blog-images/${fileName}`;
  } catch (err) {
    console.error(`    ❌ Image fetch failed: ${err.message}`);
    return null;
  }
}

// ==================== STRING ESCAPING ====================
function escapeForDoubleQuote(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, ' ');
}

// ==================== POST ENTRY BUILDER ====================
function buildBlockTs(block) {
  if (block.type === 'ul') {
    const items = block.items
      .map((item) => `          "${escapeForDoubleQuote(item)}"`)
      .join(',\n');
    return `      { type: "ul", items: [\n${items},\n      ]},`;
  }
  return `      { type: "${block.type}", text: "${escapeForDoubleQuote(block.text || '')}" },`;
}

function buildPostEntry(slug, title, excerpt, category, cover, date, readTime, author, blocks, faqs) {
  const blocksTs = blocks.map(buildBlockTs).join('\n');
  const faqsTs = faqs
    .map((f) => `      { question: "${escapeForDoubleQuote(f.q)}", answer: "${escapeForDoubleQuote(f.a)}" },`)
    .join('\n');

  return `  {
    slug: "${slug}",
    title: "${escapeForDoubleQuote(title)}",
    excerpt: "${escapeForDoubleQuote(excerpt)}",
    category: "${category}",
    author: "${author}",
    date: "${date}",
    readingTime: "${readTime}",
    cover: "${cover}",
    content: [
${blocksTs}
    ],
    faq: [
${faqsTs}
    ],
  },`;
}

// ==================== FILE INSERTION ====================
function insertPostIntoContent(entry) {
  const filePath = path.join(PROJECT_ROOT, CONFIG.postsFile);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const marker = '\n];\n\nexport const getPost';
  const insertionPoint = fileContent.indexOf(marker);
  if (insertionPoint === -1) {
    throw new Error(
      'Insertion point not found in content.ts — expected "\\n];\\n\\nexport const getPost"',
    );
  }
  const updated =
    fileContent.slice(0, insertionPoint) + '\n' + entry + fileContent.slice(insertionPoint);
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log('  ✅ Inserted post into src/lib/content.ts');
}

// ==================== MAIN PROCESS PER TOPIC ====================
async function processTopic(sheetsClient, topic, brief, rowIndex) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📝 Processing: "${topic}"`);
  console.log(`${'='.repeat(70)}\n`);

  const slug = generateSlug(topic);
  const today = formatDate(new Date());
  const todayIso = new Date().toISOString().split('T')[0];

  if (articleAlreadyExists(slug)) {
    console.log(`  ⚠️  Slug "${slug}" already exists — skipping.`);
    await updateSheetRow(sheetsClient, rowIndex, [topic, 'Duplicate', slug, todayIso, todayIso, brief || '']);
    return;
  }

  await updateSheetRow(sheetsClient, rowIndex, [topic, 'Generating', slug, todayIso, '', brief || '']);

  try {
    // 1. Generate content with Groq
    console.log('🤖 Generating content with Groq…');
    const { metaDescription, category, excerpt, content, faqs } =
      await generateBlogContent(topic, brief);
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    console.log(`  ✅ Content generated (~${wordCount} words)`);
    console.log(`  ✅ Category: ${category}`);
    console.log(`  ✅ FAQs: ${faqs.length}`);

    // 2. Parse markdown into content blocks
    const blocks = markdownToBlocks(content);
    console.log(`  ✅ Content blocks: ${blocks.length}`);

    // 3. Fetch cover image
    console.log('\n📸 Fetching cover image…');
    const coverPath = await fetchCoverImage(slug, topic);
    // Fallback to a neutral interior image if both APIs fail
    const cover = coverPath || 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80';

    // 4. Build and insert post entry
    const author = pickRandom(CONFIG.authors);
    const readTime = calculateReadTime(content);
    const finalExcerpt = (excerpt || metaDescription).slice(0, 200);

    console.log('\n📝 Inserting post into content.ts…');
    const entry = buildPostEntry(
      slug, topic, finalExcerpt, category,
      cover, today, readTime, author, blocks, faqs,
    );
    insertPostIntoContent(entry);

    // 5. Mark as published in sheet
    await updateSheetRow(sheetsClient, rowIndex, [topic, 'Published', slug, todayIso, todayIso, brief || '']);

    console.log(`\n${'='.repeat(70)}`);
    console.log(`✅ Published: ${topic}`);
    console.log(`🔗 URL: ${CONFIG.websiteUrl}/blog/${slug}`);
    console.log(`${'='.repeat(70)}\n`);
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`);
    console.error(err.stack);
    try {
      await updateSheetRow(sheetsClient, rowIndex, [topic, 'Failed', slug, todayIso, '', brief || '']);
    } catch (_) {}
    throw err;
  }
}

// ==================== MAIN ====================
async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('🚀 BLOG AUTOMATION — Marino Ceramic Tile');
  console.log('='.repeat(70) + '\n');

  try {
    console.log('🔍 Validating configuration…');
    validateConfig();
    console.log('✅ Config valid\n');

    console.log('🔌 Connecting to Google Sheets…');
    const sheetsClient = await getGoogleSheetsClient();
    console.log('✅ Connected\n');

    console.log('📖 Reading existing article slugs…');
    const existingSlugs = getExistingSlugs();
    console.log(`  Found ${existingSlugs.length} existing slugs\n`);

    console.log('📊 Fetching sheet data…');
    const rows = await getSheetData(sheetsClient);
    console.log(`  Found ${rows.length} rows\n`);

    // Process ONE pending row per run (row 0 = header, skip it)
    const pendingIndex = rows.findIndex(
      (r, idx) => idx > 0 && (!r[1] || r[1].toLowerCase() === 'pending'),
    );

    if (pendingIndex === -1) {
      console.log('✅ No pending topics. Nothing to do.');
    } else {
      const row = rows[pendingIndex];
      const [topic, , , , , brief] = row;
      console.log(`📍 Found pending topic at row ${pendingIndex + 1}: "${topic}"\n`);
      await processTopic(sheetsClient, topic, brief || '', pendingIndex + 1);
      console.log('\n✅ Done. Next run will process the next pending row.');
    }

    console.log('\n' + '='.repeat(70));
    console.log('✅ AUTOMATION COMPLETE');
    console.log('='.repeat(70) + '\n');
  } catch (err) {
    console.error('\n❌ FATAL:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

main();
