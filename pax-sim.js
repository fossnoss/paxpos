#!/usr/bin/env node

const readline = require('readline');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Slower typing
const typeText = async (text, delay = 70) => {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(delay);
  }
  process.stdout.write('\n');
};

const printInstant = (text) => {
  console.log(text);
};

const steps = [
  {
    cmd: '$ adb devices',
    output: `List of devices attached
192.168.1.100:5555    device

`,
    delay: 80
  },
  {
    cmd: '$ adb connect 192.168.1.100:5555',
    output: `connected to 192.168.1.100:5555`,
    delay: 120
  },
  {
    cmd: '$ adb shell',
    output: ``,
    delay: 80
  },
  {
    cmd: 'shell@PAX_D230:/ $ uname -a',
    output: `Linux localhost 3.10.65 #1 SMP PREEMPT Wed Jun 27 16:32:10 CST 2018 armv7l GNU/Linux`,
    delay: 50
  },
  {
    cmd: 'shell@PAX_D230:/ $ getprop ro.build.version.release',
    output: `4.4.4`,
    delay: 50
  },
  {
    cmd: 'shell@PAX_D230:/ $ getprop ro.product.model',
    output: `PAX_D230`,
    delay: 50
  },
  {
    cmd: 'shell@PAX_D230:/ $ id',
    output: `uid=2000(shell) gid=2000(shell) groups=1003(graphics),1004(input),1007(log),1011(adb)`,
    delay: 50
  },
  {
    cmd: 'shell@PAX_D230:/ $ ls -la /data/data/com.pax.merchant.app/',
    output: `drwxr-x--x u0_a2 u0_a2 cache
drwxr-x--x u0_a2 u0_a2 databases
drwxr-x--x u0_a2 u0_a2 files
drwxr-x--x u0_a2 u0_a2 shared_prefs`,
    delay: 50
  },
  {
    cmd: 'shell@PAX_D230:/ $ cat /data/data/com.pax.merchant.app/shared_prefs/config.xml',
    output: `<map>
  <string name="server_url">https://api.payment-gateway.com</string>
  <string name="merchant_id">MERCH123456</string>
</map>`,
    delay: 50
  },
  {
    cmd: 'shell@PAX_D230:/ $ exit',
    output: ``,
    delay: 80
  }
];

async function runSimulation() {
  console.clear();

  printInstant(`${colors.cyan}${colors.bright}PAX D230 POS Recon Session${colors.reset}`);
  printInstant('');

  let stepNum = 1;
  for (const step of steps) {
    process.stdout.write(`${colors.dim}[${stepNum}/${steps.length}] ${colors.reset}`);
    await typeText(`${colors.green}${step.cmd}${colors.reset}`, step.delay);

    if (step.output) {
      printInstant(step.output);
    }

    await sleep(600);
    stepNum++;
  }

  printInstant('');
  printInstant(`${colors.cyan}${colors.bright}════════════════════════════════════════════${colors.reset}`);
  printInstant(`${colors.green}${colors.bright}Recon session finished${colors.reset}`);
  printInstant(`${colors.cyan}${colors.bright}════════════════════════════════════════════${colors.reset}`);
  printInstant('');

  printInstant(`${colors.yellow}${colors.bright}Access Levels Observed:${colors.reset}`);
  printInstant(`  ${colors.green}Level 0:${colors.reset} Shell access as root is possible (often via hardcoded credentials)`);
  printInstant(`  ${colors.yellow}Level 1:${colors.reset} Shell access available but restricted to app users (no root)`);
  printInstant(`  ${colors.red}Level 2:${colors.reset} No shell access; limited file read/write access only`);
  printInstant('');
}

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log(`\n${colors.yellow}Session interrupted${colors.reset}`);
  process.exit(0);
});

runSimulation().catch(err => {
  console.error(`${colors.red}Error: ${err.message}${colors.reset}`);
  process.exit(1);
});
