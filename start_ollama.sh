#!/bin/bash

# Script to start Ollama and verify it's running

echo "🦙 Starting Ollama..."
echo ""

# Check if Ollama is already running
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "✅ Ollama is already running!"
    echo ""
    echo "Available models:"
    ollama list
    exit 0
fi

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama is not installed!"
    echo ""
    echo "Please install Ollama first:"
    echo "  macOS: brew install ollama"
    echo "  Linux: curl -fsSL https://ollama.com/install.sh | sh"
    echo "  Or visit: https://ollama.com/download"
    exit 1
fi

echo "Starting Ollama server..."
echo ""

# Start Ollama in the background
ollama serve > /tmp/ollama.log 2>&1 &
OLLAMA_PID=$!

echo "Ollama starting... (PID: $OLLAMA_PID)"
echo ""

# Wait for Ollama to start
echo "Waiting for Ollama to start..."
for i in {1..10}; do
    sleep 1
    if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        echo "✅ Ollama is now running!"
        echo ""
        echo "Available models:"
        ollama list
        echo ""
        echo "📝 Note: Keep this terminal open or run Ollama in the background"
        echo "   To stop: kill $OLLAMA_PID"
        exit 0
    fi
    echo -n "."
done

echo ""
echo "⚠️  Ollama may still be starting. Check status with:"
echo "   curl http://localhost:11434/api/tags"
echo ""
echo "Or check logs:"
echo "   tail -f /tmp/ollama.log"
echo ""
echo "If Ollama doesn't start, try running manually:"
echo "   ollama serve"
