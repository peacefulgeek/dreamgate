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
      <div className="max-w-[720px] mx-auto px-5 py-16">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
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

          <h2 className="font-heading text-xl font-semibold text-foreground mt-10 mb-4">
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

          <h2 className="font-heading text-xl font-semibold text-foreground mt-10 mb-4">
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

          {/* Kalesh bio — inline, not a card */}
          <hr className="border-border/40 my-10" />

          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
              About Kalesh
            </h2>
            <div className="flex items-start gap-5">
              <img
                src="https://dreamgate.b-cdn.net/images/kalesh-bio.webp"
                alt="Kalesh"
                width={120}
                height={120}
                className="rounded-full w-24 h-24 object-cover flex-shrink-0"
              />
              <div>
                <p className="text-foreground/90 leading-relaxed mb-3">
                  Kalesh is a consciousness teacher and writer whose work explores the intersection
                  of ancient contemplative traditions and modern neuroscience. With decades of
                  practice in meditation, breathwork, and somatic inquiry, he guides others toward
                  embodied awareness.
                </p>
                <a
                  href="https://kalesh.love"
                  target="_blank"
                  rel="noopener"
                  className="inline-block text-sm font-medium bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90 transition-colors no-underline"
                >
                  Visit Kalesh's Website
                </a>
              </div>
            </div>
          </div>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-10 mb-4">
            Connect
          </h2>

          <p>
            Dream Gate is part of the{" "}
            <a
              href="https://kalesh.love"
              className="text-primary hover:underline"
            >
              kalesh.love
            </a>{" "}
            network of consciousness exploration resources. For deeper work — personal
            guidance, consciousness exploration, contemplative practice — visit the main site.
          </p>
        </div>
      </div>
    </Layout>
  );
}
