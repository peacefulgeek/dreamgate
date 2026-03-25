import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Search, Moon } from "lucide-react";
import { CATEGORIES } from "@/lib/articles";
import NewsletterSignup from "./NewsletterSignup";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl font-heading font-bold text-primary tracking-wide">
              Dream Gate
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`text-sm font-body transition-colors no-underline ${
                  location === `/category/${cat.slug}`
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/quizzes"
              className={`text-sm font-body transition-colors no-underline ${
                location === "/quizzes"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Quizzes
            </Link>
            <Link
              href="/dream-decoder"
              className={`text-sm font-body transition-colors no-underline ${
                location === "/dream-decoder"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dream Decoder
            </Link>
            <Link
              href="/articles"
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors no-underline"
            >
              <Search className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <nav className="container py-4 flex flex-col gap-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-base font-body text-muted-foreground hover:text-foreground transition-colors no-underline py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/quizzes"
                className="text-base font-body text-muted-foreground hover:text-foreground transition-colors no-underline py-1"
                onClick={() => setMobileOpen(false)}
              >
                Quizzes
              </Link>
              <Link
                href="/dream-decoder"
                className="text-base font-body text-muted-foreground hover:text-foreground transition-colors no-underline py-1"
                onClick={() => setMobileOpen(false)}
              >
                Dream Decoder
              </Link>
              <Link
                href="/articles"
                className="text-base font-body text-muted-foreground hover:text-foreground transition-colors no-underline py-1"
                onClick={() => setMobileOpen(false)}
              >
                All Articles
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="font-heading text-xl font-bold text-primary mb-3">
                Dream Gate
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                What your dreams are trying to tell you. Dream interpretation through
                spiritual, psychological, and somatic dimensions.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-foreground mb-3">
                Explore
              </h4>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors no-underline"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-foreground mb-3">
                Tools
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/quizzes" className="text-sm text-muted-foreground hover:text-primary transition-colors no-underline">
                    Dream Quizzes
                  </Link>
                </li>
                <li>
                  <Link href="/dream-decoder" className="text-sm text-muted-foreground hover:text-primary transition-colors no-underline">
                    Dream Decoder
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="text-sm text-muted-foreground hover:text-primary transition-colors no-underline">
                    Article Archive
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-foreground mb-3">
                About
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors no-underline">
                    About Dream Gate
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors no-underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors no-underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a
                    href="https://shrikrishna.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors no-underline"
                  >
                    ShriKrishna.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border/30 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Dream Gate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
