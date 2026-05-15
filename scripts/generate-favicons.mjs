/**
 * Generates all favicon PNG sizes + favicon.ico from public/favicon.svg.
 * Run once before deployment: npm run gen-favicons
 *
 * Outputs to public/:
 *   favicon-16x16.png       favicon-32x32.png       favicon-48x48.png
 *   favicon-72x72.png       favicon-96x96.png       favicon-128x128.png
 *   favicon-144x144.png     favicon-152x152.png     favicon-167x167.png
 *   favicon-180x180.png     favicon-192x192.png     favicon-512x512.png
 *   apple-touch-icon.png    (180×180)
 *   android-chrome-192x192.png
 *   android-chrome-512x512.png
 *   favicon.ico             (multi-size: 16, 32, 48)
 */

import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dir, "../public");
const svgPath = join(publicDir, "favicon.svg");
const svgBuf = readFileSync(svgPath);

const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 167, 180, 192, 512];

console.log("Generating PNG favicons…");
const pngBuffers = {};

for (const size of sizes) {
  const buf = await sharp(svgBuf, { density: 300 })
    .resize(size, size, { fit: "contain", background: { r: 247, g: 242, b: 236, alpha: 1 } })
    .png()
    .toBuffer();

  pngBuffers[size] = buf;
  writeFileSync(join(publicDir, `favicon-${size}x${size}.png`), buf);
  console.log(`  ✓ favicon-${size}x${size}.png`);
}

// Named aliases
writeFileSync(join(publicDir, "apple-touch-icon.png"), pngBuffers[180]);
console.log("  ✓ apple-touch-icon.png");

writeFileSync(join(publicDir, "android-chrome-192x192.png"), pngBuffers[192]);
console.log("  ✓ android-chrome-192x192.png");

writeFileSync(join(publicDir, "android-chrome-512x512.png"), pngBuffers[512]);
console.log("  ✓ android-chrome-512x512.png");

// Multi-size ICO (16 + 32 + 48)
console.log("Generating favicon.ico…");
const icoBuffer = await pngToIco([pngBuffers[16], pngBuffers[32], pngBuffers[48]]);
writeFileSync(join(publicDir, "favicon.ico"), icoBuffer);
console.log("  ✓ favicon.ico");

console.log("\nAll favicon assets generated successfully.");
