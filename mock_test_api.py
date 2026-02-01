from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import asyncio
import logging
from mock_test_mcp_client import mcp_client

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Mock Test API with MCP", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    test_type: str
    count: Optional[int] = 10
    difficulty: Optional[str] = "Mixed"
    topics: Optional[List[str]] = None
    section: Optional[str] = None
    practice_test: Optional[int] = 1

class QuestionResponse(BaseModel):
    questions: List[dict]
    source: str
    total_count: int

@app.on_event("startup")
async def startup_event():
    """Initialize MCP client on startup"""
    try:
        await mcp_client.connect()
        logger.info("MCP client connected successfully")
    except Exception as e:
        logger.error(f"Failed to connect MCP client: {e}")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup MCP client on shutdown"""
    try:
        await mcp_client.disconnect()
        logger.info("MCP client disconnected")
    except Exception as e:
        logger.error(f"Error disconnecting MCP client: {e}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "mcp_connected": mcp_client.session is not None}

@app.post("/api/generate-questions", response_model=QuestionResponse)
async def generate_questions(request: QuestionRequest):
    """Generate mock test questions using MCP server"""
    try:
        questions = []
        source = "MCP Server"
        
        if request.test_type == "sat-math":
            questions = await mcp_client.generate_sat_math_questions(
                count=request.count,
                difficulty=request.difficulty,
                topics=request.topics or ["Algebra", "Geometry", "Statistics"]
            )
        elif request.test_type == "sat-english":
            questions = await mcp_client.generate_sat_english_questions(
                count=request.count,
                difficulty=request.difficulty
            )
        elif request.test_type == "act":
            questions = await mcp_client.generate_act_questions(
                section=request.section or "Math",
                count=request.count
            )
        else:
            raise HTTPException(status_code=400, detail="Invalid test type")
        
        return QuestionResponse(
            questions=questions,
            source=source,
            total_count=len(questions)
        )
    
    except Exception as e:
        logger.error(f"Error generating questions: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/fetch-khan-academy", response_model=QuestionResponse)
async def fetch_khan_academy_questions(request: QuestionRequest):
    """Fetch questions from Khan Academy via MCP"""
    try:
        if not request.test_type:
            raise HTTPException(status_code=400, detail="test_type is required")
        
        questions = await mcp_client.fetch_khan_academy_questions(
            subject=request.test_type,
            count=request.count
        )
        
        return QuestionResponse(
            questions=questions,
            source="Khan Academy",
            total_count=len(questions)
        )
    
    except Exception as e:
        logger.error(f"Error fetching Khan Academy questions: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/fetch-college-board", response_model=QuestionResponse)
async def fetch_college_board_questions(request: QuestionRequest):
    """Fetch official questions from College Board via MCP"""
    try:
        if not request.test_type:
            raise HTTPException(status_code=400, detail="test_type is required")
        
        questions = await mcp_client.fetch_college_board_questions(
            test_type=request.test_type,
            practice_test=request.practice_test
        )
        
        return QuestionResponse(
            questions=questions,
            source=f"College Board Practice Test {request.practice_test}",
            total_count=len(questions)
        )
    
    except Exception as e:
        logger.error(f"Error fetching College Board questions: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/available-sources")
async def get_available_sources():
    """Get list of available question sources"""
    return {
        "sources": [
            {
                "id": "gemini",
                "name": "Google Gemini AI",
                "description": "AI-generated questions using Google Gemini",
                "test_types": ["sat-math", "sat-english", "act"]
            },
            {
                "id": "khan-academy",
                "name": "Khan Academy",
                "description": "Practice questions from Khan Academy",
                "test_types": ["sat-math", "sat-reading", "act-math"]
            },
            {
                "id": "college-board",
                "name": "College Board",
                "description": "Official SAT practice questions",
                "test_types": ["sat-math", "sat-reading-writing"]
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)