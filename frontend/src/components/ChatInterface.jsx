import { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Send as SendIcon,
  AutoAwesome as SparklesIcon,
  Description as FileTextIcon,
} from '@mui/icons-material';
import { apiService } from '../services/api';

function ChatInterface({ isConnected, useRag, onMessageSent }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [retrievedDocs, setRetrievedDocs] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isConnected) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setRetrievedDocs([]);

    // Add user message
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await apiService.chat(userMessage, useRag);
      
      if (response.success) {
        const assistantMessage = {
          role: 'assistant',
          content: response.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        
        if (response.retrieved_docs && response.retrieved_docs.length > 0) {
          setRetrievedDocs(response.retrieved_docs);
        }
        
        if (onMessageSent) {
          onMessageSent();
        }
      } else {
        throw new Error(response.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: `Error: ${error.message || 'Failed to get response. Please check if Ollama is running.'}`,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content) => {
    return content.split('\n').map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>
      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.length === 0 && (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Card
              sx={{
                maxWidth: 600,
                textAlign: 'center',
                p: 4,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <SparklesIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Welcome to Ollama Agent
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Ask me anything! I can help you with questions using RAG (Retrieval Augmented Generation)
                  to provide accurate answers from your knowledge base.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Chip label="RAG Enabled" color="primary" variant="outlined" />
                  <Chip label="Local AI" color="success" variant="outlined" />
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 2,
                maxWidth: '70%',
                bgcolor:
                  message.role === 'user'
                    ? 'primary.main'
                    : message.isError
                    ? 'error.light'
                    : 'background.paper',
                color:
                  message.role === 'user'
                    ? 'primary.contrastText'
                    : message.isError
                    ? 'error.contrastText'
                    : 'text.primary',
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {formatMessage(message.content)}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 1,
                  opacity: 0.7,
                }}
              >
                {message.timestamp.toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Thinking...
              </Typography>
            </Paper>
          </Box>
        )}

        {retrievedDocs.length > 0 && (
          <Card sx={{ bgcolor: 'info.light', mt: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FileTextIcon color="info" />
                <Typography variant="subtitle2" fontWeight="bold">
                  Retrieved Documents ({retrievedDocs.length})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {retrievedDocs.map((doc, idx) => (
                  <Card key={idx} variant="outlined" sx={{ bgcolor: 'background.paper' }}>
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        color="primary"
                        sx={{ display: 'block', mb: 0.5 }}
                      >
                        {doc.source || 'Unknown Source'}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {doc.content}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        <div ref={messagesEndRef} />
      </Box>

      <Divider />

      {/* Input Area */}
      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Box
          component="form"
          onSubmit={handleSend}
          sx={{ display: 'flex', gap: 1 }}
        >
          <TextField
            inputRef={inputRef}
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isConnected
                ? 'Type your message...'
                : 'Connect to Ollama first...'
            }
            disabled={!isConnected || isLoading}
            variant="outlined"
            size="small"
          />
          <IconButton
            type="submit"
            disabled={!isConnected || isLoading || !input.trim()}
            color="primary"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '&.Mui-disabled': {
                bgcolor: 'action.disabledBackground',
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <SendIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatInterface;
