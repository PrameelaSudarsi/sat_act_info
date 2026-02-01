import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const satApiService = {
  // Health check
  async healthCheck() {
    const response = await api.get('/api/health');
    return response.data;
  },

  // Practice question
  async practiceQuestion(question, useRag = true, useSearch = true, useYoutube = true) {
    const response = await api.post('/api/sat/practice-question', {
      question,
      use_rag: useRag,
      use_search: useSearch,
      use_youtube: useYoutube,
    });
    return response.data;
  },

  // Explain concept
  async explainConcept(concept, useRag = true, useSearch = true, useYoutube = true) {
    const response = await api.post('/api/sat/explain-concept', {
      concept,
      use_rag: useRag,
      use_search: useSearch,
      use_youtube: useYoutube,
    });
    return response.data;
  },

  // Chat
  async chat(message, useRag = true) {
    const response = await api.post('/api/sat/chat', {
      message,
      use_rag: useRag,
    });
    return response.data;
  },

  // Search internet
  async search(query, maxResults = 5) {
    const response = await api.post('/api/search', {
      query,
      max_results: maxResults,
    });
    return response.data;
  },

  // Search YouTube
  async searchYouTube(query, maxResults = 5) {
    const response = await api.post('/api/youtube/search', {
      query,
      max_results: maxResults,
    });
    return response.data;
  },

  // Get KB info
  async getKBInfo() {
    const response = await api.get('/api/kb/info');
    return response.data;
  },

  // Generate questions
  async generateQuestions(testType = 'sat-math', count = 3) {
    const response = await api.post('/api/generate-questions', {
      test_type: testType,
      count: count,
    });
    return response.data;
  },
};

export default satApiService;
