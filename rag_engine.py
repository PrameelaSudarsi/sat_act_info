"""
RAG Engine for Retrieval Augmented Generation
Handles document processing, chunking, and retrieval
"""

import os
from typing import List, Dict, Optional
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    Docx2txtLoader,
    UnstructuredMarkdownLoader
)
from vector_store import VectorStore
from config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    DATA_DIR,
    OLLAMA_EMBEDDING_MODEL,
    OLLAMA_BASE_URL
)
import ollama


class RAGEngine:
    """RAG Engine for document processing and retrieval."""
    
    def __init__(self, collection_name: str = None):
        """
        Initialize RAG engine.
        
        Args:
            collection_name: Name of the knowledge base collection
        """
        self.vector_store = VectorStore(collection_name)
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
            length_function=len
        )
        self.embedding_model = OLLAMA_EMBEDDING_MODEL
    
    def load_document(self, file_path: str) -> List[str]:
        """
        Load a document and return its text chunks.
        
        Args:
            file_path: Path to the document file
            
        Returns:
            List of text chunks
        """
        file_ext = os.path.splitext(file_path)[1].lower()
        
        try:
            if file_ext == '.pdf':
                loader = PyPDFLoader(file_path)
            elif file_ext == '.txt':
                loader = TextLoader(file_path)
            elif file_ext in ['.doc', '.docx']:
                loader = Docx2txtLoader(file_path)
            elif file_ext == '.md':
                loader = UnstructuredMarkdownLoader(file_path)
            else:
                # Try as text file
                loader = TextLoader(file_path)
            
            documents = loader.load()
            texts = [doc.page_content for doc in documents]
            
            # Split into chunks
            chunks = self.text_splitter.split_text('\n\n'.join(texts))
            
            return chunks
            
        except Exception as e:
            print(f"Error loading document {file_path}: {e}")
            return []
    
    def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Get embeddings for texts using Ollama.
        
        Args:
            texts: List of texts to embed
            
        Returns:
            List of embedding vectors
        """
        embeddings = []
        
        for text in texts:
            try:
                response = ollama.embeddings(
                    model=self.embedding_model,
                    prompt=text
                )
                embeddings.append(response['embedding'])
            except Exception as e:
                print(f"Error getting embedding: {e}")
                # Return zero vector as fallback
                embeddings.append([0.0] * 768)
        
        return embeddings
    
    def add_documents_to_kb(
        self,
        file_paths: List[str],
        metadatas: Optional[List[Dict]] = None
    ):
        """
        Add documents to knowledge base.
        
        Args:
            file_paths: List of file paths to add
            metadatas: Optional metadata for each document
        """
        all_chunks = []
        all_metadatas = []
        all_ids = []
        
        for i, file_path in enumerate(file_paths):
            if not os.path.exists(file_path):
                print(f"File not found: {file_path}")
                continue
            
            chunks = self.load_document(file_path)
            
            for j, chunk in enumerate(chunks):
                chunk_id = f"{os.path.basename(file_path)}_{j}"
                all_chunks.append(chunk)
                all_ids.append(chunk_id)
                
                metadata = {
                    'source': file_path,
                    'chunk_index': j,
                    'file_name': os.path.basename(file_path)
                }
                if metadatas and i < len(metadatas):
                    metadata.update(metadatas[i])
                all_metadatas.append(metadata)
        
        # Get embeddings
        print(f"Generating embeddings for {len(all_chunks)} chunks...")
        embeddings = self.get_embeddings(all_chunks)
        
        # Add to vector store
        self.vector_store.collection.add(
            documents=all_chunks,
            embeddings=embeddings,
            metadatas=all_metadatas,
            ids=all_ids
        )
        
        print(f"Added {len(all_chunks)} chunks to knowledge base")
    
    def retrieve(
        self,
        query: str,
        n_results: int = 5,
        filter_metadata: Optional[Dict] = None
    ) -> List[Dict]:
        """
        Retrieve relevant documents for a query.
        
        Args:
            query: Query text
            n_results: Number of results to return
            filter_metadata: Optional metadata filter
            
        Returns:
            List of relevant document chunks with metadata
        """
        # Get query embedding
        query_embedding = self.get_embeddings([query])[0]
        
        # Query vector store
        results = self.vector_store.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            where=filter_metadata
        )
        
        # Format results
        retrieved_docs = []
        if results['documents'] and len(results['documents'][0]) > 0:
            for i in range(len(results['documents'][0])):
                retrieved_docs.append({
                    'content': results['documents'][0][i],
                    'metadata': results['metadatas'][0][i] if results.get('metadatas') else {},
                    'distance': results['distances'][0][i] if results.get('distances') else None
                })
        
        return retrieved_docs
    
    def get_kb_info(self) -> Dict:
        """Get information about the knowledge base."""
        count = self.vector_store.count()
        all_docs = self.vector_store.get_all()
        
        sources = set()
        for doc in all_docs:
            if 'source' in doc.get('metadata', {}):
                sources.add(doc['metadata']['source'])
        
        return {
            'total_chunks': count,
            'total_sources': len(sources),
            'sources': list(sources)
        }
