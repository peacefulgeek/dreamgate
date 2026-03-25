import articleIndex from "@/data/article-index.json";

export interface ArticleMeta {
  id: number;
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  dateISO: string;
  isLive: boolean;
  heroAlt: string;
  metaDescription: string;
  wordCount: number;
  readingTime: number;
  openerType: string;
  conclusionType: string;
  linkType: string;
  faqCount: number;
  namedReference: string;
  heroImageDesc: string;
}

export interface ArticleFull extends ArticleMeta {
  body: string;
  toc: { id: string; text: string }[];
  faqs: { question: string; answer: string }[];
  phraseIndices: number[];
  finalH2: string;
}

export const CATEGORIES = [
  { slug: "the-language", name: "The Language" },
  { slug: "the-dictionary", name: "The Dictionary" },
  { slug: "the-practice", name: "The Practice" },
  { slug: "the-patterns", name: "The Patterns" },
  { slug: "the-threshold", name: "The Threshold" },
] as const;

export const BUNNY_CDN_BASE = "https://dreamgate.b-cdn.net";

/** Filter articles that are published (dateISO <= now) */
export function filterPublished(articles: ArticleMeta[]): ArticleMeta[] {
  const now = new Date().toISOString();
  return articles.filter((a) => a.dateISO <= now);
}

/** Get all article metadata (index only, no body) */
export function getAllArticles(): ArticleMeta[] {
  return articleIndex as ArticleMeta[];
}

/** Get published articles only */
export function getPublishedArticles(): ArticleMeta[] {
  return filterPublished(getAllArticles());
}

/** Get articles by category */
export function getArticlesByCategory(categorySlug: string): ArticleMeta[] {
  return getPublishedArticles().filter((a) => a.category === categorySlug);
}

/** Get a single article's full data (lazy loaded) */
export async function getArticle(slug: string): Promise<ArticleFull | null> {
  try {
    const mod = await import(`@/data/articles/${slug}.json`);
    return mod.default as ArticleFull;
  } catch {
    return null;
  }
}

/** Get hero image URL for an article */
export function getHeroImageUrl(articleId: number): string {
  // Use Bunny CDN for article images
  return `${BUNNY_CDN_BASE}/heroes/article-${articleId}.webp`;
}

/** Get OG image URL */
export function getOgImageUrl(articleId: number): string {
  return `${BUNNY_CDN_BASE}/og/article-${articleId}.webp`;
}

/** Format date for display */
export function formatDate(dateISO: string): string {
  return new Date(dateISO).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Get related articles (same category, different article) */
export function getRelatedArticles(
  currentSlug: string,
  category: string,
  count: number = 4
): ArticleMeta[] {
  return getPublishedArticles()
    .filter((a) => a.category === category && a.slug !== currentSlug)
    .slice(0, count);
}

/** Get cross-category articles for "Keep Reading" */
export function getCrossCategoryArticles(
  currentSlug: string,
  currentCategory: string,
  count: number = 6
): ArticleMeta[] {
  return getPublishedArticles()
    .filter((a) => a.category !== currentCategory && a.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

/** Get popular articles (top by word count as proxy) */
export function getPopularArticles(
  excludeSlug: string,
  count: number = 5
): ArticleMeta[] {
  return getPublishedArticles()
    .filter((a) => a.slug !== excludeSlug)
    .sort((a, b) => b.wordCount - a.wordCount)
    .slice(0, count);
}

/** Total published article count */
export function getPublishedCount(): number {
  return getPublishedArticles().length;
}

/** Search articles by title/description */
export function searchArticles(query: string): ArticleMeta[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return getPublishedArticles().filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.metaDescription.toLowerCase().includes(q) ||
      a.categoryName.toLowerCase().includes(q)
  );
}
