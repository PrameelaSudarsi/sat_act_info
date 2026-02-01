"""
MCP Server for Ollama Agent with RAG
Provides Model Context Protocol interface for local Ollama agent
"""

import os
from typing import Optional, List, Dict, Any
from fastmcp import FastMCP
from dotenv import load_dotenv
from ollama_agent import OllamaAgent
from sat_agent import SATAgent
from rag_engine import RAGEngine
from search_service import SearchService, YouTubeService
from config import (
    OLLAMA_MODEL,
    KNOWLEDGE_BASE_NAME,
    DATA_DIR
)

# Load environment variables
load_dotenv()

# Initialize MCP server
mcp = FastMCP("Ollama Agent MCP Server")

# Initialize agents and services
agent = OllamaAgent(model=OLLAMA_MODEL, use_rag=True)
sat_agent = SATAgent(model=OLLAMA_MODEL, use_rag=True, use_search=True, use_youtube=True)
rag_engine = RAGEngine()
search_service = SearchService()
youtube_service = YouTubeService()


@mcp.tool()
def list_available_models() -> Dict[str, Any]:
    """
    List all available Ollama models on the local system.
    
    Returns:
        Dictionary containing list of available models
    """
    try:
        models = agent.get_available_models()
        return {
            'success': True,
            'models': models,
            'current_model': OLLAMA_MODEL,
            'count': len(models)
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }


@mcp.tool()
def chat_with_agent(message: str) -> Dict[str, Any]:
    """
    Chat with the Ollama agent.
    
    Args:
        message: User message/question
    
    Returns:
        Dictionary containing agent response
    """
    try:
        response = agent.chat(message)
        return {
            'success': True,
            'message': message,
            'response': response,
            'model': OLLAMA_MODEL
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'message': message
        }


@mcp.tool()
def query_knowledge_base(
    query: str,
    n_results: int = 5
) -> Dict[str, Any]:
    """
    Query the knowledge base using RAG.
    
    Args:
        query: Query text/question
        n_results: Number of results to return (default: 5)
    
    Returns:
        Dictionary containing response and retrieved documents
    """
    try:
        result = agent.query_with_rag(query, n_results=n_results)
        
        return {
            'success': True,
            'query': query,
            'response': result['response'],
            'retrieved_docs': [
                {
                    'content': doc['content'][:500] + '...' if len(doc['content']) > 500 else doc['content'],
                    'source': doc.get('metadata', {}).get('source', 'Unknown'),
                    'distance': doc.get('distance')
                }
                for doc in result['retrieved_docs']
            ],
            'doc_count': len(result['retrieved_docs'])
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'query': query
        }


@mcp.tool()
def get_knowledge_base_info() -> Dict[str, Any]:
    """
    Get information about the knowledge base.
    
    Returns:
        Dictionary containing knowledge base statistics
    """
    try:
        info = rag_engine.get_kb_info()
        return {
            'success': True,
            'knowledge_base': {
                'name': KNOWLEDGE_BASE_NAME,
                'total_chunks': info['total_chunks'],
                'total_sources': info['total_sources'],
                'sources': info['sources']
            }
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }


@mcp.tool()
def add_documents_to_kb(file_paths: List[str]) -> Dict[str, Any]:
    """
    Add documents to the knowledge base.
    
    Args:
        file_paths: List of file paths to add
    
    Returns:
        Dictionary with operation result
    """
    try:
        # Validate files exist
        valid_files = []
        for file_path in file_paths:
            full_path = os.path.join(DATA_DIR, file_path) if not os.path.isabs(file_path) else file_path
            if os.path.exists(full_path):
                valid_files.append(full_path)
            else:
                print(f"File not found: {full_path}")
        
        if not valid_files:
            return {
                'success': False,
                'error': 'No valid files found'
            }
        
        # Add to knowledge base
        rag_engine.add_documents_to_kb(valid_files)
        
        return {
            'success': True,
            'files_added': len(valid_files),
            'file_paths': valid_files
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }


@mcp.tool()
def change_model(model_name: str) -> Dict[str, Any]:
    """
    Change the Ollama model being used.
    
    Args:
        model_name: Name of the Ollama model to use
    
    Returns:
        Dictionary with operation result
    """
    try:
        global agent, sat_agent
        agent = OllamaAgent(model=model_name, use_rag=True)
        sat_agent = SATAgent(model=model_name, use_rag=True, use_search=True, use_youtube=True)
        return {
            'success': True,
            'model': model_name,
            'message': f'Model changed to {model_name}'
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'model': model_name
        }


@mcp.tool()
def practice_sat_question(question: str, use_rag: bool = True, use_search: bool = True, use_youtube: bool = True) -> Dict[str, Any]:
    """
    Answer a SAT practice question with comprehensive support.
    
    Args:
        question: The SAT practice question
        use_rag: Whether to use RAG from knowledge base
        use_search: Whether to search the internet
        use_youtube: Whether to search YouTube
    
    Returns:
        Dictionary with answer, explanation, and resources
    """
    try:
        result = sat_agent.practice_question(question, use_rag=use_rag, use_search=use_search, use_youtube=use_youtube)
        return {
            'success': True,
            **result
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'question': question
        }


@mcp.tool()
def explain_sat_concept(concept: str, use_rag: bool = True, use_search: bool = True, use_youtube: bool = True) -> Dict[str, Any]:
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
    try:
        result = sat_agent.explain_concept(concept, use_rag=use_rag, use_search=use_search, use_youtube=use_youtube)
        return {
            'success': True,
            **result
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'concept': concept
        }


@mcp.tool()
def search_internet(query: str, max_results: int = 5) -> Dict[str, Any]:
    """
    Search the internet for information.
    
    Args:
        query: Search query
        max_results: Maximum number of results
    
    Returns:
        Dictionary with search results
    """
    try:
        results = search_service.search(query, max_results=max_results)
        return {
            'success': True,
            'query': query,
            'results': results,
            'count': len(results)
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'query': query
        }


@mcp.tool()
def search_youtube(query: str, max_results: int = 5) -> Dict[str, Any]:
    """
    Search YouTube for videos.
    
    Args:
        query: Search query
        max_results: Maximum number of results
    
    Returns:
        Dictionary with video results
    """
    try:
        videos = youtube_service.search_videos(query, max_results=max_results)
        return {
            'success': True,
            'query': query,
            'videos': videos,
            'count': len(videos)
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'query': query
        }


def main():
    """Run the MCP server."""
    mcp.run(
        host="0.0.0.0",
        port=8000,
        stateless_http=True
    )


if __name__ == "__main__":
    main()
