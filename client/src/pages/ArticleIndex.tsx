import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { getPublishedArticles, CATEGORIES, formatDate } from "@/lib/articles";

const PER_PAGE = 20;

export default function ArticleIndex() {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const published = useMemo(() => getPublishedArticles(), []);

  useEffect(() => {
    document.title = "Articles — Dream Gate";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", `Browse ${published.length} dream interpretation articles on Dream Gate.`);
  }, [published.length]);

  const filtered = useMemo(() => {
    if (!categoryFilter) return published;
    return published.filter((a) => a.category === categoryFilter);
  }, [published, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => { setPage(1); }, [categoryFilter]);

  return (
    <Layout>
      <div className="max-w-[720px] mx-auto px-5 py-12">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
          Articles
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          {categoryFilter ? ` in ${CATEGORIES.find(c => c.slug === categoryFilter)?.name}` : ""}
        </p>

        {/* Category filter — text links */}
        <div className="flex flex-wrap items-center gap-3 mb-8 text-sm">
          <button
            onClick={() => setCategoryFilter(null)}
            className={`transition-colors ${!categoryFilter ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategoryFilter(cat.slug)}
              className={`transition-colors ${categoryFilter === cat.slug ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Article list — simple rows */}
        <div className="space-y-0">
          {paginated.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-border/30 no-underline group"
            >
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h2>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 sm:mt-0 sm:ml-4 flex-shrink-0">
                <span>{article.categoryName}</span>
                <span>&middot;</span>
                <span>{article.readingTime} min</span>
                <span>&middot;</span>
                <span>{formatDate(article.dateISO)}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {paginated.length === 0 && (
          <p className="text-muted-foreground text-center py-12">No articles found in this category.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10 text-sm">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              Previous
            </button>
            <span className="text-muted-foreground">
              {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
