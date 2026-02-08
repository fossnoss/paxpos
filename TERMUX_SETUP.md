# Quick Setup Guide for Termux

Follow these simple steps to run the PAX POS simulator in Termux:

## Quick Install (Copy & Paste)

```bash
# Step 1: Update packages
pkg update -y && pkg upgrade -y

# Step 2: Install Node.js
pkg install nodejs -y

# Step 3: Create directory and navigate
mkdir -p ~/pax-sim && cd ~/pax-sim

# Step 4: Download the script (if you have the file)
# OR create it manually with nano:
nano pax-sim.js
```

After running `nano pax-sim.js`, paste the content of the `pax-sim.js` file, then:
- Press `Ctrl + X` to exit
- Press `Y` to save
- Press `Enter` to confirm

## Run the Simulator

```bash
node pax-sim.js
```

## Alternative: One-Line Setup

If you have the files on your device, you can copy them to Termux storage:

```bash
# Allow Termux to access storage
termux-setup-storage

# Copy from downloads (adjust path as needed)
cp ~/storage/downloads/pax-sim.js ~/pax-sim/
cd ~/pax-sim
node pax-sim.js
```

## Make it Easy to Run

Create an alias to run it from anywhere:

```bash
echo 'alias pax-sim="node ~/pax-sim/pax-sim.js"' >> ~/.bashrc
source ~/.bashrc
```

Now you can simply type `pax-sim` from any directory!

## Troubleshooting

### "node: command not found"
```bash
pkg install nodejs -y
```

### "Permission denied"
```bash
chmod +x pax-sim.js
```

### Script doesn't display colors
Termux should support colors by default. If not, try:
```bash
export TERM=xterm-256color
```

### How to stop the simulation
Press `Ctrl + C` at any time to stop the simulation.

## Full File Transfer via ADB

If you're transferring from a computer:

```bash
# On your computer
adb push pax-sim.js /sdcard/Download/

# In Termux
cp ~/storage/downloads/pax-sim.js ~/
node pax-sim.js
```

## Tips

- Run in full screen for best experience
- Use landscape mode for wider display
- Increase text size in Termux settings if needed
- The simulation takes about 2-3 minutes to complete

## Educational Use

Remember: This is purely educational. The simulation shows what security analysis commands look like but doesn't actually connect to or test any real systems.

For legitimate security testing:
1. Get proper authorization in writing
2. Use only on systems you own or have permission to test
3. Follow responsible disclosure practices
4. Consider certifications like CEH, OSCP for professional work

---

**Happy Learning! Stay Legal, Stay Ethical!**
