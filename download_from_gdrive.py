"""
Download SAT Practice Files from Google Drive
Supports both individual files and folders
"""

import os
import sys
import subprocess
from pathlib import Path

# Try to import gdown, install if not available
try:
    import gdown
except ImportError:
    print("Installing gdown...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "gdown", "-q"])
    import gdown


def download_file_from_gdrive(file_id_or_url, output_path):
    """
    Download a file from Google Drive.
    
    Args:
        file_id_or_url: Google Drive file ID or shareable link
        output_path: Where to save the file
    """
    try:
        # If it's a full URL, extract the file ID
        if "drive.google.com" in file_id_or_url:
            if "/file/d/" in file_id_or_url:
                file_id = file_id_or_url.split("/file/d/")[1].split("/")[0]
            elif "id=" in file_id_or_url:
                file_id = file_id_or_url.split("id=")[1].split("&")[0]
            else:
                file_id = file_id_or_url
        else:
            file_id = file_id_or_url
        
        # Construct download URL
        url = f"https://drive.google.com/uc?id={file_id}"
        
        print(f"📥 Downloading file: {output_path.name}...")
        gdown.download(url, str(output_path), quiet=False)
        
        if output_path.exists():
            print(f"✅ Downloaded: {output_path.name} ({output_path.stat().st_size / 1024 / 1024:.2f} MB)")
            return True
        else:
            print(f"❌ Failed to download: {output_path.name}")
            return False
            
    except Exception as e:
        print(f"❌ Error downloading {output_path.name}: {e}")
        return False


def download_folder_from_gdrive(folder_id_or_url, output_dir):
    """
    Download a folder from Google Drive.
    
    Args:
        folder_id_or_url: Google Drive folder ID or shareable link
        output_dir: Where to save the folder contents
    """
    try:
        # If it's a full URL, extract the folder ID
        if "drive.google.com" in folder_id_or_url:
            if "/folders/" in folder_id_or_url:
                folder_id = folder_id_or_url.split("/folders/")[1].split("?")[0]
            elif "id=" in folder_id_or_url:
                folder_id = folder_id_or_url.split("id=")[1].split("&")[0]
            else:
                folder_id = folder_id_or_url
        else:
            folder_id = folder_id_or_url
        
        # Construct download URL
        url = f"https://drive.google.com/drive/folders/{folder_id}"
        
        print(f"📥 Downloading folder contents...")
        gdown.download_folder(url, output=str(output_dir), quiet=False, use_cookies=False)
        
        # Count downloaded files
        downloaded_files = list(output_dir.glob("*"))
        pdf_files = [f for f in downloaded_files if f.suffix.lower() == '.pdf']
        
        print(f"✅ Downloaded {len(downloaded_files)} files ({len(pdf_files)} PDFs)")
        return True
        
    except Exception as e:
        print(f"❌ Error downloading folder: {e}")
        print("💡 Tip: Make sure the folder is shared publicly or use individual file links")
        return False


def main():
    """Main function to download SAT files."""
    
    # Get project directory
    project_dir = Path(__file__).parent
    data_dir = project_dir / "data"
    data_dir.mkdir(exist_ok=True)
    
    print("=" * 60)
    print("📚 SAT Practice Files Downloader")
    print("=" * 60)
    print()
    
    # Check if user provided links as arguments
    if len(sys.argv) > 1:
        links = sys.argv[1:]
    else:
        print("Enter Google Drive links (one per line, or 'done' to finish):")
        print("Examples:")
        print("  - File: https://drive.google.com/file/d/FILE_ID/view")
        print("  - Folder: https://drive.google.com/drive/folders/FOLDER_ID")
        print()
        
        links = []
        while True:
            link = input("Google Drive link (or 'done'): ").strip()
            if link.lower() == 'done':
                break
            if link:
                links.append(link)
    
    if not links:
        print("❌ No links provided. Exiting.")
        return
    
    print(f"\n📥 Downloading {len(links)} item(s) to: {data_dir}")
    print()
    
    downloaded_count = 0
    
    for i, link in enumerate(links, 1):
        print(f"[{i}/{len(links)}] Processing: {link}")
        
        # Determine if it's a folder or file
        is_folder = "/folders/" in link or "folder" in link.lower()
        
        if is_folder:
            # Download folder
            success = download_folder_from_gdrive(link, data_dir)
        else:
            # Download file - try to get filename from URL or use generic name
            filename = f"sat_file_{i}.pdf"
            if "/file/d/" in link:
                # Try to extract a better filename
                file_id = link.split("/file/d/")[1].split("/")[0]
                filename = f"sat_document_{file_id[:8]}.pdf"
            
            output_path = data_dir / filename
            success = download_file_from_gdrive(link, output_path)
        
        if success:
            downloaded_count += 1
        
        print()
    
    # Summary
    print("=" * 60)
    print("📊 Download Summary")
    print("=" * 60)
    
    all_files = list(data_dir.glob("*"))
    pdf_files = [f for f in all_files if f.suffix.lower() == '.pdf']
    total_size = sum(f.stat().st_size for f in all_files) / 1024 / 1024
    
    print(f"✅ Successfully downloaded: {downloaded_count}/{len(links)} items")
    print(f"📁 Total files in data folder: {len(all_files)}")
    print(f"📄 PDF files: {len(pdf_files)}")
    print(f"💾 Total size: {total_size:.2f} MB")
    print()
    
    if pdf_files:
        print("📚 Downloaded PDF files:")
        for pdf in pdf_files:
            size_mb = pdf.stat().st_size / 1024 / 1024
            print(f"  - {pdf.name} ({size_mb:.2f} MB)")
        print()
    
    print("=" * 60)
    print("✅ Next Steps:")
    print("=" * 60)
    print("1. Start the application: ./start_sat_app.sh")
    print("2. Open http://localhost:3000")
    print("3. Click 'Upload SAT PDFs' in the sidebar")
    print("4. Select the downloaded files (or they may auto-process)")
    print("5. Start asking SAT questions!")
    print()


if __name__ == "__main__":
    main()
