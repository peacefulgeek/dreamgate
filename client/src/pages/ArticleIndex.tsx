import { useState, useMemo, useEffect } from "react";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import { getPublishedArticles, CATEGORIES, type ArticleMeta } from "@/lib/articles";
import { Search } from "lucide-react";

const ARTICLES_PER_PAGE = 12;

export default function ArticleIndex() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const allPublished = useMemo(() => getPublishedArticles(), []);

  const filtered = useMemo(() => {
    let result = allPublished;
    if (activeCategory) {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.metaDescription.toLowerCase().includes(q) ||
          a.categoryName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allPublished, activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ARTICLES_PER_PAGE,
    page * ARTICLES_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [search, activeCategory]);

  useEffect(() => {
    document.title = "All Articles — Dream Gate";
  }, []);

  return (
    <Layout>
      <div className="container py-16">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
          Article Archive
        </h1>
        <p className="text-muted-foreground mb-8">
          {allPublished.length} articles. Every one of them written to change how you
          think about your dreams.
        </p>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-body transition-colors ${
              !activeCategory
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setActiveCategory(activeCategory === cat.slug ? null : cat.slug)
              }
              className={`px-4 py-1.5 rounded-full text-sm font-body transition-colors ${
                activeCategory === cat.slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {paginated.length} of {filtered.length} articles
          {activeCategory && ` in ${CATEGORIES.find((c) => c.slug === activeCategory)?.name}`}
          {search && ` matching "${search}"`}
        </p>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No articles found. Try a different search or category.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg text-sm font-body bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-40 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground px-4">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg text-sm font-body bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
