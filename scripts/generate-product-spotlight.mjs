#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// DREAMGATE — Product Spotlight Generator (Saturday cron)
// Generates 1 product review article per week using Claude API
// ═══════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'client', 'src', 'data');
const INDEX_PATH = join(DATA_DIR, 'article-index.json');
const ARTICLES_DIR = join(DATA_DIR, 'articles');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const TAG = 'spankyspinola-20';
const ENABLED = process.env.PRODUCT_SPOTLIGHT_ENABLED === 'true';

// Product queue — each entry becomes one review article
const PRODUCT_QUEUE = [
  { name: 'Manta Sleep Mask', asin: 'B07PRG2CQY', category: 'the-patterns', angle: 'sleep environment for dream quality' },
  { name: 'Zafu Meditation Cushion', asin: 'B0002046F8', category: 'the-practice', angle: 'meditation as dream preparation' },
  { name: 'Tibetan Singing Bowl Set', asin: 'B01A6B0ICC', category: 'the-threshold', angle: 'sound as consciousness bridge' },
  { name: 'Magnesium Glycinate', asin: 'B01N2TMUV4', category: 'the-patterns', angle: 'supplementation for vivid dreams' },
  { name: 'Topcee Weighted Blanket', asin: 'B07P7JCBHR', category: 'the-patterns', angle: 'nervous system regulation for deeper sleep' },
  { name: 'Breath by James Nestor', asin: '0735213615', category: 'the-practice', angle: 'breathwork and sleep architecture' },
  { name: 'Yoga Nidra by Richard Miller', asin: '1591797586', category: 'the-threshold', angle: 'yogic sleep as dream gateway' },
  { name: 'Mala Beads 108 Prayer Beads', asin: 'B0CBJK86GW', category: 'the-practice', angle: 'mantra practice for dream intention setting' },
];

async function main() {
  if (!ENABLED) {
    console.log('[product-spotlight] PRODUCT_SPOTLIGHT_ENABLED is not true. Skipping.');
    process.exit(0);
  }

  if (!ANTHROPIC_API_KEY) {
    console.error('[product-spotlight] ANTHROPIC_API_KEY not set. Exiting.');
    process.exit(1);
  }

  const index = JSON.parse(readFileSync(INDEX_PATH, 'utf8'));
  const existingSlugs = new Set(index.map(a => a.slug));

  // Find next product to review
  let product = null;
  for (const p of PRODUCT_QUEUE) {
    const slug = `product-review-${p.asin.toLowerCase()}`;
    if (!existingSlugs.has(slug)) {
      product = { ...p, slug };
      break;
    }
  }

  if (!product) {
    console.log('[product-spotlight] All products in queue have been reviewed. Skipping.');
    process.exit(0);
  }

  console.log(`[product-spotlight] Generating review for: ${product.name}`);

  // Generate article using Claude API
  const prompt = `Write a 1200-1500 word product review article for Dream Gate (dreamgate.love).

Product: ${product.name}
Amazon link: https://www.amazon.com/dp/${product.asin}?tag=${TAG}
Category: ${product.category}
Angle: ${product.angle}

Voice: Direct, authoritative, no hedging. Write like a teacher who has used this product extensively.
Author: Kalesh — consciousness teacher and writer.

Requirements:
- Open with a personal experience or direct teaching statement
- Include the Amazon affiliate link naturally (mark as "paid link")
- Compare to alternatives where relevant
- End with practical advice
- Include 3 FAQ items
- Use <h2> for section headers
- Output as JSON with fields: title, body (HTML), metaDescription, heroAlt, faqs (array of {question, answer}), toc (array of {id, text}), wordCount, readingTime

IMPORTANT: The body must be valid HTML with <h2>, <p>, and <a> tags only. No markdown.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      console.error(`[product-spotlight] API error: ${response.status}`);
      process.exit(1);
    }

    const result = await response.json();
    const text = result.content[0].text;

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('[product-spotlight] Could not parse JSON from API response');
      process.exit(1);
    }

    const articleData = JSON.parse(jsonMatch[0]);
    const nextId = Math.max(...index.map(a => a.id)) + 1;
    const dateISO = new Date().toISOString();

    const fullArticle = {
      id: nextId,
      title: articleData.title,
      slug: product.slug,
      category: product.category,
      categoryName: product.category.replace('the-', 'The ').replace(/^\w/, c => c.toUpperCase()),
      dateISO,
      isLive: true,
      heroAlt: articleData.heroAlt || `${product.name} product review`,
      metaDescription: articleData.metaDescription,
      wordCount: articleData.wordCount || 1300,
      readingTime: articleData.readingTime || 7,
      openerType: 'personal-anecdote',
      conclusionType: 'call-to-practice',
      linkType: 'product',
      faqCount: (articleData.faqs || []).length,
      namedReference: 'Kalesh',
      heroImageDesc: `${product.name} review`,
      body: articleData.body,
      toc: articleData.toc || [],
      faqs: articleData.faqs || [],
      phraseIndices: [5, 18, 33],
      finalH2: (articleData.toc || []).at(-1)?.text || 'Final Thoughts',
    };

    // Write article file
    writeFileSync(
      join(ARTICLES_DIR, `${product.slug}.json`),
      JSON.stringify(fullArticle, null, 2) + '\n'
    );

    // Add to index
    const indexEntry = { ...fullArticle };
    delete indexEntry.body;
    delete indexEntry.toc;
    delete indexEntry.faqs;
    index.push(indexEntry);
    writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + '\n');

    console.log(`[product-spotlight] Created: ${product.slug} (id=${nextId})`);
  } catch (err) {
    console.error('[product-spotlight] Error:', err.message);
    process.exit(1);
  }
}

main();
