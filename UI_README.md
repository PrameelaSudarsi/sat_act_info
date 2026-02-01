# Ollama Agent UI - Setup Guide

A beautiful React-based UI for testing the Ollama Agent with RAG capabilities.

## Features

- 🎨 Modern, responsive UI with Material-UI (MUI)
- 💬 Real-time chat interface
- 📚 Knowledge base management
- 🔄 Model selection and switching
- 📄 Document upload (PDF, TXT, DOC, DOCX, MD)
- 🔍 RAG-powered responses with source citations

## Prerequisites

1. **Python 3.8+** with virtual environment activated
2. **Node.js 18+** and npm
3. **Ollama** running locally (`ollama serve`)

## Setup Instructions

### 1. Install Python Dependencies

```bash
# Activate virtual environment (if not already activated)
source venv/bin/activate

# Install/update Python dependencies
pip install -r requirements.txt
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 3. Start the Backend API Server

```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Start the FastAPI server
python api_server.py
```

The API server will run on `http://localhost:8001`

### 4. Start the React Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Ensure Ollama is running**: `ollama serve` in a terminal
2. **Start the backend**: Run `python api_server.py`
3. **Start the frontend**: Run `npm run dev` in the `frontend` directory
4. **Open your browser**: Navigate to `http://localhost:3000`

## Features Overview

### Chat Interface
- Type messages in the input field
- Get RAG-powered responses with context from your knowledge base
- View retrieved documents that informed the response

### Sidebar
- **Model Selection**: Switch between available Ollama models
- **Knowledge Base Info**: View total chunks and sources
- **Document Upload**: Add PDF, TXT, DOC, DOCX, or MD files to the knowledge base
- **Refresh**: Update knowledge base statistics

## API Endpoints

The backend provides the following REST endpoints:

- `GET /api/health` - Health check
- `GET /api/models` - List available models
- `POST /api/chat` - Chat with agent
- `POST /api/query` - Query knowledge base
- `GET /api/kb/info` - Get KB information
- `POST /api/kb/add` - Add documents
- `POST /api/model/change` - Change model

## Troubleshooting

### Ollama Connection Issues
- Make sure Ollama is running: `ollama serve`
- Check if models are available: `ollama list`

### CORS Errors
- Ensure the backend is running on port 8001
- Check that the frontend proxy is configured correctly in `vite.config.js`

### Document Upload Issues
- Ensure the `data/` directory exists
- Check file permissions
- Supported formats: PDF, TXT, DOC, DOCX, MD

## Development

### Backend Development
- The API server uses FastAPI with auto-reload
- API documentation available at `http://localhost:8001/docs`

### Frontend Development
- Uses Vite for fast development
- Hot module replacement enabled
- Material-UI (MUI) for components and styling
- Material Design principles

## Production Build

To build the frontend for production:

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/`
