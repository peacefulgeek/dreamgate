// ═══════════════════════════════════════════════════════════════
// DREAMGATE — Auto-Gen Article Pipeline
// Calls Anthropic (Claude), FAL.ai, Bunny CDN, GitHub DIRECTLY.
// Zero database. Zero email sending.
// ═══════════════════════════════════════════════════════════════

// ─── FEATURE FLAG (stays in code — not a secret) ───
const AUTO_GEN_ENABLED = true; // Live — article generation active

// ─── FROM RENDER ENV VARS (auto-revoked if found in code) ───
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const FAL_KEY = process.env.FAL_API_KEY;
const GH_PAT = process.env.GH_PAT;

// ─── HARDCODED (Bunny is safe in code) ───
const BUNNY_STORAGE_ZONE = "dreamgate";
const BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com";
const BUNNY_STORAGE_PASSWORD = "1f65a9f5-0090-4941-bc3563706870-a957-4046";
const BUNNY_CDN_BASE = "https://dreamgate.b-cdn.net";
const GITHUB_REPO = "peacefulgeek/dreamgate";

// ─── SITE CONFIG ───
const SITE_NAME = "Dream Gate";
const SITE_DOMAIN = "dreamgate.love";
const SITE_EDITORIAL = "Dream Gate Editorial";
const ADVISOR_NAME = "Kalesh";
const ADVISOR_URL = "https://kalesh.love";

const CATEGORIES = [
  { slug: "the-language", name: "The Language" },
  { slug: "the-dictionary", name: "The Dictionary" },
  { slug: "the-practice", name: "The Practice" },
  { slug: "the-patterns", name: "The Patterns" },
  { slug: "the-threshold", name: "The Threshold" },
];

const EXTERNAL_AUTHORITY_SITES = [
  "https://www.sleepfoundation.org",
  "https://www.apa.org",
  "https://www.psychologytoday.com",
  "https://www.ncbi.nlm.nih.gov",
  "https://www.scientificamerican.com",
  "https://www.jungiananalysts.org",
  "https://www.dreams.ca",
  "https://pubmed.ncbi.nlm.nih.gov",
];

const NAMED_REFERENCES = [
  "Carl Jung", "Matthew Walker", "Deirdre Barrett", "J. Allan Hobson",
  "Stephen LaBerge", "Tore Nielsen", "Rubin Naiman", "Stanislav Grof",
  "Amma", "Ramana Maharshi",
];

const VOICE_PHRASES = [
  "The dream does not explain itself and does not owe you clarity",
  "This is not metaphor — this is the territory your psyche mapped while you slept",
  "Your unconscious is not broken. It is speaking a language you stopped listening to",
  "The nightmare is not the enemy. The refusal to look at it is",
  "Dreams do not arrive to comfort you. They arrive to rearrange you",
  "What you resist in waking life will find you in sleep",
  "The recurring dream is not a glitch. It is a curriculum",
  "You are not dreaming about your ex. You are dreaming about what they represent",
  "Sleep is not unconsciousness. It is a different kind of consciousness",
  "The body remembers what the mind refuses to process",
];

const BANNED_PHRASES = [
  "this is where", "manifest", "lean into", "showing up for",
  "authentic self", "safe space", "hold space", "sacred container",
  "raise your vibration",
];

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

