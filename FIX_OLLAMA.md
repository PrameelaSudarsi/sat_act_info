# 🦙 Fix "Ollama Not Running" Error

## Quick Fix

### Option 1: Start Ollama (Easiest)

**Open a NEW terminal window and run:**

```bash
ollama serve
```

**Keep this terminal open!** Ollama needs to keep running.

### Option 2: Use the Startup Script

```bash
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama
./start_ollama.sh
```

### Option 3: Run in Background

```bash
ollama serve > /tmp/ollama.log 2>&1 &
```

---

## ✅ Verify Ollama is Running

After starting, check if it's working:

```bash
# Check if Ollama is responding
curl http://localhost:11434/api/tags

# Or list models
ollama list
```

You should see a list of models or a JSON response.

---

## 🔧 Troubleshooting

### Problem: "ollama: command not found"

**Solution:** Ollama is not installed.

**Install Ollama:**

**macOS:**
```bash
brew install ollama
```

**Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Or download from:** https://ollama.com/download

---

### Problem: "Port 11434 already in use"

**Solution:** Another Ollama instance might be running.

```bash
# Find and kill the process
lsof -ti:11434 | xargs kill -9

# Then start again
ollama serve
```

---

### Problem: "Connection refused"

**Solution:** 
1. Make sure Ollama is actually running
2. Check if port 11434 is accessible
3. Try restarting Ollama

```bash
# Kill any existing Ollama
pkill ollama

# Start fresh
ollama serve
```

---

### Problem: No models available

**Solution:** Download a model first.

```bash
# Download a model (this may take a few minutes)
ollama pull llama3.2

# Or pull the embedding model
ollama pull nomic-embed-text
```

---

## 📋 Complete Setup Checklist

1. ✅ **Ollama installed** - `ollama --version`
2. ✅ **Ollama running** - `ollama serve` (in separate terminal)
3. ✅ **Models downloaded** - `ollama list` shows models
4. ✅ **Backend running** - `python sat_api_server.py`
5. ✅ **Frontend running** - `cd frontend && npm run dev`

---

## 🚀 Quick Start (All Services)

**Terminal 1 - Ollama:**
```bash
ollama serve
```

**Terminal 2 - Backend:**
```bash
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama
source venv/bin/activate
python sat_api_server.py
```

**Terminal 3 - Frontend:**
```bash
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama/frontend
npm run dev
```

Then open: **http://localhost:3000**

---

## 💡 Tips

1. **Keep Ollama running** - Don't close the terminal where `ollama serve` is running
2. **Check models** - Make sure you have at least one model: `ollama list`
3. **First time setup** - Download models: `ollama pull llama3.2`
4. **Background mode** - Use `nohup ollama serve &` to run in background

---

## 🔍 Verify Everything is Working

```bash
# 1. Check Ollama
curl http://localhost:11434/api/tags

# 2. Check Backend
curl http://localhost:8001/api/health

# 3. Check Frontend
curl http://localhost:3000
```

All three should return responses (not errors).

---

## 📞 Still Having Issues?

1. Check Ollama logs: `tail -f /tmp/ollama.log`
2. Check backend logs: Look at the terminal running `sat_api_server.py`
3. Check browser console: Open DevTools (F12) and check for errors
4. Verify ports: Make sure 11434, 8001, and 3000 are not blocked

---

**Once Ollama is running, refresh the browser at http://localhost:3000 and the error should disappear!**
