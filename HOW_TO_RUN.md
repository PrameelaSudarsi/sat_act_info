# 🚀 How to Run the SAT Practice Application

## Quick Start (Easiest Method)

### Option 1: Use the Startup Script (Recommended)

```bash
# Make sure you're in the project directory
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama

# Run the startup script
./start_sat_app.sh
```

This will automatically:
- ✅ Check Ollama connection
- ✅ Start the backend API server
- ✅ Start the frontend development server
- ✅ Open both in your browser

**Access the application:**
- Frontend UI: http://localhost:3000
- API Documentation: http://localhost:8001/docs

---

## Manual Setup (Step by Step)

### Prerequisites Check

1. **Ollama must be running:**
   ```bash
   # In a separate terminal, start Ollama
   ollama serve
   ```

2. **Verify Python and Node.js:**
   ```bash
   python3 --version  # Should be 3.8+
   node --version     # Should be 18+
   npm --version
   ```

### Step 1: Setup Python Environment

```bash
# Navigate to project directory
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama

# Activate virtual environment (if it exists)
source venv/bin/activate

# If venv doesn't exist, create it:
# python3 -m venv venv
# source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

### Step 2: Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies (first time only)
npm install

# Go back to project root
cd ..
```

### Step 3: Configure Environment (if needed)

The `.env` file should already exist. If not, copy from example:

```bash
cp .env.example .env
```

### Step 4: Start the Backend Server

**Open Terminal 1:**

```bash
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama

# Activate virtual environment
source venv/bin/activate

# Start the SAT API server
python sat_api_server.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8001
INFO:     Application startup complete.
```

**Keep this terminal open!**

### Step 5: Start the Frontend

**Open Terminal 2 (new terminal window):**

```bash
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama/frontend

# Start the development server
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Keep this terminal open too!**

### Step 6: Open in Browser

Open your web browser and go to:
```
http://localhost:3000
```

---

## 🎯 First Time Usage

### 1. Check Connection Status

- Look at the top right of the UI
- Should show "Connected" (green) if Ollama is running
- If "Disconnected" (red), make sure `ollama serve` is running

### 2. Upload SAT Practice PDFs

1. Click the **"Upload SAT PDFs"** button in the sidebar
2. Select your SAT practice PDF files
3. Wait for processing (this may take a minute for large files)
4. You'll see a success message when done

### 3. Start Practicing!

**Practice Question Mode:**
- Select "Practice Question" tab
- Enter a question like: "If 2x + 5 = 15, what is x?"
- Click "Get Answer"
- Review the answer, explanation, and resources

**Concept Explanation Mode:**
- Select "Explain Concept" tab
- Enter a concept like: "quadratic equations"
- Click "Explain Concept"
- Get comprehensive explanations with videos and resources

---

## 🔧 Troubleshooting

### Problem: "Ollama is not connected"

**Solution:**
```bash
# Start Ollama in a separate terminal
ollama serve
```

### Problem: "Module not found" errors

**Solution:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Problem: Frontend won't start

**Solution:**
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Problem: Port already in use

**Solution:**
- Backend (8001): Kill the process or change port in `.env`
- Frontend (3000): Kill the process or change port in `vite.config.js`

### Problem: "Cannot find module" in frontend

**Solution:**
```bash
cd frontend
npm install
```

---

## 📋 Running Checklist

Before running, ensure:

- [ ] Ollama is installed and running (`ollama serve`)
- [ ] Python virtual environment is activated
- [ ] All Python dependencies installed (`pip install -r requirements.txt`)
- [ ] All Node.js dependencies installed (`cd frontend && npm install`)
- [ ] `.env` file exists (copy from `.env.example` if needed)
- [ ] Two terminal windows ready (one for backend, one for frontend)

---

## 🛑 Stopping the Application

1. **Stop Frontend:** Press `Ctrl+C` in Terminal 2
2. **Stop Backend:** Press `Ctrl+C` in Terminal 1
3. **Stop Ollama:** Press `Ctrl+C` in the Ollama terminal (if running separately)

Or if using the startup script:
- Press `Ctrl+C` in the script terminal (stops both servers)

---

## 📊 Verify Everything is Working

1. **Backend Health Check:**
   ```bash
   curl http://localhost:8001/api/health
   ```
   Should return JSON with `"status": "healthy"`

2. **Frontend:**
   - Open http://localhost:3000
   - Should see the SAT Practice Assistant interface
   - Connection status should be green

3. **Test a Question:**
   - Enter a simple question
   - Should get a response with resources

---

## 🎓 Next Steps

1. Upload your SAT practice PDFs
2. Try asking practice questions
3. Explore concept explanations
4. Check out the video explanations tab
5. Review web resources for additional learning

---

## 💡 Tips

- **Large PDFs:** May take 1-2 minutes to process
- **First Question:** May be slower as models load
- **Internet Required:** For web search and YouTube features
- **Best Results:** Upload official SAT practice tests for better context

---

**Need Help?** Check the `SAT_README.md` for detailed documentation.
