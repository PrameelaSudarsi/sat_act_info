#!/bin/bash

# Quick script to download SAT files from Google Drive

echo "📚 SAT Files Downloader"
echo "======================"
echo ""

# Check if virtual environment is activated
if [ -z "$VIRTUAL_ENV" ]; then
    echo "Activating virtual environment..."
    source venv/bin/activate
fi

# Install gdown if not already installed
echo "Checking for gdown..."
python -c "import gdown" 2>/dev/null || {
    echo "Installing gdown..."
    pip install -q gdown
}

echo ""
echo "Usage:"
echo "  ./download_sat_files.sh"
echo "    (Interactive mode - will ask for Google Drive links)"
echo ""
echo "  ./download_sat_files.sh 'https://drive.google.com/...' 'https://drive.google.com/...'"
echo "    (Direct mode - provide links as arguments)"
echo ""

# Run the Python script
python download_from_gdrive.py "$@"
