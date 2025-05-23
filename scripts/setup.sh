#!/usr/bin/env bash
set -e

# Convert any CRLF to LF for scripts
command -v dos2unix >/dev/null && dos2unix /workspaces/${PWD##*/}/scripts/*.sh || true

# Run Snet SDK setup
bash scripts/snetsdk.sh

# Install Python requirements
if [ -f "/workspaces/${PWD##*/}/requirements.txt" ]; then
  echo "Installing Python dependencies..."
  pip3 install --user -r requirements.txt
fi

# Install Node.js dependencies (Next.js, TypeScript, etc.)
if [ -f "/workspaces/${PWD##*/}/package.json" ]; then
  echo "Installing Node.js dependencies..."
  npm install
fi

echo "✅ Dev container setup complete!"