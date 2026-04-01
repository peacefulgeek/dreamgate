import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Link } from "wouter";

interface Product {
  name: string;
  url: string;
  isAmazon: boolean;
  description: string;
  articleLink?: { slug: string; text: string };
}

interface Category {
  title: string;
  products: Product[];
}

const TAG = "spankyspinola-20";
const az = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=${TAG}`;

const categories: Category[] = [
  {
    title: "Books on Dream Work & Interpretation",
    products: [
      {
        name: "Man and His Symbols — Carl G. Jung",
        url: az("0385052219"),
        isAmazon: true,
        description:
          "The only book Jung wrote for a general audience. If you want to understand why your dreams speak in images rather than sentences, start here.",
        articleLink: { slug: "collective-unconscious-shared-symbols", text: "our guide to the collective unconscious" },
      },
      {
        name: "Inner Work — Robert A. Johnson",
        url: az("0062504312"),
        isAmazon: true,
        description:
          "A practical, four-step method for working with dreams and active imagination. Johnson makes Jungian dreamwork feel approachable and doable.",
      },
      {
        name: "Exploring the World of Lucid Dreaming — Stephen LaBerge",
        url: az("034537410X"),
        isAmazon: true,
        description:
          "The foundational text on lucid dreaming from the Stanford researcher who proved it in the lab. Exercises, techniques, and the science behind them.",
        articleLink: { slug: "reality-testing-bridge", text: "our article on reality testing" },
      },
      {
        name: "The Tibetan Yogas of Dream and Sleep — Tenzin Wangyal Rinpoche",
        url: az("1559391014"),
        isAmazon: true,
        description:
          "Dream yoga from the Bon tradition. This book bridges ancient Tibetan practice with modern understanding of consciousness during sleep.",
        articleLink: { slug: "turiya-fourth-state", text: "our piece on the fourth state of consciousness" },
      },
      {
        name: "Why We Sleep — Matthew Walker",
        url: az("1501144324"),
        isAmazon: true,
        description:
          "Walker's research on what sleep actually does to the brain changed the conversation. Essential reading for anyone who wants to understand why dreams matter physiologically.",
        articleLink: { slug: "rem-sleep-emotional-processing", text: "our article on REM and emotional processing" },
      },
      {
        name: "Breath — James Nestor",
        url: az("0735213615"),
        isAmazon: true,
        description:
          "Not a dream book per se, but breathwork profoundly shapes sleep architecture. Nestor's investigation into how we breathe — and how most of us do it wrong — is a game-changer for dream practice.",
      },
      {
        name: "Yoga Nidra — Richard Miller",
        url: az("1591797586"),
        isAmazon: true,
        description:
          "The definitive guide to yogic sleep meditation. Miller's iRest protocol has been used in VA hospitals and clinical settings to heal trauma through the liminal space between waking and sleeping.",
      },
    ],
  },
  {
    title: "Dream Journals & Workbooks",
    products: [
      {
        name: "Moleskine Classic Notebook (Pocket, Ruled)",
        url: az("8883701003"),
        isAmazon: true,
        description:
          "Keep this on your nightstand. The pocket size is deliberate — it forces brevity, which is exactly what you need in those first groggy seconds after waking.",
        articleLink: { slug: "why-you-forget-dreams", text: "why you forget your dreams" },
      },
      {
        name: "Leuchtturm1917 Dotted Notebook (A5)",
        url: az("B002TSIMW4"),
        isAmazon: true,
        description:
          "If you prefer sketching dream images alongside written notes, the dot grid gives you freedom without the chaos of blank pages. Numbered pages and an index make it easy to cross-reference recurring symbols.",
      },
      {
        name: "The Dream Interpretation Handbook — Karen Frazier",
        url: az("1641524235"),
        isAmazon: true,
        description:
          "Part journal, part reference guide. Frazier organizes symbols alphabetically with space for your own notes. A good companion for beginners building their personal dream dictionary.",
      },
    ],
  },
  {
    title: "Sleep Environment & Physical Tools",
    products: [
      {
        name: "Manta Sleep Mask",
        url: az("B07PRG2CQY"),
        isAmazon: true,
        description:
          "Total darkness is non-negotiable for deep REM sleep. The Manta's adjustable eye cups block 100% of light without pressing on your eyelids — which matters more than you think for dream recall.",
      },
      {
        name: "Magicteam White Noise Machine",
        url: az("B07RWRJ4XW"),
        isAmazon: true,
        description:
          "Twenty non-looping sounds, a memory function, and a timer. It creates a consistent sonic environment that protects your sleep cycles from disruption — and undisrupted cycles mean richer dreams.",
      },
      {
        name: "Topcee Weighted Blanket (20 lbs, Queen)",
        url: az("B07P7JCBHR"),
        isAmazon: true,
        description:
          "The gentle pressure calms the nervous system and reduces nighttime cortisol. Many of our readers report more vivid, emotionally coherent dreams after switching to a weighted blanket.",
        articleLink: { slug: "nervous-system-shapes-dreams", text: "how your nervous system shapes your dreams" },
      },
      {
        name: "ASAKUKI Essential Oil Diffuser (500ml)",
        url: az("B07T8DSTW3"),
        isAmazon: true,
        description:
          "Lavender and mugwort before bed are traditional dream-enhancing scents. This diffuser runs quietly for up to 16 hours with a warm ambient glow that doubles as a nightlight.",
      },
      {
        name: "Lagunamoon Essential Oils Set (Top 6)",
        url: az("B06XRLR9RQ"),
        isAmazon: true,
        description:
          "Lavender, tea tree, eucalyptus, lemongrass, orange, and peppermint. A solid starter set for building a bedtime aromatherapy ritual.",
      },
    ],
  },
  {
    title: "Meditation & Contemplative Practice",
    products: [
      {
        name: "Zafu Meditation Cushion (Buckwheat)",
        url: az("B0002046F8"),
        isAmazon: true,
        description:
          "A proper sitting cushion changes everything about a meditation practice. Buckwheat hulls conform to your body and hold their shape session after session.",
        articleLink: { slug: "meditation-changes-dream-landscape", text: "how meditation changes your dream landscape" },
      },
      {
        name: "Tibetan Singing Bowl Set (4-inch)",
        url: az("B01A6B0ICC"),
        isAmazon: true,
        description:
          "Hand-hammered in Nepal. The resonance of a singing bowl before sleep or during dream re-entry practice creates a sonic anchor that many practitioners find invaluable.",
        articleLink: { slug: "practice-dream-re-entry", text: "our guide to dream re-entry" },
      },
      {
        name: "Mala Beads (108 Prayer Beads)",
        url: az("B0CBJK86GW"),
        isAmazon: true,
        description:
          "For mantra practice before sleep or setting dream intentions. The tactile rhythm of moving through 108 beads quiets the thinking mind and opens the door to deeper sleep states.",
      },
      {
        name: "Magnesium Glycinate (400mg, Double Wood)",
        url: az("B01N2TMUV4"),
        isAmazon: true,
        description:
          "The most bioavailable form of magnesium for sleep support. Many dream practitioners notice more vivid dreams within the first week. Gentle on the stomach, no drowsiness.",
      },
    ],
  },
  {
    title: "Apps & Digital Tools",
    products: [
      {
        name: "Waking Up — Sam Harris",
        url: "https://www.wakingup.com",
        isAmazon: false,
        description:
          "The best meditation app for people who want depth, not just relaxation. Harris's guided sessions on non-dual awareness directly complement dream yoga practice.",
      },
      {
        name: "Insight Timer",
        url: "https://insighttimer.com",
        isAmazon: false,
        description:
          "Free access to thousands of guided meditations, yoga nidra sessions, and sleep stories. The timer function with singing bowl sounds is perfect for pre-sleep practice.",
      },
      {
        name: "Lucidity — Lucid Dream Journal",
        url: "https://play.google.com/store/apps/details?id=ch.b3nz.lucidity",
        isAmazon: false,
        description:
          "A dedicated dream journal app with reality check reminders, dream sign tracking, and statistics. Available on Android — a solid digital alternative if you prefer screens to paper.",
      },
    ],
  },
  {
    title: "Courses & Deeper Study",
    products: [
      {
        name: "The Shift Network — Dream Yoga Programs",
        url: "https://theshiftnetwork.com",
        isAmazon: false,
        description:
          "Online courses taught by Andrew Holecek and other dream yoga teachers. Structured programs that take you from basic lucid dreaming to advanced Tibetan dream practices.",
      },
      {
        name: "Sounds True — Yoga Nidra Collection",
        url: "https://www.soundstrue.com/collections/yoga-nidra",
        isAmazon: false,
        description:
          "Audio programs from Richard Miller, Jennifer Reis, and other leading yoga nidra teachers. High production quality and clinically informed approaches.",
      },
      {
        name: "The Interpretation of Dreams — Sigmund Freud",
        url: az("0465019773"),
        isAmazon: true,
        description:
          "The book that started it all. Agree or disagree with Freud, you cannot understand the modern dream conversation without reading the original. This translation by James Strachey remains the standard.",
      },
      {
        name: "Dreams — C.G. Jung (Princeton Collected Works)",
        url: az("0691150486"),
        isAmazon: true,
        description:
          "Jung's collected writings on dreams, extracted from the Collected Works. Dense but rewarding — this is where the concepts of archetypes, shadow, and individuation meet actual dream material.",
      },
    ],
  },
];

export default function ToolsPage() {
  useEffect(() => {
    document.title = "Tools We Recommend — Dream Gate";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Curated list of the best books, tools, apps, and resources for dream work and consciousness exploration. Personally vetted recommendations from Kalesh."
    );

    // ItemList schema
    const allProducts = categories.flatMap((c) => c.products);
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Dream Gate Recommended Tools",
      description: "Curated tools, books, and resources for dream work",
      numberOfItems: allProducts.length,
      itemListElement: allProducts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: p.url,
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(itemListSchema);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const totalProducts = categories.reduce((sum, c) => sum + c.products.length, 0);
  const amazonCount = categories.reduce(
    (sum, c) => sum + c.products.filter((p) => p.isAmazon).length,
    0
  );

  return (
    <Layout>
      <div className="max-w-[720px] mx-auto px-5 py-16">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
          Tools We Recommend
        </h1>

        {/* Affiliate disclosure */}
        <div className="border border-border/50 rounded-lg bg-card/50 px-4 py-3 mb-8">
          <p className="text-xs text-muted-foreground">
            This page contains affiliate links. We may earn a small commission if you make a purchase — at no extra cost to you.
          </p>
        </div>

        <p className="text-base text-foreground/90 leading-relaxed mb-12">
          These are the tools, books, and resources we actually trust. Every recommendation here has been chosen because it serves the work this site is about — understanding your dreams, deepening your awareness, and building a practice that lasts. Nothing here is filler.
        </p>

        {categories.map((category, ci) => (
          <section key={ci} className="mb-14">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-6 pb-2 border-b border-border/30">
              {category.title}
            </h2>
            <div className="space-y-6">
              {category.products.map((product, pi) => (
                <div
                  key={pi}
                  className="border border-border/30 rounded-lg bg-card/30 p-5 hover:border-border/60 transition-colors"
                >
                  <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                    <a
                      href={product.url}
                      target="_blank"
                      rel={product.isAmazon ? "noopener" : "noopener nofollow"}
                      className="hover:text-primary transition-colors no-underline"
                    >
                      {product.name}
                    </a>
                    {product.isAmazon && (
                      <span className="text-xs text-muted-foreground/60 ml-2">(paid link)</span>
                    )}
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {product.description}
                    {product.articleLink && (
                      <>
                        {" "}
                        We wrote about this in{" "}
                        <Link
                          href={`/article/${product.articleLink.slug}`}
                          className="text-primary hover:underline"
                        >
                          {product.articleLink.text}
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <hr className="my-12 border-border/40" />

        <p className="text-sm text-muted-foreground leading-relaxed">
          This page features {totalProducts} recommendations across {categories.length} categories, including {amazonCount} products linked through Amazon. As an Amazon Associate, Dream Gate earns from qualifying purchases. Every product was chosen for its relevance to dream work and consciousness practice.
        </p>
      </div>
    </Layout>
  );
}

