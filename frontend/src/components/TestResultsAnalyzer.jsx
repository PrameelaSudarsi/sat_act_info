import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  LinearProgress,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  TrendingDown as WeakIcon,
  TrendingUp as StrongIcon,
  School as StudyIcon,
} from '@mui/icons-material';

const TestResultsAnalyzer = () => {
  const [open, setOpen] = useState(false);
  const [testResults, setTestResults] = useState({
    math: { correct: '', total: '' },
    english: { correct: '', total: '' },
    reading: { correct: '', total: '' },
    science: { correct: '', total: '' }
  });
  const [analysis, setAnalysis] = useState(null);

  const analyzeResults = () => {
    const results = [];
    let totalCorrect = 0, totalQuestions = 0;

    Object.entries(testResults).forEach(([section, data]) => {
      if (data.correct && data.total) {
        const percentage = (parseInt(data.correct) / parseInt(data.total)) * 100;
        totalCorrect += parseInt(data.correct);
        totalQuestions += parseInt(data.total);
        
        results.push({
          section: section.charAt(0).toUpperCase() + section.slice(1),
          percentage: percentage.toFixed(1),
          correct: data.correct,
          total: data.total,
          status: percentage >= 75 ? 'strong' : percentage >= 60 ? 'medium' : 'weak'
        });
      }
    });

    const overallScore = ((totalCorrect / totalQuestions) * 100).toFixed(1);
    setAnalysis({ results, overallScore });
  };

  const handleInputChange = (section, field, value) => {
    setTestResults(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'weak': return 'error';
      case 'medium': return 'warning';
      case 'strong': return 'success';
      default: return 'primary';
    }
  };

  const getRecommendation = (status, section) => {
    const recommendations = {
      weak: `Focus heavily on ${section} - 60+ min daily practice needed`,
      medium: `Improve ${section} - 30-45 min daily practice recommended`, 
      strong: `Maintain ${section} strength - 15-20 min daily review`
    };
    return recommendations[status];
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
        sx={{ mb: 1, textTransform: 'none', width: '100%' }}
        startIcon={<AssessmentIcon />}
      >
        Test Results Analyzer
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'secondary.main', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssessmentIcon />
          📊 Mock Test Results Analyzer
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Enter your test scores to identify weak areas and get targeted study recommendations.
          </Alert>

          {/* Score Input Grid */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {Object.entries(testResults).map(([section, data]) => {
              const percentage = data.correct && data.total ? 
                ((parseInt(data.correct) / parseInt(data.total)) * 100).toFixed(1) : null;
              
              return (
                <Grid item xs={6} key={section}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                      <TextField
                        size="small"
                        type="number"
                        placeholder="Correct"
                        value={data.correct}
                        onChange={(e) => handleInputChange(section, 'correct', e.target.value)}
                        sx={{ width: '70px' }}
                      />
                      <Typography>/</Typography>
                      <TextField
                        size="small"
                        type="number"
                        placeholder="Total"
                        value={data.total}
                        onChange={(e) => handleInputChange(section, 'total', e.target.value)}
                        sx={{ width: '70px' }}
                      />
                    </Box>
                    {percentage && (
                      <Chip 
                        label={`${percentage}%`}
                        color={percentage >= 75 ? 'success' : percentage >= 60 ? 'warning' : 'error'}
                        sx={{ fontWeight: 'bold' }}
                      />
                    )}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          <Button 
            variant="contained" 
            onClick={analyzeResults}
            disabled={!Object.values(testResults).some(data => data.correct && data.total)}
            sx={{ mb: 3, width: '100%' }}
          >
            Analyze Results
          </Button>

          {/* Analysis Results */}
          {analysis && (
            <Box>
              {/* Overall Score */}
              <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h3" gutterBottom>{analysis.overallScore}%</Typography>
                <Typography variant="h6">Overall Score</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={parseFloat(analysis.overallScore)} 
                  sx={{ mt: 2, height: 8, bgcolor: 'rgba(255,255,255,0.3)' }}
                />
              </Paper>

              {/* Results Grid */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {analysis.results.map((result, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      border: '2px solid',
                      borderColor: `${getStatusColor(result.status)}.main`,
                      bgcolor: `${getStatusColor(result.status)}.light`,
                      color: 'white'
                    }}>
                      <Typography variant="h6" gutterBottom>{result.section}</Typography>
                      <Typography variant="h3" gutterBottom>{result.percentage}%</Typography>
                      <Typography variant="body2">{result.correct}/{result.total} correct</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        {result.status === 'weak' && <WeakIcon />}
                        {result.status === 'strong' && <StrongIcon />}
                        {result.status === 'medium' && <StudyIcon />}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* Recommendations */}
              <Paper sx={{ p: 3, bgcolor: 'info.light' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StudyIcon /> Study Recommendations
                </Typography>
                {analysis.results.map((result, index) => (
                  <Alert 
                    key={index} 
                    severity={result.status === 'weak' ? 'error' : result.status === 'medium' ? 'warning' : 'success'}
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body2">
                      <strong>{result.section}:</strong> {getRecommendation(result.status, result.section)}
                    </Typography>
                  </Alert>
                ))}
              </Paper>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TestResultsAnalyzer;