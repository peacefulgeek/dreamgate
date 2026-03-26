import type { ArticleFull, ArticleMeta } from "./articles";

const SITE_URL = "https://dreamgate.love";
const SITE_NAME = "Dream Gate";
const EDITORIAL_NAME = "Dream Gate Editorial";

/** Generate Article JSON-LD */
export function articleJsonLd(article: ArticleFull): string {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    author: { "@type": "Person", name: "Kalesh" },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/article/${article.slug}`,
    },
    image: `https://dreamgate.b-cdn.net/heroes/article-${article.id}.webp`,
    wordCount: article.wordCount,
    articleSection: article.categoryName,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".article-body h2", ".article-body p:first-of-type"],
    },
  };

  return JSON.stringify(schema);
}

/** Generate FAQPage JSON-LD */
export function faqJsonLd(
  faqs: { question: string; answer: string }[]
): string | null {
  if (!faqs || faqs.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return JSON.stringify(schema);
}

/** Generate BreadcrumbList JSON-LD */
export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return JSON.stringify(schema);
}

/** Generate Organization JSON-LD */
export function organizationJsonLd(): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Dream interpretation through spiritual, psychological, and somatic dimensions.",
  };
  return JSON.stringify(schema);
}

/** Generate WebSite JSON-LD (no SearchAction — search not in scope) */
export function websiteJsonLd(): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
  return JSON.stringify(schema);
}

/** Generate CollectionPage JSON-LD for category pages */
export function collectionPageJsonLd(
  categoryName: string,
  categorySlug: string,
  articles: ArticleMeta[]
): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryName,
    url: `${SITE_URL}/category/${categorySlug}`,
    description: `Explore ${categoryName} — dream interpretation articles on Dream Gate.`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.slice(0, 10).map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/article/${a.slug}`,
        name: a.title,
      })),
    },
  };
  return JSON.stringify(schema);
}

/** Generate ProfilePage + Person JSON-LD for About page */
export function aboutPersonJsonLd(): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Kalesh",
      jobTitle: "Consciousness Teacher & Writer",
      url: "https://kalesh.love",
      description:
        "Consciousness teacher and writer exploring the intersection of ancient contemplative traditions and modern neuroscience.",
    },
  };
  return JSON.stringify(schema);
}

/** Generate SubscribeAction JSON-LD */
export function subscribeActionJsonLd(): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SubscribeAction",
    object: {
      "@type": "Product",
      name: `${SITE_NAME} Newsletter`,
    },
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/#newsletter`,
    },
  };
  return JSON.stringify(schema);
}