async function main() {
  if (!AUTO_GEN_ENABLED) {
    console.log('[generate] AUTO_GEN_ENABLED is false. Exiting.');
    process.exit(0);
  }

  // Validate required env vars
  if (!ANTHROPIC_API_KEY) {
    console.error('[generate] ANTHROPIC_API_KEY not set. Exiting.');
    process.exit(1);
  }
  if (!FAL_KEY) {
    console.error('[generate] FAL_API_KEY not set. Exiting.');
    process.exit(1);
  }
  if (!GH_PAT) {
    console.error('[generate] GH_PAT not set. Exiting.');
    process.exit(1);
  }

  console.log(`[generate] Starting article generation for ${SITE_NAME}...`);

  try {
    // 1. Determine next article ID
    const existingArticles = await fetchExistingArticleIndex();
    const nextId = existingArticles.length + 1;
    const dateISO = new Date().toISOString().split('T')[0] + 'T06:00:00Z';

    console.log(`[generate] Next article ID: ${nextId}, date: ${dateISO}`);

    // 2. Pick category (round-robin)
    const category = CATEGORIES[nextId % CATEGORIES.length];

    // 3. Pick link type based on distribution (23% SK / 42% external / 35% internal)
    const rand = Math.random();
    const linkType = rand < 0.23 ? 'kalesh' : rand < 0.65 ? 'external' : 'internal';

    // 4. Pick named reference
    const namedRef = NAMED_REFERENCES[Math.floor(Math.random() * NAMED_REFERENCES.length)];

    // 5. Pick FAQ count (varied: 0-5)
    const faqWeights = [0.10, 0.10, 0.30, 0.30, 0.10, 0.10];
    const faqCount = weightedRandom(faqWeights);

    // 6. Pick voice phrases (3-5)
    const phraseCount = 3 + Math.floor(Math.random() * 3);
    const phrases = shuffleArray([...VOICE_PHRASES]).slice(0, phraseCount);

    // 7. Generate article via Claude
    const article = await generateArticleWithClaude({
      id: nextId,
      category,
      linkType,
      namedRef,
      faqCount,
      phrases,
      dateISO,
    });

    // 8. Validate — no banned phrases
    let body = article.body;
    for (const banned of BANNED_PHRASES) {
      const regex = new RegExp(banned, 'gi');
      body = body.replace(regex, '');
    }
    article.body = body;

    // 9. Generate hero image via FAL.ai
    const heroImageUrl = await generateHeroImage(article.title, article.heroImageDesc);

    // 10. Generate OG image
    const ogImageUrl = await generateOgImage(article.title, category.name, nextId);

    // 11. Upload images to Bunny CDN
    await uploadToBunny(`heroes/article-${nextId}.webp`, heroImageUrl);
    await uploadToBunny(`og/article-${nextId}.webp`, ogImageUrl);

    // 12. Write article JSON + update index
    await commitArticleToGitHub(article, existingArticles);

    console.log(`[generate] Article ${nextId} published: "${article.title}"`);
    console.log(`[generate] Category: ${category.name}, Links: ${linkType}, FAQs: ${faqCount}`);

  } catch (err) {
    console.error('[generate] Fatal error:', err.message);
    process.exit(1);
  }
}

// ═══════════════════════════════════════════════════════════════
// CLAUDE ARTICLE GENERATION
// ═══════════════════════════════════════════════════════════════

