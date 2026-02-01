"""
Ollama Agent with RAG Support
Main agent implementation using local Ollama models
"""

import ollama
from typing import Optional, List, Dict, Any
from rag_engine import RAGEngine
from config import (
    OLLAMA_BASE_URL,
    OLLAMA_MODEL,
    AGENT_INSTRUCTIONS,
    MAX_TOKENS,
    TEMPERATURE,
    TOP_P
)


class OllamaAgent:
    """Agent using Ollama models with RAG capabilities."""
    
    def __init__(
        self,
        model: str = OLLAMA_MODEL,
        use_rag: bool = True,
        knowledge_base_name: str = None
    ):
        """
        Initialize Ollama Agent.
        
        Args:
            model: Ollama model name
            use_rag: Whether to use RAG for knowledge base queries
            knowledge_base_name: Name of the knowledge base collection
        """
        self.model = model
        self.use_rag = use_rag
        self.rag_engine = RAGEngine(knowledge_base_name) if use_rag else None
        self.conversation_history: List[Dict] = []
    
    def chat(
        self,
        message: str,
        context: Optional[str] = None,
        stream: bool = False
    ) -> str:
        """
        Chat with the agent.
        
        Args:
            message: User message
            context: Optional context to include
            stream: Whether to stream the response
            
        Returns:
            Agent response
        """
        # Build prompt
        prompt = self._build_prompt(message, context)
        
        # Get response from Ollama with optimized settings
        response = ollama.chat(
            model=self.model,
            messages=[
                {"role": "system", "content": AGENT_INSTRUCTIONS},
                {"role": "user", "content": prompt}
            ],
            options={
                "temperature": 0.3,
                "top_p": 0.8,
                "num_predict": 512,
                "num_ctx": 2048,
                "repeat_penalty": 1.1
            },
            stream=stream
        )
        
        if stream:
            # Handle streaming response
            full_response = ""
            for chunk in response:
                if 'message' in chunk and 'content' in chunk['message']:
                    content = chunk['message']['content']
                    full_response += content
                    print(content, end='', flush=True)
            print()  # New line after streaming
            return full_response
        else:
            return response['message']['content']
    
    def query_with_rag(
        self,
        query: str,
        n_results: int = 5,
        include_context: bool = True
    ) -> Dict[str, Any]:
        """
        Query with RAG (Retrieval Augmented Generation).
        
        Args:
            query: Query text
            n_results: Number of retrieved documents
            include_context: Whether to include context in response
            
        Returns:
            Dictionary with response and retrieved documents
        """
        if not self.use_rag or not self.rag_engine:
            return {
                "response": "RAG is not enabled",
                "retrieved_docs": []
            }
        
        # Retrieve relevant documents
        retrieved_docs = self.rag_engine.retrieve(query, n_results=n_results)
        
        # Build context from retrieved documents
        context = ""
        if retrieved_docs and include_context:
            context = "\n\nRelevant Information:\n"
            for i, doc in enumerate(retrieved_docs, 1):
                context += f"\n[{i}] {doc['content']}\n"
                if doc.get('metadata', {}).get('source'):
                    context += f"Source: {doc['metadata']['source']}\n"
        
        # Generate response with context
        response = self.chat(query, context=context)
        
        return {
            "response": response,
            "retrieved_docs": retrieved_docs,
            "query": query
        }
    
    def _build_prompt(self, message: str, context: Optional[str] = None) -> str:
        """Build the prompt with optional context."""
        prompt = message
        
        if context:
            prompt = f"{context}\n\nQuestion: {message}\n\nAnswer:"
        
        return prompt
    
    def add_to_history(self, user_message: str, agent_response: str):
        """Add conversation to history."""
        self.conversation_history.append({
            "user": user_message,
            "agent": agent_response
        })
    
    def clear_history(self):
        """Clear conversation history."""
        self.conversation_history = []
    
    def get_available_models(self) -> List[str]:
        """Get list of available Ollama models."""
        try:
            models = ollama.list()
            return [model['name'] for model in models.get('models', [])]
        except Exception as e:
            print(f"Error getting models: {e}")
            return []
