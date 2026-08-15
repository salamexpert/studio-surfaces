import { PageHero } from "@/components/site/PageHero";
import { SEO } from "@/components/SEO";

const BASE_URL = "https://marinoceramictile.com";

export function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms governing use of the Marino Ceramic Tile editorial publication and its content. Includes content policy, recommendations disclaimer and liability limitations."
        canonical="/terms-of-service"
        breadcrumbs={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Terms of Service", item: `${BASE_URL}/terms-of-service` },
        ]}
      />

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
  );
}
