import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    // Use environment variable or fallback (you'll need to set this)
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key';
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async chatWithGemini(message, context = '') {
    try {
      const satPrompt = `You are an expert SAT tutor and test preparation specialist. You have deep knowledge of:
- SAT Math (Algebra, Advanced Math, Problem-Solving & Data Analysis, Geometry & Trigonometry)
- SAT Reading & Writing (Reading Comprehension, Grammar, Vocabulary in Context)
- Test-taking strategies and time management
- Common SAT question types and patterns
- Study techniques and preparation methods

Please provide accurate, helpful, and detailed responses focused on SAT preparation. Use examples when helpful and break down complex concepts step-by-step.

Context: ${context}
Student Question: ${message}

Response:`;

      const result = await this.model.generateContent(satPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to get response from Gemini');
    }
  }

  async explainSATConcept(concept, difficulty = 'intermediate') {
    const prompt = `As an SAT expert, explain the concept of "${concept}" for a ${difficulty} level student. Include:
1. Clear definition and explanation
2. Why it's important for the SAT
3. Common question types
4. Step-by-step example
5. Practice tips
6. Common mistakes to avoid`;

    return await this.chatWithGemini(prompt);
  }

  async solveSATMathProblem(problem) {
    const prompt = `Solve this SAT Math problem step-by-step:

${problem}

Please provide:
1. The correct answer
2. Step-by-step solution
3. Key concepts used
4. Alternative solution methods (if any)
5. Similar problem types to practice`;

    return await this.chatWithGemini(prompt);
  }

  async analyzeReadingPassage(passage, question) {
    const prompt = `Analyze this SAT Reading passage and question:

Passage: ${passage}

Question: ${question}

Please provide:
1. The correct answer with explanation
2. Key reading strategies used
3. How to identify the answer in the passage
4. Common traps to avoid
5. Tips for similar questions`;

    return await this.chatWithGemini(prompt);
  }

  async getStudyPlan(currentLevel, targetScore, timeframe) {
    const prompt = `Create a personalized SAT study plan:
- Current level: ${currentLevel}
- Target score: ${targetScore}
- Timeframe: ${timeframe}

Include:
1. Weekly study schedule
2. Recommended resources
3. Practice test timeline
4. Focus areas based on score goals
5. Milestone checkpoints`;

    return await this.chatWithGemini(prompt);
  }
}

export default new GeminiService();