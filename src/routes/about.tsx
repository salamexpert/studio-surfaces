import { PageHero } from "@/components/site/PageHero";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import aboutHero from "@/assets/about-hero.jpg";
import { SEO } from "@/components/SEO";

const BASE_URL = "https://marinoceramictile.com";

export function AboutPage() {
  return (
    <>
      <SEO
        title="About Marino — Independent Ceramic & Architecture Editorial"
        description="Marino Ceramic Tile is an independent editorial publication on ceramic surfaces, modern architecture and contemporary interior design. Built by a team of architects and writers."
        canonical="/about"
        ogImage={`${BASE_URL}/og-about.jpg`}
        breadcrumbs={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "About", item: `${BASE_URL}/about` },
        ]}
        webPageType="AboutPage"
      />

      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "About" }]} />

      <PageHero
        eyebrow="About"
        title="An editorial publication on the materials that define how we live."
        intro="Marino Ceramic Tile is an independent journal covering ceramic surfaces, modern architecture and contemporary interior design. Published continuously from a small studio."
        image={aboutHero}
      />

      <section className="container-editorial grid md:grid-cols-12 gap-12">
        <div className="md:col-span-7 prose-editorial">
          <h2>What we do</h2>
          <p>We write long-form, considered editorial about the surfaces and spaces shaping contemporary residential design. We do not sell tile. We do not represent manufacturers. Our only loyalty is to the rooms we admire and to the readers who share that loyalty.</p>
          <h2>How we work</h2>
          <p>Each week we publish a featured essay, a material study and a short architectural notebook entry. Our writers visit every project in person where possible. Our material recommendations come from working specifications used by practising architects and interior designers — not from press releases.</p>
          <h2>Who we are</h2>
          <p>A small editorial team based across Milan, Brooklyn and Lisbon. Our editor in chief, Elena Marchetti, is a former practising architect. Our writers come from architecture, interior design and editorial backgrounds.</p>
        </div>
        <aside className="md:col-span-5">
          <div className="bg-secondary/60 p-8">
            <p className="eyebrow mb-4">Editorial principles</p>
            <ul className="space-y-3 text-sm">
              {["Independence from manufacturers","Long-form over listicle","First-person observation where possible","Material accuracy above all","Slow publishing, weekly cadence"].map(p => (
                <li key={p} className="border-b border-border pb-3">{p}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
