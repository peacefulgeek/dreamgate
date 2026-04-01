import { Link, useLocation } from "wouter";
import { useState, useEffect, type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("dg-cookie-consent");
    if (!consent) setShowCookieBanner(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  function acceptCookies() {
    localStorage.setItem("dg-cookie-consent", "accepted");
    setShowCookieBanner(false);
  }

  const navLinks = [
    { href: "/articles", label: "Articles" },
    { href: "/quizzes", label: "Quizzes" },
    { href: "/assessments", label: "Assessments" },
    { href: "/tools", label: "Tools" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="max-w-[720px] mx-auto px-5 py-5 flex items-center justify-between">
          <Link href="/" className="font-heading text-xl tracking-tight text-foreground hover:text-primary transition-colors no-underline">
            Dream Gate
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-5 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors no-underline ${location === link.href ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileMenuOpen ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-border/30 bg-card">
            <nav className="max-w-[720px] mx-auto px-5 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors no-underline ${location === link.href ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="max-w-[720px] mx-auto px-5 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/articles" className="hover:text-foreground transition-colors no-underline">Articles</Link>
              <Link href="/tools" className="hover:text-foreground transition-colors no-underline">Tools</Link>
              <Link href="/quizzes" className="hover:text-foreground transition-colors no-underline">Quizzes</Link>
              <Link href="/assessments" className="hover:text-foreground transition-colors no-underline">Assessments</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors no-underline">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors no-underline">Terms</Link>
            </div>
            <p className="text-xs">
              &copy; {new Date().getFullYear()} Dream Gate
            </p>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-4">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
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
