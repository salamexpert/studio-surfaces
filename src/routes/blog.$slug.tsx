import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, otherPosts, POSTS } from "@/lib/content";
import { ReadingProgress } from "@/components/site/ReadingProgress";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Post not found" }] };
    return {
      meta: [
        { title: `${post.title} — Marino Ceramic Tile` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.cover },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: post.author },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.cover,
            author: { "@type": "Person", name: post.author },
            datePublished: post.date,
            publisher: {
              "@type": "Organization",
              name: "Marino Ceramic Tile",
            },
          }),
        },
      ],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="container-editorial py-32 text-center">
      <h1 className="display text-5xl">Article not found</h1>
      <Link to="/blog" className="inline-block mt-6 text-accent uppercase tracking-widest text-sm border-b border-accent pb-1">Back to journal</Link>
    </div>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = otherPosts(post.slug, 4);
  const featured = POSTS.filter((p) => p.slug !== post.slug).slice(4, 7);

  return (
    <>
      <ReadingProgress />

      {/* Cinematic hero */}
      <section className="relative h-[70vh] min-h-[520px] -mt-16 md:-mt-20 flex items-end overflow-hidden">
        <img src={post.cover} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
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

          {post.content.map((block, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "h3") return <h3 key={i}>{block.text}</h3>;
            if (block.type === "quote") return <blockquote key={i}>"{block.text}"</blockquote>;
            if (block.type === "ul") return (
              <ul key={i}>{block.items?.map((it, j) => <li key={j}>{it}</li>)}</ul>
            );
            return <p key={i}>{block.text}</p>;
          })}

          {/* FAQ */}
          <h2>Frequently asked</h2>
          <h3>How long do these surfaces typically last?</h3>
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
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="flex gap-3">
                    <div className="w-20 h-20 shrink-0 img-zoom">
                      <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
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

          <div>
            <p className="eyebrow mb-4">Trending</p>
            <ol className="space-y-3">
              {featured.map((p, i) => (
                <li key={p.slug} className="flex gap-3 group">
                  <span className="font-serif text-3xl text-accent/60 leading-none">0{i + 1}</span>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="font-serif text-sm leading-snug group-hover:text-accent transition-colors">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-secondary/60 p-6">
            <p className="eyebrow mb-3">The Marino Dispatch</p>
            <p className="text-sm text-muted-foreground mb-4">Sunday morning, in your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input type="email" placeholder="email" className="flex-1 bg-transparent border-b border-border text-sm py-2 outline-none focus:border-accent" />
              <button className="text-xs uppercase tracking-widest text-accent">Join</button>
            </form>
          </div>
        </aside>
      </section>

      <section className="container-editorial mt-32 mb-16 border-t border-border pt-12">
        <p className="eyebrow mb-8">More from the journal</p>
        <div className="grid md:grid-cols-3 gap-10">
          {related.slice(0, 3).map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
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
