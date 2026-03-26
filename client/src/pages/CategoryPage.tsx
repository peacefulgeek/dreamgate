import { useParams, Link } from "wouter";
import { useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import { getArticlesByCategory, CATEGORIES, formatDate } from "@/lib/articles";
import { collectionPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "the-language":
    "The grammar of the unconscious. How dreams communicate through symbol, sensation, and emotion — and why most people are reading them wrong.",
  "the-dictionary":
    "Specific dream symbols decoded. Not the generic fortune-cookie interpretations — the real, layered, sometimes uncomfortable meanings.",
  "the-practice":
    "The how. Dream journaling, lucid dreaming, active imagination, and the daily practices that transform your relationship with sleep.",
  "the-patterns":
    "Recurring dreams, archetypal patterns, and the deeper structures that connect your individual dreams to the collective unconscious.",
  "the-threshold":
    "Where psychology meets spirituality. Vedantic dream states, consciousness exploration, and the territory beyond ordinary dreaming.",
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = CATEGORIES.find((c) => c.slug === slug);
  const articles = useMemo(
    () => (slug ? getArticlesByCategory(slug) : []),
    [slug]
  );

  useEffect(() => {
    if (!category) return;
    document.title = `${category.name} — Dream Gate`;

    const scripts: HTMLScriptElement[] = [];
    const addLd = (json: string) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.textContent = json;
      document.head.appendChild(el);
      scripts.push(el);
    };

    addLd(collectionPageJsonLd(category.name, category.slug, articles));
    addLd(
      breadcrumbJsonLd([
        { name: "Home", url: "https://dreamgate.love" },
        { name: category.name, url: `https://dreamgate.love/category/${category.slug}` },
      ])
    );

    return () => scripts.forEach((el) => el.remove());
  }, [category, articles]);

  if (!category) {
    return (
      <Layout>
        <div className="max-w-[720px] mx-auto px-5 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Category not found
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[720px] mx-auto px-5 py-16">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
          {category.name}
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          {CATEGORY_DESCRIPTIONS[category.slug] || ""}
        </p>

        {articles.length > 0 ? (
          <div className="space-y-0">
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/article/${a.slug}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-border/30 no-underline group"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                    {a.title}
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 sm:mt-0 sm:ml-4 flex-shrink-0">
                  <span>{a.readingTime} min</span>
                  <span>&middot;</span>
                  <span>{formatDate(a.dateISO)}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-20">
            Articles in this category are coming soon.
          </p>
        )}
      </div>
    </Layout>
  );
}
