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

const KALESH_IMG = "https://dreamgate.b-cdn.net/images/kalesh-bio.webp";

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

  // Check if article body contains Amazon affiliate links
  const hasAffiliateLinks = article.body.includes("amazon.com/dp/") || article.body.includes("tag=spankyspinola-20");

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

      {/* Two-column layout on desktop: article + sidebar */}
      <div className="max-w-[960px] mx-auto px-5 relative flex gap-10">
        {/* Main article column */}
        <div className="max-w-[720px] flex-1 min-w-0">
          {/* Share buttons — floating left on desktop */}
          <div className="hidden xl:flex flex-col gap-3 fixed left-[calc(50%-540px)] top-1/3 z-40">
            <a href={shareTwitter} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors text-xs" title="Share on X">{"\ud835\udd4f"}</a>
            <a href={shareFacebook} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors text-xs" title="Share on Facebook">f</a>
            <a href={shareLinkedin} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors text-xs" title="Share on LinkedIn">in</a>
          </div>

          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mt-8 mb-4">
            <Link href="/" className="hover:text-foreground transition-colors no-underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${article.category}`} className="hover:text-foreground transition-colors no-underline">{article.categoryName}</Link>
          </nav>

          {/* Title */}
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

          {/* Affiliate disclosure — only if article has affiliate links */}
          {hasAffiliateLinks && (
            <div className="border border-border/50 rounded-lg bg-card/50 px-4 py-3 mb-8">
              <p className="text-xs text-muted-foreground">
                This article contains affiliate links. We may earn a small commission if you make a purchase — at no extra cost to you.
              </p>
            </div>
          )}

          {/* Article body */}
          <article
            className="article-body"
            style={{ fontSize: "20px", lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* Health Disclaimer */}
          <div className="border border-amber-500/30 rounded-lg bg-amber-500/5 px-5 py-4 mt-12">
            <p className="text-sm text-foreground/80 leading-relaxed">
              <strong className="text-foreground">Educational Content Only.</strong> The information on this site is provided for educational and informational purposes and is not intended as medical, psychological, or professional health advice. Dream interpretation is inherently subjective and should not replace consultation with a qualified healthcare provider. If you are experiencing sleep disorders, psychological distress, or any health concerns, please seek guidance from a licensed professional.
            </p>
          </div>

          <hr className="my-12 border-border/40" />

          {/* Author bio card with photo */}
          <div className="flex items-start gap-5 mb-12 p-5 border border-border/30 rounded-lg bg-card/30">
            <img
              src={KALESH_IMG}
              alt="Kalesh"
              width={80}
              height={80}
              className="rounded-full w-20 h-20 object-cover flex-shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div>
              <p className="font-heading font-semibold text-foreground mb-1">Kalesh</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Kalesh is a consciousness teacher and writer whose work explores the intersection of ancient contemplative traditions and modern neuroscience. With decades of practice in meditation, breathwork, and somatic inquiry, he guides others toward embodied awareness.
              </p>
              <a
                href="https://kalesh.love"
                target="_blank"
                rel="noopener"
                className="inline-block text-sm font-medium text-primary hover:text-primary/80 transition-colors no-underline"
              >
                Visit Kalesh's Website &rarr;
              </a>
            </div>
          </div>

          {/* Tools recommendation link */}
          <div className="mb-12 text-sm">
            <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors no-underline">
              Browse our recommended tools for dream work &rarr;
            </Link>
          </div>

          {/* Related articles */}
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
          <div className="xl:hidden flex items-center gap-4 mb-12 text-sm">
            <span className="text-muted-foreground">Share:</span>
            <a href={shareTwitter} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors no-underline">{"\ud835\udd4f"}</a>
            <a href={shareFacebook} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors no-underline">Facebook</a>
            <a href={shareLinkedin} target="_blank" rel="nofollow noopener" className="text-muted-foreground hover:text-foreground transition-colors no-underline">LinkedIn</a>
          </div>
        </div>

        {/* Sidebar — Kalesh bio card, visible on large screens */}
        <aside className="hidden lg:block w-[200px] flex-shrink-0 pt-8">
          <div className="sticky top-8 space-y-6">
            <div className="border border-border/30 rounded-lg bg-card/30 p-4 text-center">
              <img
                src={KALESH_IMG}
                alt="Kalesh"
                width={120}
                height={120}
                className="rounded-full w-24 h-24 object-cover mx-auto mb-3"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <p className="font-heading font-semibold text-foreground text-sm mb-1">Kalesh</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Mystic and spiritual advisor who brings ancient wisdom and depth to life's biggest decisions.
              </p>
              <a
                href="https://kalesh.love"
                target="_blank"
                rel="noopener"
                className="inline-block w-full text-center text-xs font-medium bg-primary text-primary-foreground rounded-md px-3 py-2 hover:bg-primary/90 transition-colors no-underline"
              >
                Visit Kalesh's Website
              </a>
            </div>

            <div className="border border-border/30 rounded-lg bg-card/30 p-4">
              <p className="font-heading font-semibold text-foreground text-xs mb-2">Explore</p>
              <div className="space-y-2 text-xs">
                <Link href="/tools" className="block text-muted-foreground hover:text-primary transition-colors no-underline">
                  Tools We Recommend
                </Link>
                <Link href="/quizzes" className="block text-muted-foreground hover:text-primary transition-colors no-underline">
                  Dream Quizzes
                </Link>
                <Link href="/assessments" className="block text-muted-foreground hover:text-primary transition-colors no-underline">
                  Assessments
                </Link>
                <Link href="/dream-decoder" className="block text-muted-foreground hover:text-primary transition-colors no-underline">
                  Dream Decoder
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
