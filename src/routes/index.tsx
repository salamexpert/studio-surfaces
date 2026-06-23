import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/home-hero.jpg";
import t1 from "@/assets/trending-1.jpg";
import t2 from "@/assets/trending-2.jpg";
import t3 from "@/assets/trending-3.jpg";
import s1 from "@/assets/surface-1.jpg";
import s2 from "@/assets/surface-2.jpg";
import a1 from "@/assets/arch-1.jpg";
import a2 from "@/assets/arch-2.jpg";
import tr1 from "@/assets/transform-1.jpg";
import tr2 from "@/assets/transform-2.jpg";
import materialImg from "@/assets/material-showcase.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import { POSTS } from "@/lib/content";
import { ArticleCard } from "@/components/site/ArticleCard";
import { Newsletter } from "@/components/site/Newsletter";
import { SEO } from "@/components/SEO";

const BASE_URL = "https://marinoceramictile.com";

export function HomePage() {
  const trending = POSTS.slice(0, 3);
  const editorialPicks = POSTS.slice(3, 7);
  const latest = POSTS.slice(0, 4);

  return (
    <>
      <SEO
        title="Marino Ceramic Tile — Modern Architecture & Surface Design"
        description="An editorial publication on ceramic surfaces, modern architecture, luxury bathrooms and contemporary interior design. New stories every week."
        canonical="/"
        ogImage={`${BASE_URL}/og-home.jpg`}
        websiteSchema
        webPageType="WebPage"
        breadcrumbs={[{ name: "Home", item: BASE_URL + "/" }]}
      />

      {/* HERO */}
      <section className="relative h-[620px] md:h-[740px] lg:h-[820px] -mt-16 md:-mt-20 flex items-center md:items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Modern architectural living room with travertine surfaces"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-editorial relative z-10 pb-16 md:pb-24 text-white">
          <p className="eyebrow text-accent fade-up">Issue 04 — Spring 2026</p>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl max-w-5xl mt-6 text-white fade-up">
            The new architecture of surface.
          </h1>
          <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8 fade-up">
            <p className="max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
              An editorial publication on ceramic, stone and the materials that quietly
              define the way contemporary homes feel. New stories every week.
            </p>
            <Link
              to={`/blog/${POSTS[0].slug}`}
              className="group inline-flex items-center gap-3 text-sm uppercase tracking-widest border-b border-white pb-2 hover:border-accent hover:text-accent transition-colors w-fit"
            >
              Read this week's feature
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRENDING DESIGN STORIES */}
      <section className="container-editorial mt-24 md:mt-32">
        <div className="flex items-end justify-between mb-12 border-b border-border pb-6">
          <div>
            <p className="eyebrow">Trending now</p>
            <h2 className="display text-3xl md:text-5xl mt-3">Design stories of the week</h2>
          </div>
          <Link to="/blog" className="hidden md:inline text-xs uppercase tracking-widest text-accent border-b border-accent pb-1">
            All stories
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {trending.map((p, i) => (
            <div key={p.slug} style={{ animationDelay: `${i * 0.1}s` }} className="fade-up">
              <article className="group">
                <Link to={`/blog/${p.slug}`} className="block">
                  <div className="img-zoom aspect-[4/5] mb-5 bg-secondary">
                    <img src={[t1, t2, t3][i]} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <p className="eyebrow mb-3">{p.category}</p>
                  <h3 className="font-serif text-2xl leading-tight group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                </Link>
              </article>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SURFACE HIGHLIGHTS */}
      <section className="container-editorial mt-32 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="img-zoom aspect-[3/4]">
            <img src={s1} alt="Cream ceramic texture" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="img-zoom aspect-[3/4] mt-12">
            <img src={s2} alt="Green marble texture" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <p className="eyebrow">Surface design</p>
          <h2 className="display text-4xl md:text-5xl mt-4">The material is the message.</h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            From hand-glazed zellige to bookmatched calacatta, the surfaces shaping the year are quieter,
            more tactile, and more architectural than ever.
          </p>
          <Link to="/surfaces" className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-widest text-accent border-b border-accent pb-1 hover:opacity-80">
            Enter the Surfaces archive <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. ARCHITECTURE HIGHLIGHTS */}
      <section className="container-editorial mt-32 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="md:order-2 grid grid-cols-1 gap-6">
          <div className="img-zoom aspect-[16/10]">
            <img src={a1} alt="Modern villa at dusk" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="img-zoom aspect-[16/10]">
            <img src={a2} alt="Open plan double height" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="md:order-1">
          <p className="eyebrow">Architecture</p>
          <h2 className="display text-4xl md:text-5xl mt-4">Spaces designed to be lived in slowly.</h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            We follow the architects building homes that age beautifully — the volumes, the light,
            the considered restraint. Modernism without the chill.
          </p>
          <Link to="/architecture" className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-widest text-accent border-b border-accent pb-1 hover:opacity-80">
            Enter the Architecture archive <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. QUOTE */}
      <section className="container-editorial mt-32">
        <div className="max-w-5xl mx-auto text-center px-4">
          <p className="eyebrow">Editor's note</p>
          <blockquote className="display text-3xl md:text-5xl lg:text-6xl mt-8 italic font-light leading-tight">
            "A great room begins with a great floor. Everything else simply earns its place on top of it."
          </blockquote>
          <p className="mt-8 text-sm text-muted-foreground tracking-widest uppercase">
            Elena Marchetti — Editor in Chief
          </p>
        </div>
      </section>

      {/* 6. INTERIOR TRANSFORMATIONS */}
      <section className="container-editorial mt-32">
        <div className="border-b border-border pb-6 mb-12">
          <p className="eyebrow">Featured transformations</p>
          <h2 className="display text-3xl md:text-5xl mt-3">Before, after, and entirely else.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {[{img: tr1, t: "A Brooklyn wet-room finds its calm", c: "Bathrooms"},{img: tr2, t: "A Spanish dining room rebuilt from terracotta up", c: "Architecture"}].map((x, i) => (
            <article key={i} className="group hover-lift">
              <div className="img-zoom aspect-[16/10] mb-6">
                <img src={x.img} alt={x.t} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <p className="eyebrow mb-3">{x.c}</p>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight group-hover:text-accent transition-colors">{x.t}</h3>
            </article>
          ))}
        </div>
      </section>

      <Newsletter />

      {/* 8. EDITORIAL PICKS CAROUSEL */}
      <section className="container-editorial">
        <div className="border-b border-border pb-6 mb-12">
          <p className="eyebrow">Editor's picks</p>
          <h2 className="display text-3xl md:text-5xl mt-3">From this season's archive</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 scrollbar-thin">
          {editorialPicks.map((p) => (
            <div key={p.slug} className="snap-start shrink-0 w-[78%] sm:w-[48%] lg:w-[30%]">
              <ArticleCard post={p} />
            </div>
          ))}
        </div>
      </section>

      {/* 9. LATEST FROM BLOG */}
      <section className="container-editorial mt-32">
        <div className="border-b border-border pb-6 mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow">Latest from the blog</p>
            <h2 className="display text-3xl md:text-5xl mt-3">Recent dispatches</h2>
          </div>
          <Link to="/blog" className="hidden md:inline text-xs uppercase tracking-widest text-accent border-b border-accent pb-1">View all</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {latest.map((p) => <ArticleCard key={p.slug} post={p} size="sm" />)}
        </div>
      </section>

      {/* 10. MATERIAL SHOWCASE */}
      <section className="mt-32 bg-foreground text-background py-24">
        <div className="container-editorial grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow text-accent">Material library</p>
            <h2 className="display text-4xl md:text-6xl mt-4 text-background">Five surfaces. Endless rooms.</h2>
            <p className="mt-6 text-base text-background/80 leading-relaxed max-w-md">
              A curated palette of ceramics, stones and engineered surfaces our editors have been specifying this year.
            </p>
            <Link to="/surfaces" className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-widest text-accent border-b border-accent pb-1">
              Browse materials <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="img-zoom aspect-[16/10]">
            <img src={materialImg} alt="Tile material samples" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 11. GALLERY */}
      <section className="container-editorial mt-32">
        <div className="border-b border-border pb-6 mb-12">
          <p className="eyebrow">Inspiration</p>
          <h2 className="display text-3xl md:text-5xl mt-3">A visual notebook</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[g1, g2, g3, g4].map((src, i) => (
            <div key={i} className={`img-zoom ${i % 2 === 0 ? "aspect-[3/4]" : "aspect-[3/4] md:mt-12"}`}>
              <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
