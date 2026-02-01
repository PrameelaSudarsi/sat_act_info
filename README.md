# Strads Agent with Ollama - Local RAG + MCP

A local AI agent project using Ollama models with RAG (Retrieval Augmented Generation) and MCP (Model Context Protocol) support. This project runs entirely locally without requiring AWS services.

## Features

- ✅ **Local Ollama Models** - Use any Ollama model locally
- ✅ **RAG (Retrieval Augmented Generation)** - Local vector store with ChromaDB
- ✅ **MCP Server** - Model Context Protocol for IDE integration
- ✅ **Agent Framework** - Autonomous agent with tool calling
- ✅ **Knowledge Base** - Local document storage and retrieval
- ✅ **Jupyter Notebooks** - Interactive demos and testing
- ✅ **Zero Cloud Costs** - Everything runs locally

## Prerequisites

1. **Ollama Installed** - [Download Ollama](https://ollama.ai/)
2. **Python 3.10+** installed
3. **Local Documents** - Files to create knowledge base

## Quick Start

### 1. Install Ollama

```bash
# macOS
brew install ollama

# Or download from https://ollama.ai/
```

### 2. Pull a Model

```bash
# Pull a model (choose one)
ollama pull llama3.2
ollama pull mistral
ollama pull qwen2.5
ollama pull phi3
```

### 3. Set Up Project

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env
```

### 4. Create Knowledge Base

```bash
# Add documents to data/ directory
mkdir -p data
cp your-documents/* data/

# Create knowledge base
python knowledge_base_setup.py
```

### 5. Start MCP Server

```bash
python mcp_server.py
```

### 6. Use the Agent

```python
from ollama_agent import OllamaAgent

agent = OllamaAgent(model="llama3.2")
response = agent.chat("What information do you have?")
print(response)
```

## Project Structure

```
.
├── config.py                  # Configuration
├── ollama_agent.py            # Main agent implementation
├── knowledge_base_setup.py    # RAG knowledge base setup
├── mcp_server.py              # MCP server for IDE integration
├── rag_engine.py              # RAG retrieval engine
├── vector_store.py            # Vector store management
├── requirements.txt           # Python dependencies
├── .env.example               # Environment template
├── data/                      # Documents directory
├── chroma_db/                 # Vector database (auto-created)
└── README.md                  # This file
```

## Configuration

Edit `.env` file:

```bash
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
AGENT_NAME=StradsOllamaAgent
MAX_TOKENS=4096
TEMPERATURE=0.7
```

## Usage Examples

### Basic Chat

```python
from ollama_agent import OllamaAgent

agent = OllamaAgent()
response = agent.chat("Hello, how are you?")
print(response)
```

### RAG Query

```python
from ollama_agent import OllamaAgent

agent = OllamaAgent(use_rag=True)
response = agent.query_with_rag(
    "What information do you have about machine learning?",
    knowledge_base_id="default"
)
print(response)
```

### MCP Integration

The MCP server provides tools for:
- `list_knowledge_bases` - List available knowledge bases
- `query_knowledge_base` - Query with RAG
- `add_documents` - Add documents to knowledge base
- `get_agent_response` - Get agent responses

## VS Code Integration with Continue

### Setup Continue Extension

1. **Install Continue Extension**
   - Open VS Code
   - Go to Extensions (Cmd+Shift+X)
   - Search "Continue" (by Continue.dev)
   - Click Install

2. **Configure Local Ollama Model**
   - Open Command Palette (Cmd+Shift+P)
   - Type "Continue: Open Config File"
   - Add your local model configuration:

```json
{
  "models": [
    {
      "name": "Llama 3 Local",
      "provider": "ollama",
      "model": "llama3"
    }
  ]
}
```

3. **Start Using**
   - Highlight code and press Cmd+I for inline chat
   - Use Cmd+L for sidebar chat
   - The extension will use your local Ollama model

## Testing

### Run Test Suite

```bash
python test_ollama_agent.py
```

### Interactive Notebook

```bash
jupyter notebook ollama_agent_demo.ipynb
```

## MCP Setup for Cursor

See `CURSOR_MCP_SETUP.md` for Cursor IDE integration.

## Available Ollama Models

Tested with:
- **llama3.2** - Meta's Llama 3.2 (recommended)
- **mistral** - Mistral 7B
- **qwen2.5** - Qwen 2.5
- **phi3** - Microsoft Phi-3
- **nomic-embed-text** - Embedding model

## Troubleshooting

### Ollama not running
```bash
ollama serve
```

### Model not found
```bash
ollama pull <model-name>
```

### Vector store issues
```bash
# Reset vector store
rm -rf chroma_db/
python knowledge_base_setup.py
```

## License

MIT