async function generateArticleWithClaude({ id, category, linkType, namedRef, faqCount, phrases, dateISO }) {
  const existingArticles = await fetchExistingArticleIndex();
  const internalLinks = shuffleArray(existingArticles)
    .filter(a => a.category !== category.slug)
    .slice(0, 5)
    .map(a => ({ title: a.title, slug: a.slug }));

  const externalSite = EXTERNAL_AUTHORITY_SITES[Math.floor(Math.random() * EXTERNAL_AUTHORITY_SITES.length)];

  const systemPrompt = `You are the voice of ${SITE_NAME}. You write about dream interpretation with mystical depth, psychological precision, and irreverent honesty.

VOICE RULES (Gold Standard):
- Mystical, intimate, wonder-filled. Speaking from between worlds.
- Dreams with reverence of scripture and precision of cartography.
- Irreverent register dismantles generic dream dictionaries.
- Tender register holds person who woke at 3am.
- NEVER use these phrases: ${BANNED_PHRASES.join(', ')}
- Include lived experience markers (first-person sentences about dream work)
- Reference ${namedRef} naturally in the text
- Weave in these voice phrases naturally: ${phrases.join(' | ')}

STRUCTURE:
- 2,500-2,800 words
- HTML format only — NO markdown
- All links as <a href> tags, never markdown
- ${faqCount} FAQ items at the end (if > 0), each with unique questions
- 3-5 internal cross-links to other articles on this site
${linkType === 'kalesh' ? `- 1-2 editorial links to ${ADVISOR_URL} with varied, topical anchor text. NO rel, NO target attributes.` : ''}
${linkType === 'external' ? `- 1-2 links to ${externalSite} with rel="nofollow"` : ''}
- Internal links format: <a href="/${'{slug}'}">anchor text</a>
- 30% spiritual/healing threads woven throughout

OUTPUT FORMAT (JSON):
{
  "title": "Article title",
  "slug": "url-slug",
  "metaDescription": "Under 160 chars",
  "heroAlt": "Descriptive alt text for hero image",
  "heroImageDesc": "2-3 sentence scene description for FAL.ai image generation",
  "body": "Full HTML article body",
  "faqs": [{"q": "Question?", "a": "Answer"}],
  "wordCount": 2650,
  "readingTime": 11
}`;

  const userPrompt = `Write an article for the "${category.name}" category about dream interpretation. Topic should be unique and not overlap with existing articles. Category focus: ${getCategoryFocus(category.slug)}.

Internal articles available for cross-linking:
${internalLinks.map(a => `- "${a.title}" at /${a.slug}`).join('\n')}

Return ONLY valid JSON. No markdown code fences.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.content[0].text;

  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Claude response did not contain valid JSON');

  const article = JSON.parse(jsonMatch[0]);
  article.id = id;
  article.category = category.slug;
  article.categoryName = category.name;
  article.dateISO = dateISO;

  return article;
}

function getCategoryFocus(slug) {
  const focuses = {
    'the-language': 'How dreams communicate — symbols, archetypes, emotional grammar, the mechanics of dream language',
    'the-dictionary': 'Specific dream symbols decoded with real depth — animals, elements, people, places, objects, scenarios',
    'the-practice': 'Dream journaling, lucid dreaming techniques, incubation, recall improvement, integration practices',
    'the-patterns': 'Recurring dreams, cycles, life-stage patterns, collective patterns, seasonal and lunar influences',
    'the-threshold': 'Liminal states — sleep paralysis, hypnagogia, visitation dreams, precognitive dreams, consciousness boundaries',
  };
  return focuses[slug] || 'Dream interpretation with spiritual and psychological depth';
}

// ═══════════════════════════════════════════════════════════════
// FAL.AI IMAGE GENERATION
// ═══════════════════════════════════════════════════════════════

async function generateHeroImage(title, sceneDesc) {
  const prompt = `Ethereal dreamscape illustration for "${title}". ${sceneDesc}. Style: luminous, warm golden and amethyst tones, soft ethereal light, sacred geometry elements, surreal but inviting. No text, no words, no letters. Painterly digital art, high detail. 1200x675 aspect ratio.`;

  const response = await fetch('https://fal.run/fal-ai/flux-pro/v1.1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Key ${FAL_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      image_size: { width: 1200, height: 675 },
      num_images: 1,
      output_format: 'png',
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`FAL.ai error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.images[0].url;
}

async function generateOgImage(title, categoryName, articleId) {
  // For OG images, we generate a simpler branded card
  const prompt = `Minimalist branded card design. Deep amethyst background (#4A2080) with subtle sacred geometry pattern. Soft golden light emanating from center. Ethereal, warm, dreamlike. No text, no words, no letters. 1200x630.`;

  const response = await fetch('https://fal.run/fal-ai/flux-pro/v1.1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Key ${FAL_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      image_size: { width: 1200, height: 630 },
      num_images: 1,
      output_format: 'png',
    }),
  });

  if (!response.ok) {
    // Fallback: use hero image for OG
    console.warn(`[generate] OG image generation failed, will use hero image`);
    return null;
  }

  const data = await response.json();
  return data.images[0].url;
}

// ═══════════════════════════════════════════════════════════════
// BUNNY CDN UPLOAD
// ═══════════════════════════════════════════════════════════════

