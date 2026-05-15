import { Link } from "react-router-dom";
import { PageHero } from "@/components/site/PageHero";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { SEO } from "@/components/SEO";
import surfacesHero from "@/assets/surfaces-hero.jpg";
import mini1 from "@/assets/surface-mini-1.jpg";
import mini2 from "@/assets/surface-mini-2.jpg";
// Editorial aside — unique images not duplicated on the home page
import asideImg1 from "@/assets/blog-3.jpg";
import asideImg2 from "@/assets/blog-5.jpg";
import { POSTS } from "@/lib/content";

const BASE_URL = "https://marinoceramictile.com";

const TOPICS = [
  "Ceramic Tile Trends","Bathroom Tile Inspiration","Kitchen Surface Concepts",
  "Minimalist Textures","Stone-Inspired Finishes","Matte vs Glossy Finishes",
  "Luxury Flooring","Wall Tile Design","Contemporary Interior Surfaces",
  "Modern Color Palettes","Surface Material Guides","Texture Compositions",
];

export function SurfacesPage() {
  const related = POSTS.filter((p) => ["Surfaces","Bathrooms","Kitchens"].includes(p.category)).slice(0, 6);
  return (
    <>
      <SEO
        title="Surfaces — Ceramic, Stone & Modern Tile Design | Marino"
        description="An editorial guide to ceramic tile trends, bathroom inspiration, kitchen surfaces, minimalist textures and luxury flooring shaping interior design in 2026. Expert material analysis."
        canonical="/surfaces"
        ogImage={`${BASE_URL}/og-surfaces.jpg`}
        breadcrumbs={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Surfaces", item: `${BASE_URL}/surfaces` },
        ]}
        webPageType="CollectionPage"
      />

      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Surfaces" }]} />

      <PageHero
        eyebrow="Pillar — Surfaces"
        title="Surface design, considered."
        intro="A working library of the ceramics, stones and finishes shaping contemporary interiors. Long-form essays, comparisons and material guides — published continuously."
        image={surfacesHero}
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
          <h2>The slow return of the considered surface</h2>
          <p>For decades, surfaces were an afterthought in residential design — chosen toward the end of a project, often from a sample board, with neither the time nor the budget that the more visible architectural decisions received. That has reversed. The contemporary specifier begins with the surface, and the rest of the room negotiates around it.</p>
          <p>The reasons are largely technical. Slab-format porcelains have made it possible to wrap a kitchen island in a single continuous material; matte glazes have given ceramics the depth that only stone used to offer; digital printing has made it impossible to tell, from across a room, whether you are looking at travertine or its convincing engineered cousin.</p>
          <h3>What we cover under "Surfaces"</h3>
          <p>Our Surfaces editorial spans every material that meets the eye in a finished interior — ceramic, porcelain, natural stone, microcement, plaster, terrazzo, engineered slabs and the increasingly tactile world of three-dimensional wall finishes.</p>
        </div>
        <aside className="md:col-span-5 space-y-6">
          <div className="img-zoom aspect-[4/5]">
            <img src={asideImg1} alt="Minimalist ceramic surface design in a modern home" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="img-zoom aspect-[4/5] md:ml-12">
            <img src={asideImg2} alt="Premium kitchen surface with porcelain worktop" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </aside>
      </section>

      <section className="container-editorial mt-24">
        <p className="eyebrow">Material comparison</p>
        <h2 className="display text-3xl md:text-5xl mt-4 mb-8">Matte versus glossy, briefly.</h2>
        <div className="overflow-x-auto border-y border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-4 pr-6 eyebrow">Property</th>
                <th className="py-4 pr-6 eyebrow">Matte ceramic</th>
                <th className="py-4 eyebrow">Glossy ceramic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Reads as","Architectural, calm","Reflective, energetic"],
                ["Light behaviour","Absorbs and softens","Bounces and amplifies"],
                ["Best for","Living, bedrooms, primary baths","Backsplashes, accent walls"],
                ["Maintenance","Forgiving of marks","Shows everything"],
              ].map(([a,b,c]) => (
                <tr key={a}>
                  <td className="py-4 pr-6 font-medium">{a}</td>
                  <td className="py-4 pr-6 text-muted-foreground">{b}</td>
                  <td className="py-4 text-muted-foreground">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container-editorial mt-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="img-zoom aspect-[16/10]">
          <img src={mini1} alt="Fluted ceramic wall surface catching directional light" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div>
          <p className="eyebrow">Mini editorial · Wall design</p>
          <h2 className="display text-3xl md:text-4xl mt-4">Why fluted surfaces keep returning</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">Vertical fluted ceramics have moved from showroom novelty to specification standard. The reason is simple: under raking light, the same wall reads three different ways across a single day.</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">The discipline is restraint. One fluted volume per room, paired with a quiet flat companion, almost always outperforms a space that tries to texture every surface.</p>
        </div>
      </section>

      <section className="container-editorial mt-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="md:order-2 img-zoom aspect-[16/10]">
          <img src={mini2} alt="Contemporary kitchen island with waterfall edge porcelain" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="md:order-1">
          <p className="eyebrow">Mini editorial · Kitchen surfaces</p>
          <h2 className="display text-3xl md:text-4xl mt-4">The waterfall island, refined</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">The waterfall edge has become a defining detail of the premium contemporary kitchen — but the version winning awards in 2026 is more disciplined than its predecessors.</p>
        </div>
      </section>

      <section className="container-editorial mt-24">
        <p className="eyebrow">Editor's recommendations</p>
        <h2 className="display text-3xl md:text-5xl mt-4 mb-10">If you specify only one thing this season</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { t: "A monolithic floor", b: "Choose one large-format porcelain and carry it through every public room." },
            { t: "A textured feature volume", b: "One fluted, ribbed or hand-pressed wall. Used sparingly, it carries the entire room." },
            { t: "A warm, restrained palette", b: "Two stones at most. One quiet metal. Earth tones that age like the rooms they sit in." },
          ].map((x) => (
            <div key={x.t} className="border-t border-border pt-6">
              <h3 className="font-serif text-2xl">{x.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{x.b}</p>
            </div>
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
