# 📥 Download SAT Files from Google Drive

## Quick Start

### Method 1: Interactive Script (Easiest)

```bash
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama
./download_sat_files.sh
```

Then paste your Google Drive links when prompted.

### Method 2: Direct Command

```bash
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama
source venv/bin/activate
python download_from_gdrive.py "https://drive.google.com/file/d/YOUR_FILE_ID/view"
```

### Method 3: Multiple Files at Once

```bash
./download_sat_files.sh \
  "https://drive.google.com/file/d/FILE_ID_1/view" \
  "https://drive.google.com/file/d/FILE_ID_2/view" \
  "https://drive.google.com/drive/folders/FOLDER_ID"
```

## 📋 How to Get Google Drive Links

### For Individual Files:
1. Open Google Drive
2. Right-click on the file
3. Click "Get link" or "Share"
4. Make sure it's set to "Anyone with the link"
5. Copy the link

### For Folders:
1. Open Google Drive
2. Right-click on the folder
3. Click "Get link" or "Share"
4. Make sure it's set to "Anyone with the link"
5. Copy the link

## 🔗 Link Formats Supported

The script supports these Google Drive link formats:

✅ **File links:**
- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/file/d/FILE_ID/edit`
- `https://drive.google.com/open?id=FILE_ID`
- Just the `FILE_ID` (if you have it)

✅ **Folder links:**
- `https://drive.google.com/drive/folders/FOLDER_ID`
- `https://drive.google.com/open?id=FOLDER_ID`

## 📁 Where Files Are Saved

Files are automatically saved to:
```
/Users/sreenivasaraosudarsi/cursor_ai_ollama/data/
```

## 🚀 After Downloading

1. **Start the application:**
   ```bash
   ./start_sat_app.sh
   ```

2. **Open the UI:**
   - Go to http://localhost:3000

3. **Upload files (if needed):**
   - Click "Upload SAT PDFs" in the sidebar
   - Select the downloaded files
   - Wait for processing

4. **Start practicing!**
   - Ask questions about the SAT content
   - Get explanations with step-by-step solutions

## 🔧 Troubleshooting

### Error: "Permission denied"
**Solution:** Make sure the Google Drive file/folder is shared publicly:
1. Right-click → Share
2. Change to "Anyone with the link"
3. Copy the link again

### Error: "File not found"
**Solution:** 
- Verify the link is correct
- Make sure the file is shared publicly
- Try using the file ID directly

### Error: "gdown not found"
**Solution:**
```bash
source venv/bin/activate
pip install gdown
```

### Large Files Taking Time
**Solution:** 
- Large PDFs (100+ MB) may take several minutes
- Be patient, the script will show progress
- Check your internet connection

## 💡 Tips

1. **Download folders instead of individual files** - Faster for multiple files
2. **Check file sizes** - Very large files (>500MB) may take time
3. **Verify downloads** - Check the `data/` folder after downloading
4. **Use the UI upload** - After downloading, you can also upload via the web UI

## 📊 Example Workflow

```bash
# 1. Download files
./download_sat_files.sh "https://drive.google.com/drive/folders/YOUR_FOLDER_ID"

# 2. Check what was downloaded
ls -lh data/

# 3. Start the app
./start_sat_app.sh

# 4. Open browser
# http://localhost:3000

# 5. Upload and start practicing!
```

## 🎯 Quick Reference

| Command | Description |
|---------|-------------|
| `./download_sat_files.sh` | Interactive download |
| `python download_from_gdrive.py LINK` | Direct download |
| `ls -lh data/` | Check downloaded files |
| `./start_sat_app.sh` | Start the application |

---

**Need help?** Share your Google Drive link and I can help you download it!
