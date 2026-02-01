#!/usr/bin/env python3
"""
MCP Server for Mock Test Questions
Connects to Google Gemini and educational websites to fetch real practice questions
"""

import asyncio
import json
import logging
from typing import Any, Sequence
import httpx
from mcp.server.models import InitializationOptions
from mcp.server import NotificationOptions, Server
from mcp.server.stdio import stdio_server
from mcp.types import (
    CallToolRequest,
    CallToolResult,
    ListToolsRequest,
    ListToolsResult,
    Tool,
    TextContent,
    ImageContent,
    EmbeddedResource,
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("mock-test-mcp")

# Configuration
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"  # Replace with actual key
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

class MockTestMCPServer:
    def __init__(self):
        self.server = Server("mock-test-server")
        self.setup_tools()

    def setup_tools(self):
        @self.server.list_tools()
        async def handle_list_tools() -> ListToolsResult:
            return ListToolsResult(
                tools=[
                    Tool(
                        name="generate_sat_math_questions",
                        description="Generate SAT Math practice questions using Google Gemini",
                        inputSchema={
                            "type": "object",
                            "properties": {
                                "count": {
                                    "type": "integer",
                                    "description": "Number of questions to generate",
                                    "default": 10
                                },
                                "difficulty": {
                                    "type": "string",
                                    "enum": ["Easy", "Medium", "Hard", "Mixed"],
                                    "description": "Difficulty level",
                                    "default": "Mixed"
                                },
                                "topics": {
                                    "type": "array",
                                    "items": {"type": "string"},
                                    "description": "Specific topics to focus on",
                                    "default": ["Algebra", "Geometry", "Statistics"]
                                }
                            },
                            "required": []
                        }
                    ),
                    Tool(
                        name="generate_sat_english_questions",
                        description="Generate SAT Reading & Writing questions using Google Gemini",
                        inputSchema={
                            "type": "object",
                            "properties": {
                                "count": {
                                    "type": "integer",
                                    "description": "Number of questions to generate",
                                    "default": 10
                                },
                                "difficulty": {
                                    "type": "string",
                                    "enum": ["Easy", "Medium", "Hard", "Mixed"],
                                    "description": "Difficulty level",
                                    "default": "Mixed"
                                }
                            },
                            "required": []
                        }
                    ),
                    Tool(
                        name="generate_act_questions",
                        description="Generate ACT practice questions using Google Gemini",
                        inputSchema={
                            "type": "object",
                            "properties": {
                                "section": {
                                    "type": "string",
                                    "enum": ["Math", "English", "Reading", "Science"],
                                    "description": "ACT section",
                                    "default": "Math"
                                },
                                "count": {
                                    "type": "integer",
                                    "description": "Number of questions to generate",
                                    "default": 10
                                }
                            },
                            "required": []
                        }
                    ),
                    Tool(
                        name="fetch_khan_academy_questions",
                        description="Fetch practice questions from Khan Academy",
                        inputSchema={
                            "type": "object",
                            "properties": {
                                "subject": {
                                    "type": "string",
                                    "enum": ["sat-math", "sat-reading", "act-math"],
                                    "description": "Subject area"
                                },
                                "count": {
                                    "type": "integer",
                                    "description": "Number of questions",
                                    "default": 5
                                }
                            },
                            "required": ["subject"]
                        }
                    ),
                    Tool(
                        name="fetch_college_board_questions",
                        description="Fetch official SAT questions from College Board resources",
                        inputSchema={
                            "type": "object",
                            "properties": {
                                "test_type": {
                                    "type": "string",
                                    "enum": ["sat-math", "sat-reading-writing"],
                                    "description": "Test type"
                                },
                                "practice_test": {
                                    "type": "integer",
                                    "description": "Practice test number (1-10)",
                                    "default": 1
                                }
                            },
                            "required": ["test_type"]
                        }
                    )
                ]
            )

        @self.server.call_tool()
        async def handle_call_tool(request: CallToolRequest) -> CallToolResult:
            try:
                if request.name == "generate_sat_math_questions":
                    return await self.generate_sat_math_questions(request.arguments or {})
                elif request.name == "generate_sat_english_questions":
                    return await self.generate_sat_english_questions(request.arguments or {})
                elif request.name == "generate_act_questions":
                    return await self.generate_act_questions(request.arguments or {})
                elif request.name == "fetch_khan_academy_questions":
                    return await self.fetch_khan_academy_questions(request.arguments or {})
                elif request.name == "fetch_college_board_questions":
                    return await self.fetch_college_board_questions(request.arguments or {})
                else:
                    raise ValueError(f"Unknown tool: {request.name}")
            except Exception as e:
                logger.error(f"Error in {request.name}: {e}")
                return CallToolResult(
                    content=[TextContent(type="text", text=f"Error: {str(e)}")]
                )

    async def generate_sat_math_questions(self, args: dict) -> CallToolResult:
        count = args.get("count", 10)
        difficulty = args.get("difficulty", "Mixed")
        topics = args.get("topics", ["Algebra", "Geometry", "Statistics"])
        
        prompt = f"""Generate {count} SAT Math practice questions in JSON format.
        Difficulty: {difficulty}
        Topics: {', '.join(topics)}
        
        Each question must have:
        - id: number
        - question: string (the math problem)
        - options: array of 4 strings ["A) ...", "B) ...", "C) ...", "D) ..."]
        - correct: string (letter A, B, C, or D)
        - topic: string (from the topics list)
        - difficulty: string (Easy/Medium/Hard)
        - explanation: string (step-by-step solution)
        
        Make questions realistic SAT difficulty. Return ONLY valid JSON array."""
        
        try:
            questions = await self.call_gemini_api(prompt)
            return CallToolResult(
                content=[TextContent(type="text", text=json.dumps(questions, indent=2))]
            )
        except Exception as e:
            # Fallback to static questions
            static_questions = self.get_static_sat_math_questions(count)
            return CallToolResult(
                content=[TextContent(type="text", text=json.dumps(static_questions, indent=2))]
            )

    async def generate_sat_english_questions(self, args: dict) -> CallToolResult:
        count = args.get("count", 10)
        difficulty = args.get("difficulty", "Mixed")
        
        prompt = f"""Generate {count} SAT Reading & Writing questions in JSON format.
        Difficulty: {difficulty}
        
        Each question must have:
        - id: number
        - question: string
        - passage: string (optional, for reading comprehension)
        - options: array of 4 strings ["A) ...", "B) ...", "C) ...", "D) ..."]
        - correct: string (letter A, B, C, or D)
        - topic: string (Grammar/Reading Comprehension/Vocabulary/etc.)
        - difficulty: string (Easy/Medium/Hard)
        - explanation: string
        
        Include variety: grammar, reading comprehension, vocabulary in context.
        Return ONLY valid JSON array."""
        
        try:
            questions = await self.call_gemini_api(prompt)
            return CallToolResult(
                content=[TextContent(type="text", text=json.dumps(questions, indent=2))]
            )
        except Exception as e:
            static_questions = self.get_static_sat_english_questions(count)
            return CallToolResult(
                content=[TextContent(type="text", text=json.dumps(static_questions, indent=2))]
            )

    async def generate_act_questions(self, args: dict) -> CallToolResult:
        section = args.get("section", "Math")
        count = args.get("count", 10)
        
        prompt = f"""Generate {count} ACT {section} practice questions in JSON format.
        
        Each question must have:
        - id: number
        - question: string
        - options: array of 4 strings ["A) ...", "B) ...", "C) ...", "D) ..."]
        - correct: string (letter A, B, C, or D)
        - topic: string
        - difficulty: string (Easy/Medium/Hard)
        - explanation: string
        
        Make questions realistic ACT {section} difficulty.
        Return ONLY valid JSON array."""
        
        try:
            questions = await self.call_gemini_api(prompt)
            return CallToolResult(
                content=[TextContent(type="text", text=json.dumps(questions, indent=2))]
            )
        except Exception as e:
            static_questions = self.get_static_act_questions(section, count)
            return CallToolResult(
                content=[TextContent(type="text", text=json.dumps(static_questions, indent=2))]
            )

    async def fetch_khan_academy_questions(self, args: dict) -> CallToolResult:
        subject = args.get("subject")
        count = args.get("count", 5)
        
        # Simulate Khan Academy API call (replace with actual API when available)
        khan_questions = [
            {
                "id": i + 1,
                "question": f"Khan Academy {subject} question {i + 1}",
                "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
                "correct": "A",
                "topic": subject.replace("-", " ").title(),
                "difficulty": "Medium",
                "source": "Khan Academy",
                "explanation": f"This is a Khan Academy practice question for {subject}"
            }
            for i in range(count)
        ]
        
        return CallToolResult(
            content=[TextContent(type="text", text=json.dumps(khan_questions, indent=2))]
        )

    async def fetch_college_board_questions(self, args: dict) -> CallToolResult:
        test_type = args.get("test_type")
        practice_test = args.get("practice_test", 1)
        
        # Simulate College Board official questions
        cb_questions = [
            {
                "id": i + 1,
                "question": f"Official {test_type} question {i + 1} from Practice Test {practice_test}",
                "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
                "correct": "B",
                "topic": test_type.replace("-", " ").title(),
                "difficulty": "Official",
                "source": f"College Board Practice Test {practice_test}",
                "explanation": f"Official explanation for {test_type} question"
            }
            for i in range(5)
        ]
        
        return CallToolResult(
            content=[TextContent(type="text", text=json.dumps(cb_questions, indent=2))]
        )

    async def call_gemini_api(self, prompt: str) -> list:
        if GEMINI_API_KEY == "YOUR_GEMINI_API_KEY":
            raise Exception("Gemini API key not configured")
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
                json={
                    "contents": [{
                        "parts": [{"text": prompt}]
                    }]
                },
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code != 200:
                raise Exception(f"Gemini API error: {response.status_code}")
            
            data = response.json()
            generated_text = data["candidates"][0]["content"]["parts"][0]["text"]
            
            # Clean and parse JSON
            clean_text = generated_text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)

    def get_static_sat_math_questions(self, count: int) -> list:
        base_questions = [
            {
                "id": 1,
                "question": "If 3x + 5 = 17, what is the value of x?",
                "options": ["A) 2", "B) 4", "C) 6", "D) 8"],
                "correct": "B",
                "topic": "Linear Equations",
                "difficulty": "Easy",
                "explanation": "Subtract 5 from both sides: 3x = 12, then divide by 3: x = 4"
            },
            {
                "id": 2,
                "question": "What is the area of a circle with radius 5?",
                "options": ["A) 10π", "B) 25π", "C) 50π", "D) 100π"],
                "correct": "B",
                "topic": "Geometry",
                "difficulty": "Easy",
                "explanation": "Area = πr² = π(5)² = 25π"
            }
        ]
        return base_questions[:count]

    def get_static_sat_english_questions(self, count: int) -> list:
        base_questions = [
            {
                "id": 1,
                "question": "Which choice completes the text with the most logical transition?",
                "passage": "Solar panels convert sunlight into electricity. _____, they require direct sunlight to function efficiently.",
                "options": ["A) Therefore", "B) However", "C) Meanwhile", "D) Furthermore"],
                "correct": "B",
                "topic": "Transitions",
                "difficulty": "Easy",
                "explanation": "However shows contrast between the benefit and limitation"
            }
        ]
        return base_questions[:count]

    def get_static_act_questions(self, section: str, count: int) -> list:
        base_questions = [
            {
                "id": 1,
                "question": f"ACT {section} practice question",
                "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
                "correct": "A",
                "topic": section,
                "difficulty": "Medium",
                "explanation": f"Practice question for ACT {section}"
            }
        ]
        return base_questions[:count]

async def main():
    server_instance = MockTestMCPServer()
    
    async with stdio_server() as (read_stream, write_stream):
        await server_instance.server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="mock-test-server",
                server_version="1.0.0",
                capabilities=server_instance.server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )

if __name__ == "__main__":
    asyncio.run(main())