// Google Gemini API Configuration
// To use this feature:
// 1. Get your API key from https://makersuite.google.com/app/apikey
// 2. Replace 'YOUR_GEMINI_API_KEY' with your actual API key
// 3. Or set environment variable REACT_APP_GEMINI_API_KEY

export const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';

export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Test if API key is configured
export const isGeminiConfigured = () => {
  return GEMINI_API_KEY && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY' && GEMINI_API_KEY.length > 10;
};