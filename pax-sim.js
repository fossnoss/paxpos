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

const typeText = async (text, delay = 30) => {
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
  // Step 1-5: Initial Connection
  {
    cmd: '$ adb devices',
    output: `List of devices attached
192.168.1.100:5555    device

`,
    delay: 50
  },
  {
    cmd: '$ adb connect 192.168.1.100:5555',
    output: `connected to 192.168.1.100:5555`,
    delay: 100
  },
  {
    cmd: '$ adb shell',
    output: ``,
    delay: 50
  },

  // Step 6-15: System Information Gathering
  {
    cmd: 'shell@PAX_D230:/ $ uname -a',
    output: `Linux localhost 3.10.65 #1 SMP PREEMPT Wed Jun 27 16:32:10 CST 2018 armv7l GNU/Linux`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ cat /proc/version',
    output: `Linux version 3.10.65 (jenkins@pax-build-server) (gcc version 4.9.3 20150311 (prerelease) (Linaro GCC 4.9-2015.03) ) #1 SMP PREEMPT Wed Jun 27 16:32:10 CST 2018`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ getprop ro.build.version.release',
    output: `4.4.4`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ getprop ro.product.model',
    output: `PAX_D230`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ getprop ro.build.display.id',
    output: `ProlinOS V2.9.8.10016R`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ id',
    output: `uid=2000(shell) gid=2000(shell) groups=1003(graphics),1004(input),1007(log),1009(mount),1011(adb),1015(sdcard_rw),1028(sdcard_r),3001(net_bt_admin),3002(net_bt),3003(inet),3006(net_bw_stats)`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ whoami',
    output: `shell`,
    delay: 20
  },

  // Step 16-25: File System Exploration
  {
    cmd: 'shell@PAX_D230:/ $ ls -la /',
    output: `drwxr-xr-x root     root              2024-01-15 10:23 acct
drwxrwx--- system   cache             2024-01-15 10:23 cache
lrwxrwxrwx root     root              2024-01-15 10:23 charger -> /sbin/healthd
dr-x------ root     root              2024-01-15 10:23 config
lrwxrwxrwx root     root              2024-01-15 10:23 d -> /sys/kernel/debug
drwxrwx--x system   system            2024-01-15 10:23 data
-rw-r--r-- root     root          265 2024-01-15 10:23 default.prop
drwxr-xr-x root     root              2024-01-15 10:23 dev
lrwxrwxrwx root     root              2024-01-15 10:23 etc -> /system/etc
-rwxr-x--- root     root       187028 1970-01-01 08:00 init
-rwxr-x--- root     root         2487 1970-01-01 08:00 init.environ.rc
-rwxr-x--- root     root        23573 1970-01-01 08:00 init.pax.rc`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ ls -la /system/app/',
    output: `drwxr-xr-x root     root              2024-01-15 10:23 .
drwxr-xr-x root     root              2024-01-15 10:23 ..
-rw-r--r-- root     root       892456 2024-01-15 10:23 AppStore.apk
-rw-r--r-- root     root      1234567 2024-01-15 10:23 MerchantApp.apk
-rw-r--r-- root     root       567890 2024-01-15 10:23 PAXSettings.apk
-rw-r--r-- root     root       445678 2024-01-15 10:23 PaymentService.apk
-rw-r--r-- root     root       334455 2024-01-15 10:23 SystemUI.apk`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ pm list packages',
    output: `package:com.pax.market.android.app
package:com.android.systemui
package:com.pax.settings
package:com.pax.merchant.app
package:com.pax.payment.service
package:com.android.providers.settings
package:com.android.providers.media
package:com.android.shell`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ dumpsys package com.pax.merchant.app | grep userId',
    output: `    userId=10001
    primaryCpuAbi=armeabi-v7a`,
    delay: 20
  },

  // Step 26-35: Network Analysis
  {
    cmd: 'shell@PAX_D230:/ $ netstat -tuln',
    output: `Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:5555            0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ ip addr show',
    output: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 00:0a:35:12:34:56 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ cat /proc/net/route',
    output: `Iface   Destination     Gateway         Flags   RefCnt  Use     Metric  Mask            MTU     Window  IRTT
eth0    00000000        0101A8C0        0003    0       0       0       00000000        0       0       0
eth0    0001A8C0        00000000        0001    0       0       0       00FFFFFF        0       0       0`,
    delay: 20
  },

  // Step 36-45: Process and Service Analysis
  {
    cmd: 'shell@PAX_D230:/ $ ps | grep pax',
    output: `system    1234  123   1234567 123456 ffffffff 00000000 S com.pax.market.android.app
system    2345  123   2345678 234567 ffffffff 00000000 S com.pax.settings
system    3456  123   3456789 345678 ffffffff 00000000 S com.pax.merchant.app
system    4567  123   4567890 456789 ffffffff 00000000 S com.pax.payment.service`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ dumpsys activity services com.pax.payment.service',
    output: `SERVICE com.pax.payment.service/.PaymentService 3a7f8b2 pid=4567
  Intent { act=com.pax.action.PAYMENT cmp=com.pax.payment.service/.PaymentService }
  packageName=com.pax.payment.service
  processName=com.pax.payment.service
  enabled=true exported=true
  permission=com.pax.permission.PAYMENT`,
    delay: 20
  },

  // Step 46-55: Database and Storage Analysis
  {
    cmd: 'shell@PAX_D230:/ $ ls -la /data/data/',
    output: `drwxrwx--x system   system            2024-01-15 10:23 .
drwxrwx--x system   system            2024-01-15 10:23 ..
drwxr-x--x u0_a1    u0_a1             2024-01-15 10:23 com.pax.market.android.app
drwxr-x--x u0_a2    u0_a2             2024-01-15 10:23 com.pax.merchant.app
drwxr-x--x u0_a3    u0_a3             2024-01-15 10:23 com.pax.payment.service
drwxr-x--x u0_a4    u0_a4             2024-01-15 10:23 com.pax.settings`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ ls -la /data/data/com.pax.merchant.app/',
    output: `drwxr-x--x u0_a2    u0_a2             2024-01-15 10:23 .
drwxrwx--x system   system            2024-01-15 10:23 ..
drwxrwx--x u0_a2    u0_a2             2024-01-15 10:23 cache
drwxrwx--x u0_a2    u0_a2             2024-01-15 10:23 databases
drwxrwx--x u0_a2    u0_a2             2024-01-15 10:23 files
drwxrwx--x u0_a2    u0_a2             2024-01-15 10:23 lib
drwxrwx--x u0_a2    u0_a2             2024-01-15 10:23 shared_prefs`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ ls -la /data/data/com.pax.merchant.app/databases/',
    output: `drwxrwx--x u0_a2    u0_a2             2024-01-15 10:23 .
drwxr-x--x u0_a2    u0_a2             2024-01-15 10:23 ..
-rw-rw---- u0_a2    u0_a2        24576 2024-01-15 10:23 merchant.db
-rw-rw---- u0_a2    u0_a2        12288 2024-01-15 10:23 transactions.db`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ cat /data/data/com.pax.merchant.app/shared_prefs/config.xml',
    output: `<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<map>
    <string name="server_url">https://api.payment-gateway.com</string>
    <string name="merchant_id">MERCH123456</string>
    <boolean name="debug_mode" value="false" />
    <int name="timeout" value="30" />
</map>`,
    delay: 20
  },

  // Step 56-65: Security Analysis
  {
    cmd: 'shell@PAX_D230:/ $ cat /proc/sys/kernel/randomize_va_space',
    output: `2`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ cat /proc/cpuinfo',
    output: `Processor       : ARMv7 Processor rev 4 (v7l)
processor       : 0
BogoMIPS        : 1992.29

processor       : 1
BogoMIPS        : 1992.29

Features        : swp half thumb fastmult vfp edsp neon vfpv3
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xc07
CPU revision    : 4

Hardware        : Freescale i.MX6 Quad/DualLite (Device Tree)
Revision        : 0000
Serial          : 0000000000000000`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ cat /system/build.prop | grep security',
    output: `ro.build.selinux=1
ro.secure=1
ro.debuggable=0
persist.sys.usb.config=mtp,adb
security.perf_harden=1`,
    delay: 20
  },

  // Step 66-75: Log Analysis
  {
    cmd: 'shell@PAX_D230:/ $ logcat -d | grep -i "payment" | head -20',
    output: `I/PaymentService(4567): Payment service initialized
D/PaymentService(4567): Transaction started: Amount=150.00
I/PaymentService(4567): Card reader connected
D/PaymentService(4567): Processing EMV transaction
I/PaymentService(4567): Transaction approved: Auth=ABC123
D/MerchantApp(3456): Payment result: SUCCESS
I/PaymentService(4567): Transaction stored in database
D/PaymentService(4567): Receipt generated`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ logcat -d | grep -i "error" | head -10',
    output: `E/PaymentService(4567): Network timeout after 30s
W/MerchantApp(3456): Configuration not found, using defaults
E/PaymentService(4567): Failed to connect to host: api.payment-gateway.com
W/SystemUI(2345): Low battery warning`,
    delay: 20
  },

  // Step 76-82: Application Analysis and Final Steps
  {
    cmd: 'shell@PAX_D230:/ $ dumpsys package com.pax.merchant.app | grep versionName',
    output: `    versionName=2.3.1`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ dumpsys package com.pax.merchant.app | grep permission',
    output: `    requested permissions:
      android.permission.INTERNET
      android.permission.ACCESS_NETWORK_STATE
      android.permission.READ_PHONE_STATE
      android.permission.WRITE_EXTERNAL_STORAGE
      com.pax.permission.PAYMENT`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ ls -la /sdcard/',
    output: `drwxrwx--x root     sdcard_r          2024-01-15 10:23 .
drwxr-xr-x root     root              2024-01-15 10:23 ..
drwxrwx--x root     sdcard_r          2024-01-15 10:23 Download
drwxrwx--x root     sdcard_r          2024-01-15 10:23 PAX
drwxrwx--x root     sdcard_r          2024-01-15 10:23 logs
-rw-rw---- root     sdcard_r      45678 2024-01-15 10:23 debug.log`,
    delay: 20
  },
  {
    cmd: 'shell@PAX_D230:/ $ exit',
    output: ``,
    delay: 50
  },
  {
    cmd: '$ echo "Analysis complete"',
    output: `${colors.green}Analysis complete${colors.reset}`,
    delay: 100
  }
];

async function runSimulation() {
  console.clear();

  // Header
  printInstant(`${colors.cyan}${colors.bright}╔════════════════════════════════════════════════════════════════╗${colors.reset}`);
  printInstant(`${colors.cyan}${colors.bright}║     PAX POS Security Analysis Simulation - Educational Use     ║${colors.reset}`);
  printInstant(`${colors.cyan}${colors.bright}╚════════════════════════════════════════════════════════════════╝${colors.reset}`);
  printInstant('');
  printInstant(`${colors.yellow}⚠️  This is a simulation for educational purposes only${colors.reset}`);
  printInstant(`${colors.yellow}⚠️  Always obtain proper authorization before testing real systems${colors.reset}`);
  printInstant('');
  await sleep(2000);

  printInstant(`${colors.bright}Starting PAX POS reconnaissance...${colors.reset}`);
  printInstant('');
  await sleep(1000);

  let stepNum = 1;
  for (const step of steps) {
    // Print step number
    process.stdout.write(`${colors.dim}[Step ${stepNum}/${steps.length}] ${colors.reset}`);

    // Type the command
    await typeText(`${colors.green}${step.cmd}${colors.reset}`, step.delay);

    // Print output instantly
    if (step.output) {
      printInstant(step.output);
    }

    await sleep(200);
    stepNum++;
  }

  printInstant('');
  printInstant(`${colors.cyan}${colors.bright}════════════════════════════════════════════════════════════════${colors.reset}`);
  printInstant(`${colors.green}${colors.bright}✓ Simulation complete - ${steps.length} steps executed${colors.reset}`);
  printInstant(`${colors.cyan}${colors.bright}════════════════════════════════════════════════════════════════${colors.reset}`);
  printInstant('');
  printInstant(`${colors.yellow}Key findings summary:${colors.reset}`);
  printInstant(`  • Device: PAX D230 running ProlinOS V2.9.8.10016R`);
  printInstant(`  • Platform: ARM-based Android 4.4.4 (Linux 3.10.65)`);
  printInstant(`  • Access Level: Shell user (uid=2000)`);
  printInstant(`  • Services: Payment processing, merchant app, market app`);
  printInstant(`  • Storage: Application databases and configuration files identified`);
  printInstant('');
  printInstant(`${colors.dim}Remember: This simulation is for educational purposes.${colors.reset}`);
  printInstant(`${colors.dim}Real penetration testing requires proper authorization.${colors.reset}`);
  printInstant('');
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log(`\n\n${colors.yellow}Simulation interrupted by user${colors.reset}`);
  process.exit(0);
});

runSimulation().catch(err => {
  console.error(`${colors.red}Error: ${err.message}${colors.reset}`);
  process.exit(1);
});
