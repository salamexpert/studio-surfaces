import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial Policy — Marino Ceramic Tile" },
      { name: "description", content: "How we report, fact-check and publish at Marino Ceramic Tile." },
      { property: "og:title", content: "Editorial Policy — Marino Ceramic Tile" },
      { property: "og:url", content: "/editorial-policy" },
    ],
    links: [{ rel: "canonical", href: "/editorial-policy" }],
  }),
  component: () => (
    <>
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
  ),
});
