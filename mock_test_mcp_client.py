import asyncio
import json
import logging
from typing import Optional, List, Dict, Any
import httpx
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

logger = logging.getLogger(__name__)

class MockTestMCPClient:
    def __init__(self):
        self.session: Optional[ClientSession] = None
        self.server_params = StdioServerParameters(
            command="python",
            args=["mock_test_mcp_server.py"]
        )

    async def connect(self):
        """Connect to the MCP server"""
        try:
            self.session = await stdio_client(self.server_params)
            await self.session.initialize()
            logger.info("Connected to Mock Test MCP Server")
            return True
        except Exception as e:
            logger.error(f"Failed to connect to MCP server: {e}")
            return False

    async def disconnect(self):
        """Disconnect from the MCP server"""
        if self.session:
            await self.session.close()
            self.session = None

    async def generate_sat_math_questions(self, count: int = 10, difficulty: str = "Mixed", topics: List[str] = None) -> List[Dict[str, Any]]:
        """Generate SAT Math questions using MCP server"""
        if not self.session:
            await self.connect()
        
        if not topics:
            topics = ["Algebra", "Geometry", "Statistics"]
        
        try:
            result = await self.session.call_tool(
                "generate_sat_math_questions",
                {
                    "count": count,
                    "difficulty": difficulty,
                    "topics": topics
                }
            )
            
            if result.content and len(result.content) > 0:
                questions_json = result.content[0].text
                return json.loads(questions_json)
            return []
        except Exception as e:
            logger.error(f"Error generating SAT Math questions: {e}")
            return self._get_fallback_sat_math_questions(count)

    async def generate_sat_english_questions(self, count: int = 10, difficulty: str = "Mixed") -> List[Dict[str, Any]]:
        """Generate SAT English questions using MCP server"""
        if not self.session:
            await self.connect()
        
        try:
            result = await self.session.call_tool(
                "generate_sat_english_questions",
                {
                    "count": count,
                    "difficulty": difficulty
                }
            )
            
            if result.content and len(result.content) > 0:
                questions_json = result.content[0].text
                return json.loads(questions_json)
            return []
        except Exception as e:
            logger.error(f"Error generating SAT English questions: {e}")
            return self._get_fallback_sat_english_questions(count)

    async def generate_act_questions(self, section: str = "Math", count: int = 10) -> List[Dict[str, Any]]:
        """Generate ACT questions using MCP server"""
        if not self.session:
            await self.connect()
        
        try:
            result = await self.session.call_tool(
                "generate_act_questions",
                {
                    "section": section,
                    "count": count
                }
            )
            
            if result.content and len(result.content) > 0:
                questions_json = result.content[0].text
                return json.loads(questions_json)
            return []
        except Exception as e:
            logger.error(f"Error generating ACT questions: {e}")
            return self._get_fallback_act_questions(section, count)

    async def fetch_khan_academy_questions(self, subject: str, count: int = 5) -> List[Dict[str, Any]]:
        """Fetch Khan Academy questions using MCP server"""
        if not self.session:
            await self.connect()
        
        try:
            result = await self.session.call_tool(
                "fetch_khan_academy_questions",
                {
                    "subject": subject,
                    "count": count
                }
            )
            
            if result.content and len(result.content) > 0:
                questions_json = result.content[0].text
                return json.loads(questions_json)
            return []
        except Exception as e:
            logger.error(f"Error fetching Khan Academy questions: {e}")
            return []

    async def fetch_college_board_questions(self, test_type: str, practice_test: int = 1) -> List[Dict[str, Any]]:
        """Fetch College Board questions using MCP server"""
        if not self.session:
            await self.connect()
        
        try:
            result = await self.session.call_tool(
                "fetch_college_board_questions",
                {
                    "test_type": test_type,
                    "practice_test": practice_test
                }
            )
            
            if result.content and len(result.content) > 0:
                questions_json = result.content[0].text
                return json.loads(questions_json)
            return []
        except Exception as e:
            logger.error(f"Error fetching College Board questions: {e}")
            return []

    def _get_fallback_sat_math_questions(self, count: int) -> List[Dict[str, Any]]:
        """Fallback SAT Math questions when MCP fails"""
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
                "question": "What is the slope of the line passing through points (2, 3) and (6, 11)?",
                "options": ["A) 1", "B) 2", "C) 3", "D) 4"],
                "correct": "B",
                "topic": "Linear Functions",
                "difficulty": "Medium",
                "explanation": "Slope = (y2-y1)/(x2-x1) = (11-3)/(6-2) = 8/4 = 2"
            },
            {
                "id": 3,
                "question": "What is the area of a circle with radius 5?",
                "options": ["A) 10π", "B) 25π", "C) 50π", "D) 100π"],
                "correct": "B",
                "topic": "Geometry",
                "difficulty": "Easy",
                "explanation": "Area = πr² = π(5)² = 25π"
            }
        ]
        return base_questions[:count]

    def _get_fallback_sat_english_questions(self, count: int) -> List[Dict[str, Any]]:
        """Fallback SAT English questions when MCP fails"""
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
            },
            {
                "id": 2,
                "question": "Which choice best corrects the grammatical error?",
                "passage": "The students, along with their teacher, was excited about the field trip.",
                "options": ["A) NO CHANGE", "B) were excited", "C) is excited", "D) are excited"],
                "correct": "B",
                "topic": "Subject-Verb Agreement",
                "difficulty": "Medium",
                "explanation": "The subject 'students' is plural, so use 'were'"
            }
        ]
        return base_questions[:count]

    def _get_fallback_act_questions(self, section: str, count: int) -> List[Dict[str, Any]]:
        """Fallback ACT questions when MCP fails"""
        base_questions = [
            {
                "id": 1,
                "question": "What is the value of 3(x + 4) when x = 5?",
                "options": ["A) 12", "B) 19", "C) 27", "D) 32"],
                "correct": "C",
                "topic": "Algebra",
                "difficulty": "Easy",
                "explanation": "3(5 + 4) = 3(9) = 27"
            }
        ]
        return base_questions[:count]

# Global instance
mcp_client = MockTestMCPClient()