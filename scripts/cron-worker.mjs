// ═══════════════════════════════════════════════════════════════
// DREAMGATE — Cron Worker
// Mon-Fri 12:00 UTC — generate-articles.mjs (5 articles/day)
// Saturday 12:00 UTC — generate-product-spotlight.mjs (1 product review)
// ═══════════════════════════════════════════════════════════════

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ARTICLE_SCRIPT = join(__dirname, 'generate-articles.mjs');
const PRODUCT_SCRIPT = join(__dirname, 'generate-product-spotlight.mjs');
const TIMEOUT_MS = 600_000; // 10 minutes
const CRON_HOUR = 12; // UTC
const CRON_MINUTE = 0;

console.log('[cron-worker] Cron started');
console.log(`[cron-worker] Article schedule: Mon-Fri ${CRON_HOUR}:${String(CRON_MINUTE).padStart(2, '0')} UTC`);
console.log(`[cron-worker] Product spotlight schedule: Saturday ${CRON_HOUR}:${String(CRON_MINUTE).padStart(2, '0')} UTC`);

// Support --run-now flag for testing
if (process.argv.includes('--run-now')) {
  console.log('[cron-worker] --run-now flag detected. Running article generator immediately.');
  runScript(ARTICLE_SCRIPT, 'article-generator');
} else if (process.argv.includes('--run-product-now')) {
  console.log('[cron-worker] --run-product-now flag detected. Running product spotlight immediately.');
  runScript(PRODUCT_SCRIPT, 'product-spotlight');
} else {
  scheduleNext();
}

function scheduleNext() {
  const now = new Date();
  const next = getNextRunTime(now);
  const delay = next.getTime() - now.getTime();
  const isSaturday = next.getUTCDay() === 6;
  const label = isSaturday ? 'product-spotlight' : 'article-generator';

  console.log(`[cron-worker] Next run: ${next.toISOString()} (${label}, in ${Math.round(delay / 60000)} minutes)`);

  setTimeout(() => {
    const script = isSaturday ? PRODUCT_SCRIPT : ARTICLE_SCRIPT;
    runScript(script, label).then(() => scheduleNext());
  }, delay);
}

function getNextRunTime(from) {
  const next = new Date(from);
  next.setUTCHours(CRON_HOUR, CRON_MINUTE, 0, 0);

  // If we're past today's run time, move to tomorrow
  if (next <= from) {
    next.setUTCDate(next.getUTCDate() + 1);
  }

  // Skip Sundays only (Saturday is product spotlight day)
  while (next.getUTCDay() === 0) {
    next.setUTCDate(next.getUTCDate() + 1);
  }

  return next;
}

function runScript(scriptPath, label) {
  return new Promise((resolve) => {
    console.log(`[cron-worker] Spawning ${label} at ${new Date().toISOString()}`);

    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      env: { ...process.env },
    });

    const timer = setTimeout(() => {
      console.error(`[cron-worker] ${label} timed out after 600s. Killing.`);
      child.kill('SIGTERM');
    }, TIMEOUT_MS);

    child.on('close', (code) => {
      clearTimeout(timer);
      if (code === 0) {
        console.log(`[cron-worker] ${label} completed successfully.`);
      } else {
        console.error(`[cron-worker] ${label} exited with code ${code}.`);
      }
      resolve(code);
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      console.error(`[cron-worker] Failed to spawn ${label}:`, err.message);
      resolve(1);
    });
  });
}
