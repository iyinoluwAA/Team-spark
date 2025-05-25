set -e

# 1. Run Snet SDK installer script
bash scripts/snetsdk.sh

# 2. Install Python dependencies if requirements.txt exists
if [ -f "$(pwd)/requirements.txt" ]; then
  echo "Installing Python dependencies..."
  pip3 install --user -r requirements.txt
fi

# 3. Install Node.js dependencies if package.json exists
if [ -f "$(pwd)/package.json" ]; then
  echo "Installing Node.js dependencies..."
  npm install
fi

echo "✅ Dev container setup complete!"