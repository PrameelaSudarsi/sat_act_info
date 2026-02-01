import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Chip,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Quiz as QuizIcon,
  School as SchoolIcon,
  Timer as TimerIcon,
  Assignment as AssignmentIcon,
  Launch as LaunchIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import { satApiService } from '../services/satApi';

const MockTests = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [allTests, setAllTests] = useState([]);
  const [mathTests, setMathTests] = useState([]);
  const [readingTests, setReadingTests] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMockTests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock data since backend is not available
      const mockAllTests = [
        {
          title: "SAT Practice Test 1",
          description: "Official College Board SAT Practice Test",
          source: "College Board",
          questions_count: 154,
          difficulty: "Medium",
          sections: ["Math", "Reading", "Writing"],
          url: "https://collegereadiness.collegeboard.org/sat/practice/full-length-practice-tests"
        },
        {
          title: "SAT Practice Test 2",
          description: "Official College Board SAT Practice Test",
          source: "College Board",
          questions_count: 154,
          difficulty: "Medium",
          sections: ["Math", "Reading", "Writing"],
          url: "https://collegereadiness.collegeboard.org/sat/practice/full-length-practice-tests"
        },
        {
          title: "Khan Academy SAT Math",
          description: "Comprehensive math practice",
          source: "Khan Academy",
          questions_count: 58,
          difficulty: "Easy",
          sections: ["Math"],
          url: "https://www.khanacademy.org/test-prep/sat"
        }
      ];
      
      setAllTests(mockAllTests);
      setMathTests(mockAllTests.filter(t => t.sections.includes("Math")));
      setReadingTests(mockAllTests.filter(t => t.sections.includes("Reading")));
      
      setRecommendations({
        beginner: ["Start with Khan Academy basics", "Focus on one section at a time"],
        intermediate: ["Take official College Board tests", "Time yourself"],
        advanced: ["Take full-length tests under real conditions", "Focus on weak areas"]
      });

    } catch (err) {
      setError('Mock tests loaded successfully (offline mode)');
      console.log('Using mock data for tests');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    if (allTests.length === 0) {
      fetchMockTests();
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  const TestCard = ({ test }) => (
    <Card sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" color="primary">
            {test.title}
          </Typography>
          <Chip 
            label={test.source} 
            color={test.source === 'College Board' ? 'primary' : 'secondary'} 
            size="small" 
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {test.description}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip icon={<AssignmentIcon />} label={`${test.questions_count} questions`} size="small" />
          <Chip icon={<TimerIcon />} label={test.difficulty} size="small" />
          {test.sections.map((section, idx) => (
            <Chip key={idx} label={section} variant="outlined" size="small" />
          ))}
        </Box>
        
        <Button
          variant="contained"
          color="primary"
          href={test.url}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<LaunchIcon />}
          sx={{ textTransform: 'none' }}
        >
          Take Test
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpen}
        sx={{ mb: 1, textTransform: 'none', width: '100%' }}
        startIcon={<QuizIcon />}
      >
        SAT Mock Tests
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2, maxHeight: '90vh' }
        }}
      >
        <DialogTitle sx={{ bgcolor: 'success.main', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
          <QuizIcon />
          SAT Mock Tests & Practice Resources
        </DialogTitle>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="All Tests" />
            <Tab label="By Section" />
            <Tab label="Recommendations" />
          </Tabs>
        </Box>

        <DialogContent sx={{ p: 0, height: '70vh', overflow: 'auto' }}>
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ m: 2 }}>
              {error}
            </Alert>
          )}

          {/* All Tests Tab */}
          <TabPanel value={tabValue} index={0}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <strong>Official SAT Practice Tests</strong><br/>
              These tests are sourced from official providers including College Board, Khan Academy, and Princeton Review.
            </Alert>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                  <Typography variant="h6">{allTests.length}</Typography>
                  <Typography variant="caption">Total Tests</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
                  <Typography variant="h6">
                    {allTests.filter(t => t.source === 'College Board').length}
                  </Typography>
                  <Typography variant="caption">Official CB Tests</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                  <Typography variant="h6">
                    {allTests.filter(t => t.source === 'Khan Academy').length}
                  </Typography>
                  <Typography variant="caption">Khan Academy</Typography>
                </Paper>
              </Grid>
            </Grid>

            {allTests.map((test, index) => (
              <TestCard key={index} test={test} />
            ))}
          </TabPanel>

          {/* By Section Tab */}
          <TabPanel value={tabValue} index={1}>
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">📐 Math Tests ({mathTests.length})</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {mathTests.map((test, index) => (
                  <TestCard key={index} test={test} />
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">📖 Reading Tests ({readingTests.length})</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {readingTests.map((test, index) => (
                  <TestCard key={index} test={test} />
                ))}
              </AccordionDetails>
            </Accordion>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>💡 Tip:</strong> All tests include multiple sections. The filtering above shows tests that contain the specified section.
              </Typography>
            </Alert>
          </TabPanel>

          {/* Recommendations Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h5" gutterBottom color="primary">
              📚 Test Recommendations by Level
            </Typography>
            
            {Object.entries(recommendations).map(([level, recs]) => (
              <Card key={level} sx={{ mb: 3, border: '2px solid', borderColor: 'primary.light' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LightbulbIcon color="primary" />
                    <Typography variant="h6" color="primary" sx={{ textTransform: 'capitalize' }}>
                      {level} Level
                    </Typography>
                  </Box>
                  
                  <List dense>
                    {recs.map((rec, idx) => (
                      <ListItem key={idx}>
                        <ListItemText 
                          primary={rec}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}

            <Card sx={{ bgcolor: 'warning.light' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🎯 Study Strategy
                </Typography>
                <Typography variant="body2">
                  • <strong>Beginners:</strong> Start with easier tests and focus on understanding concepts<br/>
                  • <strong>Intermediate:</strong> Take official tests in order and track your progress<br/>
                  • <strong>Advanced:</strong> Focus on timing and take tests under real conditions<br/>
                  • <strong>All Levels:</strong> Review explanations for every question, even correct ones
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            href="https://www.khanacademy.org/test-prep/sat"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
          >
            Khan Academy
          </Button>
          <Button
            href="https://collegereadiness.collegeboard.org/sat/practice"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
          >
            College Board
          </Button>
          <Button onClick={() => setOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MockTests;