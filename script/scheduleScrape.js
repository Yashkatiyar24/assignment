/*
  Scheduled scraper runner
  ------------------------
  Runs the existing scrape.js on a cron schedule.
  Default: every day at 03:00 server time.
  Customize with CRON_SCHEDULE (standard cron expression).
*/

const { exec } = require('child_process');
const cron = require('node-cron');
require('dotenv').config();

const schedule = process.env.CRON_SCHEDULE || '0 3 * * *';

function runScrape() {
  console.log(`\n🕒 ${new Date().toISOString()} - Starting scheduled scrape...`);
  const child = exec('node scrape.js', { cwd: __dirname });

  child.stdout.on('data', data => process.stdout.write(data));
  child.stderr.on('data', data => process.stderr.write(data));

  child.on('close', code => {
    console.log(`📝 scrape.js finished with code ${code}`);
  });
}

// Kick off immediately on start, then on schedule
runScrape();
cron.schedule(schedule, runScrape);

console.log(`⏰ Scheduled scrape set to '${schedule}'`);
