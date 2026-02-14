import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Chip,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Grid,
} from '@mui/material';
import {
  School as SchoolIcon,
  Menu as MenuIcon,
  Book as BookIcon,
  CloudUpload as UploadIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckCircleIcon,
  Chat as ChatIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import MockTestCenter from './components/MockTestCenter';
import CollegeAdmissionGuide from './components/CollegeAdmissionGuide';
import SAT2026StudyGuide from './components/SAT2026StudyGuide';
import ChatSession from './components/ChatSession';
import Login from './components/Login';
import { satApiService } from './services/satApi';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1e40af',
    },
    secondary: {
      main: '#7c3aed',
      light: '#a78bfa',
      dark: '#5b21b6',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.005em',
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01071em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    ...Array(18).fill('0 25px 50px -12px rgb(0 0 0 / 0.25)'),
  ],
});

const drawerWidth = 280;

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [kbInfo, setKbInfo] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('sat_auth_user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        checkConnection();
        loadKBInfo();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const checkConnection = async () => {
    try {
      // Skip Ollama check since we're not using backend
      setIsConnected(true);
      setConnectionStatus('connected');
    } catch (error) {
      setIsConnected(false);
      setConnectionStatus('error');
    }
  };

  const loadKBInfo = async () => {
    try {
      // Mock KB info since no backend
      setKbInfo({
        total_chunks: 150,
        total_sources: 5,
        sources: ['SAT Practice Guide.pdf', 'Math Review.pdf', 'Reading Strategies.pdf']
      });
    } catch (error) {
      console.error('Error loading KB info:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setUploadSuccess(false);

    try {
      const response = await satApiService.addDocuments(files);
      if (response.success) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
        loadKBInfo();
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload documents');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('sat_auth_user');
    setUser(null);
  };

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <AppBar position="static" elevation={0} sx={{ 
          bgcolor: 'white', 
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Toolbar sx={{ py: 1 }}>
            <IconButton
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <SchoolIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: 'text.primary' }}>
              SAT Excellence Center
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                label={user} 
                size="small" 
                sx={{ 
                  fontWeight: 600,
                  display: { xs: 'none', sm: 'flex' }
                }} 
              />
              <IconButton onClick={handleLogout} title="Logout" sx={{ color: 'text.secondary' }}>
                <LogoutIcon />
              </IconButton>
              <Chip
                icon={
                  <CheckCircleIcon
                    sx={{
                      color: isConnected ? 'success.main' : 'error.main',
                    }}
                  />
                }
                label={connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
                color={isConnected ? 'success' : 'default'}
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white' }}
              />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
          <Drawer
            variant="persistent"
            open={drawerOpen}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                borderRight: '1px solid',
                borderColor: 'divider',
                position: 'fixed',
                height: '100%',
                top: 64, // Height of AppBar
                zIndex: theme.zIndex.drawer
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto', p: 2.5, bgcolor: '#ffffff', minHeight: '100vh' }}>
              {/* Study Resources */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1.5, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                  Study Materials
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <SAT2026StudyGuide />
                  <CollegeAdmissionGuide />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Quick Info */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1.5, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                  Quick Reference
                </Typography>
                <Paper sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">SAT Math:</Typography>
                      <Typography variant="caption" fontWeight="600">44Q / 70min</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">SAT English:</Typography>
                      <Typography variant="caption" fontWeight="600">54Q / 64min</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">ACT Math:</Typography>
                      <Typography variant="caption" fontWeight="600">60Q / 60min</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>

              {/* Target Scores */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1.5, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                  Target Scores
                </Typography>
                <Paper sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 2 }}>
                  <Typography variant="caption" fontWeight="600" sx={{ display: 'block', mb: 1 }}>SAT Benchmarks</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">Ivy League:</Typography>
                      <Typography variant="caption" fontWeight="600">1500+</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">Top 20:</Typography>
                      <Typography variant="caption" fontWeight="600">1400+</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">State Schools:</Typography>
                      <Typography variant="caption" fontWeight="600">1200+</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Official Links */}
              <Box>
                <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1.5, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                  Official Resources
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Button
                    variant="text"
                    size="small"
                    href="https://collegereadiness.collegeboard.org/sat"
                    target="_blank"
                    sx={{ justifyContent: 'flex-start', textTransform: 'none', fontSize: '0.75rem', px: 1 }}
                  >
                    College Board SAT
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    href="https://www.act.org"
                    target="_blank"
                    sx={{ justifyContent: 'flex-start', textTransform: 'none', fontSize: '0.75rem', px: 1 }}
                  >
                    ACT Official
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    href="https://apcentral.collegeboard.org"
                    target="_blank"
                    sx={{ justifyContent: 'flex-start', textTransform: 'none', fontSize: '0.75rem', px: 1 }}
                  >
                    AP Central
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    href="https://www.khanacademy.org/test-prep"
                    target="_blank"
                    sx={{ justifyContent: 'flex-start', textTransform: 'none', fontSize: '0.75rem', px: 1 }}
                  >
                    Khan Academy
                  </Button>
                </Box>
              </Box>
            </Box>
          </Drawer>

          {/* Main Content Area */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 0,
              marginLeft: drawerOpen ? `${drawerWidth}px` : 0,
              width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
              transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              display: 'flex',
              height: 'calc(100vh - 64px)',
              overflow: 'hidden'
            }}
          >
            {!isConnected && (
              <Alert severity="info" sx={{ m: 2, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
                Frontend-only mode: All features work without backend connection
              </Alert>
            )}
            
            {/* Left side - Mock Test Center */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <MockTestCenter />
            </Box>
            
            {/* Right side - Chat Window (only when enabled and drawer open) */}
            {chatEnabled && drawerOpen && (
              <Box sx={{ width: 300, borderLeft: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ p: 1, bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="subtitle1">Study Assistant</Typography>
                </Box>
                <ChatSession embedded={true} />
              </Box>
            )}
          </Box>
        </Box>
        
        {/* Floating Chat (only when enabled and drawer closed) */}
        {chatEnabled && !drawerOpen && <ChatSession />}
      </Box>
    </ThemeProvider>
  );
}

export default App;