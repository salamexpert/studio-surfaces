import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Marino Ceramic Tile" },
      { name: "description", content: "How Marino Ceramic Tile collects, uses and protects your information." },
      { property: "og:title", content: "Privacy Policy — Marino Ceramic Tile" },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" intro="Last updated April 02, 2026." />
      <section className="container-editorial max-w-3xl prose-editorial">
        <p>This privacy policy describes how Marino Ceramic Tile ("we", "us") collects and uses information when you visit our editorial publication.</p>
        <h2>Information we collect</h2>
        <p>We collect minimal information necessary to operate the publication: aggregated analytics about how readers move through the site, and the email addresses of those who voluntarily subscribe to The Marino Dispatch.</p>
        <h2>How we use information</h2>
        <p>We use information solely to improve the editorial experience and to send the newsletters you have asked to receive. We do not sell or share reader data with third parties.</p>
        <h2>Cookies</h2>
        <p>We use minimal first-party cookies for analytics. You can disable cookies in your browser at any time without affecting your ability to read.</p>
        <h2>Your rights</h2>
        <p>You may unsubscribe from the newsletter at any time using the link at the foot of every email. You may request deletion of your data by writing to editors@marinoceramictile.com.</p>
      </section>
    </>
  ),
});
