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
} from '@mui/icons-material';
import MockTestCenter from './components/MockTestCenter';
import SATSyllabus from './components/SATSyllabus';
import ACTSyllabus from './components/ACTSyllabus';
import StudyGuide from './components/StudyGuide';
import MockTests from './components/MockTests';
import CollegeAdmissionGuide from './components/CollegeAdmissionGuide';
import SAT2026StudyGuide from './components/SAT2026StudyGuide';
import ChatSession from './components/ChatSession';
import { satApiService } from './services/satApi';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },
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

  useEffect(() => {
    const timer = setTimeout(() => {
      checkConnection();
      loadKBInfo();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <AppBar position="static" color="primary" elevation={2}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <SchoolIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
              SAT Practice Assistant
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button 
                color="inherit" 
                onClick={() => setChatEnabled(!chatEnabled)}
                sx={{ border: '1px solid white' }}
              >
                {chatEnabled ? 'Disable Chat' : 'Enable Chat'}
              </Button>
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
            <Box sx={{ overflow: 'auto', p: 2.5, bgcolor: '#fafbfc', minHeight: '100vh' }}>
              {/* Header Section */}
              <Paper elevation={0} sx={{ 
                p: 3, 
                mb: 3, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white', 
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)'
              }}>
                <Typography variant="h6" fontWeight="700" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, letterSpacing: '-0.01em' }}>
                  🎆 SAT/ACT/AP Hub
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95, fontSize: '0.85rem' }}>
                  Complete test prep & college success
                </Typography>
              </Paper>

              {/* Quick Stats */}
              <Grid container spacing={1} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd', borderRadius: 2 }}>
                    <Typography variant="h6" color="primary" fontWeight="bold">44</Typography>
                    <Typography variant="caption" color="text.secondary">SAT Math Qs</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f3e5f5', borderRadius: 2 }}>
                    <Typography variant="h6" color="secondary" fontWeight="bold">70</Typography>
                    <Typography variant="caption" color="text.secondary">Minutes</Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* SAT 2026 Pattern */}
              <Card sx={{ mb: 3, border: '2px solid #1976d2', borderRadius: 3, bgcolor: '#e3f2fd' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="subtitle1" fontWeight="700" gutterBottom sx={{ color: '#1565c0', display: 'flex', alignItems: 'center', gap: 1 }}>
                    📋 SAT 2026 Math Pattern
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'white', borderRadius: 1 }}>
                      <Typography variant="caption" fontWeight="600">Total Questions:</Typography>
                      <Typography variant="caption">44 (22 per module)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'white', borderRadius: 1 }}>
                      <Typography variant="caption" fontWeight="600">Total Time:</Typography>
                      <Typography variant="caption">70 min (35 per module)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'white', borderRadius: 1 }}>
                      <Typography variant="caption" fontWeight="600">Question Types:</Typography>
                      <Typography variant="caption">75% MC, 25% Grid-in</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, bgcolor: 'white', borderRadius: 1 }}>
                      <Typography variant="caption" fontWeight="600">Score Range:</Typography>
                      <Typography variant="caption">200-800</Typography>
                    </Box>
                    <Box sx={{ p: 1, bgcolor: '#bbdefb', borderRadius: 1 }}>
                      <Typography variant="caption" fontWeight="600" sx={{ color: '#0d47a1', display: 'block', mb: 0.5 }}>Calculator:</Typography>
                      <Typography variant="caption" sx={{ color: '#1565c0', fontSize: '0.7rem' }}>Allowed for both modules. Built-in Desmos or approved handheld.</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Divider sx={{ my: 2 }} />

              {/* Main Resources */}
              <Card variant="outlined" sx={{ 
                background: '#ffffff', 
                color: '#333', 
                mb: 3, 
                borderRadius: 3,
                border: '2px solid #667eea',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.15)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#667eea' }}>
                    📚 Study Resources
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <SAT2026StudyGuide />
                    <StudyGuide />
                    <MockTests />
                    <CollegeAdmissionGuide />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <SATSyllabus />
                      <ACTSyllabus />
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* AP Exam Resources */}
              <Card variant="outlined" sx={{ 
                background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)', 
                color: '#333', 
                mb: 3, 
                borderRadius: 3,
                border: '2px solid #ff9800',
                boxShadow: '0 4px 20px rgba(255, 152, 0, 0.15)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#f57c00' }}>
                    🎓 AP Exam Center
                  </Typography>
                  
                  {/* AP Test Categories */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#e65100', mb: 1 }}>
                      Available AP Tests:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 1 }}>
                        <Typography sx={{ fontSize: '1.2rem' }}>∫</Typography>
                        <Typography variant="caption" fontWeight="bold">AP Calculus AB</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 1 }}>
                        <Typography sx={{ fontSize: '1.2rem' }}>⚛️</Typography>
                        <Typography variant="caption" fontWeight="bold">AP Physics 1</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 1 }}>
                        <Typography sx={{ fontSize: '1.2rem' }}>🧪</Typography>
                        <Typography variant="caption" fontWeight="bold">AP Chemistry</Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* AP Score Distribution */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#e65100', mb: 1 }}>
                      AP Score Guide:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#bf360c' }}>Score 5:</Typography>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#2e7d32' }}>Extremely Qualified</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#bf360c' }}>Score 4:</Typography>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#388e3c' }}>Well Qualified</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#bf360c' }}>Score 3:</Typography>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#f57c00' }}>Qualified</Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* AP Official Links */}
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#e65100', mb: 1 }}>
                      Official AP Resources:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Button
                        variant="text"
                        size="small"
                        href="https://apcentral.collegeboard.org"
                        target="_blank"
                        sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#e65100', fontSize: '0.75rem' }}
                      >
                        AP Central - College Board
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        href="https://apstudents.collegeboard.org"
                        target="_blank"
                        sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#e65100', fontSize: '0.75rem' }}
                      >
                        AP Students Portal
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        href="https://www.khanacademy.org/test-prep/ap-calculus-ab"
                        target="_blank"
                        sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#e65100', fontSize: '0.75rem' }}
                      >
                        Khan Academy AP Prep
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Test Prep Tips */}
              <Card sx={{ bgcolor: '#fff3e0', border: '1px solid #ffb74d', borderRadius: 2, mb: 3 }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: '#f57c00', display: 'flex', alignItems: 'center', gap: 1 }}>
                    💡 Test Prep Strategy
                  </Typography>
                  <Typography variant="caption" component="div" sx={{ color: '#bf360c' }}>
                    <ul style={{ margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
                      <li>SAT/ACT: Take 3-4 practice tests</li>
                      <li>AP: Review past FRQs & scoring rubrics</li>
                      <li>Focus on weak subject areas</li>
                      <li>Time management is crucial</li>
                      <li>Use official prep materials</li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>

              {/* AP Exam Calendar */}
              <Card sx={{ bgcolor: '#f3e5f5', border: '1px solid #ba68c8', borderRadius: 2, mb: 3 }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: '#8e24aa', display: 'flex', alignItems: 'center', gap: 1 }}>
                    📅 2025 AP Exam Dates
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#4a148c' }}>Calculus AB:</Typography>
                      <Typography variant="caption" fontWeight="bold" sx={{ color: '#4a148c' }}>May 5, 2025</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#4a148c' }}>Physics 1:</Typography>
                      <Typography variant="caption" fontWeight="bold" sx={{ color: '#4a148c' }}>May 7, 2025</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#4a148c' }}>Chemistry:</Typography>
                      <Typography variant="caption" fontWeight="bold" sx={{ color: '#4a148c' }}>May 12, 2025</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#6a1b9a', fontStyle: 'italic', mt: 1 }}>
                      Registration: February - March 2025
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Score Targets */}
              <Card sx={{ bgcolor: '#e8f5e8', border: '1px solid #4caf50', borderRadius: 2, mb: 3 }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: '#2e7d32', display: 'flex', alignItems: 'center', gap: 1 }}>
                    🎯 Target Scores
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#1b5e20', display: 'block', mb: 0.5 }}>SAT Targets:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" sx={{ color: '#1b5e20' }}>Ivy League:</Typography>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#1b5e20' }}>1500+ SAT</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" sx={{ color: '#1b5e20' }}>Top 20:</Typography>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#1b5e20' }}>1400+ SAT</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" sx={{ color: '#1b5e20' }}>State Schools:</Typography>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#1b5e20' }}>1200+ SAT</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#1b5e20', display: 'block', mb: 0.5 }}>AP Credit:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" sx={{ color: '#1b5e20' }}>Most Colleges:</Typography>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#1b5e20' }}>Score 3+</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" sx={{ color: '#1b5e20' }}>Top Colleges:</Typography>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#1b5e20' }}>Score 4-5</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* External Links */}
              <Card sx={{ bgcolor: '#f3e5f5', border: '1px solid #9c27b0', borderRadius: 2, mb: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: '#7b1fa2', display: 'flex', alignItems: 'center', gap: 1 }}>
                    🔗 Official Resources
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#6a1b9a', mb: 0.5 }}>SAT/ACT:</Typography>
                    <Button
                      variant="text"
                      size="small"
                      href="https://collegereadiness.collegeboard.org/sat"
                      target="_blank"
                      sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#7b1fa2', fontSize: '0.75rem' }}
                    >
                      College Board SAT
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      href="https://www.khanacademy.org/test-prep/sat"
                      target="_blank"
                      sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#7b1fa2', fontSize: '0.75rem' }}
                    >
                      Khan Academy SAT
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      href="https://www.act.org"
                      target="_blank"
                      sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#7b1fa2', fontSize: '0.75rem' }}
                    >
                      ACT Official
                    </Button>
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#6a1b9a', mt: 1, mb: 0.5 }}>College Search:</Typography>
                    <Button
                      variant="text"
                      size="small"
                      href="https://bigfuture.collegeboard.org"
                      target="_blank"
                      sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#7b1fa2', fontSize: '0.75rem' }}
                    >
                      BigFuture College Search
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      href="https://www.commonapp.org"
                      target="_blank"
                      sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#7b1fa2', fontSize: '0.75rem' }}
                    >
                      Common Application
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              {/* Footer */}
              <Paper sx={{ p: 2, bgcolor: '#e8f4fd', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  SAT/ACT Excellence Center © 2024
                </Typography>
              </Paper>
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