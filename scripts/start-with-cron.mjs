// ═══════════════════════════════════════════════════════════════
// DREAMGATE — Start With Cron
// Spawns the web server AND the cron worker together.
// Render startCommand: NODE_ENV=production node scripts/start-with-cron.mjs
// ═══════════════════════════════════════════════════════════════

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WEB_SCRIPT = join(__dirname, '..', 'dist', 'index.js');
const CRON_SCRIPT = join(__dirname, 'cron-worker.mjs');

console.log('[start] Launching Dream Gate...');
console.log(`[start] Web server: ${WEB_SCRIPT}`);
console.log(`[start] Cron worker: ${CRON_SCRIPT}`);

// Spawn web server
const web = spawn('node', [WEB_SCRIPT], {
  stdio: 'inherit',
  env: { ...process.env },
});

web.on('error', (err) => {
  console.error('[start] Web server failed to start:', err.message);
  process.exit(1);
});

web.on('close', (code) => {
  console.error(`[start] Web server exited with code ${code}. Shutting down.`);
  process.exit(code || 1);
});

// Spawn cron worker
const cron = spawn('node', [CRON_SCRIPT], {
  stdio: 'inherit',
  env: { ...process.env },
});

cron.on('error', (err) => {
  console.error('[start] Cron worker failed to start:', err.message);
  // Don't exit — web server should keep running
});

cron.on('close', (code) => {
  console.warn(`[start] Cron worker exited with code ${code}. Web server continues.`);
});

// Handle process signals
function shutdown(signal) {
  console.log(`[start] Received ${signal}. Shutting down...`);
  web.kill(signal);
  cron.kill(signal);
  setTimeout(() => process.exit(0), 5000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
