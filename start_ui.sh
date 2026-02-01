#!/bin/bash

# Start script for Ollama Agent UI
# This script starts both the backend API and frontend

echo "🚀 Starting Ollama Agent UI..."
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run: python3 -m venv venv"
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

# Check if Ollama is running
echo "🔍 Checking Ollama connection..."
python -c "import ollama; ollama.list()" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "⚠️  Warning: Ollama might not be running. Start it with: ollama serve"
    echo ""
fi

# Start backend in background
echo "📡 Starting backend API server on port 8001..."
python api_server.py > api_server.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
echo ""

# Wait a moment for backend to start
sleep 2

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    echo ""
fi

# Start frontend
echo "🎨 Starting frontend on port 3000..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..
echo "Frontend PID: $FRONTEND_PID"
echo ""

echo "✅ UI is starting!"
echo ""
echo "📍 Backend API: http://localhost:8001"
echo "📍 Frontend UI: http://localhost:3000"
echo "📍 API Docs: http://localhost:8001/docs"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user interrupt
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Keep script running
wait
