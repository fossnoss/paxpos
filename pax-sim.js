#!/usr/bin/env node

const readline = require('readline');

const colors = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const slowPrint = async (text, delay = 15) => {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(delay);
  }
  process.stdout.write('\n');
};

// Command → Output map
const commandMap = {
  'adb devices': `List of devices attached
192.168.1.100:5555    device
`,

  'adb connect 192.168.1.100:5555': `connected to 192.168.1.100:5555`,

  'adb shell': ``,

  'uname -a': `Linux localhost 3.10.65 #1 SMP PREEMPT Wed Jun 27 16:32:10 CST 2018 armv7l GNU/Linux`,

  'getprop ro.build.version.release': `4.4.4`,

  'getprop ro.product.model': `PAX_D230`,

  'id': `uid=2000(shell) gid=2000(shell) groups=1003(graphics),1004(input),1007(log),1011(adb)`,

  'whoami': `shell`,

  'ls /data/data/com.pax.merchant.app': `cache
databases
files
lib
shared_prefs`,

  'ls /data/data/com.pax.merchant.app/databases': `merchant.db
transactions.db`,

  'cat /data/data/com.pax.merchant.app/shared_prefs/config.xml': `<map>
  <string name="server_url">https://api.payment-gateway.com</string>
  <string name="merchant_id">MERCH123456</string>
</map>`,

  'exit': '__EXIT__'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${colors.green}shell@PAX_D230:/ $ ${colors.reset}`
});

console.clear();
rl.prompt();

rl.on('line', async (line) => {
  const cmd = line.trim();

  if (!cmd) {
    rl.prompt();
    return;
  }

  if (commandMap[cmd]) {
    if (commandMap[cmd] === '__EXIT__') {
      rl.close();
      return;
    }
    await slowPrint(commandMap[cmd]);
  } else {
    await slowPrint(`${cmd}: not found`, 10);
  }

  rl.prompt();
});

rl.on('close', () => {
  console.log(`${colors.dim}connection closed${colors.reset}`);
  process.exit(0);
});