async function uploadToBunny(path, imageUrl) {
  if (!imageUrl) return;

  // Download image
  const imgResponse = await fetch(imageUrl);
  if (!imgResponse.ok) throw new Error(`Failed to download image: ${imgResponse.status}`);
  const imgBuffer = Buffer.from(await imgResponse.arrayBuffer());

  // Upload to Bunny
  const uploadResponse = await fetch(
    `https://${BUNNY_STORAGE_HOST}/${BUNNY_STORAGE_ZONE}/${path}`,
    {
      method: 'PUT',
      headers: {
        'AccessKey': BUNNY_STORAGE_PASSWORD,
        'Content-Type': 'application/octet-stream',
      },
      body: imgBuffer,
    }
  );

  if (!uploadResponse.ok) {
    const err = await uploadResponse.text();
    throw new Error(`Bunny upload error ${uploadResponse.status}: ${err}`);
  }

  console.log(`[generate] Uploaded to Bunny: ${BUNNY_CDN_BASE}/${path}`);
}

// ═══════════════════════════════════════════════════════════════
// GITHUB COMMIT
// ═══════════════════════════════════════════════════════════════

async function fetchExistingArticleIndex() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/client/src/data/article-index.json`,
      { headers: { Authorization: `token ${GH_PAT}` } }
    );
    if (!response.ok) return [];
    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function commitArticleToGitHub(article, existingIndex) {
  const { Octokit } = await import('@octokit/rest');
  // Fallback: use fetch directly for GitHub API

  const headers = {
    Authorization: `token ${GH_PAT}`,
    'Content-Type': 'application/json',
  };

  // Get current commit SHA
  const refRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/git/ref/heads/main`,
    { headers }
  );
  const refData = await refRes.json();
  const currentSha = refData.object.sha;

  // Get current tree
  const commitRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/git/commits/${currentSha}`,
    { headers }
  );
  const commitData = await commitRes.json();
  const treeSha = commitData.tree.sha;

  // Prepare article JSON file
  const articleJson = JSON.stringify({
    id: article.id,
    title: article.title,
    slug: article.slug,
    category: article.category,
    categoryName: article.categoryName,
    dateISO: article.dateISO,
    metaDescription: article.metaDescription,
    heroAlt: article.heroAlt,
    heroImageDesc: article.heroImageDesc,
    wordCount: article.wordCount,
    readingTime: article.readingTime,
    faqs: article.faqs || [],
    body: article.body,
  }, null, 2);

  // Update index
  const indexEntry = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    category: article.category,
    categoryName: article.categoryName,
    dateISO: article.dateISO,
    metaDescription: article.metaDescription,
    heroAlt: article.heroAlt,
    wordCount: article.wordCount,
    readingTime: article.readingTime,
    faqCount: (article.faqs || []).length,
  };
  const updatedIndex = [...existingIndex, indexEntry];
  const indexJson = JSON.stringify(updatedIndex, null, 2);

  // Create blobs
  const articleBlob = await createBlob(headers, articleJson);
  const indexBlob = await createBlob(headers, indexJson);

  // Create tree
  const treeRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/git/trees`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        base_tree: treeSha,
        tree: [
          {
            path: `client/src/data/articles/${article.slug}.json`,
            mode: '100644',
            type: 'blob',
            sha: articleBlob,
          },
          {
            path: 'client/src/data/article-index.json',
            mode: '100644',
            type: 'blob',
            sha: indexBlob,
          },
        ],
      }),
    }
  );
  const treeData = await treeRes.json();

  // Create commit
  const newCommitRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/git/commits`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: `[auto-gen] Add article: ${article.title}`,
        tree: treeData.sha,
        parents: [currentSha],
      }),
    }
  );
  const newCommitData = await newCommitRes.json();

  // Update ref
  await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/git/refs/heads/main`,
    {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ sha: newCommitData.sha }),
    }
  );

  console.log(`[generate] Committed to GitHub: ${newCommitData.sha}`);
}

async function createBlob(headers, content) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/git/blobs`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ content, encoding: 'utf-8' }),
    }
  );
  const data = await res.json();
  return data.sha;
}

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

function weightedRandom(weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return weights.length - 1;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Run
main();
