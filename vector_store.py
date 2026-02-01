"""
Vector Store Management for RAG
Uses ChromaDB for local vector storage
"""

import os
import chromadb
from chromadb.config import Settings
from typing import List, Dict, Optional
from config import CHROMA_PERSIST_DIR, KNOWLEDGE_BASE_NAME


class VectorStore:
    """Manages vector store for RAG."""
    
    def __init__(self, collection_name: str = None):
        """
        Initialize vector store.
        
        Args:
            collection_name: Name of the collection (default: from config)
        """
        self.collection_name = collection_name or KNOWLEDGE_BASE_NAME
        self.persist_dir = CHROMA_PERSIST_DIR
        
        # Create directory if it doesn't exist
        os.makedirs(self.persist_dir, exist_ok=True)
        
        # Initialize ChromaDB client
        self.client = chromadb.PersistentClient(
            path=self.persist_dir,
            settings=Settings(
                anonymized_telemetry=False,
                allow_reset=True
            )
        )
        
        # Get or create collection
        self.collection = self.client.get_or_create_collection(
            name=self.collection_name,
            metadata={"hnsw:space": "cosine"}
        )
    
    def add_documents(
        self,
        documents: List[str],
        metadatas: Optional[List[Dict]] = None,
        ids: Optional[List[str]] = None
    ):
        """
        Add documents to the vector store.
        
        Args:
            documents: List of document texts
            metadatas: Optional list of metadata dicts
            ids: Optional list of document IDs
        """
        if not documents:
            return
        
        # Generate IDs if not provided
        if not ids:
            ids = [f"doc_{i}" for i in range(len(documents))]
        
        # Add to collection
        self.collection.add(
            documents=documents,
            metadatas=metadatas or [{}] * len(documents),
            ids=ids
        )
    
    def query(
        self,
        query_texts: List[str],
        n_results: int = 5,
        where: Optional[Dict] = None
    ) -> Dict:
        """
        Query the vector store.
        
        Args:
            query_texts: List of query texts
            n_results: Number of results to return
            where: Optional metadata filter
            
        Returns:
            Dictionary with results
        """
        results = self.collection.query(
            query_texts=query_texts,
            n_results=n_results,
            where=where
        )
        
        return results
    
    def get_all(self) -> List[Dict]:
        """Get all documents from the collection."""
        results = self.collection.get()
        
        documents = []
        for i in range(len(results.get('ids', []))):
            documents.append({
                'id': results['ids'][i],
                'document': results['documents'][i],
                'metadata': results['metadatas'][i] if results.get('metadatas') else {}
            })
        
        return documents
    
    def delete_collection(self):
        """Delete the collection."""
        self.client.delete_collection(name=self.collection_name)
    
    def reset(self):
        """Reset the collection (delete and recreate)."""
        try:
            self.client.delete_collection(name=self.collection_name)
        except:
            pass
        
        self.collection = self.client.get_or_create_collection(
            name=self.collection_name,
            metadata={"hnsw:space": "cosine"}
        )
    
    def count(self) -> int:
        """Get number of documents in collection."""
        return self.collection.count()
