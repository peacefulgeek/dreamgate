import Layout from "@/components/Layout";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Link } from "wouter";
import { getPublishedArticles, getArticlesByCategory, CATEGORIES } from "@/lib/articles";
import { websiteJsonLd, organizationJsonLd, subscribeActionJsonLd } from "@/lib/seo";
import { useEffect } from "react";

export default function Home() {
  const published = getPublishedArticles();
  const latest = published.slice(0, 3);
  const pullQuote = latest[0];

  useEffect(() => {
    document.title = "Dream Gate — What Your Dreams Are Trying to Tell You";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "Dream interpretation through spiritual, psychological, and somatic dimensions. Explore what your dreams are actually trying to tell you.");

    const scripts = [websiteJsonLd(), organizationJsonLd(), subscribeActionJsonLd()];
    const els: HTMLScriptElement[] = [];
    for (const s of scripts) {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.textContent = s;
      document.head.appendChild(el);
      els.push(el);
    }
    return () => els.forEach((el) => el.remove());
  }, []);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function getExcerpt(article: typeof latest[0]) {
    return article.metaDescription || "";
  }

  return (
    <Layout>
      {/* Pull Quote — large type from latest article */}
      {pullQuote && (
        <section className="max-w-[720px] mx-auto px-5 pt-20 pb-12">
          <Link href={`/article/${pullQuote.slug}`} className="no-underline group block">
            <blockquote className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground tracking-tight">
              <span className="group-hover:text-primary transition-colors">{pullQuote.title}</span>
            </blockquote>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-xl">
              {getExcerpt(pullQuote)}
            </p>
            <p className="mt-4 text-sm text-muted-foreground/70">
              {formatDate(pullQuote.dateISO)} &middot; {pullQuote.readingTime} min read
            </p>
          </Link>
        </section>
      )}

      <hr className="max-w-[720px] mx-auto border-border/40" />

      {/* Latest 3 articles — text only, no images */}
      {latest.length > 0 && (
        <section className="max-w-[720px] mx-auto px-5 py-12">
          {latest.map((article, i) => (
            <article key={article.id} className={i > 0 ? "mt-10 pt-10 border-t border-border/30" : ""}>
              <Link href={`/article/${article.slug}`} className="no-underline group block">
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed line-clamp-3">
                  {getExcerpt(article)}
                </p>
                <p className="mt-3 text-sm text-muted-foreground/70">
                  {formatDate(article.dateISO)} &middot; {article.readingTime} min read &middot; {article.categoryName}
                </p>
              </Link>
            </article>
          ))}
        </section>
      )}

      <hr className="max-w-[720px] mx-auto border-border/40" />

      {/* Categories — simple text with counts */}
      <section className="max-w-[720px] mx-auto px-5 py-12">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-6">
          Explore
        </h2>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => {
            const count = getArticlesByCategory(cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center justify-between py-2 no-underline group"
              >
                <span className="text-base text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {count} article{count !== 1 ? "s" : ""}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <hr className="max-w-[720px] mx-auto border-border/40" />

      {/* Newsletter — one-liner */}
      <section className="max-w-[720px] mx-auto px-5 py-12">
        <NewsletterSignup source="homepage" variant="inline" />
      </section>
    </Layout>
  );
}
