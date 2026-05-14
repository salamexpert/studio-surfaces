import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Marino Ceramic Tile" },
      { name: "description", content: "Terms governing use of the Marino Ceramic Tile editorial publication." },
      { property: "og:title", content: "Terms of Service — Marino Ceramic Tile" },
      { property: "og:url", content: "/terms-of-service" },
    ],
    links: [{ rel: "canonical", href: "/terms-of-service" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" intro="Last updated April 02, 2026." />
      <section className="container-editorial max-w-3xl prose-editorial">
        <p>By using Marino Ceramic Tile you agree to the following terms.</p>
        <h2>Editorial content</h2>
        <p>All editorial content, photography and design is the intellectual property of Marino Ceramic Tile or its contributing authors. You may share short excerpts and link freely to our pages. You may not republish complete articles without written permission.</p>
        <h2>Recommendations</h2>
        <p>Our material recommendations are editorial opinions, not professional specifications. Always engage a qualified architect, interior designer or installer before committing to a renovation.</p>
        <h2>Limitation of liability</h2>
        <p>Marino Ceramic Tile is provided as-is. We accept no liability for outcomes resulting from decisions made on the basis of our editorial content.</p>
        <h2>Changes</h2>
        <p>We may update these terms periodically. Continued use of the site constitutes acceptance of any changes.</p>
      </section>
    </>
  ),
});
