import { PageHero } from "@/components/site/PageHero";
import { SEO } from "@/components/SEO";

const BASE_URL = "https://marinoceramictile.com";

export function EditorialPolicyPage() {
  return (
    <>
      <SEO
        title="Editorial Policy — Standards & Independence | Marino"
        description="How Marino Ceramic Tile reports, fact-checks and publishes. Our editorial standards for independence, sourcing, photography and corrections."
        canonical="/editorial-policy"
        breadcrumbs={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "About", item: `${BASE_URL}/about` },
          { name: "Editorial Policy", item: `${BASE_URL}/editorial-policy` },
        ]}
      />

      <PageHero eyebrow="About" title="Editorial Policy" intro="Our standards for reporting, fact-checking and disclosure." />
      <section className="container-editorial max-w-3xl prose-editorial">
        <h2>Independence</h2>
        <p>Marino Ceramic Tile accepts no payment from manufacturers in exchange for editorial coverage. Sponsored content, when it appears, is clearly labelled as such and editorially separate.</p>
        <h2>Sources</h2>
        <p>Where possible, our writers visit projects in person. Material claims are verified against manufacturer technical data and, where the writer's expertise allows, independent specification.</p>
        <h2>Corrections</h2>
        <p>We correct errors openly and quickly. Any substantive change to a published article is noted at the foot of the article with the date and reason for the correction.</p>
        <h2>Photography</h2>
        <p>All photography credited to Marino Ceramic Tile is original to this publication. Where third-party photography appears, it is credited and used with permission or under appropriate licence.</p>
      </section>
    </>
  );
}
