import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Collapse,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Database as DatabaseIcon,
  CloudUpload as UploadIcon,
  Refresh as RefreshIcon,
  Book as BookIcon,
} from '@mui/icons-material';
import { apiService } from '../services/api';

const drawerWidth = 320;

function Sidebar({ models, currentModel, kbInfo, onModelChange, onRefresh }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    models: true,
    kb: true,
    upload: true,
  });

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const response = await apiService.addDocuments(files);
      if (response.success) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload documents');
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Settings
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ overflow: 'auto', flex: 1 }}>
        {isExpanded && (
          <Box sx={{ p: 2 }}>
            {/* Model Selection */}
            <Paper elevation={0} sx={{ mb: 3, border: 1, borderColor: 'divider' }}>
              <ListItemButton onClick={() => toggleSection('models')}>
                <DatabaseIcon sx={{ mr: 1, color: 'primary.main' }} />
                <ListItemText primary="Model Selection" />
                {expandedSections.models ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expandedSections.models} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {models.map((model) => (
                    <ListItem key={model} disablePadding>
                      <ListItemButton
                        selected={model === currentModel}
                        onClick={() => onModelChange(model)}
                        sx={{
                          pl: 4,
                          '&.Mui-selected': {
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                            '&:hover': {
                              bgcolor: 'primary.main',
                            },
                          },
                        }}
                      >
                        <ListItemText primary={model} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Paper>

            {/* Knowledge Base Info */}
            <Paper elevation={0} sx={{ mb: 3, border: 1, borderColor: 'divider' }}>
              <ListItemButton onClick={() => toggleSection('kb')}>
                <BookIcon sx={{ mr: 1, color: 'primary.main' }} />
                <ListItemText primary="Knowledge Base" />
                {expandedSections.kb ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expandedSections.kb} timeout="auto" unmountOnExit>
                <Box sx={{ p: 2 }}>
                  {kbInfo ? (
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Total Chunks:
                          </Typography>
                          <Chip label={kbInfo.total_chunks} size="small" color="primary" />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Sources:
                          </Typography>
                          <Chip label={kbInfo.total_sources} size="small" color="secondary" />
                        </Box>
                        {kbInfo.sources && kbInfo.sources.length > 0 && (
                          <>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="caption" fontWeight="bold" sx={{ mb: 1, display: 'block' }}>
                              Sources:
                            </Typography>
                            <Box
                              sx={{
                                maxHeight: 150,
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.5,
                              }}
                            >
                              {kbInfo.sources.map((source, idx) => (
                                <Typography
                                  key={idx}
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                  title={source}
                                >
                                  {source.split('/').pop()}
                                </Typography>
                              ))}
                            </Box>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Loading KB info...
                    </Typography>
                  )}
                </Box>
              </Collapse>
            </Paper>

            {/* Document Upload */}
            <Paper elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
              <ListItemButton onClick={() => toggleSection('upload')}>
                <UploadIcon sx={{ mr: 1, color: 'primary.main' }} />
                <ListItemText primary="Add Documents" />
                {expandedSections.upload ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expandedSections.upload} timeout="auto" unmountOnExit>
                <Box sx={{ p: 2 }}>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.txt,.doc,.docx,.md"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    style={{ display: 'none' }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        borderStyle: 'dashed',
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: 'action.hover',
                        },
                        mb: 2,
                      }}
                    >
                      {isUploading ? (
                        <Box>
                          <CircularProgress size={40} sx={{ mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Uploading...
                          </Typography>
                        </Box>
                      ) : uploadSuccess ? (
                        <Typography variant="body2" color="success.main">
                          ✓ Documents uploaded successfully!
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Click to upload PDF, TXT, DOC, DOCX, or MD files
                        </Typography>
                      )}
                    </Paper>
                  </label>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={onRefresh}
                    sx={{ mt: 1 }}
                  >
                    Refresh KB Info
                  </Button>
                </Box>
              </Collapse>
            </Paper>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default Sidebar;
