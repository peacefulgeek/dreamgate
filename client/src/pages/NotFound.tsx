import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { getPublishedArticles } from "@/lib/articles";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found — Dream Gate";
  }, []);

  const recommended = useMemo(() => {
    const published = getPublishedArticles();
    return [...published].sort(() => Math.random() - 0.5).slice(0, 6);
  }, []);

  return (
    <Layout>
      <div className="max-w-[720px] mx-auto px-5 py-20">
        <h1 className="font-heading text-5xl font-bold text-primary mb-6">404</h1>
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
          This Page Has Dissolved Back Into the Dream
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The page you are looking for does not exist — or it existed once and has
          since transformed into something else. Dreams do that. Pages do too,
          sometimes.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-10">
          In dream interpretation, getting lost often signals that your conscious
          mind is trying to navigate territory the unconscious already knows. The
          disorientation is not the problem — it is the beginning of reorientation.
        </p>

        <Link
          href="/"
          className="text-primary hover:underline text-sm font-medium no-underline"
        >
          Return to the homepage
        </Link>

        {recommended.length > 0 && (
          <div className="mt-12">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
              While You Are Here
            </h3>
            <ul className="space-y-3">
              {recommended.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/article/${a.slug}`}
                    className="text-base text-foreground hover:text-primary transition-colors no-underline"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}
