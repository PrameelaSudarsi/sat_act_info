import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Tabs,
  Tab,
  Grid,
} from '@mui/material';
import {
  School as SchoolIcon,
  Search as SearchIcon,
  VideoLibrary as VideoIcon,
  Book as BookIcon,
  ExpandMore,
  Send as SendIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import { satApiService } from '../services/satApi';

function SATPractice() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [mode, setMode] = useState('question'); // 'question' or 'concept'

  const handlePracticeQuestion = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await satApiService.practiceQuestion(question, true, true, true);
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to get response');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplainConcept = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await satApiService.explainConcept(question, true, true, true);
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to get response');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (mode === 'question') {
      handlePracticeQuestion();
    } else {
      handleExplainConcept();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        SAT Practice Assistant
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Get comprehensive help with SAT questions and concepts using AI, your practice materials, and online resources.
      </Typography>

      {/* Mode Selection */}
      <Box sx={{ mb: 3 }}>
        <Tabs value={mode} onChange={(e, v) => setMode(v)}>
          <Tab
            value="question"
            label="Practice Question"
            icon={<SchoolIcon />}
            iconPosition="start"
          />
          <Tab
            value="concept"
            label="Explain Concept"
            icon={<LightbulbIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Input Area */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={
            mode === 'question'
              ? 'Enter your SAT practice question here...'
              : 'Enter a concept you want to understand (e.g., "quadratic equations", "reading comprehension strategies")...'
          }
          disabled={isLoading}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={() => {
              setQuestion('');
              setResult(null);
              setError(null);
            }}
            disabled={isLoading}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading || !question.trim()}
            startIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
            size="large"
          >
            {isLoading
              ? 'Processing...'
              : mode === 'question'
              ? 'Get Answer'
              : 'Explain Concept'}
          </Button>
        </Box>
      </Paper>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Results */}
      {result && (
        <Box>
          {/* Answer/Explanation */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <SchoolIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                {mode === 'question' ? 'Answer & Explanation' : 'Concept Explanation'}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography
              variant="body1"
              sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}
            >
              {result.explanation || result.answer}
            </Typography>

            {/* Step by Step */}
            {result.step_by_step && result.step_by_step.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Step-by-Step Solution:
                </Typography>
                {result.step_by_step.map((step, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mb: 1, pl: 2 }}>
                    {step}
                  </Typography>
                ))}
              </Box>
            )}
          </Paper>

          {/* Resources Tabs */}
          <Paper elevation={2} sx={{ mb: 3 }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label="Practice Materials" icon={<BookIcon />} iconPosition="start" />
              <Tab label="Web Resources" icon={<SearchIcon />} iconPosition="start" />
              <Tab label="Video Explanations" icon={<VideoIcon />} iconPosition="start" />
            </Tabs>

            {/* Practice Materials Tab */}
            {tabValue === 0 && (
              <Box sx={{ p: 3 }}>
                {result.rag_sources && result.rag_sources.length > 0 ? (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Relevant Content from Your Practice Materials
                    </Typography>
                    {result.rag_sources.map((source, idx) => (
                      <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Chip
                            label={source.source.split('/').pop()}
                            size="small"
                            color="primary"
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {source.content}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                ) : (
                  <Alert severity="info">
                    No relevant content found in your practice materials. Upload SAT PDFs to get better results!
                  </Alert>
                )}
              </Box>
            )}

            {/* Web Resources Tab */}
            {tabValue === 1 && (
              <Box sx={{ p: 3 }}>
                {result.search_results && result.search_results.length > 0 ? (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Additional Online Resources
                    </Typography>
                    {result.search_results.map((result, idx) => (
                      <Card key={idx} variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            {result.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {result.snippet}
                          </Typography>
                          <Button
                            size="small"
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Source
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                ) : (
                  <Alert severity="info">No web resources found.</Alert>
                )}
              </Box>
            )}

            {/* Video Explanations Tab */}
            {tabValue === 2 && (
              <Box sx={{ p: 3 }}>
                {result.youtube_videos && result.youtube_videos.length > 0 ? (
                  <Grid container spacing={2}>
                    {result.youtube_videos.map((video, idx) => (
                      <Grid item xs={12} md={6} key={idx}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              {video.title}
                            </Typography>
                            {video.embed_url ? (
                              <Box
                                sx={{
                                  position: 'relative',
                                  paddingTop: '56.25%', // 16:9 aspect ratio
                                  mt: 2,
                                }}
                              >
                                <iframe
                                  src={video.embed_url}
                                  title={video.title}
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                  }}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </Box>
                            ) : (
                              <Button
                                variant="contained"
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                fullWidth
                                sx={{ mt: 2 }}
                              >
                                Watch on YouTube
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="info">No video explanations found.</Alert>
                )}
              </Box>
            )}
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default SATPractice;
