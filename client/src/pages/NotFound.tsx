import { useEffect } from "react";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import { getPublishedArticles, type ArticleMeta } from "@/lib/articles";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found — Dream Gate";
  }, []);

  // Get 6 random published articles for recommendations
  const published = getPublishedArticles();
  const shuffled = [...published].sort(() => Math.random() - 0.5);
  const recommended: ArticleMeta[] = shuffled.slice(0, 6);

  return (
    <Layout>
      <div className="container max-w-3xl py-20 text-center">
        <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
          This Page Has Dissolved Back Into the Dream
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-4">
          The page you are looking for does not exist — or it existed once and has
          since transformed into something else. Dreams do that. Pages do too,
          sometimes.
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
          In dream interpretation, getting lost often signals that your conscious
          mind is trying to navigate territory the unconscious already knows. The
          disorientation is not the problem — it is the beginning of reorientation.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold hover:opacity-90 transition-opacity no-underline"
        >
          Return to the Threshold
        </a>
      </div>

      {/* 6 article recommendations */}
      {recommended.length > 0 && (
        <section className="container py-12">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-6 text-center">
            While You Are Here — Start Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
