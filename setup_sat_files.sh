#!/bin/bash

# Script to help set up SAT practice files
# This script helps organize downloaded SAT files

echo "📚 SAT Practice Files Setup"
echo "=========================="
echo ""

# Check if data directory exists
DATA_DIR="./data"
if [ ! -d "$DATA_DIR" ]; then
    echo "Creating data directory..."
    mkdir -p "$DATA_DIR"
    echo "✅ Created: $DATA_DIR"
else
    echo "✅ Data directory exists: $DATA_DIR"
fi

echo ""
echo "Current files in data directory:"
ls -lh "$DATA_DIR" 2>/dev/null | tail -n +2 | awk '{print "  - " $9 " (" $5 ")"}' || echo "  (empty)"

echo ""
echo "📥 To add SAT files:"
echo ""
echo "Option 1: Copy files manually"
echo "  1. Download SAT PDFs from Google Drive"
echo "  2. Copy them to: $DATA_DIR"
echo "  3. Or run: cp ~/Downloads/SAT*.pdf $DATA_DIR"
echo ""
echo "Option 2: Use the web UI"
echo "  1. Start the application (./start_sat_app.sh)"
echo "  2. Open http://localhost:3000"
echo "  3. Click 'Upload SAT PDFs' in the sidebar"
echo "  4. Select your downloaded files"
echo ""
echo "Option 3: Use this script with file paths"
echo "  ./setup_sat_files.sh /path/to/file1.pdf /path/to/file2.pdf"
echo ""

# If files are provided as arguments, copy them
if [ $# -gt 0 ]; then
    echo "Copying provided files..."
    for file in "$@"; do
        if [ -f "$file" ]; then
            cp "$file" "$DATA_DIR/"
            echo "  ✅ Copied: $(basename "$file")"
        else
            echo "  ❌ Not found: $file"
        fi
    done
    echo ""
    echo "✅ Files copied! Now upload them via the UI or they'll be processed automatically."
fi

echo ""
echo "📊 File Statistics:"
PDF_COUNT=$(find "$DATA_DIR" -name "*.pdf" 2>/dev/null | wc -l | tr -d ' ')
TXT_COUNT=$(find "$DATA_DIR" -name "*.txt" 2>/dev/null | wc -l | tr -d ' ')
DOC_COUNT=$(find "$DATA_DIR" -name "*.doc*" 2>/dev/null | wc -l | tr -d ' ')
TOTAL=$((PDF_COUNT + TXT_COUNT + DOC_COUNT))

echo "  PDF files: $PDF_COUNT"
echo "  Text files: $TXT_COUNT"
echo "  Word documents: $DOC_COUNT"
echo "  Total: $TOTAL files"
echo ""

if [ $TOTAL -eq 0 ]; then
    echo "⚠️  No files found. Add SAT practice files to get started!"
else
    echo "✅ Ready to upload! Start the app and use the 'Upload SAT PDFs' button."
fi
