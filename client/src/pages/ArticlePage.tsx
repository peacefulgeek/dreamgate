import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "wouter";
import Layout from "@/components/Layout";
import NewsletterSignup from "@/components/NewsletterSignup";
import {
  getArticle,
  getRelatedArticles,
  formatDate,
  getHeroImageUrl,
  type ArticleFull,
} from "@/lib/articles";
import { articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const [article, setArticle] = useState<ArticleFull | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getArticle(slug).then((a) => {
      if (!a || a.dateISO > new Date().toISOString()) {
        navigate("/404");
        return;
      }
      setArticle(a);
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [slug, navigate]);

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} — Dream Gate`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", article.metaDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", `https://dreamgate.love/article/${article.slug}`);

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
    addLd(breadcrumbJsonLd([
      { name: "Home", url: "https://dreamgate.love" },
      { name: article.categoryName, url: `https://dreamgate.love/category/${article.category}` },
      { name: article.title, url: `https://dreamgate.love/article/${article.slug}` },
    ]));

    const ogTags: Record<string, string> = {
      "og:title": article.title,
      "og:description": article.metaDescription,
      "og:type": "article",
      "og:url": `https://dreamgate.love/article/${article.slug}`,
      "og:image": `https://dreamgate.b-cdn.net/og/article-${article.id}.webp`,
      "og:site_name": "Dream Gate",
      "twitter:card": "summary_large_image",
      "twitter:title": article.title,
      "twitter:description": article.metaDescription,
      "twitter:image": `https://dreamgate.b-cdn.net/og/article-${article.id}.webp`,
    };
    const ogEls: HTMLMetaElement[] = [];
    for (const [prop, content] of Object.entries(ogTags)) {
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement;
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); ogEls.push(el); }
      el.setAttribute("content", content);
    }

    return () => { scripts.forEach((el) => el.remove()); ogEls.forEach((el) => el.remove()); };
  }, [article]);

  if (loading || !article) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  const heroUrl = getHeroImageUrl(article.id);
  const related = getRelatedArticles(article.slug, article.category, 3);
  const articleUrl = `https://dreamgate.love/article/${article.slug}`;
  const shareTwitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
  const shareLinkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;

  return (
    <Layout>
      {/* Hero image — full bleed */}
      <div className="w-full max-h-[420px] overflow-hidden">
        <img
          src={heroUrl}
          alt={article.heroAlt}
          width={1200}
          height={675}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* Article content — single column 720px */}
      <div className="max-w-[720px] mx-auto px-5 relative">
        {/* Share buttons — floating left on desktop */}
        <div className="hidden lg:flex flex-col gap-3 fixed left-[calc(50%-420px)] top-1/3 z-40">
          <a href={shareTwitter} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors text-xs" title="Share on X">𝕏</a>
          <a href={shareFacebook} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors text-xs" title="Share on Facebook">f</a>
          <a href={shareLinkedin} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors text-xs" title="Share on LinkedIn">in</a>
        </div>

        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mt-8 mb-4">
          <Link href="/" className="hover:text-foreground transition-colors no-underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${article.category}`} className="hover:text-foreground transition-colors no-underline">{article.categoryName}</Link>
        </nav>

        {/* Title below hero */}
        <header className="mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{formatDate(article.dateISO)}</span>
            <span>&middot;</span>
            <span>{article.readingTime} min read</span>
          </div>
        </header>

        {/* Article body — body text 20px, line-height 1.8, paragraph spacing 1.5em */}
        <article
          className="article-body"
          style={{ fontSize: "20px", lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* Horizontal rule before bio */}
        <hr className="my-12 border-border/40" />

        {/* Inline author bio — NOT a sidebar card */}
        <div className="mb-12">
          <p className="text-base text-foreground leading-relaxed">
            <strong>About Kalesh</strong> — Kalesh is a consciousness teacher and writer whose work explores the intersection of ancient contemplative traditions and modern neuroscience. With decades of practice in meditation, breathwork, and somatic inquiry, he guides others toward embodied awareness.{" "}
            <a href="https://kalesh.love" className="text-primary hover:underline">Visit Kalesh's site</a>.
          </p>
        </div>

        {/* Cross-links: "More from [Category]" — 3 title-only links */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
              More from {article.categoryName}
            </h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/article/${r.slug}`} className="text-base text-foreground hover:text-primary transition-colors no-underline">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Newsletter */}
        <div className="mb-16">
          <NewsletterSignup source={`article-${article.slug}`} variant="inline" />
        </div>

        {/* Share buttons — bottom on mobile */}
        <div className="lg:hidden flex items-center gap-4 mb-12 text-sm">
          <span className="text-muted-foreground">Share:</span>
          <a href={shareTwitter} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors no-underline">𝕏</a>
          <a href={shareFacebook} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Facebook</a>
          <a href={shareLinkedin} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors no-underline">LinkedIn</a>
        </div>
      </div>
    </Layout>
  );
}
