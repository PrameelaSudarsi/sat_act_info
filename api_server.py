"""
FastAPI REST API Server for Ollama Agent
Provides REST endpoints for React frontend
"""

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
import os
import uvicorn
from dotenv import load_dotenv

from ollama_agent import OllamaAgent
from rag_engine import RAGEngine
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
    title="Ollama Agent API",
    description="REST API for Ollama Agent with RAG",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize agent and RAG engine
agent = OllamaAgent(model=OLLAMA_MODEL, use_rag=True)
rag_engine = RAGEngine()


# Pydantic models
class ChatRequest(BaseModel):
    message: str
    use_rag: bool = True


class QueryRequest(BaseModel):
    query: str
    n_results: int = 5


class ModelChangeRequest(BaseModel):
    model_name: str


# API Routes
@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Ollama Agent API",
        "version": "1.0.0",
        "status": "running"
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
            "available_models": len(models.get('models', []))
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "ollama_connected": False,
            "error": str(e)
        }


@app.get("/api/models")
async def get_models():
    """Get list of available Ollama models."""
    try:
        models = agent.get_available_models()
        return {
            "success": True,
            "models": models,
            "current_model": OLLAMA_MODEL,
            "count": len(models)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Chat with the agent."""
    try:
        if request.use_rag:
            result = agent.query_with_rag(request.message, n_results=5)
            return {
                "success": True,
                "message": request.message,
                "response": result["response"],
                "retrieved_docs": [
                    {
                        "content": doc["content"][:300] + "..." if len(doc["content"]) > 300 else doc["content"],
                        "source": doc.get("metadata", {}).get("source", "Unknown"),
                        "distance": doc.get("distance")
                    }
                    for doc in result.get("retrieved_docs", [])
                ],
                "model": agent.model
            }
        else:
            response = agent.chat(request.message)
            return {
                "success": True,
                "message": request.message,
                "response": response,
                "model": agent.model
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/query")
async def query_kb(request: QueryRequest):
    """Query the knowledge base using RAG."""
    try:
        result = agent.query_with_rag(request.query, n_results=request.n_results)
        
        return {
            "success": True,
            "query": request.query,
            "response": result["response"],
            "retrieved_docs": [
                {
                    "content": doc["content"][:500] + "..." if len(doc["content"]) > 500 else doc["content"],
                    "source": doc.get("metadata", {}).get("source", "Unknown"),
                    "distance": doc.get("distance")
                }
                for doc in result.get("retrieved_docs", [])
            ],
            "doc_count": len(result.get("retrieved_docs", []))
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


@app.post("/api/kb/add")
async def add_documents(files: List[UploadFile] = File(...)):
    """Add documents to knowledge base."""
    try:
        # Ensure data directory exists
        os.makedirs(DATA_DIR, exist_ok=True)
        
        saved_files = []
        for file in files:
            file_path = os.path.join(DATA_DIR, file.filename)
            with open(file_path, "wb") as f:
                content = await file.read()
                f.write(content)
            saved_files.append(file_path)
        
        # Add to knowledge base
        rag_engine.add_documents_to_kb(saved_files)
        
        return {
            "success": True,
            "files_added": len(saved_files),
            "file_names": [os.path.basename(f) for f in saved_files]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/model/change")
async def change_model(request: ModelChangeRequest):
    """Change the Ollama model."""
    try:
        global agent
        agent = OllamaAgent(model=request.model_name, use_rag=True)
        return {
            "success": True,
            "model": request.model_name,
            "message": f"Model changed to {request.model_name}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



# Import the new generator
from gemini_generator import GeminiSATGenerator

# Initialize the generator
gemini_generator = GeminiSATGenerator()

@app.post("/api/generate-test")
async def generate_test(request: dict):
    """Generate a dynamic practice test using Gemini."""
    try:
        test_type = request.get("testId", "sat-math")
        count = request.get("questionCount", 5)
        
        # Call the generator
        questions = await gemini_generator.generate_questions(test_type, count)
        
        return {
            "success": True,
            "test_type": test_type,
            "count": len(questions),
            "questions": questions
        }
    except Exception as e:
        print(f"Error generating test: {e}")
        # Return fallback error structure
        return {
            "success": False,
            "error": str(e),
            "questions": [] 
        }

if __name__ == "__main__":
    port = int(os.getenv("API_SERVER_PORT", "8001"))
    print(f"🚀 Starting API Server on port {port}...")
    uvicorn.run(
        "api_server:app",
        host="0.0.0.0",
        port=port,
        reload=True
    )
