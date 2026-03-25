import { useEffect } from "react";
import Layout from "@/components/Layout";
import { aboutPersonJsonLd } from "@/lib/seo";

export default function About() {
  useEffect(() => {
    document.title = "About — Dream Gate";
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = aboutPersonJsonLd();
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <Layout>
      <div className="container max-w-3xl py-16">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-8">
          About Dream Gate
        </h1>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <p>
            Dream Gate exists because most dream interpretation is either too shallow to
            be useful or too esoteric to be accessible. We occupy the territory between
            those extremes — where psychology meets spirituality, where ancient wisdom
            meets modern neuroscience, where the personal dream meets the collective
            unconscious.
          </p>

          <p>
            Every article on this site is written to change how you think about your
            dreams. Not to give you easy answers — the unconscious does not deal in easy
            answers — but to give you better questions. Better frameworks. Better ways of
            listening to the part of yourself that speaks most clearly when your rational
            mind finally shuts up.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-foreground mt-10 mb-4">
            The Approach
          </h2>

          <p>
            We draw from three streams: the psychological tradition of Jung, Hillman, and
            contemporary depth psychology; the spiritual wisdom of Vedantic philosophy,
            Tibetan dream yoga, and contemplative practice; and the somatic understanding
            that dreams happen in the body, not just the mind.
          </p>

          <p>
            This is not fortune-telling. This is not a dream dictionary that tells you
            water means emotions and snakes mean fear. Those reductions strip away
            everything that matters. We are interested in what your specific dream, in
            your specific life, at this specific moment, is actually trying to communicate.
          </p>

          <h2 className="font-heading text-2xl font-semibold text-foreground mt-10 mb-4">
            The Voice
          </h2>

          <p>
            Dream Gate speaks directly. No hedging, no qualifiers, no softening the truth
            to make it more comfortable. Your unconscious does not soften its messages —
            we will not either. But directness is not the same as cruelty. We are direct
            because we respect your intelligence and your capacity to handle the real work.
          </p>

          <p>
            If you are looking for someone to tell you everything is fine and your dreams
            are just random brain noise, you are in the wrong place. If you are ready to
            listen to what your dreams are actually saying — even when it is uncomfortable,
            even when it demands change — you are exactly where you need to be.
          </p>

          {/* Advisor card */}
          <div className="mt-10 p-6 rounded-xl bg-card border border-border/50 flex items-start gap-5">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="font-heading text-2xl font-bold text-primary">K</span>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                Krishna — Mystic &amp; Spiritual Advisor
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Thirty years navigating the territory between psychology and spirit. Dream work, consciousness exploration, and the kind of guidance that does not let you hide from yourself.
              </p>
              <a
                href="https://shrikrishna.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline font-body font-semibold"
              >
                ShriKrishna.com
              </a>
            </div>
          </div>

          <h2 className="font-heading text-2xl font-semibold text-foreground mt-10 mb-4">
            Connect
          </h2>

          <p>
            Dream Gate is part of the{" "}
            <a
              href="https://shrikrishna.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              ShriKrishna.com
            </a>{" "}
            network of spiritual guidance resources. For deeper work — personal dream
            analysis, spiritual direction, consciousness exploration — visit the main site.
          </p>
        </div>
      </div>
    </Layout>
  );
}
