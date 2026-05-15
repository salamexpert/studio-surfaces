import { useParams, Link, Navigate } from "react-router-dom";
import { getPost, otherPosts } from "@/lib/content";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { SEO } from "@/components/SEO";

const BASE_URL = "https://marinoceramictile.com";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long do ceramic and porcelain surfaces typically last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Properly specified and installed contemporary porcelain and ceramic surfaces routinely last 30 to 50 years with minimal maintenance — well beyond the lifespan of most other interior finishes.",
      },
    },
    {
      "@type": "Question",
      name: "Is large-format porcelain harder to install?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Slabs over 1200mm require specialised lifting equipment, suction cups, and an installer experienced in thin-bed adhesives. Always insist on a qualified team.",
      },
    },
  ],
};

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug ?? "");

  if (!post) return <Navigate to="/" replace />;

  const related = otherPosts(post.slug, 4);
  const postUrl = `${BASE_URL}/blog/${post.slug}`;
  // Vite asset paths start with "/" — prefix with BASE_URL for absolute schema/OG URLs
  const absoluteCover = `${BASE_URL}${post.cover}`;

  return (
    <>
      <SEO
        title={`${post.title} — Marino Ceramic Tile`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        ogImage={absoluteCover}
        article={{
          headline: post.title,
          description: post.excerpt,
          publishedTime: post.date,
          modifiedTime: post.date,
          author: post.author,
          authorUrl: `${BASE_URL}/about`,
          section: post.category,
          imageUrl: absoluteCover,
          tags: [
            "ceramic tile",
            "interior design",
            "surface design",
            post.category.toLowerCase(),
          ],
          postUrl,
        }}
        breadcrumbs={[
          { name: "Home", item: `${BASE_URL}/` },
          { name: "Blog", item: `${BASE_URL}/blog` },
          { name: post.title, item: postUrl },
        ]}
        webPageType="ItemPage"
        extraSchema={FAQ_SCHEMA}
      />

      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title },
        ]}
      />

      <ReadingProgress />

      {/* Cinematic hero */}
      <section className="relative h-[70vh] min-h-[520px] -mt-0 flex items-end overflow-hidden">
        <img
          src={post.cover}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          width={1200}
          height={630}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-foreground/30" />
        <div className="container-editorial relative pb-12 md:pb-20 text-background">
          <p className="eyebrow text-accent">{post.category}</p>
          <h1 className="display text-4xl md:text-6xl lg:text-7xl mt-5 max-w-4xl text-background">
            {post.title}
          </h1>
          <p className="mt-8 text-sm tracking-widest uppercase text-background/80">
            {post.author} · {post.date} · {post.readingTime}
          </p>
        </div>
      </section>

      {/* Content + sticky sidebar */}
      <section className="container-editorial mt-16 md:mt-24 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-12 lg:gap-20">
        <article className="prose-editorial max-w-2xl">
          <p className="text-xl md:text-2xl leading-relaxed font-serif text-foreground italic mb-10">
            {post.excerpt}
          </p>

          {post.content.map((block: typeof post.content[number], i: number) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "h3") return <h3 key={i}>{block.text}</h3>;
            if (block.type === "quote") return <blockquote key={i}>"{block.text}"</blockquote>;
            if (block.type === "ul") return (
              <ul key={i}>{block.items?.map((it: string, j: number) => <li key={j}>{it}</li>)}</ul>
            );
            return <p key={i}>{block.text}</p>;
          })}

          {/* FAQ — also reflected in FAQ schema above */}
          <h2>Frequently asked</h2>
          <h3>How long do ceramic and porcelain surfaces typically last?</h3>
          <p>Properly specified and installed contemporary porcelain and ceramic surfaces routinely last 30 to 50 years with minimal maintenance — well beyond the lifespan of most other interior finishes.</p>
          <h3>Is large-format porcelain harder to install?</h3>
          <p>Yes. Slabs over 1200mm require specialised lifting equipment, suction cups, and an installer experienced in thin-bed adhesives. Always insist on a qualified team.</p>

          <p className="mt-12 text-sm text-muted-foreground">
            Continue reading on{" "}
            <Link to="/surfaces">Surfaces</Link> or{" "}
            <Link to="/architecture">Architecture</Link>.
          </p>
        </article>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-12">
          <div>
            <p className="eyebrow mb-4">Related reading</p>
            <ul className="space-y-5">
              {related.map((p) => (
                <li key={p.slug} className="flex gap-3 group">
                  <Link to={`/blog/${p.slug}`} className="flex gap-3">
                    <div className="w-20 h-20 shrink-0 img-zoom">
                      <img
                        src={p.cover}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-accent">{p.category}</p>
                      <h4 className="font-serif text-sm leading-snug mt-1 group-hover:text-accent transition-colors line-clamp-3">
                        {p.title}
                      </h4>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary/60 p-6">
            <p className="eyebrow mb-3">The Marino Dispatch</p>
            <p className="text-sm text-muted-foreground mb-4">Sunday morning, in your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="email"
                className="flex-1 bg-transparent border-b border-border text-sm py-2 outline-none focus:border-accent"
              />
              <button className="text-xs uppercase tracking-widest text-accent">Join</button>
            </form>
          </div>
        </aside>
      </section>

      <section className="container-editorial mt-32 mb-16 border-t border-border pt-12">
        <p className="eyebrow mb-8">More from the journal</p>
        <div className="grid md:grid-cols-3 gap-10">
          {related.slice(0, 3).map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
              <div className="img-zoom aspect-[5/4] mb-4">
                <img
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
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
