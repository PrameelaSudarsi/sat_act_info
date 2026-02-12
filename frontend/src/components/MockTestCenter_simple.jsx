import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Pagination,
} from '@mui/material';

// Generate SAT questions with proper topic distribution
const generateSATQuestions = (testType, count) => {
  const questions = [];
  
  if (testType === 'sat-math') {
    const topics = [
      { name: 'Heart of Algebra', count: 7 },
      { name: 'Problem Solving', count: 7 },
      { name: 'Advanced Math', count: 6 }
    ];
    
    let qId = 1;
    topics.forEach(topicGroup => {
      for (let i = 0; i < topicGroup.count; i++) {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        
        let question, correctAnswer, wrongAnswers;
        
        if (topicGroup.name === 'Heart of Algebra') {
          question = `Solve for x: ${a}x + ${b} = ${a * c + b}`;
          correctAnswer = `${c}`;
          wrongAnswers = [`${c + 1}`, `${c - 1}`, `${a + b}`];
        } else if (topicGroup.name === 'Problem Solving') {
          question = `A store sells ${a} items for $${b} each. What is the total revenue?`;
          correctAnswer = `$${a * b}`;
          wrongAnswers = [`$${a + b}`, `$${a * b + 10}`, `$${a * b - 5}`];
        } else {
          question = `If f(x) = ${a}x² + ${b}x, what is f(${c})?`;
          correctAnswer = `${a * c * c + b * c}`;
          wrongAnswers = [`${a * c + b}`, `${a + b + c}`, `${a * c * c}`];
        }
        
        const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
        const correctIndex = allOptions.indexOf(correctAnswer);
        
        questions.push({
          id: qId++,
          question,
          options: allOptions.map((opt, idx) => ({ letter: ['A', 'B', 'C', 'D'][idx], text: opt })),
          correct: ['A', 'B', 'C', 'D'][correctIndex],
          topic: topicGroup.name
        });
      }
    });
  }
  
  return questions;
};

const MockTestCenter = () => {
  const [currentTest, setCurrentTest] = useState(null);
  const [testAnswers, setTestAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [testResults, setTestResults] = useState(null);
  const questionsPerPage = 10;

  const startTest = () => {
    const questions = generateSATQuestions('sat-math', 20);
    setCurrentTest({ title: 'SAT Math Practice Test', questions });
    setTestAnswers({});
    setCurrentPage(1);
    setTestResults(null);
  };

  const handleAnswerChange = (questionId, answer) => {
    setTestAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const submitTest = () => {
    let correct = 0;
    currentTest.questions.forEach(q => {
      if (testAnswers[q.id] === q.correct) correct++;
    });
    
    const score = Math.round((correct / currentTest.questions.length) * 100);
    setTestResults({
      score,
      correct,
      total: currentTest.questions.length
    });
    setCurrentTest(null);
  };

  if (testResults) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper sx={{ p: 6, textAlign: 'center', bgcolor: testResults.score >= 70 ? '#4caf50' : '#ff9800', color: 'white' }}>
          <Typography variant="h2" fontWeight="bold" sx={{ mb: 2 }}>{testResults.score}%</Typography>
          <Typography variant="h4">{testResults.correct} / {testResults.total} Correct</Typography>
          <Button variant="contained" sx={{ mt: 4, bgcolor: 'white', color: '#1976d2' }} onClick={() => setTestResults(null)}>
            Take Another Test
          </Button>
        </Paper>
      </Container>
    );
  }

  if (currentTest) {
    const startIdx = (currentPage - 1) * questionsPerPage;
    const endIdx = startIdx + questionsPerPage;
    const currentQuestions = currentTest.questions.slice(startIdx, endIdx);
    const totalPages = Math.ceil(currentTest.questions.length / questionsPerPage);
    const isLastPage = currentPage === totalPages;

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#1976d2', color: 'white' }}>
          <Typography variant="h5" fontWeight="bold">{currentTest.title}</Typography>
          <Typography variant="body1">Page {currentPage} of {totalPages}</Typography>
        </Paper>

        {currentQuestions.map((q, idx) => (
          <Card key={q.id} sx={{ mb: 3, p: 3, fontFamily: 'Georgia, serif' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Question {startIdx + idx + 1}. {q.question}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup value={testAnswers[q.id] || ''} onChange={(e) => handleAnswerChange(q.id, e.target.value)}>
                {q.options.map(opt => (
                  <FormControlLabel
                    key={opt.letter}
                    value={opt.letter}
                    control={<Radio />}
                    label={`${opt.letter}) ${opt.text}`}
                    sx={{ mb: 1, fontSize: '1.1rem' }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Card>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
            size="large"
          />
          {isLastPage && (
            <Button variant="contained" size="large" onClick={submitTest} sx={{ px: 6, py: 2 }}>
              Submit Test
            </Button>
          )}
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 4 }}>SAT Math Practice Test</Typography>
      <Button variant="contained" size="large" onClick={startTest} sx={{ px: 8, py: 3, fontSize: '1.2rem' }}>
        Start Full Test
      </Button>
    </Container>
  );
};

export default MockTestCenter;
