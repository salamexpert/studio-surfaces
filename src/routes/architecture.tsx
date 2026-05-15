import { Link } from "react-router-dom";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { SEO } from "@/components/SEO";
import archHero from "@/assets/architecture-hero.jpg";
import mini1 from "@/assets/arch-mini-1.jpg";
import mini2 from "@/assets/arch-mini-2.jpg";
// Editorial aside — unique images not used elsewhere on this page
import asideImg1 from "@/assets/blog-9.jpg";
import asideImg2 from "@/assets/blog-10.jpg";
// Featured rooms — unique images not used elsewhere on this page
import roomImg1 from "@/assets/blog-7.jpg";
import roomImg2 from "@/assets/blog-6.jpg";
import roomImg3 from "@/assets/blog-8.jpg";
import { POSTS } from "@/lib/content";

const BASE_URL = "https://marinoceramictile.com";

const TOPICS = [
  "Modern Homes","Luxury Bathrooms","Architectural Lighting","Open Space Concepts",
  "Scandinavian Design","Minimalist Architecture","Interior Flow Concepts",
  "Material Harmony","Sustainable Surface Design","Spatial Design Trends",
  "Premium Interior Inspiration","Architectural Styling",
];

export function ArchPage() {
  const related = POSTS.filter((p) => ["Architecture","Bathrooms","Surfaces"].includes(p.category)).slice(0, 6);
  return (
    <>
      <SEO
        title="Architecture — Modern Homes & Interior Design | Marino"
        description="Editorial coverage of modern homes, luxury bathrooms, architectural lighting, Scandinavian design and the spaces shaping how we live in 2026. Long-form architectural writing."
        canonical="/architecture"
        ogImage={`${BASE_URL}/og-architecture.jpg`}
        breadcrumbs={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Architecture", item: `${BASE_URL}/architecture` },
        ]}
        webPageType="CollectionPage"
      />

      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Architecture" }]} />

      <PageHero
        eyebrow="Pillar — Architecture"
        title="Architecture, slowly."
        intro="The houses, lofts, retreats and small studios that we keep returning to — and what makes them quietly extraordinary. Long-form architectural writing, published continuously."
        image={archHero}
      />

      <section className="container-editorial">
        <div className="flex flex-wrap gap-2 border-y border-border py-6">
          {TOPICS.map((t) => (
            <span key={t} className="text-xs uppercase tracking-widest text-muted-foreground border border-border px-4 py-2 hover:border-accent hover:text-accent transition-colors cursor-default">{t}</span>
          ))}
        </div>
      </section>

      <section className="container-editorial mt-20 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-7 prose-editorial">
          <h2>The end of architectural noise</h2>
          <p>The most quietly compelling residential architecture being built today shares a common posture: it is at ease with itself. Volumes are confident without shouting; materials repeat with discipline; the light is allowed to do most of the work.</p>
          <p>This page is our running notebook on that correction. We follow the architects whose work resists trend, the projects that age into themselves, and the spatial moves that turn out — over years of being lived in — to have been right.</p>
          <h3>What we cover under "Architecture"</h3>
          <p>Modern single-family homes, considered renovations, the architecture of the bathroom and kitchen as primary rooms, lighting as architecture, and the increasingly important question of how a building meets its landscape.</p>
        </div>
        <aside className="md:col-span-5 space-y-6">
          <div className="img-zoom aspect-[4/5]">
            <img src={asideImg1} alt="Spa-inspired bathroom with modern tile" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="img-zoom aspect-[4/5] md:ml-12">
            <img src={asideImg2} alt="Stone texture and modern ceramic surfaces" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </aside>
      </section>

      <section className="container-editorial mt-24">
        <p className="eyebrow">Architectural insights</p>
        <h2 className="display text-3xl md:text-5xl mt-4 mb-8">Three moves that quietly transform a home</h2>
        <div className="overflow-x-auto border-y border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-4 pr-6 eyebrow">Move</th>
                <th className="py-4 pr-6 eyebrow">What it does</th>
                <th className="py-4 eyebrow">Where to deploy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="py-4 pr-6 font-medium">Continuous floor</td><td className="py-4 pr-6 text-muted-foreground">Reads as one room rather than several</td><td className="py-4 text-muted-foreground">Public living zones</td></tr>
              <tr><td className="py-4 pr-6 font-medium">Concealed light</td><td className="py-4 pr-6 text-muted-foreground">Architecture without lighting fixtures</td><td className="py-4 text-muted-foreground">Coves, skirting, ceiling slots</td></tr>
              <tr><td className="py-4 pr-6 font-medium">Single material gesture</td><td className="py-4 pr-6 text-muted-foreground">A focal volume that anchors the room</td><td className="py-4 text-muted-foreground">One feature wall, never two</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="container-editorial mt-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="img-zoom aspect-[16/10]">
          <img src={mini1} alt="Architectural lighting design in a modern interior" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div>
          <p className="eyebrow">Mini editorial · Lighting</p>
          <h2 className="display text-3xl md:text-4xl mt-4">Light as architecture, not decoration</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">The most architecturally satisfying interiors of 2026 share an invisible discipline: their lighting is rarely seen as objects. Coves wash ceilings, slots graze textured walls, and downlights pool gently in carefully chosen places.</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">What this requires is decided early. Architectural lighting is a coordination problem solved at design stage — not a finish-stage purchase. The payoff is a home that looks beautiful at every hour.</p>
        </div>
      </section>

      <section className="container-editorial mt-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="md:order-2 img-zoom aspect-[16/10]">
          <img src={mini2} alt="Scandinavian living room with natural materials" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="md:order-1">
          <p className="eyebrow">Mini editorial · Scandinavian</p>
          <h2 className="display text-3xl md:text-4xl mt-4">Why Scandinavian design keeps winning</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">Scandinavian residential architecture has been the most consistently exported aesthetic of the last fifty years for one simple reason: it is built around how light behaves in real rooms, not how surfaces look in photographs.</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">The 2026 iteration has loosened: warmer whites, darker oaks, hand-glazed ceramics on shelves and walls. The bones are unchanged.</p>
        </div>
      </section>

      <section className="container-editorial mt-24">
        <p className="eyebrow">Featured rooms</p>
        <h2 className="display text-3xl md:text-5xl mt-4 mb-10">Three rooms we keep returning to</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { t: "The Mountain House", c: "A concrete villa carved into a Mediterranean hillside.", img: roomImg1 },
            { t: "The Reading Loft", c: "A small intervention that transformed an attic into a sanctuary.", img: roomImg2 },
            { t: "The Limewash Bedroom", c: "Plaster, linen, taupe — and almost nothing else.", img: roomImg3 },
          ].map((x) => (
            <article key={x.t} className="hover-lift">
              <div className="img-zoom aspect-[4/5] mb-4">
                <img src={x.img} alt={x.t} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-2xl">{x.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{x.c}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-editorial mt-24 border-t border-border pt-12">
        <p className="eyebrow mb-8">From the journal</p>
        <div className="grid md:grid-cols-3 gap-10">
          {related.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
              <div className="img-zoom aspect-[5/4] mb-4">
                <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <p className="eyebrow mb-2">{p.category}</p>
              <h3 className="font-serif text-xl group-hover:text-accent transition-colors">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
