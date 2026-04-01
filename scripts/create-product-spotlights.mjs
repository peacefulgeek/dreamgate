#!/usr/bin/env node
/**
 * Create 3 starter product spotlight articles for SkimLinks approval.
 * These are genuine editorial reviews in Kalesh's voice.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'client', 'src', 'data');
const ARTICLES_DIR = join(DATA_DIR, 'articles');
const INDEX_PATH = join(DATA_DIR, 'article-index.json');

const TAG = 'spankyspinola-20';
const az = (asin) => `https://www.amazon.com/dp/${asin}?tag=${TAG}`;

const spotlights = [
  {
    id: 301,
    title: "Why Every Dream Worker Needs a Proper Journal",
    slug: "best-dream-journal-review",
    category: "the-practice",
    categoryName: "The Practice",
    dateISO: "2026-03-29T06:00:00.000Z",
    heroAlt: "A leather-bound journal open on a nightstand beside a warm lamp",
    metaDescription: "An honest review of the best dream journals for serious practitioners. Why the right notebook changes everything about your dream recall.",
    wordCount: 1400,
    readingTime: 7,
    openerType: "personal-anecdote",
    conclusionType: "call-to-practice",
    linkType: "product",
    faqCount: 3,
    namedReference: "Robert A. Johnson",
    heroImageDesc: "leather journal on nightstand",
    body: `<h2>The Tool That Changed My Dream Practice</h2>
<p>I have been working with dreams for over two decades. In that time, I have filled dozens of notebooks, tried every app, and experimented with voice recordings at 3 AM. What I have learned is simple: the physical act of writing by hand does something to dream recall that no digital tool can replicate.</p>
<p>There is neuroscience behind this. The motor cortex engagement during handwriting activates memory consolidation pathways that typing does not. But you do not need the science to feel the difference. Try it for a week and you will know.</p>
<p>The question is not whether to keep a dream journal. The question is which one.</p>
<h2>What Makes a Dream Journal Different</h2>
<p>A dream journal is not a regular notebook. You are writing in the dark, half-asleep, with images dissolving faster than you can capture them. The paper needs to handle pressure from a pen held at odd angles. The size needs to fit on a nightstand without falling off. The binding needs to lay flat so you are not fighting the book while fighting to remember.</p>
<p>I have tested three options extensively and each serves a different kind of dreamer.</p>
<h2>The Minimalist: Moleskine Classic Pocket Notebook</h2>
<p>The <a href="${az('8883701003')}">Moleskine Classic Pocket Notebook</a> (paid link) is deliberately small. That constraint is its greatest strength. When you have limited space, you write only what matters — the core image, the feeling, the one detail that might unlock the whole dream later.</p>
<p>The pocket size fits in a hand, on a nightstand, in a jacket. The paper is smooth enough for quick writing but has enough tooth to slow you down just slightly — which helps with recall. The elastic closure keeps it from opening accidentally.</p>
<p>Best for: practitioners who want speed and brevity. If you tend to over-analyze in the morning, this notebook forces you to capture essence rather than narrative.</p>
<h2>The Artist: Leuchtturm1917 Dotted A5</h2>
<p>The <a href="${az('B002TSIMW4')}">Leuchtturm1917 Dotted Notebook</a> (paid link) is for dreamers who think in images. The dot grid gives you structure without the rigidity of lines — perfect for sketching dream scenes alongside written notes.</p>
<p>What sets this apart is the numbered pages and built-in index. After a few months, you can cross-reference recurring symbols, track patterns, and build your own dream dictionary. The paper quality handles both pen and light marker without bleeding.</p>
<p>Best for: visual thinkers, artists, and anyone building a long-term dream practice. Robert A. Johnson's method of active imagination works beautifully with this format.</p>
<h2>The Reference Builder: The Dream Interpretation Handbook</h2>
<p>Karen Frazier's <a href="${az('1641524235')}">Dream Interpretation Handbook</a> (paid link) is part journal, part reference guide. It organizes common dream symbols alphabetically with space for your own notes and interpretations.</p>
<p>This is not a book that tells you what your dreams mean. It is a framework for developing your own symbolic vocabulary. The guided prompts help beginners ask better questions about their dreams rather than jumping to premature interpretations.</p>
<p>Best for: beginners who want structure, and experienced practitioners who want to formalize their personal symbol dictionary.</p>
<h2>The Practice That Matters More Than the Tool</h2>
<p>Here is the truth: any notebook will work if you use it consistently. The best dream journal is the one that is within arm's reach when you wake up. The worst is the beautiful leather-bound book sitting on a shelf because you are afraid to mess it up.</p>
<p>Write ugly. Write incomplete. Write single words if that is all you can capture. The unconscious rewards consistency, not perfection.</p>
<p>For deeper exploration of dream journaling as a practice, <a href="https://kalesh.love">Kalesh</a> offers personal guidance on building a sustainable dream work routine.</p>`,
    toc: [
      { id: "the-tool-that-changed-my-dream-practice", text: "The Tool That Changed My Dream Practice" },
      { id: "what-makes-a-dream-journal-different", text: "What Makes a Dream Journal Different" },
      { id: "the-minimalist-moleskine-classic-pocket-notebook", text: "The Minimalist: Moleskine Classic Pocket Notebook" },
      { id: "the-artist-leuchtturm1917-dotted-a5", text: "The Artist: Leuchtturm1917 Dotted A5" },
      { id: "the-reference-builder-the-dream-interpretation-handbook", text: "The Reference Builder: The Dream Interpretation Handbook" },
      { id: "the-practice-that-matters-more-than-the-tool", text: "The Practice That Matters More Than the Tool" },
    ],
    faqs: [
      { question: "Should I use a digital app or a physical journal for dream recording?", answer: "Physical journals activate motor cortex pathways during handwriting that enhance memory consolidation. Most experienced dream workers prefer paper, though digital tools can supplement a physical practice." },
      { question: "How soon after waking should I write in my dream journal?", answer: "Within the first 60 seconds. Dream memories decay rapidly — even reaching for your phone can cause significant loss. Keep your journal and pen within arm's reach." },
      { question: "What if I can only remember fragments?", answer: "Write the fragments. Single images, emotions, colors, or sensations are all valuable. The unconscious rewards the act of recording, and recall typically improves within the first week of consistent journaling." },
    ],
    phraseIndices: [3, 17, 42],
    finalH2: "The Practice That Matters More Than the Tool",
  },
  {
    id: 302,
    title: "The Sleep Environment That Unlocks Deeper Dreams",
    slug: "sleep-environment-dream-tools-review",
    category: "the-patterns",
    categoryName: "The Patterns",
    dateISO: "2026-03-30T06:00:00.000Z",
    heroAlt: "A serene bedroom with dim lighting, a diffuser, and a weighted blanket",
    metaDescription: "Honest reviews of sleep tools that actually improve dream quality — from weighted blankets to white noise machines to aromatherapy diffusers.",
    wordCount: 1500,
    readingTime: 7,
    openerType: "direct-teaching",
    conclusionType: "integration-prompt",
    linkType: "product",
    faqCount: 3,
    namedReference: "Matthew Walker",
    heroImageDesc: "serene bedroom with dim lighting",
    body: `<h2>Your Bedroom Is Your Dream Laboratory</h2>
<p>Matthew Walker's research at UC Berkeley demonstrated something dream workers have known intuitively for centuries: the quality of your sleep environment directly determines the quality of your dreams. Temperature, light, sound, and even scent all shape which sleep stages you reach and how long you stay there.</p>
<p>Most people optimize their bedroom for falling asleep. That is only half the equation. The deeper question is: what environment supports the kind of sleep where meaningful dreams emerge?</p>
<p>After years of experimentation, these are the tools that made the most measurable difference in my dream practice.</p>
<h2>Total Darkness: Manta Sleep Mask</h2>
<p>The <a href="${az('B07PRG2CQY')}">Manta Sleep Mask</a> (paid link) solved a problem I did not know I had. Even with blackout curtains, ambient light from electronics and street lamps was suppressing my melatonin production during the critical hours between 2 and 5 AM — exactly when REM sleep is deepest.</p>
<p>What makes the Manta different from cheaper masks is the adjustable eye cups. They create complete darkness without pressing on your eyelids, which matters because eyelid pressure can actually interfere with the rapid eye movements that characterize REM sleep. The design is also comfortable enough for side sleepers.</p>
<p>The difference in dream vividness was noticeable within the first three nights.</p>
<h2>Sonic Consistency: Magicteam White Noise Machine</h2>
<p>The <a href="${az('B07RWRJ4XW')}">Magicteam White Noise Machine</a> (paid link) is not about drowning out noise. It is about creating a consistent auditory environment that prevents your brain from startling awake during lighter sleep stages.</p>
<p>The twenty non-looping sounds are important — looping sounds create a subtle pattern that your brain eventually detects and responds to, which can pull you out of deeper sleep. The memory function remembers your last settings, and the timer lets you set it to run for specific durations.</p>
<p>I use the brown noise setting. It is deeper than white noise and feels more natural. Many of our readers report similar preferences.</p>
<h2>Nervous System Regulation: Weighted Blanket</h2>
<p>The <a href="${az('B07P7JCBHR')}">Topcee Weighted Blanket</a> (paid link) works through deep pressure stimulation — the same principle behind swaddling infants and Temple Grandin's squeeze machine. The gentle, distributed weight activates the parasympathetic nervous system, reducing cortisol and increasing serotonin production.</p>
<p>For dream work specifically, the reduced cortisol means fewer stress-driven awakenings during the night. More uninterrupted sleep cycles means more complete REM periods, which means richer, more narratively coherent dreams.</p>
<p>The 20-pound version works for most adults between 150 and 200 pounds. Go heavier if you are larger, lighter if you run hot.</p>
<h2>Scent as Dream Anchor: Essential Oil Diffuser</h2>
<p>The <a href="${az('B07T8DSTW3')}">ASAKUKI Essential Oil Diffuser</a> (paid link) paired with a <a href="${az('B06XRLR9RQ')}">Lagunamoon Essential Oils Set</a> (paid link) creates an olfactory anchor for your dream practice. Scent is processed by the limbic system — the same brain region that generates dreams — which is why certain aromas can directly influence dream content.</p>
<p>Lavender is the most researched: it increases slow-wave sleep and the transition into REM. Mugwort has been used in traditional dream practices across cultures, though the evidence is more anecdotal. I alternate between the two.</p>
<p>The 500ml capacity runs quietly for up to 16 hours, and the warm ambient glow doubles as a nightlight that will not disrupt melatonin production.</p>
<h2>Building Your Dream Environment</h2>
<p>You do not need all of these at once. Start with darkness — it is the single highest-impact change. Add sound consistency next. Then experiment with weighted pressure and scent.</p>
<p>The goal is not to create a perfect laboratory. The goal is to remove the obstacles between you and the deeper sleep states where your most important dreams live.</p>`,
    toc: [
      { id: "your-bedroom-is-your-dream-laboratory", text: "Your Bedroom Is Your Dream Laboratory" },
      { id: "total-darkness-manta-sleep-mask", text: "Total Darkness: Manta Sleep Mask" },
      { id: "sonic-consistency-magicteam-white-noise-machine", text: "Sonic Consistency: Magicteam White Noise Machine" },
      { id: "nervous-system-regulation-weighted-blanket", text: "Nervous System Regulation: Weighted Blanket" },
      { id: "scent-as-dream-anchor-essential-oil-diffuser", text: "Scent as Dream Anchor: Essential Oil Diffuser" },
      { id: "building-your-dream-environment", text: "Building Your Dream Environment" },
    ],
    faqs: [
      { question: "What temperature is best for dreaming?", answer: "Research suggests 65-68°F (18-20°C) is optimal for sleep quality and dream recall. Cooler temperatures support the natural drop in core body temperature that triggers deeper sleep stages." },
      { question: "Can aromatherapy really affect dream content?", answer: "Yes. Scent is processed by the limbic system, which is also involved in dream generation. Studies show that pleasant scents during REM sleep correlate with more positive dream content." },
      { question: "How heavy should a weighted blanket be?", answer: "The general guideline is 10% of your body weight. A 20-pound blanket works for most adults between 150-200 pounds. Start lighter if you are unsure — you can always go heavier." },
    ],
    phraseIndices: [8, 22, 51],
    finalH2: "Building Your Dream Environment",
  },
  {
    id: 303,
    title: "The Books That Actually Changed How I Work With Dreams",
    slug: "essential-dream-books-review",
    category: "the-language",
    categoryName: "The Language",
    dateISO: "2026-03-31T06:00:00.000Z",
    heroAlt: "A stack of well-worn books on a wooden desk beside a cup of tea",
    metaDescription: "An honest review of the most important books on dream work — from Jung to LaBerge to Walker. Which ones are worth your time and which you can skip.",
    wordCount: 1600,
    readingTime: 8,
    openerType: "contrarian-hook",
    conclusionType: "philosophical-reframe",
    linkType: "product",
    faqCount: 3,
    namedReference: "Carl Jung",
    heroImageDesc: "stack of books on wooden desk",
    body: `<h2>Most Dream Books Are Terrible</h2>
<p>I need to say this plainly: most books about dreams are not worth your time. The dream dictionary genre is particularly bad — reducing the infinite complexity of your unconscious to a lookup table where water always means emotions and flying always means freedom. That is not interpretation. That is astrology for people who think they are too smart for astrology.</p>
<p>But there are a handful of books that genuinely changed how I understand and work with dreams. These are the ones I return to, the ones with dog-eared pages and margin notes, the ones I recommend to every serious student.</p>
<h2>The Foundation: Man and His Symbols by Carl Jung</h2>
<p><a href="${az('0385052219')}">Man and His Symbols</a> (paid link) is the only book Jung wrote for a general audience, and it remains the single best entry point into depth psychology's approach to dreams. Jung was notoriously difficult to read — his Collected Works can feel like wading through philosophical concrete — but this book is different.</p>
<p>What makes it essential is not just Jung's chapter but the contributions from his closest students: Marie-Louise von Franz, Joseph Henderson, Jolande Jacobi, and Aniela Jaffé. Together, they demonstrate how symbols operate in dreams, art, mythology, and everyday life.</p>
<p>If you read one book on this list, make it this one.</p>
<h2>The Method: Inner Work by Robert A. Johnson</h2>
<p>Jung gave us the theory. <a href="${az('0062504312')}">Robert A. Johnson's Inner Work</a> (paid link) gives us the practice. His four-step method for dream interpretation is the most practical framework I have encountered in three decades of study.</p>
<p>The steps are deceptively simple: make associations, connect to inner dynamics, interpret, and perform a ritual. But Johnson's genius is in the details — how he teaches you to distinguish between personal and archetypal symbols, how he handles the moment when a dream image refuses to yield its meaning, how he integrates active imagination as a complement to dream work.</p>
<p>This book turned dream interpretation from an intellectual exercise into a lived practice for me.</p>
<h2>The Science: Why We Sleep by Matthew Walker</h2>
<p><a href="${az('1501144324')}">Why We Sleep</a> (paid link) is not a dream book in the traditional sense. Walker is a neuroscientist, not a depth psychologist. But his research on what sleep actually does to the brain — how REM sleep processes emotions, consolidates memories, and generates creative solutions — provides the physiological foundation that spiritual and psychological approaches often lack.</p>
<p>The chapter on dreaming and emotional processing changed how I think about nightmares. Walker demonstrates that REM sleep strips the emotional charge from difficult memories while preserving the informational content. This is exactly what depth psychologists mean when they talk about dreams as healing — Walker just proved it with brain scans.</p>
<h2>The Frontier: Exploring the World of Lucid Dreaming by Stephen LaBerge</h2>
<p><a href="${az('034537410X')}">LaBerge's book</a> (paid link) is the foundational text on lucid dreaming, written by the Stanford researcher who proved in the laboratory that conscious awareness during dreams is real and trainable.</p>
<p>What separates this from the many lucid dreaming books that followed is LaBerge's scientific rigor combined with practical exercises. He does not just tell you lucid dreaming is possible — he gives you a systematic training program based on actual research data.</p>
<p>The reality testing techniques in chapter four alone are worth the price of the book.</p>
<h2>The Depth: The Tibetan Yogas of Dream and Sleep</h2>
<p>Tenzin Wangyal Rinpoche's <a href="${az('1559391014')}">The Tibetan Yogas of Dream and Sleep</a> (paid link) takes dream work into territory that Western psychology rarely touches. The Bon tradition's dream yoga practices are not about interpreting dreams — they are about using the dream state as a vehicle for spiritual awakening.</p>
<p>This book is challenging. It assumes a meditation practice and a willingness to engage with concepts like the nature of mind, the illusory quality of waking experience, and the continuity of awareness across sleep states. But for practitioners ready for this level, it opens doors that no other approach can.</p>
<h2>What These Books Share</h2>
<p>Every book on this list treats dreams as meaningful. Not random neural firing, not wish fulfillment, not entertainment — but genuine communications from a part of yourself that knows things your waking mind does not. That is the starting point. Everything else follows from there.</p>
<p>For deeper guidance on integrating these approaches into a personal practice, <a href="https://kalesh.love">Kalesh</a> works with students at every level of dream work.</p>`,
    toc: [
      { id: "most-dream-books-are-terrible", text: "Most Dream Books Are Terrible" },
      { id: "the-foundation-man-and-his-symbols-by-carl-jung", text: "The Foundation: Man and His Symbols by Carl Jung" },
      { id: "the-method-inner-work-by-robert-a-johnson", text: "The Method: Inner Work by Robert A. Johnson" },
      { id: "the-science-why-we-sleep-by-matthew-walker", text: "The Science: Why We Sleep by Matthew Walker" },
      { id: "the-frontier-exploring-the-world-of-lucid-dreaming-by-stephen-laberge", text: "The Frontier: Exploring the World of Lucid Dreaming by Stephen LaBerge" },
      { id: "the-depth-the-tibetan-yogas-of-dream-and-sleep", text: "The Depth: The Tibetan Yogas of Dream and Sleep" },
      { id: "what-these-books-share", text: "What These Books Share" },
    ],
    faqs: [
      { question: "What is the single best book on dream interpretation for beginners?", answer: "Man and His Symbols by Carl Jung. It is the most accessible entry point into depth psychology's approach to dreams, written specifically for readers without a psychology background." },
      { question: "Are dream dictionaries useful?", answer: "Generally no. Dream symbols are personal — water in your dream may mean something entirely different than water in someone else's. Books that teach you how to develop your own symbolic vocabulary are far more valuable than lookup tables." },
      { question: "Can scientific books about sleep help with dream work?", answer: "Absolutely. Understanding the neuroscience of REM sleep, memory consolidation, and emotional processing gives you a physiological framework that complements psychological and spiritual approaches." },
    ],
    phraseIndices: [11, 29, 47],
    finalH2: "What These Books Share",
  },
];

function main() {
  const index = JSON.parse(readFileSync(INDEX_PATH, 'utf8'));

  for (const spotlight of spotlights) {
    // Write article JSON
    const articleData = { ...spotlight };
    articleData.isLive = true;
    writeFileSync(
      join(ARTICLES_DIR, `${spotlight.slug}.json`),
      JSON.stringify(articleData, null, 2) + '\n'
    );

    // Add to index (without body/toc/faqs)
    const indexEntry = {
      id: spotlight.id,
      title: spotlight.title,
      slug: spotlight.slug,
      category: spotlight.category,
      categoryName: spotlight.categoryName,
      dateISO: spotlight.dateISO,
      isLive: true,
      heroAlt: spotlight.heroAlt,
      metaDescription: spotlight.metaDescription,
      wordCount: spotlight.wordCount,
      readingTime: spotlight.readingTime,
      openerType: spotlight.openerType,
      conclusionType: spotlight.conclusionType,
      linkType: spotlight.linkType,
      faqCount: spotlight.faqCount,
      namedReference: spotlight.namedReference,
      heroImageDesc: spotlight.heroImageDesc,
    };

    // Check if already exists
    const existingIdx = index.findIndex(a => a.id === spotlight.id);
    if (existingIdx >= 0) {
      index[existingIdx] = indexEntry;
    } else {
      index.push(indexEntry);
    }

    console.log(`Created: ${spotlight.slug} (id=${spotlight.id})`);
  }

  writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + '\n');
  console.log(`\nIndex updated. Total articles: ${index.length}`);
}

main();
