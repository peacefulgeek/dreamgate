import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import ArticleCard from "@/components/ArticleCard";
import { searchArticles, getPublishedArticles, type ArticleMeta } from "@/lib/articles";
import { Search, Sparkles } from "lucide-react";

const SLEEPING_IMG = "https://dreamgate.b-cdn.net/images/dreamgate-sleeping-light.png";

// Dream symbol keyword map for matching
const SYMBOL_KEYWORDS: Record<string, string[]> = {
  water: ["water", "ocean", "river", "rain", "flood", "swimming", "drowning", "lake", "sea", "waves", "tide"],
  falling: ["falling", "fall", "cliff", "height", "drop", "plunge"],
  flying: ["flying", "fly", "soaring", "floating", "wings", "air"],
  teeth: ["teeth", "tooth", "falling out", "crumbling", "mouth"],
  chase: ["chase", "chased", "running", "pursued", "escape", "fleeing", "run"],
  death: ["death", "dying", "dead", "funeral", "grave", "kill"],
  house: ["house", "home", "room", "door", "building", "stairs", "basement", "attic"],
  animal: ["animal", "snake", "spider", "dog", "cat", "wolf", "bear", "bird", "fish"],
  naked: ["naked", "nude", "exposed", "clothes", "undressed"],
  lost: ["lost", "maze", "labyrinth", "wandering", "confused", "searching"],
  baby: ["baby", "child", "pregnancy", "pregnant", "birth"],
  fire: ["fire", "burning", "flames", "smoke"],
  exam: ["exam", "test", "school", "class", "unprepared", "late"],
  shadow: ["shadow", "dark", "darkness", "monster", "demon", "nightmare"],
  spiritual: ["god", "divine", "temple", "light", "angel", "spirit", "sacred", "meditation"],
};

export default function DreamDecoder() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ArticleMeta[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    document.title = "Dream Decoder — Dream Gate";
  }, []);

  const handleDecode = () => {
    if (!input.trim()) return;
    setHasSearched(true);

    const words = input.toLowerCase().split(/\s+/);
    const allPublished = getPublishedArticles();

    // Score articles based on keyword matching
    const scored = allPublished.map((article) => {
      let score = 0;
      const titleLower = article.title.toLowerCase();
      const descLower = article.metaDescription.toLowerCase();

      // Direct text search
      for (const word of words) {
        if (word.length < 3) continue;
        if (titleLower.includes(word)) score += 3;
        if (descLower.includes(word)) score += 1;
      }

      // Symbol keyword matching
      for (const [, keywords] of Object.entries(SYMBOL_KEYWORDS)) {
        for (const kw of keywords) {
          if (input.toLowerCase().includes(kw)) {
            if (titleLower.includes(kw)) score += 5;
            if (descLower.includes(kw)) score += 2;
            // Also match related keywords in article
            for (const relatedKw of keywords) {
              if (titleLower.includes(relatedKw)) score += 2;
            }
          }
        }
      }

      return { article, score };
    });

    // Sort by score, take top results
    const topResults = scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 9)
      .map((s) => s.article);

    // If no keyword matches, fall back to text search
    if (topResults.length === 0) {
      const textResults = searchArticles(input);
      setResults(textResults.slice(0, 9));
    } else {
      setResults(topResults);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${SLEEPING_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div className="relative container text-center max-w-2xl">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Dream Decoder
          </h1>
          <p className="text-muted-foreground mb-8">
            Describe your dream — the images, the feelings, the fragments you remember.
            The decoder will match you with the articles most relevant to what your
            unconscious is trying to communicate.
          </p>

          {/* Input */}
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="I dreamed I was falling through water, and there was a door at the bottom that I could not reach..."
              className="w-full h-32 bg-input border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground text-sm font-body resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleDecode}
              disabled={!input.trim()}
              className="mt-4 flex items-center gap-2 mx-auto px-8 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              <Sparkles className="w-4 h-4" />
              Decode This Dream
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      {hasSearched && (
        <section className="container py-16">
          {results.length > 0 ? (
            <>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                Your Dream Points Here
              </h2>
              <p className="text-muted-foreground mb-8">
                {results.length} articles matched the symbols and themes in your dream.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground text-lg mb-4">
                No direct matches found. Your dream may be speaking in a language we
                have not mapped yet.
              </p>
              <p className="text-sm text-muted-foreground">
                Try different keywords, or{" "}
                <a href="/articles" className="text-primary hover:underline no-underline">
                  browse all articles
                </a>{" "}
                to find what resonates.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Suggested symbols */}
      {!hasSearched && (
        <section className="container py-16">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">
            Common Dream Symbols
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {Object.keys(SYMBOL_KEYWORDS).map((symbol) => (
              <button
                key={symbol}
                onClick={() => {
                  setInput(`I dreamed about ${symbol}`);
                }}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-body hover:bg-secondary/80 transition-colors capitalize"
              >
                {symbol}
              </button>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
