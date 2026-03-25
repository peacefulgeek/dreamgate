import { useParams } from "wouter";
import { useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory, CATEGORIES } from "@/lib/articles";
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
        <div className="container py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Category not found
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-16">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
          {category.name}
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-10">
          {CATEGORY_DESCRIPTIONS[category.slug] || ""}
        </p>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Articles in this category are coming soon. The threshold is being prepared.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
