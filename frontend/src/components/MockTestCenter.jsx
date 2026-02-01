import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  Alert,
  LinearProgress,
  Chip,
  Container,
  Stack,
  Avatar,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  CircularProgress,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Google as GoogleIcon,
  Timer as TimerIcon,
  QuestionAnswer as QuestionIcon,
  PlayArrow as PlayIcon,
  Download as DownloadIcon,
  AutoAwesome as AIIcon,
} from '@mui/icons-material';

// Backend API configuration

// Generate questions using external APIs
const generateQuestionsWithOllama = async (testType, questionCount = 20) => {
  console.log(`🌐 Generating ${questionCount} ${testType} questions from external API...`);
  
  try {
    // Try OpenAI API first
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-test-key' // Replace with actual key
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `Generate exactly ${questionCount} realistic ${testType} practice questions in JSON format. Each question should have: id, question, options (A,B,C,D), correct answer, topic, difficulty. Return only the JSON array.`
        }],
        max_tokens: 4000,
        temperature: 0.7
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Try to parse JSON from response
      const jsonMatch = content.match(/\[.*\]/s);
      if (jsonMatch) {
        const questions = JSON.parse(jsonMatch[0]);
        if (questions.length >= questionCount) {
          console.log(`✅ Generated ${questions.length} questions from OpenAI`);
          return questions.slice(0, questionCount);
        }
      }
    }
    
    throw new Error('OpenAI API failed');
    
  } catch (error) {
    console.log('❌ External API failed, generating dynamic questions...');
    
    // Generate dynamic questions with variety
    const questions = [];
    const mathTopics = ['Algebra', 'Geometry', 'Statistics', 'Functions', 'Trigonometry'];
    const englishTopics = ['Grammar', 'Reading Comprehension', 'Writing', 'Vocabulary'];
    const topics = testType.includes('math') ? mathTopics : englishTopics;
    
    for (let i = 0; i < questionCount; i++) {
      const topic = topics[i % topics.length];
      const difficulty = ['Easy', 'Medium', 'Hard'][i % 3];
      
      let question, options, correct;
      
      if (testType.includes('math')) {
        // Generate math questions dynamically
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        
        switch (i % 5) {
          case 0:
            question = `If ${a}x + ${b} = ${a * 3 + b}, what is x?`;
            correct = '3';
            options = [`A) ${correct}`, `B) ${a}`, `C) ${b}`, `D) ${a + b}`];
            break;
          case 1:
            question = `What is ${a}% of ${b * 100}?`;
            correct = `${a * b}`;
            options = [`A) ${correct}`, `B) ${a * b + 10}`, `C) ${a * b - 5}`, `D) ${a * b + 5}`];
            break;
          case 2:
            question = `A rectangle has length ${a + 5} and width ${b}. What is its area?`;
            correct = `${(a + 5) * b}`;
            options = [`A) ${correct}`, `B) ${(a + 5) + b}`, `C) ${(a + 5) * b + 10}`, `D) ${(a + 5) * b - 5}`];
            break;
          case 3:
            question = `If f(x) = ${a}x + ${b}, what is f(${c})?`;
            correct = `${a * c + b}`;
            options = [`A) ${correct}`, `B) ${a * c}`, `C) ${c + b}`, `D) ${a + b + c}`];
            break;
          default:
            question = `Solve: ${a}x - ${b} = ${c * a - b}`;
            correct = `${c}`;
            options = [`A) ${correct}`, `B) ${c + 1}`, `C) ${c - 1}`, `D) ${c + 2}`];
        }
      } else {
        // Generate English questions dynamically
        const sentences = [
          'The student studied hard for the exam.',
          'Scientists discovered a new species.',
          'The company launched a new product.',
          'The weather was perfect for hiking.',
          'The book received excellent reviews.'
        ];
        
        const sentence = sentences[i % sentences.length];
        question = `Which choice best improves this sentence: "${sentence}"`;
        options = ['A) NO CHANGE', 'B) Add more detail', 'C) Change verb tense', 'D) Rearrange words'];
        correct = 'A';
      }
      
      questions.push({
        id: i + 1,
        question: `[DYNAMIC ${i + 1}] ${question}`,
        options: options,
        correct: correct.charAt(0) || 'A',
        topic: topic,
        difficulty: difficulty
      });
    }
    
    console.log(`✅ Generated ${questions.length} dynamic questions`);
    return questions;
  }
};



