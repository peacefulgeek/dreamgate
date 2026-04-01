#!/usr/bin/env node
/**
 * DREAMGATE — Backlink Redistribution Script
 * Target: 14% kalesh, 33% product, 23% external (org, nofollow), 30% internal
 * 
 * This script:
 * 1. Reassigns linkType in article-index.json
 * 2. Injects product links into article bodies for "product" type articles
 * 3. Adds rel="nofollow" to external org links
 * 4. Ensures kalesh links point to kalesh.love
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'client', 'src', 'data');
const ARTICLES_DIR = join(DATA_DIR, 'articles');
const INDEX_PATH = join(DATA_DIR, 'article-index.json');

const TAG = 'spankyspinola-20';

// Product recommendations mapped to categories
const PRODUCT_RECS = {
  'the-language': [
    { name: 'Man and His Symbols', author: 'Carl G. Jung', asin: '0385052219', desc: 'The foundational text on dream symbolism from the master of the unconscious.' },
    { name: 'The Interpretation of Dreams', author: 'Sigmund Freud', asin: '0465019773', desc: 'The book that started the modern conversation about what dreams mean.' },
    { name: 'Dreams', author: 'C.G. Jung', asin: '0691150486', desc: 'Jung\'s collected writings on dreams from the Princeton Collected Works.' },
    { name: 'Inner Work', author: 'Robert A. Johnson', asin: '0062504312', desc: 'A practical four-step method for working with dreams and active imagination.' },
    { name: 'The Dream Interpretation Handbook', author: 'Karen Frazier', asin: '1641524235', desc: 'A practical guide to understanding dream symbols and their meanings.' },
  ],
  'the-dictionary': [
    { name: 'Man and His Symbols', author: 'Carl G. Jung', asin: '0385052219', desc: 'Essential reading for understanding the symbolic language of dreams.' },
    { name: 'Inner Work', author: 'Robert A. Johnson', asin: '0062504312', desc: 'The definitive guide to dreamwork and dream interpretation.' },
    { name: 'The Dream Interpretation Handbook', author: 'Karen Frazier', asin: '1641524235', desc: 'A practical companion for building your personal dream dictionary.' },
    { name: 'Leuchtturm1917 Dotted Notebook', author: '', asin: 'B002TSIMW4', desc: 'The ideal notebook for sketching dream images alongside written notes.' },
    { name: 'Moleskine Classic Notebook', author: '', asin: '8883701003', desc: 'Keep this on your nightstand for capturing dreams before they fade.' },
  ],
  'the-practice': [
    { name: 'Exploring the World of Lucid Dreaming', author: 'Stephen LaBerge', asin: '034537410X', desc: 'The foundational text on lucid dreaming from the Stanford researcher who proved it in the lab.' },
    { name: 'Yoga Nidra', author: 'Richard Miller', asin: '1591797586', desc: 'The definitive guide to yogic sleep meditation and the liminal space between waking and sleeping.' },
    { name: 'Zafu Meditation Cushion', author: '', asin: 'B0002046F8', desc: 'A proper sitting cushion that changes everything about a meditation practice.' },
    { name: 'Manta Sleep Mask', author: '', asin: 'B07PRG2CQY', desc: 'Total darkness is non-negotiable for deep REM sleep and vivid dream recall.' },
    { name: 'Magicteam White Noise Machine', author: '', asin: 'B07RWRJ4XW', desc: 'Creates a consistent sonic environment that protects sleep cycles from disruption.' },
    { name: 'Breath', author: 'James Nestor', asin: '0735213615', desc: 'How breathwork profoundly shapes sleep architecture and dream quality.' },
  ],
  'the-patterns': [
    { name: 'Why We Sleep', author: 'Matthew Walker', asin: '1501144324', desc: 'Essential reading for understanding the neuroscience of sleep and dreams.' },
    { name: 'Magnesium Glycinate', author: 'Double Wood', asin: 'B01N2TMUV4', desc: 'The most bioavailable form of magnesium for sleep support and vivid dreams.' },
    { name: 'Topcee Weighted Blanket', author: '', asin: 'B07P7JCBHR', desc: 'Gentle pressure that calms the nervous system for richer, more coherent dreams.' },
    { name: 'ASAKUKI Essential Oil Diffuser', author: '', asin: 'B07T8DSTW3', desc: 'Lavender and mugwort before bed are traditional dream-enhancing scents.' },
    { name: 'Tibetan Singing Bowl Set', author: '', asin: 'B01A6B0ICC', desc: 'The resonance creates a sonic anchor for dream re-entry practice.' },
  ],
  'the-threshold': [
    { name: 'The Tibetan Yogas of Dream and Sleep', author: 'Tenzin Wangyal Rinpoche', asin: '1559391014', desc: 'Dream yoga from the Bon tradition bridging ancient practice with modern consciousness.' },
    { name: 'Yoga Nidra', author: 'Richard Miller', asin: '1591797586', desc: 'The definitive guide to the liminal space between waking and sleeping.' },
    { name: 'Mala Beads (108 Prayer Beads)', author: '', asin: 'B0CBJK86GW', desc: 'For mantra practice before sleep or setting dream intentions.' },
    { name: 'Exploring the World of Lucid Dreaming', author: 'Stephen LaBerge', asin: '034537410X', desc: 'Exercises and techniques for inducing and prolonging lucid dreams.' },
    { name: 'Lagunamoon Essential Oils Set', author: '', asin: 'B06XRLR9RQ', desc: 'A solid starter set for building a bedtime aromatherapy ritual.' },
  ],
};

// Authority organizations for external links
const AUTHORITY_ORGS = [
  { name: 'International Association for the Study of Dreams', url: 'https://www.asdreams.org' },
  { name: 'American Psychological Association', url: 'https://www.apa.org' },
  { name: 'National Sleep Foundation', url: 'https://www.sleepfoundation.org' },
  { name: 'Society for Neuroscience', url: 'https://www.sfn.org' },
  { name: 'National Institute of Mental Health', url: 'https://www.nimh.nih.gov' },
  { name: 'World Health Organization', url: 'https://www.who.int' },
  { name: 'Mayo Clinic Sleep Center', url: 'https://www.mayoclinic.org' },
  { name: 'Stanford Center for Sleep Sciences', url: 'https://med.stanford.edu/sleep.html' },
  { name: 'Harvard Division of Sleep Medicine', url: 'https://sleep.hms.harvard.edu' },
  { name: 'C.G. Jung Institute', url: 'https://www.junginstitute.org' },
];

function main() {
  const index = JSON.parse(readFileSync(INDEX_PATH, 'utf8'));
  const total = index.length;

  // Target counts
  const kaleshTarget = Math.round(total * 0.14);   // 42
  const productTarget = Math.round(total * 0.33);   // 99
  const externalTarget = Math.round(total * 0.23);   // 69
  const internalTarget = total - kaleshTarget - productTarget - externalTarget; // 90

  console.log(`Total articles: ${total}`);
  console.log(`Targets: kalesh=${kaleshTarget}, product=${productTarget}, external=${externalTarget}, internal=${internalTarget}`);

  // Shuffle deterministically
  const shuffled = [...index].sort((a, b) => {
    // Use article id as seed for deterministic shuffle
    const ha = (a.id * 2654435761) >>> 0;
    const hb = (b.id * 2654435761) >>> 0;
    return ha - hb;
  });

  // Assign link types
  let ki = 0, pi = 0, ei = 0, ii = 0;
  const assignments = new Map();

  for (const article of shuffled) {
    let type;
    if (ki < kaleshTarget) {
      type = 'kalesh';
      ki++;
    } else if (pi < productTarget) {
      type = 'product';
      pi++;
    } else if (ei < externalTarget) {
      type = 'external';
      ei++;
    } else {
      type = 'internal';
      ii++;
    }
    assignments.set(article.id, type);
  }

  console.log(`Assigned: kalesh=${ki}, product=${pi}, external=${ei}, internal=${ii}`);

  // Update index
  for (const article of index) {
    article.linkType = assignments.get(article.id);
  }
  writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + '\n');
  console.log('Updated article-index.json');

  // Now update individual article JSON files
  let productUpdated = 0;
  let externalUpdated = 0;
  let kaleshUpdated = 0;

  for (const article of index) {
    const filePath = join(ARTICLES_DIR, `${article.slug}.json`);
    let data;
    try {
      data = JSON.parse(readFileSync(filePath, 'utf8'));
    } catch {
      console.warn(`  Skipping ${article.slug} — file not found`);
      continue;
    }

    const type = assignments.get(article.id);
    let body = data.body;
    const category = article.category;

    if (type === 'product') {
      // Pick a product for this category
      const products = PRODUCT_RECS[category] || PRODUCT_RECS['the-practice'];
      const product = products[article.id % products.length];
      const productUrl = `https://www.amazon.com/dp/${product.asin}?tag=${TAG}`;
      const authorStr = product.author ? ` by ${product.author}` : '';

      // Check if body already has an Amazon link
      if (!body.includes('amazon.com/dp/')) {
        // Find a good insertion point — after the 3rd or 4th paragraph
        const paragraphs = body.split('</p>');
        if (paragraphs.length > 4) {
          const insertAfter = Math.min(3, paragraphs.length - 2);
          const productHtml = `</p><p>A resource I recommend on this topic is <a href="${productUrl}">${product.name}${authorStr}</a> (paid link). ${product.desc}</p>`;
          paragraphs[insertAfter] = paragraphs[insertAfter] + productHtml;
          body = paragraphs.join('</p>');
        }
      }
      productUpdated++;
    } else if (type === 'external') {
      // Check if body already has an external org link with nofollow
      if (!body.includes('rel="nofollow"')) {
        const org = AUTHORITY_ORGS[article.id % AUTHORITY_ORGS.length];
        // Find insertion point
        const paragraphs = body.split('</p>');
        if (paragraphs.length > 3) {
          const insertAfter = Math.min(2, paragraphs.length - 2);
          const orgHtml = `</p><p>For further reading, the <a href="${org.url}" rel="nofollow" target="_blank">${org.name}</a> offers valuable research on this topic.</p>`;
          paragraphs[insertAfter] = paragraphs[insertAfter] + orgHtml;
          body = paragraphs.join('</p>');
        }
      }
      externalUpdated++;
    } else if (type === 'kalesh') {
      // Ensure kalesh link exists
      if (!body.includes('kalesh.love')) {
        const paragraphs = body.split('</p>');
        if (paragraphs.length > 3) {
          const insertAfter = Math.min(2, paragraphs.length - 2);
          const kaleshHtml = `</p><p>For deeper exploration of this work, <a href="https://kalesh.love">Kalesh</a> offers personal guidance and consciousness teaching that builds on these foundations.</p>`;
          paragraphs[insertAfter] = paragraphs[insertAfter] + kaleshHtml;
          body = paragraphs.join('</p>');
        }
      }
      kaleshUpdated++;
    }
    // internal type — no outbound links needed

    data.body = body;
    data.linkType = type;
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  }

  console.log(`Product links injected: ${productUpdated} articles`);
  console.log(`External org links injected: ${externalUpdated} articles`);
  console.log(`Kalesh links injected: ${kaleshUpdated} articles`);

  // Final verification
  const verify = JSON.parse(readFileSync(INDEX_PATH, 'utf8'));
  const dist = {};
  verify.forEach(a => { dist[a.linkType] = (dist[a.linkType] || 0) + 1; });
  console.log('\nFinal distribution:');
  Object.entries(dist).sort((a, b) => b[1] - a[1]).forEach(([t, c]) => {
    console.log(`  ${t}: ${c} (${(c / verify.length * 100).toFixed(1)}%)`);
  });
}

main();
