# 🔧 Quick Fix for Error at http://localhost:3000

## The Problem
The frontend is running, but the **backend API server is not running**. This causes API calls to fail.

## ✅ Solution: Start the Backend

**Open a NEW terminal window and run:**

```bash
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama
source venv/bin/activate
python sat_api_server.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8001
INFO:     Application startup complete.
```

## ✅ Verify Both Are Running

1. **Frontend** (Terminal 1): Should show `Local: http://localhost:3000/`
2. **Backend** (Terminal 2): Should show `Uvicorn running on http://0.0.0.0:8001`

## 🌐 Access the Application

Once both are running:
- Open browser: http://localhost:3000
- The error should be gone!

## 🔍 Check What's Running

```bash
# Check frontend
curl http://localhost:3000

# Check backend
curl http://localhost:8001/api/health
```

Both should return responses (not errors).

## 📝 Common Errors

### Error: "Network Error" or "Failed to fetch"
→ Backend is not running. Start it with the command above.

### Error: "Cannot GET /"
→ Frontend is not running. Run `cd frontend && npm run dev`

### Error: "Connection refused"
→ Check if ports 3000 and 8001 are available

## 🚀 Quick Start (Both Servers)

**Terminal 1 - Backend:**
```bash
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama
source venv/bin/activate
python sat_api_server.py
```

**Terminal 2 - Frontend:**
```bash
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama/frontend
npm run dev
```

Then open: http://localhost:3000
