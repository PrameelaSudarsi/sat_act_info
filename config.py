"""
Configuration file for Ollama-based Agent with RAG and MCP.
All models run locally using Ollama.
"""

import os
from typing import Dict, List
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Ollama Configuration
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")
OLLAMA_EMBEDDING_MODEL = os.getenv("OLLAMA_EMBEDDING_MODEL", "nomic-embed-text")

# RAG Configuration
VECTOR_STORE_TYPE = os.getenv("VECTOR_STORE_TYPE", "chroma")
CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./chroma_db")
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", "1000"))
CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", "200"))

# Agent Configuration
AGENT_NAME = os.getenv("AGENT_NAME", "StradsOllamaAgent")
AGENT_INSTRUCTIONS = """You are a helpful AI assistant. Provide concise, accurate responses.
Keep answers brief and to the point."""

# Knowledge Base Configuration
KNOWLEDGE_BASE_NAME = os.getenv("KNOWLEDGE_BASE_NAME", "StradsOllamaKB")
DATA_DIR = os.getenv("DATA_DIR", "./data")

# Model Parameters - Optimized for speed
MAX_TOKENS = int(os.getenv("MAX_TOKENS", "512"))
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.3"))
TOP_P = float(os.getenv("TOP_P", "0.8"))

# MCP Configuration
MCP_SERVER_HOST = os.getenv("MCP_SERVER_HOST", "0.0.0.0")
MCP_SERVER_PORT = int(os.getenv("MCP_SERVER_PORT", "8000"))

# API Server Configuration
API_SERVER_PORT = int(os.getenv("API_SERVER_PORT", "8001"))

# Supported Ollama Models
SUPPORTED_MODELS = [
    "llama3.2",
    "llama3.1",
    "mistral",
    "qwen2.5",
    "phi3",
    "gemma2",
    "codellama"
]

SUPPORTED_EMBEDDING_MODELS = [
    "nomic-embed-text",
    "all-minilm"
]

def validate_model(model_name: str) -> bool:
    """Validate if model is in supported list."""
    return model_name in SUPPORTED_MODELS

def validate_embedding_model(model_name: str) -> bool:
    """Validate if embedding model is supported."""
    return model_name in SUPPORTED_EMBEDDING_MODELS
