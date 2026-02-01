"""
Knowledge Base Setup Script
Creates and populates the knowledge base from documents
"""

import os
from pathlib import Path
from rag_engine import RAGEngine
from config import DATA_DIR, KNOWLEDGE_BASE_NAME


def setup_knowledge_base():
    """Set up the knowledge base from documents in data directory."""
    
    # Create data directory if it doesn't exist
    os.makedirs(DATA_DIR, exist_ok=True)
    
    # Initialize RAG engine
    print(f"Initializing knowledge base: {KNOWLEDGE_BASE_NAME}")
    rag_engine = RAGEngine()
    
    # Find all documents
    data_path = Path(DATA_DIR)
    supported_extensions = ['.pdf', '.txt', '.md', '.doc', '.docx']
    
    files = []
    for ext in supported_extensions:
        files.extend(list(data_path.glob(f"*{ext}")))
    
    if not files:
        print(f"\n⚠️  No documents found in {DATA_DIR}")
        print("Supported formats: PDF, TXT, MD, DOC, DOCX")
        print(f"\nAdd documents to {DATA_DIR} and run this script again.")
        return
    
    print(f"\nFound {len(files)} document(s):")
    for file in files:
        print(f"  - {file.name}")
    
    # Add documents to knowledge base
    print("\nAdding documents to knowledge base...")
    file_paths = [str(f) for f in files]
    rag_engine.add_documents_to_kb(file_paths)
    
    # Get knowledge base info
    info = rag_engine.get_kb_info()
    print(f"\n✅ Knowledge base created successfully!")
    print(f"Total chunks: {info['total_chunks']}")
    print(f"Total sources: {info['total_sources']}")
    print(f"\nSources:")
    for source in info['sources']:
        print(f"  - {os.path.basename(source)}")


def main():
    """Main function."""
    print("=" * 60)
    print("Ollama Knowledge Base Setup")
    print("=" * 60)
    print()
    
    try:
        setup_knowledge_base()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
