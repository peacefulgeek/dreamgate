import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Link } from "wouter";
import { getPublishedArticles, getArticlesByCategory, CATEGORIES } from "@/lib/articles";
import { websiteJsonLd, organizationJsonLd, subscribeActionJsonLd } from "@/lib/seo";
import { useEffect } from "react";
import { quizzes } from "@/lib/quizzes";

const HERO_IMG = "https://dreamgate.b-cdn.net/images/dreamgate-hero-main.png";
const GARDEN_IMG = "https://dreamgate.b-cdn.net/images/dreamgate-moonlit-garden.png";
const GEOMETRY_IMG = "https://dreamgate.b-cdn.net/images/dreamgate-sacred-geometry.png";

export default function Home() {
  const published = getPublishedArticles();
  const featured = published.slice(0, 3);
  const recent = published.slice(3, 9);

  useEffect(() => {
    document.title = "Dream Gate — What Your Dreams Are Trying to Tell You";
    // Set meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", `Dream interpretation through spiritual, psychological, and somatic dimensions. Explore dream interpretation articles on what your dreams are actually trying to tell you.`);

    // JSON-LD
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative z-10 container text-center py-24">
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-foreground leading-tight mb-6 drop-shadow-lg">
            What Your Dreams Are<br />
            <span className="text-primary">Trying to Tell You</span>
          </h1>
          <p className="font-body text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Dream interpretation through spiritual, psychological, and somatic dimensions.
            Not fortune-telling. Not fluff. The real work of understanding what your
            unconscious is communicating.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/articles"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-base hover:opacity-90 transition-opacity no-underline"
            >
              Explore Articles
            </Link>
            <Link
              href="/dream-decoder"
              className="px-8 py-3 rounded-lg border border-primary/50 text-primary font-body font-semibold text-base hover:bg-primary/10 transition-colors no-underline"
            >
              Dream Decoder
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="container py-20">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
            Featured
          </h2>
          <p className="text-muted-foreground mb-10">
            The articles that cut deepest.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((a) => (
              <ArticleCard key={a.id} article={a} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* Category Exploration */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${GARDEN_IMG})` }}
        />
        <div className="relative container">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
            Explore the Territory
          </h2>
          <p className="text-muted-foreground mb-10">
            Five dimensions of dream work. Each one goes deeper.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => {
              const count = getArticlesByCategory(cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group block p-6 rounded-xl bg-card/80 border border-border/50 hover:border-primary/40 transition-all duration-300 no-underline text-center"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {count} article{count !== 1 ? "s" : ""}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      {recent.length > 0 && (
        <section className="container py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
                Recent
              </h2>
              <p className="text-muted-foreground">
                The latest dispatches from the threshold.
              </p>
            </div>
            <Link
              href="/articles"
              className="text-sm text-primary hover:underline no-underline font-body font-semibold hidden sm:block"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* Quizzes CTA */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-8"
          style={{ backgroundImage: `url(${GEOMETRY_IMG})` }}
        />
        <div className="relative container">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2 text-center">
            Dream Quizzes
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            Interactive tools that map your dream landscape. Each quiz leads to personalized
            article recommendations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {quizzes.slice(0, 6).map((q) => (
              <Link
                key={q.id}
                href={`/quiz/${q.slug}`}
                className="group block p-5 rounded-xl bg-card/80 border border-border/50 hover:border-primary/40 transition-all duration-300 no-underline"
              >
                <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {q.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {q.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/quizzes"
              className="text-sm text-primary hover:underline no-underline font-body font-semibold"
            >
              All {quizzes.length} quizzes &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
            The Threshold Dispatch
          </h2>
          <p className="text-muted-foreground mb-8">
            No spam. No fluff. Just the dispatches that matter — when there is
            something worth crossing the threshold for.
          </p>
          <NewsletterSignup source="homepage-footer" variant="hero" />
        </div>
      </section>
    </Layout>
  );
}
