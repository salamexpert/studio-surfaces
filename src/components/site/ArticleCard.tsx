import { Link } from "react-router-dom";
import type { BlogPost } from "@/lib/content";

export function ArticleCard({ post, size = "md" }: { post: BlogPost; size?: "sm" | "md" | "lg" }) {
  const aspect = size === "lg" ? "aspect-[4/3]" : size === "sm" ? "aspect-[5/4]" : "aspect-[5/4]";
  return (
    <article className="group hover-lift">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className={`img-zoom ${aspect} bg-secondary mb-5 overflow-hidden`}>
          <img src={post.cover} alt={post.title} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <p className="eyebrow mb-3">{post.category}</p>
        <h3
          className={`font-serif tracking-tight leading-tight group-hover:text-accent transition-colors ${
            size === "lg" ? "text-3xl md:text-4xl" : size === "sm" ? "text-lg" : "text-2xl"
          }`}
        >
          {post.title}
        </h3>
        {size !== "sm" && (
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <p className="mt-4 text-xs text-muted-foreground">
          {post.author} · {post.date} · {post.readingTime}
        </p>
      </Link>
    </article>
  );
}
