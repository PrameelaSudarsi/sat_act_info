"""
SAT Practice Agent - Optimized for Speed
"""

import ollama
from typing import Optional, List, Dict, Any
from rag_engine import RAGEngine
from search_service import SearchService, YouTubeService

SAT_AGENT_INSTRUCTIONS = """You are an expert SAT tutor. Provide concise, clear answers.
Focus on key concepts and brief explanations."""

class SATAgent:
    """SAT Practice Agent with optimized performance."""
    
    def __init__(
        self,
        model: str = "llama3.2",
        use_rag: bool = False,  # Disable RAG for speed
        use_search: bool = False,
        use_youtube: bool = False
    ):
        self.model = model
        self.use_rag = use_rag
        self.use_search = use_search
        self.use_youtube = use_youtube
        
        self.rag_engine = RAGEngine() if use_rag else None
        self.search_service = SearchService() if use_search else None
        self.youtube_service = YouTubeService() if use_youtube else None
        
        self.conversation_history: List[Dict] = []
    
    def practice_question(
        self,
        question: str,
        use_rag: bool = True,
        use_search: bool = False,
        use_youtube: bool = False
    ) -> Dict[str, Any]:
        """Answer a SAT practice question quickly."""
        
        result = {
            'question': question,
            'answer': '',
            'explanation': '',
            'rag_sources': [],
            'search_results': [],
            'youtube_videos': [],
            'step_by_step': []
        }
        
        # Simple prompt - no RAG for speed
        prompt = f"Question: {question}\n\nProvide a brief SAT answer:"

        response = ollama.chat(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a SAT tutor. Give brief, direct answers."},
                {"role": "user", "content": prompt}
            ],
            options={
                "temperature": 0.1,
                "num_predict": 128,
                "num_ctx": 512
            }
        )
        
        result['answer'] = response['message']['content']
        result['explanation'] = response['message']['content']
        
        return result
    
    def chat(self, message: str, use_rag: bool = True) -> str:
        """Quick chat with the SAT agent."""
        
        context = ""
        if use_rag and self.rag_engine:
            retrieved_docs = self.rag_engine.retrieve(message, n_results=1)
            if retrieved_docs:
                context = f"Context: {retrieved_docs[0]['content'][:150]}\n\n"
        
        prompt = f"{context}Question: {message}"
        
        response = ollama.chat(
            model=self.model,
            messages=[
                {"role": "system", "content": SAT_AGENT_INSTRUCTIONS},
                {"role": "user", "content": prompt}
            ],
            options={
                "temperature": 0.3,
                "top_p": 0.8,
                "num_predict": 256,
                "num_ctx": 1024,
                "repeat_penalty": 1.1
            }
        )
        
        return response['message']['content']