import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/advertise")({
  head: () => ({
    meta: [
      { title: "Advertise — Marino Ceramic Tile" },
      { name: "description", content: "Reach an engaged audience of architects, interior designers and discerning homeowners through Marino Ceramic Tile." },
      { property: "og:title", content: "Advertise — Marino Ceramic Tile" },
      { property: "og:url", content: "/advertise" },
    ],
    links: [{ rel: "canonical", href: "/advertise" }],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Advertise with us."
        intro="Reach an engaged audience of architects, interior designers and discerning homeowners through carefully curated editorial partnerships."
      />
      <section className="container-editorial grid md:grid-cols-2 gap-16">
        <div className="prose-editorial">
          <h2>Our readers</h2>
          <p>Practising architects, interior designers, specifiers, developers, gallery owners and homeowners actively renovating in the premium and luxury segments. Concentrated in Europe, North America and the Asia-Pacific.</p>
          <h2>Formats</h2>
          <ul>
            <li>Sponsored editorial features (clearly labelled)</li>
            <li>Newsletter sponsorship</li>
            <li>Material library partnerships</li>
            <li>Bespoke content collaborations</li>
          </ul>
          <h2>Our standards</h2>
          <p>We accept a small number of partners each season. All sponsored content is editorially independent and visibly disclosed. We do not run banner advertising.</p>
        </div>
        <aside className="bg-secondary/60 p-10 self-start">
          <p className="eyebrow mb-4">Get in touch</p>
          <h3 className="font-serif text-3xl">partnerships@<br/>marinoceramictile.com</h3>
          <p className="mt-6 text-sm text-muted-foreground">
            Send a brief outline of your brand and intended campaign. We respond to enquiries within five working days.
          </p>
        </aside>
      </section>
    </>
  ),
});
