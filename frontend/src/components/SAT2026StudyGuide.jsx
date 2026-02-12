import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const SAT2026StudyGuide = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<MenuBookIcon />}
        onClick={() => setOpen(true)}
        sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
      >
        SAT & ACT 2026 Guide
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700 }}>
          📚 SAT & ACT 2026 Complete Study Guide
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          
          {/* Adaptive Test Alert */}
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              🎯 2026 Digital SAT is Adaptive!
            </Typography>
            <Typography variant="body2">
              Students who perform well in Module 1 will face a significantly harder "Advanced Module" in Module 2. 
              This is the only path to scores of 700+.
            </Typography>
          </Alert>

          {/* Math Section Overview */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">📊 Math Section Overview</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <Chip label="44 Questions (22 per module)" color="primary" sx={{ mr: 1, mb: 1 }} />
                <Chip label="70 Minutes (35 per module)" color="secondary" sx={{ mb: 1 }} />
              </Box>
              
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'primary.light' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Content Domain</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Questions</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Focus Topics</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Algebra</strong> (~35%)</TableCell>
                      <TableCell>13-15</TableCell>
                      <TableCell>Linear equations, Systems, Slopes</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Advanced Math</strong> (~35%)</TableCell>
                      <TableCell>13-15</TableCell>
                      <TableCell>Quadratics, Exponentials, Functions</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Problem Solving</strong> (~15%)</TableCell>
                      <TableCell>5-7</TableCell>
                      <TableCell>Ratios, Percentages, Statistics</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Geometry & Trig</strong> (~15%)</TableCell>
                      <TableCell>5-7</TableCell>
                      <TableCell>Area/Volume, Circles, sin/cos/tan</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          {/* English Section Overview */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">📝 English Section Overview</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <Chip label="54 Questions (27 per module)" color="primary" sx={{ mr: 1, mb: 1 }} />
                <Chip label="64 Minutes (32 per module)" color="secondary" sx={{ mb: 1 }} />
              </Box>
              
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'primary.light' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Content Domain</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Questions</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Focus Topics</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Craft & Structure</strong></TableCell>
                      <TableCell>13-15</TableCell>
                      <TableCell>Vocabulary, Text Structure, Cross-text</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Information & Ideas</strong></TableCell>
                      <TableCell>12-14</TableCell>
                      <TableCell>Central Ideas, Evidence, Inferences</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Standard English</strong></TableCell>
                      <TableCell>11-15</TableCell>
                      <TableCell>Punctuation, Sentence Structure, Grammar</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Expression of Ideas</strong></TableCell>
                      <TableCell>8-12</TableCell>
                      <TableCell>Transitions, Rhetorical Synthesis</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          {/* Detailed Syllabus */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">📖 Detailed Math Syllabus</Typography>
            </AccordionSummary>
            <AccordionDetails>
              
              {/* Algebra */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" color="primary" gutterBottom>
                  I. Algebra (~35% | 13-15 questions)
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Focus:</strong> Linear equations and functions
                </Typography>
                <ul style={{ marginTop: 0, paddingLeft: 20 }}>
                  <li>Solving linear equations and inequalities in one or two variables</li>
                  <li>Linear functions and their graphs (y = mx + b)</li>
                  <li>Systems of linear equations and word problems</li>
                </ul>
              </Box>

              {/* Advanced Math */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" color="secondary" gutterBottom>
                  II. Advanced Math (~35% | 13-15 questions)
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Focus:</strong> Complex nonlinear equations
                </Typography>
                <ul style={{ marginTop: 0, paddingLeft: 20 }}>
                  <li>Quadratic and exponential functions (growth/decay)</li>
                  <li>Polynomials, radicals, and rational expressions</li>
                  <li>Solving quadratic equations using factoring or quadratic formula</li>
                  <li>Function notation and transformations</li>
                </ul>
              </Box>

              {/* Problem Solving */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" color="success.main" gutterBottom>
                  III. Problem Solving & Data Analysis (~15% | 5-7 questions)
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Focus:</strong> Quantitative literacy and statistics
                </Typography>
                <ul style={{ marginTop: 0, paddingLeft: 20 }}>
                  <li>Ratios, rates, proportions, and percentages</li>
                  <li>Interpreting scatterplots, histograms, and tables</li>
                  <li>Probability and conditional probability</li>
                  <li>Measures of center (mean, median) and spread (standard deviation)</li>
                </ul>
              </Box>

              {/* Geometry */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="warning.main" gutterBottom>
                  IV. Geometry & Trigonometry (~15% | 5-7 questions)
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Focus:</strong> Shapes and right-triangle properties
                </Typography>
                <ul style={{ marginTop: 0, paddingLeft: 20 }}>
                  <li>Area and volume formulas for 2D and 3D shapes</li>
                  <li>Lines, angles, and triangle properties (congruence and similarity)</li>
                  <li>Right-triangle trigonometry (sin, cos, tan) and Pythagorean theorem</li>
                  <li>Circle theorems (arcs, sectors, and equations of circles)</li>
                </ul>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Adaptive Routing Logic */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">🎯 Adaptive Routing Logic</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity="warning">
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    How Routing Works
                  </Typography>
                  <Typography variant="body2">
                    Each section (Math and English) is adaptive. Your Module 1 performance determines Module 2 difficulty.
                  </Typography>
                </Alert>

                <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
                  <Typography variant="subtitle2" fontWeight="bold" color="success.main" gutterBottom>
                    Module 1 (The Mix)
                  </Typography>
                  <Typography variant="body2">
                    Every student starts with a broad mix of easy, medium, and hard questions.
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
                  <Typography variant="subtitle2" fontWeight="bold" color="warning.main" gutterBottom>
                    The Threshold
                  </Typography>
                  <Typography variant="body2">
                    To unlock Harder Module 2, you need roughly <strong>15 out of 22 questions correct</strong> (65–70%).
                  </Typography>
                </Paper>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Paper sx={{ p: 2, bgcolor: '#e8f5e9', border: '2px solid #4caf50' }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="success.main" gutterBottom>
                      ✅ High Performance
                    </Typography>
                    <Typography variant="body2">→ Module 2B (Hard)</Typography>
                    <Typography variant="body2" fontWeight="bold">Only way to reach 600+</Typography>
                  </Paper>
                  <Paper sx={{ p: 2, bgcolor: '#ffebee', border: '2px solid #f44336' }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="error" gutterBottom>
                      ⚠️ Lower Performance
                    </Typography>
                    <Typography variant="body2">→ Module 2A (Easy)</Typography>
                    <Typography variant="body2" fontWeight="bold">Score capped at ~590</Typography>
                  </Paper>
                </Box>

                <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
                  <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                    IRT Weighting & Scoring
                  </Typography>
                  <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
                    <li>Hard questions are "worth" more than easy ones</li>
                    <li>No penalty for guessing (0 points for wrong answers)</li>
                    <li>2 "Pretest" questions per module don't count (you won't know which)</li>
                  </ul>
                </Paper>

                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'info.light' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Feature</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Easy Module 2</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Hard Module 2</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Max Score</strong></TableCell>
                        <TableCell>~590</TableCell>
                        <TableCell>Up to 800</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Style</strong></TableCell>
                        <TableCell>Direct, fewer steps</TableCell>
                        <TableCell>Multi-step, wordier</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Focus</strong></TableCell>
                        <TableCell>Basic equations</TableCell>
                        <TableCell>Complex quadratics, trig</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Desmos Use</strong></TableCell>
                        <TableCell>Useful for checking</TableCell>
                        <TableCell>Essential for speed</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Alert severity="info">
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    💡 Strategic Implications
                  </Typography>
                  <ul style={{ marginTop: 4, marginBottom: 0, paddingLeft: 20 }}>
                    <li><strong>Front-Load Accuracy:</strong> Module 1 precision is critical for 700+</li>
                    <li><strong>Time Management:</strong> 95 seconds per question - save time in Module 1</li>
                    <li><strong>Use Desmos:</strong> Essential for speed on complex graphing</li>
                    <li><strong>The "Invisible Score":</strong> Algorithm analyzes all 44 questions for 200–800 scale</li>
                  </ul>
                </Alert>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Key Changes 2026 */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">🆕 Key Changes in 2026</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
                  <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                    🖩 Built-in Desmos Calculator
                  </Typography>
                  <Typography variant="body2">
                    The integrated Desmos graphing calculator is incredibly powerful. Learn to use it for finding 
                    intersections or roots to save significant time.
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2, bgcolor: '#f3e5f5' }}>
                  <Typography variant="subtitle2" fontWeight="bold" color="secondary" gutterBottom>
                    📝 Shorter Word Problems
                  </Typography>
                  <Typography variant="body2">
                    Questions are more direct than previous years, focusing on math skills rather than reading comprehension.
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
                  <Typography variant="subtitle2" fontWeight="bold" color="warning.main" gutterBottom>
                    📈 Adaptive Difficulty
                  </Typography>
                  <Typography variant="body2">
                    If you do well in Module 1, Module 2 will be significantly harder but offers the only path to 
                    a top-tier score (700+).
                  </Typography>
                </Paper>

                <Alert severity="success">
                  <Typography variant="body2" fontWeight="bold">
                    💡 Pro-Tip:
                  </Typography>
                  <Typography variant="body2">
                    While calculators are allowed for everything, some questions are designed to be solved faster 
                    mentally or with a simple sketch. Don't let the calculator slow down your "math sense."
                  </Typography>
                </Alert>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Essential Formulas */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">📐 Essential Formulas to Memorize</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Paper sx={{ p: 1.5, bgcolor: '#f5f5f5' }}>
                  <Typography variant="subtitle2" fontWeight="bold">Algebra</Typography>
                  <Typography variant="body2">• Slope: m = (y₂ - y₁) / (x₂ - x₁)</Typography>
                  <Typography variant="body2">• Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a</Typography>
                </Paper>

                <Paper sx={{ p: 1.5, bgcolor: '#f5f5f5' }}>
                  <Typography variant="subtitle2" fontWeight="bold">Geometry</Typography>
                  <Typography variant="body2">• Circle: A = πr², C = 2πr</Typography>
                  <Typography variant="body2">• Triangle: A = ½bh</Typography>
                  <Typography variant="body2">• Pythagorean: a² + b² = c²</Typography>
                </Paper>

                <Paper sx={{ p: 1.5, bgcolor: '#f5f5f5' }}>
                  <Typography variant="subtitle2" fontWeight="bold">Trigonometry</Typography>
                  <Typography variant="body2">• sin θ = opposite / hypotenuse</Typography>
                  <Typography variant="body2">• cos θ = adjacent / hypotenuse</Typography>
                  <Typography variant="body2">• tan θ = opposite / adjacent</Typography>
                </Paper>
              </Box>
            </AccordionDetails>
          </Accordion>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default SAT2026StudyGuide;
