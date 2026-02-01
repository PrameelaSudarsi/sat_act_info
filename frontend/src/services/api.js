import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Health check
  async healthCheck() {
    const response = await api.get('/api/health');
    return response.data;
  },

  // Get available models
  async getModels() {
    const response = await api.get('/api/models');
    return response.data;
  },

  // Chat with agent
  async chat(message, useRag = true) {
    const response = await api.post('/api/chat', {
      message,
      use_rag: useRag,
    });
    return response.data;
  },

  // Query knowledge base
  async queryKB(query, nResults = 5) {
    const response = await api.post('/api/query', {
      query,
      n_results: nResults,
    });
    return response.data;
  },

  // Get KB info
  async getKBInfo() {
    const response = await api.get('/api/kb/info');
    return response.data;
  },

  // Add documents
  async addDocuments(files) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    const response = await api.post('/api/kb/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Change model
  async changeModel(modelName) {
    const response = await api.post('/api/model/change', {
      model_name: modelName,
    });
    return response.data;
  },
};

export default apiService;
