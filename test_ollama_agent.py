"""
Test script for Ollama Agent
Tests basic functionality and RAG capabilities
"""

import sys
from ollama_agent import OllamaAgent
from rag_engine import RAGEngine
from config import OLLAMA_MODEL


def test_ollama_connection():
    """Test Ollama connection."""
    print("Testing Ollama connection...")
    try:
        import ollama
        models = ollama.list()
        print(f"✅ Ollama is running")
        print(f"Available models: {len(models.get('models', []))}")
        return True
    except Exception as e:
        print(f"❌ Ollama connection failed: {e}")
        print("Make sure Ollama is running: ollama serve")
        return False


def test_basic_chat():
    """Test basic chat functionality."""
    print("\n" + "="*50)
    print("Testing Basic Chat")
    print("="*50)
    
    try:
        agent = OllamaAgent(use_rag=False)
        response = agent.chat("Hello! Can you introduce yourself?")
        print(f"✅ Chat test passed")
        print(f"Response: {response[:100]}...")
        return True
    except Exception as e:
        print(f"❌ Chat test failed: {e}")
        return False


def test_rag_query():
    """Test RAG query functionality."""
    print("\n" + "="*50)
    print("Testing RAG Query")
    print("="*50)
    
    try:
        agent = OllamaAgent(use_rag=True)
        
        # Check if knowledge base has documents
        rag_engine = RAGEngine()
        kb_info = rag_engine.get_kb_info()
        
        if kb_info['total_chunks'] == 0:
            print("⚠️  Knowledge base is empty. Add documents first.")
            return True  # Not a failure, just empty
        
        result = agent.query_with_rag("What information do you have?", n_results=3)
        print(f"✅ RAG query test passed")
        print(f"Retrieved {len(result['retrieved_docs'])} documents")
        return True
    except Exception as e:
        print(f"❌ RAG query test failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_knowledge_base():
    """Test knowledge base operations."""
    print("\n" + "="*50)
    print("Testing Knowledge Base")
    print("="*50)
    
    try:
        rag_engine = RAGEngine()
        info = rag_engine.get_kb_info()
        
        print(f"✅ Knowledge base accessible")
        print(f"Total chunks: {info['total_chunks']}")
        print(f"Total sources: {info['total_sources']}")
        return True
    except Exception as e:
        print(f"❌ Knowledge base test failed: {e}")
        return False


def main():
    """Run all tests."""
    print("=" * 60)
    print("Ollama Agent Test Suite")
    print("=" * 60)
    print()
    
    results = {
        "Ollama Connection": test_ollama_connection(),
        "Basic Chat": test_basic_chat(),
        "Knowledge Base": test_knowledge_base(),
        "RAG Query": test_rag_query()
    }
    
    print("\n" + "=" * 60)
    print("Test Results")
    print("=" * 60)
    
    all_passed = True
    for test, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{test:25s}: {status}")
        if not passed:
            all_passed = False
    
    print()
    if all_passed:
        print("🎉 All tests passed!")
    else:
        print("⚠️  Some tests failed. Check the errors above.")
    
    return 0 if all_passed else 1


if __name__ == "__main__":
    sys.exit(main())
