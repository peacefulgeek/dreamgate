import { Link } from "wouter";
import type { ArticleMeta } from "@/lib/articles";
import { formatDate, getHeroImageUrl } from "@/lib/articles";

interface Props {
  article: ArticleMeta;
  variant?: "default" | "compact" | "featured";
}

export default function ArticleCard({ article, variant = "default" }: Props) {
  const heroUrl = getHeroImageUrl(article.id);

  if (variant === "featured") {
    return (
      <Link href={`/${article.slug}`} className="group block no-underline">
        <article className="relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300">
          <div className="aspect-[16/9] overflow-hidden bg-secondary">
            <img
              src={heroUrl}
              alt={article.heroAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-body font-semibold uppercase tracking-wider text-primary">
                {article.categoryName}
              </span>
              <span className="text-xs text-muted-foreground">
                {article.readingTime} min read
              </span>
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {article.metaDescription}
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              {formatDate(article.dateISO)}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/${article.slug}`} className="group block no-underline">
        <article className="flex gap-4 py-3 border-b border-border/30 last:border-0">
          <div className="flex-1">
            <span className="text-xs font-body font-semibold uppercase tracking-wider text-primary">
              {article.categoryName}
            </span>
            <h4 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mt-1">
              {article.title}
            </h4>
            <div className="mt-1 text-xs text-muted-foreground">
              {article.readingTime} min &middot; {formatDate(article.dateISO)}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/${article.slug}`} className="group block no-underline">
      <article className="overflow-hidden rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
        <div className="aspect-[16/10] overflow-hidden bg-secondary">
          <img
            src={heroUrl}
            alt={article.heroAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-body font-semibold uppercase tracking-wider text-primary">
              {article.categoryName}
            </span>
            <span className="text-xs text-muted-foreground">
              {article.readingTime} min
            </span>
          </div>
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2 flex-1">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {article.metaDescription}
          </p>
          <div className="text-xs text-muted-foreground mt-auto">
            {formatDate(article.dateISO)}
          </div>
        </div>
      </article>
    </Link>
  );
}
