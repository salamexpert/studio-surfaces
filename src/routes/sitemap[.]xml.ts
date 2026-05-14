import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { POSTS } from "@/lib/content";

const BASE_URL = "https://www.marinoceramictile.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/", "/surfaces", "/architecture", "/blog",
          "/about", "/contact",
          "/privacy-policy", "/terms-of-service", "/editorial-policy",
          "/dmca-disclaimer", "/advertise",
        ];
        const urls = [
          ...staticPaths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`),
          ...POSTS.map((p) => `  <url><loc>${BASE_URL}/blog/${p.slug}</loc><changefreq>monthly</changefreq></url>`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
