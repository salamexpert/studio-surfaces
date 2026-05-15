import { POSTS } from "@/lib/content";
import { ArticleCard } from "@/components/site/ArticleCard";
import { PageHero } from "@/components/site/PageHero";
import { Newsletter } from "@/components/site/Newsletter";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { SEO } from "@/components/SEO";

const BASE_URL = "https://marinoceramictile.com";

export function BlogIndex() {
  const [feature, ...rest] = POSTS;
  return (
    <>
      <SEO
        title="The Journal — Ceramic & Architecture Editorial | Marino"
        description="Long-form editorial writing on ceramic surfaces, modern architecture, luxury bathrooms, kitchens and the materials shaping contemporary interiors. Weekly dispatches."
        canonical="/blog"
        breadcrumbs={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Blog", item: `${BASE_URL}/blog` },
        ]}
        webPageType="CollectionPage"
      />

      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />

      <PageHero
        eyebrow="The Journal"
        title="Long reads on the materials and architecture shaping how we live."
        intro="Weekly editorial dispatches from our writers, designers and architects in residence."
      />

      <section className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="img-zoom aspect-[4/3]">
            <img src={feature.cover} alt={feature.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="eyebrow">Featured · {feature.category}</p>
            <h2 className="display text-3xl md:text-5xl mt-4">
              <a href={`/blog/${feature.slug}`} className="hover:text-accent transition-colors">
                {feature.title}
              </a>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">{feature.excerpt}</p>
            <p className="mt-6 text-xs text-muted-foreground tracking-wider uppercase">
              {feature.author} · {feature.date} · {feature.readingTime}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {rest.map((p) => <ArticleCard key={p.slug} post={p} />)}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
