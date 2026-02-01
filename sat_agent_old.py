"""
SAT Practice Agent
Specialized agent for SAT practice with RAG, internet search, and YouTube integration
"""

import ollama
from typing import Optional, List, Dict, Any
from rag_engine import RAGEngine
from search_service import SearchService, YouTubeService
from config import (
    OLLAMA_BASE_URL,
    OLLAMA_MODEL,
    MAX_TOKENS,
    TEMPERATURE,
    TOP_P
)

SAT_AGENT_INSTRUCTIONS = """You are an expert SAT tutor. Provide concise, clear answers.
Focus on key concepts and brief explanations."""


class SATAgent:
    """SAT Practice Agent with RAG, search, and YouTube integration."""
    
    def __init__(
        self,
        model: str = OLLAMA_MODEL,
        use_rag: bool = True,
        use_search: bool = True,
        use_youtube: bool = True
    ):
        """
        Initialize SAT Agent.
        
        Args:
            model: Ollama model name
            use_rag: Whether to use RAG for knowledge base queries
            use_search: Whether to enable internet search
            use_youtube: Whether to enable YouTube search
        """
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
        use_search: bool = True,
        use_youtube: bool = True
    ) -> Dict[str, Any]:
        """
        Answer a SAT practice question with comprehensive support.
        
        Args:
            question: The practice question
            use_rag: Whether to use RAG
            use_search: Whether to search the internet
            use_youtube: Whether to search YouTube
            
        Returns:
            Dictionary with answer, explanation, sources, and resources
        """
        result = {
            'question': question,
            'answer': '',
            'explanation': '',
            'rag_sources': [],
            'search_results': [],
            'youtube_videos': [],
            'step_by_step': []
        }
        
        # Step 1: Retrieve from RAG if enabled
        rag_context = ""
        if use_rag and self.rag_engine:
            retrieved_docs = self.rag_engine.retrieve(question, n_results=5)
            result['rag_sources'] = [
                {
                    'content': doc['content'][:300] + '...' if len(doc['content']) > 300 else doc['content'],
                    'source': doc.get('metadata', {}).get('source', 'Unknown')
                }
                for doc in retrieved_docs
            ]
            
            if retrieved_docs:
                rag_context = "\n\nRelevant Information from Practice Materials:\n"
                for i, doc in enumerate(retrieved_docs, 1):
                    rag_context += f"\n[{i}] {doc['content']}\n"
                    if doc.get('metadata', {}).get('source'):
                        rag_context += f"Source: {doc['metadata']['source']}\n"
        
        # Step 2: Search internet if enabled
        if use_search and self.search_service:
            search_results = self.search_service.search_sat_related(question, max_results=3)
            result['search_results'] = search_results
            
            if search_results:
                rag_context += "\n\nAdditional Online Resources:\n"
                for i, res in enumerate(search_results, 1):
                    rag_context += f"\n[{i}] {res['title']}\n{res['snippet']}\nURL: {res['url']}\n"
        
        # Step 3: Search YouTube if enabled
        if use_youtube and self.youtube_service:
            youtube_videos = self.youtube_service.search_sat_explanations(question, max_results=3)
            result['youtube_videos'] = youtube_videos
        
        # Step 4: Generate comprehensive response
        prompt = f"""You are helping a student with a SAT practice question.

{rag_context}

Question: {question}

Please provide:
1. A clear answer or solution approach
2. A detailed step-by-step explanation
3. Key concepts tested
4. Tips for similar questions

Be encouraging and educational."""

        response = ollama.chat(
            model=self.model,
            messages=[
                {"role": "system", "content": SAT_AGENT_INSTRUCTIONS},
                {"role": "user", "content": prompt}
            ],
            options={
                "temperature": TEMPERATURE,
                "top_p": TOP_P,
                "num_predict": MAX_TOKENS
            }
        )
        
        result['answer'] = response['message']['content']
        result['explanation'] = response['message']['content']
        
        # Extract step-by-step if present
        if "Step" in result['explanation'] or "step" in result['explanation']:
            lines = result['explanation'].split('\n')
            steps = [line for line in lines if 'step' in line.lower() or line.strip().startswith(('1.', '2.', '3.', '4.', '5.'))]
            result['step_by_step'] = steps[:10]  # Limit to 10 steps
        
        return result
    
    def explain_concept(
        self,
        concept: str,
        use_rag: bool = True,
        use_search: bool = True,
        use_youtube: bool = True
    ) -> Dict[str, Any]:
        """
        Explain a SAT concept with resources.
        
        Args:
            concept: Concept to explain
            use_rag: Whether to use RAG
            use_search: Whether to search internet
            use_youtube: Whether to search YouTube
            
        Returns:
            Dictionary with explanation and resources
        """
        result = {
            'concept': concept,
            'explanation': '',
            'rag_sources': [],
            'search_results': [],
            'youtube_videos': []
        }
        
        # Get RAG context
        rag_context = ""
        if use_rag and self.rag_engine:
            retrieved_docs = self.rag_engine.retrieve(concept, n_results=5)
            result['rag_sources'] = [
                {
                    'content': doc['content'][:300] + '...' if len(doc['content']) > 300 else doc['content'],
                    'source': doc.get('metadata', {}).get('source', 'Unknown')
                }
                for doc in retrieved_docs
            ]
            
            if retrieved_docs:
                rag_context = "\n\nRelevant Information from Practice Materials:\n"
                for i, doc in enumerate(retrieved_docs, 1):
                    rag_context += f"\n[{i}] {doc['content']}\n"
        
        # Search internet
        if use_search and self.search_service:
            search_results = self.search_service.search_sat_related(concept, max_results=3)
            result['search_results'] = search_results
            
            if search_results:
                rag_context += "\n\nAdditional Online Resources:\n"
                for i, res in enumerate(search_results, 1):
                    rag_context += f"\n[{i}] {res['title']}\n{res['snippet']}\n"
        
        # Search YouTube
        if use_youtube and self.youtube_service:
            youtube_videos = self.youtube_service.search_sat_explanations(concept, max_results=3)
            result['youtube_videos'] = youtube_videos
        
        # Generate explanation
        prompt = f"""Explain the SAT concept: {concept}

{rag_context}

Provide a clear, comprehensive explanation suitable for SAT preparation."""
        
        response = ollama.chat(
            model=self.model,
            messages=[
                {"role": "system", "content": SAT_AGENT_INSTRUCTIONS},
                {"role": "user", "content": prompt}
            ],
            options={
                "temperature": TEMPERATURE,
                "top_p": TOP_P,
                "num_predict": MAX_TOKENS
            }
        )
        
        result['explanation'] = response['message']['content']
        
        return result
    
    def chat(self, message: str, use_rag: bool = True) -> str:
        """
        General chat with the SAT agent.
        
        Args:
            message: User message
            use_rag: Whether to use RAG
            
        Returns:
            Agent response
        """
        context = ""
        if use_rag and self.rag_engine:
            retrieved_docs = self.rag_engine.retrieve(message, n_results=3)
            if retrieved_docs:
                context = "\n\nRelevant Information:\n"
                for i, doc in enumerate(retrieved_docs, 1):
                    context += f"\n[{i}] {doc['content']}\n"
        
        prompt = f"{context}\n\nQuestion: {message}\n\nAnswer:" if context else message
        
        response = ollama.chat(
            model=self.model,
            messages=[
                {"role": "system", "content": SAT_AGENT_INSTRUCTIONS},
                {"role": "user", "content": prompt}
            ],
            options={
                "temperature": TEMPERATURE,
                "top_p": TOP_P,
                "num_predict": MAX_TOKENS
            }
        )
        
        return response['message']['content']
