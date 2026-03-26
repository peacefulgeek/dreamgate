import { Link, useLocation } from "wouter";
import { useState, useEffect, type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("dg-cookie-consent");
    if (!consent) setShowCookieBanner(true);
  }, []);

  function acceptCookies() {
    localStorage.setItem("dg-cookie-consent", "accepted");
    setShowCookieBanner(false);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-[720px] mx-auto px-5 py-5 flex items-center justify-between">
          <Link href="/" className="font-heading text-xl tracking-tight text-foreground hover:text-primary transition-colors no-underline">
            Dream Gate
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/articles"
              className={`transition-colors no-underline ${location === "/articles" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              Articles
            </Link>
            <Link
              href="/about"
              className={`transition-colors no-underline ${location === "/about" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="max-w-[720px] mx-auto px-5 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors no-underline">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors no-underline">
                Terms
              </Link>
            </div>
            <p className="text-xs">
              &copy; {new Date().getFullYear()} Dream Gate
            </p>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-5 py-4 z-50">
          <div className="max-w-[720px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              This site uses cookies for essential functionality. No tracking. No ads.
            </p>
            <button
              onClick={acceptCookies}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
