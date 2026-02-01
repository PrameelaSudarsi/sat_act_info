# SAT Practice Assistant - Complete Guide

A comprehensive SAT practice application with AI-powered assistance, RAG (Retrieval Augmented Generation), internet search, and YouTube integration.

## 🎯 Features

- **AI-Powered Practice Questions**: Get detailed answers and explanations for SAT questions
- **Concept Explanations**: Understand SAT concepts with comprehensive explanations
- **RAG Integration**: Uses your uploaded SAT PDF practice materials for context-aware answers
- **Internet Search**: Automatically searches the web for additional resources
- **YouTube Integration**: Finds and embeds relevant video explanations
- **Professional UI**: Modern Material-UI interface designed for students
- **MCP Support**: Full Model Context Protocol integration

## 📋 Prerequisites

1. **Python 3.8+** with virtual environment
2. **Node.js 18+** and npm
3. **Ollama** running locally (`ollama serve`)
4. **SAT Practice PDFs** (optional but recommended)

## 🚀 Quick Start

### 1. Install Python Dependencies

```bash
# Activate virtual environment
source venv/bin/activate

# Install all dependencies
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

# Start the SAT API server
python sat_api_server.py
```

The API server will run on `http://localhost:8001`

### 4. Start the Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### 5. Upload SAT Practice Materials

1. Click "Upload SAT PDFs" in the sidebar
2. Select your SAT practice PDF files
3. Wait for processing (embeddings generation)
4. Start asking questions!

## 📚 Usage Guide

### Practice Question Mode

1. Select "Practice Question" tab
2. Enter your SAT question
3. Click "Get Answer"
4. Review:
   - Detailed answer and explanation
   - Step-by-step solution
   - Relevant content from your practice materials
   - Additional web resources
   - Video explanations

### Concept Explanation Mode

1. Select "Explain Concept" tab
2. Enter a concept (e.g., "quadratic equations", "reading comprehension strategies")
3. Click "Explain Concept"
4. Get comprehensive explanations with resources

## 🔧 Configuration

### Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
OLLAMA_EMBEDDING_MODEL=nomic-embed-text

# RAG Configuration
VECTOR_STORE_TYPE=chroma
CHROMA_PERSIST_DIR=./chroma_db
CHUNK_SIZE=1000
CHUNK_OVERLAP=200

# Agent Configuration
AGENT_NAME=SATPracticeAgent
KNOWLEDGE_BASE_NAME=SATPracticeKB
DATA_DIR=./data

# API Configuration
API_SERVER_PORT=8001
MCP_SERVER_PORT=8000
```

## 🏗️ Architecture

### Backend Components

1. **SAT Agent** (`sat_agent.py`): Specialized agent for SAT practice
2. **Search Service** (`search_service.py`): Internet search using DuckDuckGo
3. **YouTube Service** (`search_service.py`): YouTube video search and embedding
4. **RAG Engine** (`rag_engine.py`): Document processing and retrieval
5. **API Server** (`sat_api_server.py`): FastAPI REST endpoints
6. **MCP Server** (`mcp_server.py`): Model Context Protocol server

### Frontend Components

1. **SATPractice Component**: Main practice interface
2. **Material-UI**: Professional, responsive design
3. **API Service**: Client for backend communication

## 🔌 API Endpoints

### SAT Practice

- `POST /api/sat/practice-question` - Answer a practice question
- `POST /api/sat/explain-concept` - Explain a concept
- `POST /api/sat/chat` - General chat with SAT agent

### Search & Resources

- `POST /api/search` - Search the internet
- `POST /api/youtube/search` - Search YouTube videos

### Knowledge Base

- `GET /api/kb/info` - Get KB statistics
- `POST /api/kb/add` - Upload documents

### Health

- `GET /api/health` - System health check

## 🛠️ MCP Tools

The MCP server provides these tools:

- `practice_sat_question` - Answer SAT questions with full context
- `explain_sat_concept` - Explain concepts with resources
- `search_internet` - Search the web
- `search_youtube` - Search YouTube
- `query_knowledge_base` - Query RAG knowledge base
- `add_documents_to_kb` - Add documents to KB

## 📝 Supported File Formats

- PDF (`.pdf`)
- Text (`.txt`)
- Word Documents (`.doc`, `.docx`)
- Markdown (`.md`)

## 🎨 UI Features

- **Clean, Educational Design**: Material-UI components optimized for learning
- **Tabbed Interface**: Easy navigation between resources
- **Video Embeds**: Direct YouTube video playback
- **Source Citations**: Clear attribution for all resources
- **Responsive Layout**: Works on desktop and tablet
- **Real-time Status**: Connection and upload status indicators

## 🔍 How It Works

1. **Question Input**: Student enters a question or concept
2. **RAG Retrieval**: System searches uploaded PDFs for relevant content
3. **Internet Search**: System searches web for additional resources
4. **YouTube Search**: System finds relevant explanation videos
5. **AI Synthesis**: AI combines all sources to provide comprehensive answer
6. **Resource Display**: All sources, links, and videos displayed for student review

## 🐛 Troubleshooting

### Ollama Connection Issues
- Ensure Ollama is running: `ollama serve`
- Check if models are available: `ollama list`
- Verify OLLAMA_BASE_URL in `.env`

### Upload Issues
- Ensure `data/` directory exists
- Check file permissions
- Supported formats: PDF, TXT, DOC, DOCX, MD

### Search/YouTube Issues
- Internet connection required
- YouTube search uses yt-dlp (may require updates)
- Some videos may not embed (fallback to YouTube link)

### Performance
- Large PDFs may take time to process
- Embedding generation can be slow for many documents
- Consider chunking very large documents

## 📊 Knowledge Base Management

### View KB Info
- Check sidebar for total chunks and sources
- View list of uploaded documents

### Add Documents
- Use "Upload SAT PDFs" button
- Multiple files supported
- Processing happens automatically

### Best Practices
- Upload official SAT practice tests
- Include answer keys for better context
- Organize by subject (Math, Reading, Writing)

## 🚀 Production Deployment

### Backend
```bash
# Use production WSGI server
uvicorn sat_api_server:app --host 0.0.0.0 --port 8001 --workers 4
```

### Frontend
```bash
cd frontend
npm run build
# Serve dist/ folder with nginx or similar
```

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

Contributions welcome! Please ensure:
- Code follows PEP 8 (Python) and ESLint (JavaScript)
- Material-UI components are used consistently
- All features are tested

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation at `http://localhost:8001/docs`
3. Check Ollama and model availability

---

**Happy Studying! 🎓**
