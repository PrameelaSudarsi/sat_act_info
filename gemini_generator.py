
import os
import json
import logging
import asyncio
import google.generativeai as genai
import random
from typing import List, Dict, Any, Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("gemini_generator")

class GeminiSATGenerator:
    """Generates SAT practice questions using Google's Gemini models."""
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize the generator with an optional API key."""
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        
        if not self.api_key or "AIza" not in self.api_key:
            logger.warning("⚠️ No valid Gemini API Key found. Using mock fallback mode.")
            self.model = None
        else:
            try:
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel('gemini-pro')
                logger.info("✅ Gemini model initialized successfully.")
            except Exception as e:
                logger.error(f"❌ Failed to initialize Gemini: {e}")
                self.model = None

    async def generate_questions(self, test_type: str, count: int = 5) -> List[Dict[str, Any]]:
        """
        Generate a set of SAT questions based on the test type with caching.
        """
        cache_file = os.path.join(os.path.dirname(__file__), "data", f"cache_{test_type}.json")
        
        # 1. Check Cache (Skip for Full Tests to force fresh mixed generation)
        cached_questions = []
        # Only use cache for small requests (Subject Mastery). Full tests need fresh mix.
        if count < 20: 
            cached_questions = self._load_cache(cache_file)
            
        if len(cached_questions) >= count:
            logger.info(f"🚀 Serving {count} questions from cache ({len(cached_questions)} available)")
            return cached_questions[:count]
            
        # 2. If no cache or not enough, generate new ones
        logger.info(f"🌐 Cache miss. Generating {count} new questions via Gemini...")
        
        if not self.model:
            return self._get_fallback_questions(test_type, count)

        # Configure Generation Strategy
        tasks = []
        
        # Strategy 1: Full SAT Math Test (Force Distribution)
        if test_type == 'sat-math' and count >= 20: 
            p1 = int(count * 0.35) # Algebra (~19 Qs)
            p2 = int(count * 0.35) # Advanced (~19 Qs)
            p3 = int(count * 0.15) # Data (~8 Qs)
            p4 = count - p1 - p2 - p3 # Geom (~8 Qs)
            
            logger.info(f"🧩 Splitting Full Math Test: {p1} Alg, {p2} Adv, {p3} Data, {p4} Geom")
            # Split large chunks into smaller batches (max 10) to avoid timeout
            for t_type, c in [('sat-math-algebra', p1), ('sat-math-advanced', p2), 
                              ('sat-math-data', p3), ('sat-math-geometry', p4)]:
                rem = c
                while rem > 0:
                    batch = min(rem, 10)
                    tasks.append(self._generate_batch(t_type, batch))
                    rem -= batch

        # Strategy 2: Full SAT English Test (Force Distribution)
        elif test_type == 'sat-english' and count >= 20:
             # Even distribution across 4 domains
             p_size = count // 4
             p_last = count - (p_size * 3)
             
             logger.info(f"🧩 Splitting Full English Test into 4 domains")
             domains = ['sat-reading-craft', 'sat-reading-information', 
                        'sat-english-conventions', 'sat-english-expression']
             counts = [p_size, p_size, p_size, p_last]
             
             for t_type, c in zip(domains, counts):
                 rem = c
                 while rem > 0:
                     batch = min(rem, 10)
                     tasks.append(self._generate_batch(t_type, batch))
                     rem -= batch
                     
        # Strategy 3: Standard Single-Topic Generation
        else:
            batch_size = 10
            remaining = count
            while remaining > 0:
                current_batch = min(remaining, batch_size)
                tasks.append(self._generate_batch(test_type, current_batch))
                remaining -= current_batch

        # Run batches in parallel
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        new_questions = []
        for res in results:
            if isinstance(res, list):
                new_questions.extend(res)
        
        # Shuffle to mix domains for Full Tests
        random.shuffle(new_questions)
        
        # Fix IDs
        for i, q in enumerate(new_questions):
            q['id'] = i + 1
            
        # 3. Save to Cache for NEXT time
        if new_questions:
            self._save_cache(cache_file, new_questions)
            
        if len(new_questions) > 0:
            return new_questions
        else:
            return self._get_fallback_questions(test_type, count)

    async def _generate_batch(self, test_type: str, count: int) -> List[Dict[str, Any]]:
        """Generate a small batch of questions."""
        prompt = self._create_prompt(test_type, count)
        try:
            response = await asyncio.to_thread(self.model.generate_content, prompt)
            if not response.text: return []
            json_str = self._extract_json(response.text)
            return json.loads(json_str)
        except Exception as e:
            logger.error(f"❌ Batch generation failed: {e}")
            return []

    def _load_cache(self, filepath: str) -> List[Dict[str, Any]]:
        try:
            if os.path.exists(filepath):
                with open(filepath, 'r') as f:
                    data = json.load(f)
                    # Randomize? For now just return
                    import random
                    random.shuffle(data)
                    return data
        except Exception:
            pass
        return []

    def _save_cache(self, filepath: str, new_questions: List[Dict[str, Any]]):
        try:
            # Load existing
            existing = self._load_cache(filepath)
            # Combine (avoid duplicates based on question text?)
            # For simplicity, just append and keep last 100
            combined = existing + new_questions
            # Deduplicate by question text
            unique = {q['question']: q for q in combined}.values()
            
            os.makedirs(os.path.dirname(filepath), exist_ok=True)
            with open(filepath, 'w') as f:
                json.dump(list(unique)[:100], f, indent=2)
        except Exception as e:
            logger.error(f"Failed to save cache: {e}")

    def _create_prompt(self, test_type: str, count: int) -> str:
        """Create a highly specific prompt for Digital SAT format."""
        
        base_instruction = f"""
        You are an expert SAT exam writer. Create {count} REALISTIC, HIGH-QUALITY {test_type} practice questions following the OFFICIAL Digital SAT format.
        
        CRITICALLY IMPORTANT: Return ONLY a raw JSON array of objects. No markdown formatting, no code blocks, no intro text.
        
        Each question object must adhere to this schema:
        {{
            "id": "number",
            "question": "string (The main question text)",
            "passage": "string (REQUIRED: A short 25-150 word text context)",
            "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
            "correct": "string (A, B, C, or D)",
            "topic": "string (e.g., 'Heart of Algebra', 'Craft and Structure')",
            "difficulty": "string (Easy, Medium, Hard)",
            "explanation": "string (DETAILED Step-by-step solution. format: 'Step 1: ... \\nStep 2: ...' Explain the logic clearly.)"
        }}
        """

        if "math" in test_type.lower():
            if "algebra" in test_type.lower():
                base_instruction += """
                ### MATH DOMAIN: ALGEBRA ONLY
                Generate questions STRICTLY for the 'Heart of Algebra' domain:
                - Linear equations in one or two variables.
                - Linear inequalities.
                - Systems of linear equations.
                - Absolute value equations.
                """
            elif "advanced" in test_type.lower():
                base_instruction += """
                ### MATH DOMAIN: ADVANCED MATH ONLY
                Generate questions STRICTLY for the 'Passport to Advanced Math' domain:
                - Quadratic equations and functions.
                - Polynomials (addition, subtraction, multiplication, division).
                - Nonlinear equations and systems.
                - Exponential functions.
                """
            elif "geometry" in test_type.lower() or "trig" in test_type.lower():
                base_instruction += """
                ### MATH DOMAIN: GEOMETRY & TRIGONOMETRY ONLY
                Generate questions STRICTLY for the 'Geometry and Trigonometry' domain:
                - Area and volume computations.
                - Angles, triangles, and lines.
                - Right triangles and trigonometry (sin, cos, tan).
                - Circles (equations, theorems).
                """
            elif "data" in test_type.lower() or "statistics" in test_type.lower():
                base_instruction += """
                ### MATH DOMAIN: PROBLEM SOLVING & DATA ANALYSIS ONLY
                Generate questions STRICTLY for the 'Problem-Solving and Data Analysis' domain:
                - Ratios, rates, and proportions.
                - Percentages and units.
                - Probability.
                - Scatterplots and data interpretation.
                - Mean, median, mode, range, standard deviation.
                """
            else:
                # Generic mix
                base_instruction += """
                ### MATH MIXED PRACTICE (FULL MOCK TEST):
                You MUST generate a balanced mix of questions.
                For a set of questions, ensure the following distribution:
                - ~35% Algebra (Linear equations, inequalities)
                - ~35% Advanced Math (Quadratics, nonlinear equations)
                - ~15% Problem-Solving & Data (Ratios, probability, scatterplots)
                - ~15% Geometry & Trigonometry (Area, volume, angles)

                CRITICAL: Do NOT generate only Algebra questions. You must cover ALL 4 domains above.
                Mix the order of topics randomly.
                """

            base_instruction += """
            **Style Guidelines:**
            - Use realistic numbers and scenarios.
            - Ensure diverse question types (word problems, pure equation solving).
            - Options should be plausible distractors.
            """

        elif "reading" in test_type.lower() or "english" in test_type.lower():
            if "craft" in test_type.lower() or "structure" in test_type.lower():
                base_instruction += """
                ### READING DOMAIN: CRAFT & STRUCTURE ONLY
                - *Words in Context*: "As used in the text, what does 'x' most nearly mean?"
                - *Text Structure/Purpose*: "Which choice best describes the function of the underlined sentence?"
                """
            elif "information" in test_type.lower() or "ideas" in test_type.lower():
                base_instruction += """
                ### READING DOMAIN: INFORMATION & IDEAS ONLY
                - *Central Ideas/Details*: "Which choice best states the main idea of the text?"
                - *Command of Evidence*: "Which finding, if true, would most directly support the team's hypothesis?"
                - *Inferences*: "Which choice most logically completes the text?"
                """
            elif "conventions" in test_type.lower() or "grammar" in test_type.lower():
                base_instruction += """
                ### WRITING DOMAIN: STANDARD ENGLISH CONVENTIONS ONLY
                - *Boundaries*: Semicolons, colons, dashes, sentence fragments.
                - *Form/Structure/Sense*: Verb tense, subject-verb agreement, pronoun-antecedent agreement.
                """
            elif "expression" in test_type.lower() or "transitions" in test_type.lower():
                base_instruction += """
                ### WRITING DOMAIN: EXPRESSION OF IDEAS ONLY
                - *Transitions*: "Which choice completes the text with the most logical transition?"
                - *Rhetorical Synthesis*: "Which choice most effectively uses relevant information to accomplish the goal?"
                """
            else:
                # Generic mix
                base_instruction += """
                ### READING & WRITING MIXED PRACTICE (FULL MOCK TEST):
                You MUST generate a balanced mix of questions.
                For a set of questions, ensure the following distribution:
                - ~30% Craft and Structure (Reading)
                - ~20% Information and Ideas (Reading)
                - ~30% Standard English Conventions (Writing)
                - ~20% Expression of Ideas (Writing)

                CRITICAL: Mix the domains randomly. Do NOT focus on only one type.
                """
            
            base_instruction += """
            **Style Guidelines:**
            - **PASSAGE IS MANDATORY**: Every question MUST have a short passage (approx 25-100 words).
            - Passages should cover: Literature, History/Social Studies, Humanities, and Science.
            """
        elif "reading" in test_type.lower() or "english" in test_type.lower():
            base_instruction += """
            ### READING & WRITING DOMAIN INSTRUCTIONS:
            Generate questions evenly across these 4 domains:
            1. **Craft and Structure**:
               - *Words in Context*: "As used in the text, what does 'x' most nearly mean?"
               - *Text Structure/Purpose*: "Which choice best describes the function of the underlined sentence?"
            2. **Information and Ideas**:
               - *Central Ideas/Details*: "Which choice best states the main idea of the text?"
               - *Command of Evidence*: "Which finding, if true, would most directly support the team's hypothesis?"
            3. **Standard English Conventions**:
               - *Boundaries*: Semicolons, colons, dashes, sentence fragments.
               - *Form/Structure/Sense*: Verb tense, subject-verb agreement, pronoun-antecedent agreement.
            4. **Expression of Ideas**:
               - *Transitions*: "Which choice completes the text with the most logical transition?" (e.g., However, Therefore, Moreover).
            
            **Style Guidelines:**
            - **PASSAGE IS MANDATORY**: Every question MUST have a short passage (approx 50-100 words).
            - Passages should cover: Literature, History/Social Studies, Humanities, and Science.
            """
        else:
             base_instruction += """
             For this subject, generate standard multiple-choice questions with clear stems and distinct distractors.
             """
            
        return base_instruction

    def _extract_json(self, text: str) -> str:
        """Extract JSON part from a potentially messy LLM response."""
        text = text.strip()
        # Remove markdown code blocks if present
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        
        # Find start and end brackets
        start = text.find("[")
        end = text.rfind("]")
        
        if start != -1 and end != -1:
            return text[start:end+1]
        return text

    def _get_fallback_questions(self, test_type: str, count: int) -> List[Dict[str, Any]]:
        """Return static questions if API usage fails."""
        logger.info("⚠️ Using fallback static questions.")
        
        questions = []
        for i in range(count):
            if "math" in test_type.lower():
                questions.append({
                    "id": i + 1,
                    "question": f"If 3x + {i*2} = 20, what is the value of x?",
                    "options": ["A) 2", "B) 4", "C) 6", "D) 8"],
                    "correct": "C",
                    "topic": "Algebra",
                    "difficulty": "Medium",
                    "explanation": "Solve for x by isolating the variable."
                })
            else:
                questions.append({
                    "id": i + 1,
                    "question": "Which word best completes the sentence? The scientist's theory was _____ by the new evidence.",
                    "options": ["A) refuted", "B) supported", "C) ignored", "D) created"],
                    "correct": "B",
                    "topic": "Vocabulary",
                    "difficulty": "Medium",
                    "explanation": "Supported fits best in the context of positive evidence."
                })
        return questions