const MockTestCenter = () => {
  const [currentTest, setCurrentTest] = useState(null);
  const [testAnswers, setTestAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [testInProgress, setTestInProgress] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Mock test configurations
  const mockTests = [
    {
      id: 'sat-math',
      title: 'SAT Math Practice Test',
      subtitle: 'Real SAT Pattern - 20 Questions',
      duration: 70,
      questionCount: 20,
      sections: ['Heart of Algebra (13)', 'Problem Solving (17)', 'Passport to Advanced Math (14)'],
      color: 'primary',
      icon: '📊'
    },
    {
      id: 'sat-english',
      title: 'SAT Reading & Writing Test',
      subtitle: 'Real SAT Pattern - 20 Questions',
      duration: 64,
      questionCount: 20,
      sections: ['Reading (27)', 'Writing & Language (27)'],
      color: 'secondary',
      icon: '📚'
    },
    {
      id: 'act',
      title: 'ACT Math Practice Test',
      subtitle: 'Real ACT Pattern - 20 Questions',
      duration: 60,
      questionCount: 20,
      sections: ['Pre-Algebra (20)', 'Elementary Algebra (15)', 'Intermediate Algebra (9)', 'Coordinate Geometry (9)', 'Plane Geometry (14)', 'Trigonometry (4)'],
      color: 'success',
      icon: '🎯'
    }
  ];

  const startTest = async (test) => {
    if (loadingQuestions) return;
    
    setLoadingQuestions(true);
    console.log(`Starting test with ${test.questionCount} questions`);
    
    try {
      const questions = await generateQuestionsWithOllama(test.id, test.questionCount);
      console.log(`Received ${questions.length} questions`);
      
      const testWithQuestions = { ...test, questions };
      setCurrentTest(testWithQuestions);
      setTestAnswers({});
      setTestInProgress(true);
      setTimeRemaining(test.duration * 60);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setTestAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const submitTest = () => {
    if (!currentTest) return;
    
    // Calculate scores
    let correctAnswers = 0;
    const topicAnalysis = {};
    const incorrectQuestions = [];
    
    currentTest.questions.forEach(question => {
      const userAnswer = testAnswers[question.id];
      const isCorrect = userAnswer === question.correct;
      
      if (isCorrect) {
        correctAnswers++;
      } else {
        incorrectQuestions.push({
          question: question.question,
          userAnswer: userAnswer || 'No answer',
          correctAnswer: question.correct,
          topic: question.topic
        });
      }
      
      // Track by topic
      if (!topicAnalysis[question.topic]) {
        topicAnalysis[question.topic] = { correct: 0, total: 0 };
      }
      topicAnalysis[question.topic].total++;
      if (isCorrect) topicAnalysis[question.topic].correct++;
    });
    
    const overallScore = Math.round((correctAnswers / currentTest.questions.length) * 100);
    
    const results = {
      testTitle: currentTest.title,
      overallScore,
      correctAnswers,
      totalQuestions: currentTest.questions.length,
      topicAnalysis,
      incorrectQuestions,
      completedAt: new Date().toISOString()
    };
    
    setTestResults(results);
    setTestInProgress(false);
    setCurrentTest(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadResults = () => {
    if (!testResults) return;
    
    const content = `
TEST RESULTS ANALYSIS
=====================
Test: ${testResults.testTitle}
Date: ${new Date(testResults.completedAt).toLocaleDateString()}
Overall Score: ${testResults.overallScore}%
Correct Answers: ${testResults.correctAnswers}/${testResults.totalQuestions}

TOPIC BREAKDOWN:
${Object.entries(testResults.topicAnalysis).map(([topic, data]) => 
  `${topic}: ${data.correct}/${data.total} (${((data.correct/data.total)*100).toFixed(1)}%)`
).join('\n')}

INCORRECT QUESTIONS:
${testResults.incorrectQuestions.map((q, i) => 
  `${i+1}. ${q.question}\nYour Answer: ${q.userAnswer}\nCorrect Answer: ${q.correctAnswer}\n`
).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-results-${Date.now()}.txt`;
    a.click();
  };

  // Test in progress view
  if (testInProgress && currentTest) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Test Header */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight="bold">{currentTest.title}</Typography>
            <Chip 
              label={`Time: ${formatTime(timeRemaining)}`} 
              color="warning" 
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            />
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={((currentTest.duration * 60 - timeRemaining) / (currentTest.duration * 60)) * 100}
            sx={{ mt: 2, height: 8, bgcolor: 'rgba(255,255,255,0.3)' }}
          />
        </Paper>

        {/* Questions */}
        {currentTest.questions.map((question, index) => (
          <Card key={question.id} sx={{ mb: 3, border: '2px solid', borderColor: 'primary.light' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="primary">
                  Question {index + 1} of {currentTest.questions.length}
                </Typography>
                <Chip label={question.topic} size="small" />
              </Box>
              
              {question.passage && (
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                    {question.passage}
                  </Typography>
                </Paper>
              )}
              
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 'medium' }}>
                {question.question}
              </Typography>
              
              <FormControl component="fieldset">
                <RadioGroup
                  value={testAnswers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                >
                  {question.options.map((option, optIndex) => (
                    <FormControlLabel
                      key={optIndex}
                      value={option.charAt(0)}
                      control={<Radio />}
                      label={option}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        ))}

        {/* Submit Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={submitTest}
            sx={{ px: 6, py: 2, fontSize: '1.2rem' }}
          >
            Submit Test
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ 
          fontWeight: 800, 
          background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2
        }}>
          🎆 SAT/ACT Excellence Center
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          Master Your SAT & ACT with AI-Powered Practice Tests, College Guidance & Strategic Planning
        </Typography>

        {/* SAT/ACT Test Calendar 2026-2027 */}
        <Card sx={{ 
          mb: 4, 
          maxWidth: 1200, 
          mx: 'auto',
          border: '3px solid #1976d2',
          borderRadius: 4,
          background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%)',
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                📅 SAT/ACT Test Calendar 2026-2027
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Strategic Test Planning for Maximum Success
              </Typography>
            </Box>
            
            {/* 2026 Tests */}
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: '#1976d2', borderBottom: '2px solid #1976d2', pb: 1 }}>
              📚 2026 Academic Year
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {/* August 2026 */}
              <Grid item xs={6} md={4}>
                <Paper sx={{ 
                  p: 3, 
                  bgcolor: '#e3f2fd', 
                  border: '2px solid #1976d2', 
                  borderRadius: 3,
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>August 2026</Typography>
                  <Chip label="SAT Test" color="primary" sx={{ mb: 2, width: '100%' }} />
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>Date:</strong> Aug 23, 2026</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>Registration:</strong> July 11</Typography>
                  <Typography variant="caption" color="text.secondary">Perfect for seniors - early application boost</Typography>
                </Paper>
              </Grid>
              
              {/* September 2026 */}
              <Grid item xs={6} md={4}>
                <Paper sx={{ 
                  p: 3, 
                  bgcolor: '#f3e5f5', 
                  border: '2px solid #9c27b0', 
                  borderRadius: 3,
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  <Typography variant="h6" color="secondary" fontWeight="bold" gutterBottom>September 2026</Typography>
                  <Chip label="ACT Test" color="secondary" sx={{ mb: 2, width: '100%' }} />
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>Date:</strong> Sep 12, 2026</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>Registration:</strong> Aug 7</Typography>
                  <Typography variant="caption" color="text.secondary">Ideal timing for college applications</Typography>
                </Paper>
              </Grid>
              
              {/* October 2026 */}
              <Grid item xs={6} md={4}>
                <Paper sx={{ 
                  p: 3, 
                  bgcolor: '#fff3e0', 
                  border: '2px solid #ff9800', 
                  borderRadius: 3,
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  <Typography variant="h6" sx={{ color: '#f57c00' }} fontWeight="bold" gutterBottom>October 2026</Typography>
                  <Chip label="SAT + PSAT" sx={{ bgcolor: '#ff9800', color: 'white', mb: 2, width: '100%' }} />
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>SAT:</strong> Oct 3, 2026</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>PSAT:</strong> Oct 14, 2026</Typography>
                  <Typography variant="caption" color="text.secondary">PSAT for 10th/11th graders</Typography>
                </Paper>
              </Grid>
              
              {/* December 2026 */}
              <Grid item xs={6} md={4}>
                <Paper sx={{ 
                  p: 3, 
                  bgcolor: '#e8f5e8', 
                  border: '2px solid #4caf50', 
                  borderRadius: 3,
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  <Typography variant="h6" color="success.main" fontWeight="bold" gutterBottom>December 2026</Typography>
                  <Chip label="SAT + ACT" color="success" sx={{ mb: 2, width: '100%' }} />
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>SAT:</strong> Dec 5, 2026</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>ACT:</strong> Dec 12, 2026</Typography>
                  <Typography variant="caption" color="text.secondary">Last chance for early applications</Typography>
                </Paper>
              </Grid>
              
              {/* February 2027 */}
              <Grid item xs={6} md={4}>
                <Paper sx={{ 
                  p: 3, 
                  bgcolor: '#fce4ec', 
                  border: '2px solid #e91e63', 
                  borderRadius: 3,
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  <Typography variant="h6" sx={{ color: '#c2185b' }} fontWeight="bold" gutterBottom>February 2027</Typography>
                  <Chip label="ACT Test" sx={{ bgcolor: '#e91e63', color: 'white', mb: 2, width: '100%' }} />
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>Date:</strong> Feb 6, 2027</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>Registration:</strong> Jan 1</Typography>
                  <Typography variant="caption" color="text.secondary">Good for regular decision deadlines</Typography>
                </Paper>
              </Grid>
              
              {/* March 2027 */}
              <Grid item xs={6} md={4}>
                <Paper sx={{ 
                  p: 3, 
                  bgcolor: '#f1f8e9', 
                  border: '2px solid #689f38', 
                  borderRadius: 3,
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}>
                  <Typography variant="h6" sx={{ color: '#558b2f' }} fontWeight="bold" gutterBottom>March 2027</Typography>
                  <Chip label="SAT Test" sx={{ bgcolor: '#689f38', color: 'white', mb: 2, width: '100%' }} />
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>Date:</strong> Mar 13, 2027</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}><strong>Registration:</strong> Feb 12</Typography>
                  <Typography variant="caption" color="text.secondary">Popular junior year test date</Typography>
                </Paper>
              </Grid>
            </Grid>
            
            {/* Strategic Recommendations */}
            <Paper sx={{ p: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: 3, mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                🎯 Strategic Test Planning Recommendations
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>10th Graders</Typography>
                    <Typography variant="body2">
                      • <strong>October 2026:</strong> Take PSAT<br/>
                      • <strong>Spring 2027:</strong> Consider SAT practice<br/>
                      • Focus on building strong foundation
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>11th Graders</Typography>
                    <Typography variant="body2">
                      • <strong>October 2026:</strong> PSAT (National Merit)<br/>
                      • <strong>March 2027:</strong> First SAT attempt<br/>
                      • <strong>May/June 2027:</strong> Retake if needed
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>12th Graders</Typography>
                    <Typography variant="body2">
                      • <strong>August 2026:</strong> Early boost<br/>
                      • <strong>October 2026:</strong> EA/ED deadlines<br/>
                      • <strong>December 2026:</strong> Final attempt
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            
            {/* Pro Tips */}
            <Alert severity="info" sx={{ borderRadius: 2, border: '2px solid #2196f3' }}>
              <Typography variant="body1" fontWeight="bold" gutterBottom>💡 Expert Tips for 2026-2027</Typography>
              <Typography variant="body2">
                <strong>Best Strategy:</strong> Take tests 2-3 times • <strong>Optimal Months:</strong> March, May, June for SAT; April, June, September for ACT<br/>
                <strong>Registration:</strong> Sign up 6-8 weeks early • <strong>Prep Time:</strong> 3-6 months of consistent practice<br/>
                <strong>Score Choice:</strong> Most colleges accept your highest scores • <strong>Superscoring:</strong> Many schools combine your best section scores
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      </Box>

      {/* Loading Questions Alert */}
      {loadingQuestions && (
        <Alert severity="info" sx={{ mb: 4, p: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'info.main' }}>
              <GoogleIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">🦙 Generating Questions with Ollama AI</Typography>
              <Typography variant="body2" color="text.secondary">
                Creating personalized practice questions just for you...
              </Typography>
              <LinearProgress sx={{ mt: 2, height: 6, borderRadius: 3 }} />
            </Box>
          </Box>
        </Alert>
      )}

      {/* Test Results Display */}
      {testResults && (
        <Card sx={{ mb: 4, border: '3px solid', borderColor: 'success.main' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AssessmentIcon sx={{ fontSize: 40 }} color="success" />
              📊 Your Test Results
            </Typography>
            
            {/* Overall Score */}
            <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
              <Typography variant="h2" fontWeight="bold">{testResults.overallScore}%</Typography>
              <Typography variant="h6">{testResults.testTitle}</Typography>
              <Typography variant="body1">
                {testResults.correctAnswers}/{testResults.totalQuestions} questions correct
              </Typography>
            </Paper>

            {/* Topic Analysis */}
            <Typography variant="h5" gutterBottom>📈 Topic Performance</Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {Object.entries(testResults.topicAnalysis).map(([topic, data]) => {
                const percentage = (data.correct / data.total) * 100;
                return (
                  <Grid item xs={6} md={3} key={topic}>
                    <Paper sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      bgcolor: percentage >= 80 ? 'success.light' : percentage >= 60 ? 'warning.light' : 'error.light',
                      color: 'white'
                    }}>
                      <Typography variant="h6" fontWeight="bold">{topic}</Typography>
                      <Typography variant="h4">{percentage.toFixed(1)}%</Typography>
                      <Typography variant="body2">{data.correct}/{data.total}</Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={downloadResults}
                sx={{ px: 4 }}
              >
                Download Results
              </Button>
              <Button
                variant="outlined"
                onClick={() => setTestResults(null)}
                sx={{ px: 4 }}
              >
                Take Another Test
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Mock Tests Grid */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
        Choose Your Practice Test
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {mockTests.map((test) => (
          <Grid item xs={12} md={4} key={test.id}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.15)'
              },
              border: '2px solid',
              borderColor: `${test.color}.light`
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ 
                    bgcolor: `${test.color}.main`, 
                    width: 56, 
                    height: 56, 
                    fontSize: '1.5rem',
                    mr: 2
                  }}>
                    {test.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color={`${test.color}.main`}>
                      {test.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {test.subtitle}
                    </Typography>
                  </Box>
                </Box>
                
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Chip label={`${test.duration} min`} icon={<TimerIcon />} />
                  <Chip label={`${test.questionCount} questions`} icon={<QuestionIcon />} />
                </Stack>

                <Button
                  variant="contained"
                  color={test.color}
                  fullWidth
                  size="large"
                  onClick={() => startTest(test)}
                  disabled={testInProgress || loadingQuestions}
                  startIcon={loadingQuestions ? <CircularProgress size={20} /> : <GoogleIcon />}
                  sx={{ py: 1.5, fontWeight: 'bold', textTransform: 'none' }}
                >
                  {loadingQuestions ? 'Generating AI Questions...' : 'Start AI Test'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MockTestCenter;