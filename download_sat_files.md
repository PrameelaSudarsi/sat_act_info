# 📥 How to Download SAT Files from Google Drive

## Step 1: Download Files from Google Drive

### Option A: Download Individual Files
1. Open the Google Drive link: `drive.google.com`
2. Navigate to the SAT practice files folder
3. Right-click on each PDF file
4. Select "Download"
5. Files will download to your Downloads folder

### Option B: Download Entire Folder
1. Open the Google Drive folder
2. Click the folder name at the top
3. Click the download icon (or right-click → Download)
4. Google Drive will zip the folder
5. Extract the zip file after download

### Option C: Using Google Drive Desktop App
1. Install Google Drive for Desktop
2. Sync the folder to your computer
3. Files will be available locally

## Step 2: Move Files to the Application

### Quick Method (Using Terminal)

```bash
# Navigate to project directory
cd /Users/sreenivasaraosudarsi/cursor_ai_ollama

# Create data directory if it doesn't exist
mkdir -p data

# Copy files from Downloads to data folder
# Replace ~/Downloads/SAT*.pdf with your actual file paths
cp ~/Downloads/SAT*.pdf ./data/
# OR if you downloaded a folder:
cp -r ~/Downloads/SAT_Practice_Files/* ./data/
```

### Manual Method
1. Open Finder
2. Navigate to: `/Users/sreenivasaraosudarsi/cursor_ai_ollama/data`
3. Copy your downloaded SAT PDF files into this folder

## Step 3: Upload via UI (Recommended)

1. Start the application (both backend and frontend)
2. Open http://localhost:3000
3. Click "Upload SAT PDFs" button in the sidebar
4. Select all your downloaded PDF files
5. Wait for processing (may take 1-2 minutes for large files)

## Step 4: Verify Files Are Added

After uploading, you should see:
- Total chunks count increases
- Your file names appear in the "Your Practice Materials" list
- You can now ask questions about the content!

## 📋 Supported File Formats

- PDF (`.pdf`) - Recommended
- Text (`.txt`)
- Word Documents (`.doc`, `.docx`)
- Markdown (`.md`)

## 🔧 Troubleshooting

### Files Not Uploading
- Check file size (very large files may take time)
- Ensure files are in supported formats
- Check browser console for errors

### Processing Takes Too Long
- Large PDFs (100+ pages) may take 2-5 minutes
- Check backend terminal for progress
- Be patient - embedding generation takes time

### Files Not Appearing
- Refresh the page
- Check backend logs for errors
- Verify files are valid PDFs
