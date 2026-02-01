import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  Send as SendIcon,
  Chat as ChatIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { satApiService } from '../services/satApi';

const ChatSession = ({ embedded = false }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setLoading(true);

    try {
      const response = await satApiService.chat(currentInput, true);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.response || 'I apologize, but I encountered an issue processing your question. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'I\'m having trouble connecting right now. Please make sure the API server is running.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const MessageBubble = ({ message }) => (
    <Box sx={{ display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start', mb: 1, gap: 1 }}>
      {message.sender === 'bot' && (
        <BotIcon sx={{ color: 'primary.main', mt: 0.5 }} fontSize="small" />
      )}
      <Paper
        sx={{
          p: 1.5,
          maxWidth: '80%',
          bgcolor: message.sender === 'user' 
            ? 'primary.main' 
            : message.isError 
              ? 'error.light' 
              : 'grey.100',
          color: message.sender === 'user' ? 'white' : 'text.primary',
          borderRadius: 2
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
          {message.text}
        </Typography>
        {message.timestamp && (
          <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
            {message.timestamp}
          </Typography>
        )}
      </Paper>
      {message.sender === 'user' && (
        <PersonIcon sx={{ color: 'secondary.main', mt: 0.5 }} fontSize="small" />
      )}
    </Box>
  );

  if (embedded) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Welcome Message */}
        {messages.length === 0 && (
          <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
            <BotIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Ask me anything about SAT prep!
            </Typography>
          </Box>
        )}

        {/* Messages Area */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={20} />
              <Typography variant="body2" sx={{ ml: 1 }}>Thinking...</Typography>
            </Box>
          )}
        </Box>

        {/* Input Area */}
        <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about SAT..."
            disabled={loading}
            size="small"
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            InputProps={{
              endAdornment: (
                <IconButton 
                  onClick={handleSendMessage} 
                  disabled={!inputValue.trim() || loading}
                  size="small"
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              )
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}
      >
        <ChatIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BotIcon color="primary" />
          SAT Study Assistant
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: 400, overflow: 'auto', mb: 2 }}>
            {messages.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <BotIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Hi! I'm your SAT Study Assistant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ask me anything about SAT prep, practice questions, or study strategies!
                </Typography>
              </Box>
            )}
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" sx={{ ml: 1 }}>Thinking...</Typography>
              </Box>
            )}
          </Box>
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about SAT prep..."
            disabled={loading}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            multiline
            maxRows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || loading} variant="contained">
            Send
          </Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatSession;