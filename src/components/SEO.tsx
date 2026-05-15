import { Helmet } from "react-helmet-async";

const SITE_NAME = "Marino Ceramic Tile";
const BASE_URL = "https://marinoceramictile.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;
const LOGO_URL = `${BASE_URL}/logo.svg`;

// ─── Organisation schema – included on every page ──────────────────────────
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: SITE_NAME,
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${BASE_URL}/#logo`,
    url: LOGO_URL,
    contentUrl: LOGO_URL,
    width: 280,
    height: 56,
    caption: SITE_NAME,
  },
  description:
    "An independent editorial publication on ceramic surfaces, modern architecture and contemporary interior design.",
  sameAs: [
    "https://www.instagram.com/marinoceramictile",
    "https://twitter.com/marinoceramictile",
    "https://www.facebook.com/marinoceramictile",
    "https://www.linkedin.com/company/marinoceramictile",
  ],
};

// ─── Converts "Month DD, YYYY" → ISO 8601 with UTC offset ──────────────────
// This is the critical date function the user highlighted – avoids the
// local-timezone shift that causes non-critical schema warnings in validators.
const MONTH_MAP: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

export function toSchemaDate(dateStr: string): string {
  const match = dateStr.match(/^(\w+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) {
    // Already ISO or unknown – return as-is after sanitising
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toISOString();
  }
  const [, month, day, year] = match;
  const d = new Date(Date.UTC(Number(year), MONTH_MAP[month] ?? 0, Number(day)));
  return d.toISOString(); // e.g. "2026-01-14T00:00:00.000Z"
}

// ─── Types ──────────────────────────────────────────────────────────────────
export interface ArticleMeta {
  publishedTime: string;   // human-readable OR ISO – will be normalised
  modifiedTime?: string;
  author: string;
  authorUrl?: string;
  section?: string;
  tags?: string[];
  imageUrl?: string;
  postUrl: string;
  headline: string;
  description: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string; // absolute URL
}

export interface SEOProps {
  title: string;
  description: string;
  canonical: string;           // path only, e.g. "/blog/my-post"
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;            // absolute URL
  ogType?: "website" | "article";
  article?: ArticleMeta;
  breadcrumbs?: BreadcrumbItem[];
  websiteSchema?: boolean;     // include WebSite schema (home page only)
  webPageType?: string;        // schema.org WebPage sub-type
  noIndex?: boolean;
  extraSchema?: object | object[];
}

export function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  article,
  breadcrumbs,
  websiteSchema = false,
  webPageType = "WebPage",
  noIndex = false,
  extraSchema,
}: SEOProps) {
  const canonicalUrl = `${BASE_URL}${canonical}`;
  const resolvedOgImage = ogImage ?? DEFAULT_OG_IMAGE;
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDesc = ogDescription ?? description;

  // ── Schema assembly ─────────────────────────────────────────────────────
  const schemas: object[] = [ORG_SCHEMA];

  // WebSite schema (home page)
  if (websiteSchema) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: SITE_NAME,
      description:
        "An editorial publication on ceramic surfaces, modern architecture and luxury interior design.",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    });
  }

  // WebPage schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": webPageType,
    "@id": `${canonicalUrl}/#webpage`,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    ...(breadcrumbs?.length
      ? { breadcrumb: { "@id": `${canonicalUrl}/#breadcrumb` } }
      : {}),
  });

  // Article schema
  if (article) {
    const pubISO = toSchemaDate(article.publishedTime);
    const modISO = article.modifiedTime
      ? toSchemaDate(article.modifiedTime)
      : pubISO;

    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${article.postUrl}/#article`,
      headline: article.headline,
      description: article.description,
      ...(article.imageUrl
        ? {
            image: {
              "@type": "ImageObject",
              url: article.imageUrl,
              width: 1200,
              height: 630,
            },
          }
        : {}),
      author: {
        "@type": "Person",
        name: article.author,
        url: article.authorUrl ?? `${BASE_URL}/about`,
      },
      publisher: {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: LOGO_URL,
          width: 280,
          height: 56,
        },
      },
      datePublished: pubISO,
      dateModified: modISO,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${article.postUrl}/#webpage`,
      },
      ...(article.section ? { articleSection: article.section } : {}),
      ...(article.tags?.length ? { keywords: article.tags.join(", ") } : {}),
      inLanguage: "en",
    });
  }

  // BreadcrumbList schema
  if (breadcrumbs?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}/#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    });
  }

  // Any extra caller-supplied schemas
  if (extraSchema) {
    const extras = Array.isArray(extraSchema) ? extraSchema : [extraSchema];
    schemas.push(...extras);
  }

  return (
    <Helmet>
      {/* Core */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDesc} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter / X card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@marinoceramictile" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* Article-specific Open Graph */}
      {article && (
        <>
          <meta
            property="article:published_time"
            content={toSchemaDate(article.publishedTime)}
          />
          <meta
            property="article:modified_time"
            content={toSchemaDate(article.modifiedTime ?? article.publishedTime)}
          />
          <meta property="article:author" content={article.author} />
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* JSON-LD — one <script> per schema object for best validator compat */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  );
}
