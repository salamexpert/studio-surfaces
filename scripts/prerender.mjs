import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");

async function prerender() {
  console.log("Starting static HTML prerendering...");

  const templatePath = path.resolve(distDir, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error("dist/index.html not found. Run vite build first.");
  }
  const template = fs.readFileSync(templatePath, "utf-8");

  // Create a Vite dev server in SSR mode to load entry-server.tsx cleanly
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    root: rootDir,
  });

  let renderFn;
  let routesList = [];

  try {
    const entryServer = await vite.ssrLoadModule("/src/entry-server.tsx");
    renderFn = entryServer.render;
    routesList = entryServer.routes;
  } finally {
    await vite.close();
  }

  console.log(`Prerendering ${routesList.length} routes...`);

  // Load manifest mapping (Vite output manifest)
  const manifestPath = fs.existsSync(path.resolve(distDir, ".vite/manifest.json"))
    ? path.resolve(distDir, ".vite/manifest.json")
    : fs.existsSync(path.resolve(distDir, "manifest.json"))
      ? path.resolve(distDir, "manifest.json")
      : null;

  const assetMap = new Map();
  if (manifestPath) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    for (const [srcKey, entry] of Object.entries(manifest)) {
      if (entry.file) {
        const cleanKey = srcKey.startsWith("/") ? srcKey : "/" + srcKey;
        assetMap.set(cleanKey, "/" + entry.file);
      }
    }
  }

  // Fallback: Also scan dist/assets folder directly if any file isn't in manifest
  const assetsDir = path.resolve(distDir, "assets");
  if (fs.existsSync(assetsDir)) {
    const distFiles = fs.readdirSync(assetsDir);
    for (const file of distFiles) {
      const match = file.match(/^(.+)-[A-Za-z0-9_-]+\.([a-zA-Z0-9]+)$/);
      if (match) {
        const [, origName, ext] = match;
        const srcPath = `/src/assets/${origName}.${ext}`;
        if (!assetMap.has(srcPath)) {
          assetMap.set(srcPath, `/assets/${file}`);
        }
      }
    }
  }

  for (const url of routesList) {
    try {
      const { html, helmet } = renderFn(url);

      let pageHtml = template;

      // Extract helmet tags
      const headContent = [
        helmet?.meta?.toString(),
        helmet?.link?.toString(),
        helmet?.script?.toString(),
      ]
        .filter(Boolean)
        .join("\n");

      const titleTag = helmet?.title?.toString();

      if (titleTag) {
        pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, titleTag);
      }

      if (headContent) {
        pageHtml = pageHtml.replace("</head>", `${headContent}\n</head>`);
      }

      // Inject rendered markup
      pageHtml = pageHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      );

      // Transform raw /src/assets/* paths to production /assets/* hashed paths
      for (const [srcUrl, distUrl] of assetMap.entries()) {
        pageHtml = pageHtml.replaceAll(srcUrl, distUrl);
        const relSrcUrl = srcUrl.startsWith("/") ? srcUrl.slice(1) : srcUrl;
        pageHtml = pageHtml.replaceAll(relSrcUrl, distUrl);
      }

      // Determine output path
      let filePath;
      if (url === "/") {
        filePath = path.resolve(distDir, "index.html");
      } else {
        const routePath = url.startsWith("/") ? url.slice(1) : url;
        const targetDir = path.resolve(distDir, routePath);
        fs.mkdirSync(targetDir, { recursive: true });
        filePath = path.resolve(targetDir, "index.html");
      }

      fs.writeFileSync(filePath, pageHtml, "utf-8");
      console.log(`✓ Prerendered ${url} -> ${path.relative(rootDir, filePath)}`);
    } catch (err) {
      console.error(`✗ Failed to prerender ${url}:`, err);
    }
  }

  console.log("Static HTML prerendering completed successfully!");
}

prerender().catch((err) => {
  console.error("Prerender error:", err);
  process.exit(1);
});
