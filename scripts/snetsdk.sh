#!/usr/bin/env bash
set -e

# Clone and install SingularityNET SDK if missing
if [ ! -d "snet-sdk-python" ]; then
  git clone --branch v3.6.1 https://github.com/singnet/snet-sdk-python.git
else
  echo "snet-sdk-python already exists, skipping clone."
fi
cd snet-sdk-python

# Install Python SDK
pip3 install --user -r requirements.txt
pip3 install --user -e .

echo "✅ snet-sdk setup done"