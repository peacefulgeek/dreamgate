import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import {
  getArticle,
  getRelatedArticles,
  getCrossCategoryArticles,
  getPopularArticles,
  formatDate,
  getHeroImageUrl,
  type ArticleFull,
  type ArticleMeta,
} from "@/lib/articles";
import { articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ChevronUp, Clock, Calendar, BookOpen } from "lucide-react";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const [article, setArticle] = useState<ArticleFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToc, setShowToc] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getArticle(slug).then((a) => {
      if (!a) {
        navigate("/404");
        return;
      }
      // Check if article is published
      if (a.dateISO > new Date().toISOString()) {
        navigate("/404");
        return;
      }
      setArticle(a);
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [slug, navigate]);

  // Set document head
  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} — Dream Gate`;

    // Meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", article.metaDescription);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://dreamgate.love/${article.slug}`);

    // JSON-LD
    const scripts: HTMLScriptElement[] = [];
    const addLd = (json: string) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.textContent = json;
      document.head.appendChild(el);
      scripts.push(el);
    };

    addLd(articleJsonLd(article));
    const faqLd = faqJsonLd(article.faqs || []);
    if (faqLd) addLd(faqLd);
    addLd(
      breadcrumbJsonLd([
        { name: "Home", url: "https://dreamgate.love" },
        { name: article.categoryName, url: `https://dreamgate.love/category/${article.category}` },
        { name: article.title, url: `https://dreamgate.love/${article.slug}` },
      ])
    );

    // OG tags
    const ogTags: Record<string, string> = {
      "og:title": article.title,
      "og:description": article.metaDescription,
      "og:type": "article",
      "og:url": `https://dreamgate.love/${article.slug}`,
      "og:image": `https://dreamgate.b-cdn.net/og/article-${article.id}.png`,
      "og:site_name": "Dream Gate",
      "twitter:card": "summary_large_image",
      "twitter:title": article.title,
      "twitter:description": article.metaDescription,
    };

    const ogEls: HTMLMetaElement[] = [];
    for (const [prop, content] of Object.entries(ogTags)) {
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
        ogEls.push(el);
      }
      el.setAttribute("content", content);
    }

    return () => {
      scripts.forEach((el) => el.remove());
      ogEls.forEach((el) => el.remove());
    };
  }, [article]);

  // Back to top button
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading || !article) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  const related = getRelatedArticles(article.slug, article.category, 4);
  const crossCategory = getCrossCategoryArticles(article.slug, article.category, 3);
  const popular = getPopularArticles(article.slug, 5);
  const heroUrl = getHeroImageUrl(article.id);

  // Build TOC from body
  const tocItems: { id: string; text: string }[] = [];
  const h2Regex = /<h2[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h2>/g;
  let match;
  while ((match = h2Regex.exec(article.body)) !== null) {
    tocItems.push({ id: match[1], text: match[2] });
  }

  return (
    <Layout>
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={heroUrl}
          alt={article.heroAlt}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
      </div>

      <div className="container max-w-4xl -mt-20 relative z-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4 font-body">
          <a href="/" className="hover:text-primary transition-colors no-underline">
            Home
          </a>
          <span className="mx-2">/</span>
          <a
            href={`/category/${article.category}`}
            className="hover:text-primary transition-colors no-underline"
          >
            {article.categoryName}
          </a>
        </nav>

        {/* Article header */}
        <header className="mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(article.dateISO)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readingTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {article.wordCount.toLocaleString()} words
            </span>
          </div>
        </header>

        {/* TOC toggle */}
        {tocItems.length > 2 && (
          <div className="mb-8">
            <button
              onClick={() => setShowToc(!showToc)}
              className="text-sm font-body font-semibold text-primary hover:underline"
            >
              {showToc ? "Hide" : "Show"} Table of Contents ({tocItems.length} sections)
            </button>
            {showToc && (
              <nav className="mt-3 p-4 rounded-lg bg-card border border-border/50">
                <ol className="space-y-1.5">
                  {tocItems.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors no-underline"
                      >
                        {i + 1}. {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
        )}

        {/* Article body */}
        <article
          className="article-body prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* Author bio sidebar */}
        <aside className="my-12 p-6 rounded-xl bg-card border border-border/50 flex items-start gap-5">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="font-heading text-xl font-bold text-primary">K</span>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
              Krishna — Mystic &amp; Spiritual Advisor
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Thirty years navigating the territory between psychology and spirit. Dream work, consciousness exploration, and the kind of guidance that does not let you hide from yourself.
            </p>
            <a
              href="https://shrikrishna.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline font-body font-semibold"
            >
              ShriKrishna.com
            </a>
          </div>
        </aside>

        {/* Newsletter CTA mid-article */}
        <div className="my-12 p-8 rounded-xl bg-card border border-border/50 text-center">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
            The Threshold Dispatch
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Dream interpretation that does not insult your intelligence. Delivered when it matters.
          </p>
          <NewsletterSignup source={`article-${article.slug}`} variant="hero" />
        </div>

        {/* Related articles — same category */}
        {related.length > 0 && (
          <section className="mt-16 mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              More from {article.categoryName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} variant="compact" />
              ))}
            </div>
          </section>
        )}

        {/* Cross-category articles */}
        {crossCategory.length > 0 && (
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              Keep Reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {crossCategory.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </Layout>
  );
}
