// ═══════════════════════════════════════════════════════════════
// DREAMGATE — Cron Worker
// Mon-Fri 12:00 UTC (6:00 AM MDT), 600s timeout
// Spawns generate-articles.mjs on schedule
// ═══════════════════════════════════════════════════════════════

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GENERATOR_SCRIPT = join(__dirname, 'generate-articles.mjs');
const TIMEOUT_MS = 600_000; // 10 minutes
const CRON_HOUR = 12; // UTC
const CRON_MINUTE = 0;

console.log('[cron-worker] Cron started');
console.log(`[cron-worker] Schedule: Mon-Fri ${CRON_HOUR}:${String(CRON_MINUTE).padStart(2, '0')} UTC`);
console.log(`[cron-worker] Generator: ${GENERATOR_SCRIPT}`);

// Support --run-now flag for testing
if (process.argv.includes('--run-now')) {
  console.log('[cron-worker] --run-now flag detected. Running immediately.');
  runGenerator();
} else {
  scheduleNext();
}

function scheduleNext() {
  const now = new Date();
  const next = getNextRunTime(now);
  const delay = next.getTime() - now.getTime();

  console.log(`[cron-worker] Next run: ${next.toISOString()} (in ${Math.round(delay / 60000)} minutes)`);

  setTimeout(() => {
    runGenerator();
    // Schedule next after completion
    scheduleNext();
  }, delay);
}

function getNextRunTime(from) {
  const next = new Date(from);
  next.setUTCHours(CRON_HOUR, CRON_MINUTE, 0, 0);

  // If we're past today's run time, move to tomorrow
  if (next <= from) {
    next.setUTCDate(next.getUTCDate() + 1);
  }

  // Skip weekends (0 = Sunday, 6 = Saturday)
  while (next.getUTCDay() === 0 || next.getUTCDay() === 6) {
    next.setUTCDate(next.getUTCDate() + 1);
  }

  return next;
}

function runGenerator() {
  return new Promise((resolve) => {
    console.log(`[cron-worker] Spawning generator at ${new Date().toISOString()}`);

    const child = spawn('node', [GENERATOR_SCRIPT], {
      stdio: 'inherit',
      env: { ...process.env },
    });

    const timer = setTimeout(() => {
      console.error('[cron-worker] Generator timed out after 600s. Killing.');
      child.kill('SIGTERM');
    }, TIMEOUT_MS);

    child.on('close', (code) => {
      clearTimeout(timer);
      if (code === 0) {
        console.log(`[cron-worker] Generator completed successfully.`);
      } else {
        console.error(`[cron-worker] Generator exited with code ${code}.`);
      }
      resolve(code);
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      console.error(`[cron-worker] Failed to spawn generator:`, err.message);
      resolve(1);
    });
  });
}
