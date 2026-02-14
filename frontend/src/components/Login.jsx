import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, School } from '@mui/icons-material';

// Hardcoded users - In production, use backend authentication
const VALID_USERS = [
  { username: 'admin', password: 'Cloud@2026#' },
  { username: 'student', password: 'student123' },
  { username: 'teacher', password: 'teacher123' },
];

const MAX_SESSIONS = 2;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const checkActiveSessions = (username) => {
    const sessions = JSON.parse(localStorage.getItem('sat_active_sessions') || '{}');
    const userSessions = sessions[username] || [];
    const now = Date.now();
    const activeSessions = userSessions.filter(s => now - s < 24 * 60 * 60 * 1000);
    return activeSessions.length;
  };

  const addSession = (username) => {
    const sessions = JSON.parse(localStorage.getItem('sat_active_sessions') || '{}');
    if (!sessions[username]) sessions[username] = [];
    sessions[username].push(Date.now());
    localStorage.setItem('sat_active_sessions', JSON.stringify(sessions));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    const user = VALID_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const activeSessions = checkActiveSessions(username);
      if (activeSessions >= MAX_SESSIONS) {
        setError('Maximum login limit reached. This account is already active on multiple devices. Please logout from other sessions or contact administrator.');
        return;
      }
      addSession(username);
      localStorage.setItem('sat_auth_user', username);
      onLogin(username);
    } else {
      setError('Authentication failed. Please verify your credentials and try again.');
      setPassword('');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <School sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />
          <Typography variant="h5" fontWeight="700" gutterBottom>
            SAT/ACT Excellence Center
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to access test prep materials
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            autoFocus
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
