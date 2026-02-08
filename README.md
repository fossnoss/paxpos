# PAX POS Security Analysis Simulator

An educational simulation tool that demonstrates the terminal output sequence of a PAX point-of-sale system security analysis. This tool is designed for learning about POS security, penetration testing methodologies, and cybersecurity education.

## ⚠️ Important Disclaimer

**This is a simulation tool for educational purposes only.**

- This tool does NOT perform actual penetration testing or exploitation
- It only simulates the visual appearance of terminal commands and outputs
- Always obtain proper written authorization before testing real systems
- Unauthorized access to computer systems is illegal

## Features

- 82+ step simulation of PAX POS reconnaissance
- Realistic terminal output with color coding
- Simulates common security analysis commands:
  - Device connection via ADB
  - System information gathering
  - File system exploration
  - Network analysis
  - Process and service enumeration
  - Database and storage analysis
  - Security configuration review
  - Log file analysis

## Installation in Termux

### Step 1: Install Termux
Download and install Termux from F-Droid or Google Play Store.

### Step 2: Update Packages
```bash
pkg update && pkg upgrade
```

### Step 3: Install Node.js
```bash
pkg install nodejs
```

### Step 4: Download or Create the Script
Create a new file with the simulation code:
```bash
nano pax-sim.js
```

Then paste the code from `pax-sim.js` and save (Ctrl+X, then Y, then Enter).

### Step 5: Make it Executable (Optional)
```bash
chmod +x pax-sim.js
```

## Usage

Run the simulation using any of these methods:

### Method 1: Direct execution
```bash
node pax-sim.js
```

### Method 2: Using npm script
```bash
npm start
```

or

```bash
npm run sim
```

### Method 3: If made executable
```bash
./pax-sim.js
```

## What the Simulation Shows

The simulation demonstrates a typical security analysis workflow for embedded Linux POS systems:

1. **Initial Connection (Steps 1-5)**: Establishing ADB connection to the device
2. **System Information (Steps 6-15)**: Gathering OS, kernel, and build information
3. **File System (Steps 16-25)**: Exploring directory structure and installed apps
4. **Network Analysis (Steps 26-35)**: Examining network configuration and connections
5. **Process Analysis (Steps 36-45)**: Identifying running services and applications
6. **Storage Analysis (Steps 46-55)**: Investigating databases and configuration files
7. **Security Review (Steps 56-65)**: Checking security settings and configurations
8. **Log Analysis (Steps 66-75)**: Reviewing system and application logs
9. **Final Analysis (Steps 76-82)**: Summarizing findings and permissions

## Output Example

The simulation provides color-coded terminal output that looks like:
```
╔════════════════════════════════════════════════════════════════╗
║     PAX POS Security Analysis Simulation - Educational Use     ║
╚════════════════════════════════════════════════════════════════╝

⚠️  This is a simulation for educational purposes only
⚠️  Always obtain proper authorization before testing real systems

Starting PAX POS reconnaissance...

[Step 1/82] $ adb devices
List of devices attached
192.168.1.100:5555    device
...
```

## Customization

You can modify the `pax-sim.js` file to:
- Adjust the typing speed (change `delay` values)
- Add or remove steps
- Modify command outputs
- Change color schemes

## Learning Resources

To learn more about POS security and ethical hacking:

- [PAX POS Pentest Guide](https://github.com/omarelshopky/pax-pos-app-pentest-guide)
- OWASP Mobile Security Testing Guide
- Android Security Documentation
- Penetration Testing: A Hands-On Introduction to Hacking

## Legal Notice

This tool is provided for educational and authorized security testing purposes only. The authors and contributors:

- Do not encourage or condone unauthorized access to systems
- Are not responsible for any misuse of this tool
- Recommend only using security testing skills in legal, authorized contexts
- Emphasize the importance of ethical hacking principles

**Always ensure you have explicit written permission before testing any system you do not own.**

## License

MIT License - See LICENSE file for details

## Contributing

This is an educational project. Contributions that enhance the learning experience or improve accuracy are welcome.

## Support

For questions about ethical hacking, security research, or authorized penetration testing:
- Seek proper training and certification (CEH, OSCP, etc.)
- Work within legal and authorized frameworks
- Follow responsible disclosure practices
- Join legitimate security communities and CTF competitions
