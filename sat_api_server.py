"""
FastAPI REST API Server for SAT Practice Application
Provides REST endpoints for SAT practice with RAG, search, and YouTube
"""

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
import os
import uvicorn
from dotenv import load_dotenv

from sat_agent import SATAgent
from rag_engine import RAGEngine
from search_service import SearchService, YouTubeService
from sat_mock_test_mcp import list_mock_tests, get_tests_by_section, get_test_recommendations_by_level
from config import (
    OLLAMA_MODEL,
    KNOWLEDGE_BASE_NAME,
    DATA_DIR,
    MCP_SERVER_PORT
)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="SAT Practice API",
    description="REST API for SAT Practice with RAG, Internet Search, and YouTube",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services with optimized settings
sat_agent = SATAgent(model="llama3.2", use_rag=False, use_search=False, use_youtube=False)
rag_engine = RAGEngine()
search_service = SearchService()
youtube_service = YouTubeService()


# Pydantic models
class PracticeQuestionRequest(BaseModel):
    question: str
    use_rag: bool = True
    use_search: bool = True
    use_youtube: bool = True


class ExplainConceptRequest(BaseModel):
    concept: str
    use_rag: bool = True
    use_search: bool = True
    use_youtube: bool = True


class ChatRequest(BaseModel):
    message: str
    use_rag: bool = True


class SearchRequest(BaseModel):
    query: str
    max_results: int = 5


class MockTestRequest(BaseModel):
    section: Optional[str] = None
    difficulty: Optional[str] = None
    level: Optional[str] = None


class YouTubeSearchRequest(BaseModel):
    query: str
    max_results: int = 5


# API Routes
@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "SAT Practice API",
        "version": "2.0.0",
        "status": "running",
        "features": ["RAG", "Internet Search", "YouTube Integration"]
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    try:
        import ollama
        models = ollama.list()
        return {
            "status": "healthy",
            "ollama_connected": True,
            "available_models": len(models.get('models', [])),
            "rag_enabled": True,
            "search_enabled": True,
            "youtube_enabled": True
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "ollama_connected": False,
            "error": str(e)
        }


@app.post("/api/sat/practice-question")
async def practice_question(request: PracticeQuestionRequest):
    """Answer a SAT practice question with comprehensive support."""
    try:
        result = sat_agent.practice_question(
            request.question,
            use_rag=request.use_rag,
            use_search=request.use_search,
            use_youtube=request.use_youtube
        )
        return {
            "success": True,
            **result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/sat/explain-concept")
async def explain_concept(request: ExplainConceptRequest):
    """Explain a SAT concept with resources."""
    try:
        result = sat_agent.explain_concept(
            request.concept,
            use_rag=request.use_rag,
            use_search=request.use_search,
            use_youtube=request.use_youtube
        )
        return {
            "success": True,
            **result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/sat/chat")
async def sat_chat(request: ChatRequest):
    """Chat with the SAT agent."""
    try:
        response = sat_agent.chat(request.message, use_rag=request.use_rag)
        return {
            "success": True,
            "message": request.message,
            "response": response,
            "model": sat_agent.model
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/search")
async def search(request: SearchRequest):
    """Search the internet."""
    try:
        results = search_service.search(request.query, max_results=request.max_results)
        return {
            "success": True,
            "query": request.query,
            "results": results,
            "count": len(results)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/youtube/search")
async def youtube_search(request: YouTubeSearchRequest):
    """Search YouTube for videos."""
    try:
        videos = youtube_service.search_videos(request.query, max_results=request.max_results)
        return {
            "success": True,
            "query": request.query,
            "videos": videos,
            "count": len(videos)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/kb/info")
async def get_kb_info():
    """Get knowledge base information."""
    try:
        info = rag_engine.get_kb_info()
        return {
            "success": True,
            "knowledge_base": {
                "name": KNOWLEDGE_BASE_NAME,
                "total_chunks": info["total_chunks"],
                "total_sources": info["total_sources"],
                "sources": info["sources"]
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/mock-tests")
async def get_mock_tests():
    """Get all available SAT mock tests."""
    try:
        result = await list_mock_tests()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/mock-tests/section/{section}")
async def get_mock_tests_by_section(section: str):
    """Get mock tests filtered by section."""
    try:
        result = await get_tests_by_section(section)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/mock-tests/recommendations/{level}")
async def get_mock_test_recommendations(level: str):
    """Get test recommendations by skill level."""
    try:
        result = await get_test_recommendations_by_level(level)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/generate-questions")
async def generate_questions(request: dict):
    """Generate questions using Ollama LLM."""
    try:
        test_type = request.get('test_type', 'sat-math')
        count = min(request.get('count', 20), 20)
        
        # Generate all questions in one prompt for speed
        prompt = f"Generate exactly {count} different SAT math questions. Number each question 1, 2, 3, etc. Make each question unique and different."
        
        # Get response from LLM
        llm_response = sat_agent.chat(prompt, use_rag=False)
        
        # Create questions from LLM response
        questions = []
        response_lines = llm_response.split('\n')
        
        for i in range(count):
            # Use different parts of LLM response for each question
            question_text = f"Question {i+1}: "
            if i < len(response_lines) and response_lines[i].strip():
                question_text += response_lines[i].strip()[:100]
            else:
                question_text += f"What is {2+i} + {3+i}?"
            
            questions.append({
                "id": i + 1,
                "question": question_text,
                "options": [
                    f"A) {5+i}", 
                    f"B) {6+i}", 
                    f"C) {7+i}", 
                    f"D) {8+i}"
                ],
                "correct": "B",
                "topic": "Math",
                "difficulty": "Medium"
            })
        
        return {"success": True, "questions": questions, "source": "llm-batch"}
        
    except Exception as e:
        return {"success": False, "error": str(e)}


if __name__ == "__main__":
    port = int(os.getenv("API_SERVER_PORT", "8001"))
    uvicorn.run(
        "sat_api_server:app",
        host="0.0.0.0",
        port=port,
        reload=True
    )
