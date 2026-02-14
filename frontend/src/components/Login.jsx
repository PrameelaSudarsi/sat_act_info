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
  { username: 'admin', password: 'admin123' },
  { username: 'student', password: 'student123' },
  { username: 'teacher', password: 'teacher123' },
];

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = VALID_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('sat_auth_user', username);
      onLogin(username);
    } else {
      setError('Invalid username or password');
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
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign In
          </Button>
        </form>

        <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
            Demo Credentials:
          </Typography>
          <Typography variant="caption" display="block">
            • admin / admin123
          </Typography>
          <Typography variant="caption" display="block">
            • student / student123
          </Typography>
          <Typography variant="caption" display="block">
            • teacher / teacher123
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
