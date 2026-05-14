import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/dmca-disclaimer")({
  head: () => ({
    meta: [
      { title: "DMCA Disclaimer — Marino Ceramic Tile" },
      { name: "description", content: "DMCA copyright infringement notice procedure for Marino Ceramic Tile." },
      { property: "og:title", content: "DMCA Disclaimer — Marino Ceramic Tile" },
      { property: "og:url", content: "/dmca-disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/dmca-disclaimer" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="DMCA Disclaimer" intro="Procedure for copyright infringement notices." />
      <section className="container-editorial max-w-3xl prose-editorial">
        <p>Marino Ceramic Tile respects the intellectual property rights of others and asks our readers to do the same.</p>
        <h2>Filing a notice</h2>
        <p>If you believe content on our site infringes your copyright, please send a written notice to editors@marinoceramictile.com containing:</p>
        <ul>
          <li>A description of the copyrighted work you claim has been infringed</li>
          <li>The URL of the infringing material on our site</li>
          <li>Your contact information</li>
          <li>A statement that you have a good-faith belief that the use is unauthorised</li>
          <li>A statement, made under penalty of perjury, that the above is accurate and that you are the rights holder or authorised to act on their behalf</li>
        </ul>
        <h2>Counter notice</h2>
        <p>If you believe content of yours was removed in error, you may file a counter notice using the same address. We will review counter notices in good faith.</p>
      </section>
    </>
  ),
});
