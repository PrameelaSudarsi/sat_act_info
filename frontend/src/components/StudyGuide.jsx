import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Divider,
  Alert,
  Grid,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Timer as TimerIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  MenuBook as MenuBookIcon,
  Quiz as QuizIcon,
} from '@mui/icons-material';

const StudyGuide = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const satContent = {
    overview: {
      format: "Digital & Adaptive",
      duration: "~3 hours",
      sections: 2,
      scoring: "400-1600"
    },
    sections: [
      {
        name: "Reading & Writing (Combined)",
        time: "64 minutes",
        questions: "~54 questions",
        skills: [
          "Information & Ideas – understand, interpret, integrate information from texts and graphics",
          "Craft & Structure – vocabulary in context, text organization, rhetorical purpose", 
          "Expression of Ideas – revising text for clarity and effectiveness",
          "Standard English Conventions – grammar, usage, and punctuation"
        ],
        passages: [
          "Literature excerpts",
          "History/social studies", 
          "Science and humanities with charts/graphs"
        ]
      },
      {
        name: "Math",
        time: "70 minutes", 
        questions: "~44 questions",
        topics: [
          "Algebra – linear equations/inequalities, functions, systems",
          "Advanced Math – nonlinear expressions, quadratics, exponents",
          "Problem-Solving & Data Analysis – ratios, proportions, statistics, data interpretation",
          "Geometry & Trigonometry – area/volume, angles/triangles, circles, basic trig"
        ],
        features: [
          "Calculator available and built into digital interface",
          "Mix of multiple-choice and student-produced responses",
          "No penalty for guessing",
          "70% algebra + advanced topics"
        ]
      }
    ]
  };

  const actContent = {
    overview: {
      format: "Enhanced Format 2026",
      duration: "Varies by administration",
      sections: "3-5 sections",
      scoring: "1-36 Composite"
    },
    sections: [
      {
        name: "English",
        time: "35 minutes",
        questions: "50 questions",
        focus: [
          "Conventions of standard English",
          "Production of writing (organization, style)",
          "Knowledge of language concepts"
        ]
      },
      {
        name: "Math", 
        time: "50 minutes",
        questions: "45 questions",
        topics: [
          "Number & Quantity",
          "Algebra", 
          "Functions",
          "Geometry",
          "Statistics & Probability",
          "Integrating skills & modeling"
        ],
        note: "4 answer options per question"
      },
      {
        name: "Reading",
        time: "40 minutes",
        questions: "36 questions", 
        skills: [
          "Key ideas & details",
          "Craft & structure",
          "Integration of knowledge and ideas"
        ]
      },
      {
        name: "Science (Optional)",
        time: "40 minutes",
        questions: "40 questions",
        focus: [
          "Scientific reasoning (interpretation, investigation, models/inferences)",
          "Skills, not specific science facts",
          "May not count toward Composite score in many 2026 administrations"
        ]
      },
      {
        name: "Writing (Optional)",
        time: "40 minutes", 
        questions: "1 essay prompt",
        focus: ["Analysis and clear written expression"]
      }
    ]
  };

  const topicChecklist = {
    reading: [
      "Main idea & central theme",
      "Supporting details & evidence", 
      "Inference questions",
      "Author's purpose & tone",
      "Vocabulary in context",
      "Comparing two passages (SAT focus)",
      "Interpreting charts/graphs in passages",
      "Cause & effect",
      "Summary & conclusions"
    ],
    grammar: [
      "Subject–verb agreement",
      "Verb tense & consistency", 
      "Pronouns (clarity, agreement)",
      "Modifiers (dangling/misplaced)",
      "Parallelism",
      "Run-ons & sentence fragments",
      "Punctuation (commas, semicolons, colons, apostrophes)",
      "Transitions",
      "Conciseness (eliminate redundancy)",
      "Logical sentence & paragraph order"
    ],
    math: [
      "Solving linear equations",
      "Solving inequalities",
      "Systems of equations", 
      "Graphing lines",
      "Quadratic equations",
      "Factoring",
      "Functions & function notation",
      "Geometry (angles, triangles, circles)",
      "Pythagorean theorem",
      "Ratios & proportions",
      "Percentages",
      "Statistics (mean, median, mode)",
      "Probability",
      "Data interpretation"
    ]
  };

  const studyPlan = {
    phase1: {
      title: "Foundation (Grade 10 - Now → Summer)",
      goal: "Learn concepts slowly + build confidence",
      timeCommitment: "4-5 hours/week",
      schedule: [
        "Mon – Math concepts",
        "Tue – Grammar rules", 
        "Wed – Reading practice",
        "Thu – Math practice",
        "Fri – Light review / vocab",
        "Weekend – Practice + error review"
      ],
      focus: [
        "Learn math & grammar from basics",
        "No full tests yet",
        "Build accuracy, not speed", 
        "Start SAT-style reading passages"
      ]
    },
    phase2: {
      title: "Practice & Speed (Summer after Grade 10)",
      goal: "Apply concepts + improve timing",
      activities: [
        "1 timed section per week (Math or English)",
        "Start ACT Science exposure",
        "Track mistakes in an error notebook",
        "Begin SAT vs ACT comparison"
      ]
    },
    phase3: {
      title: "Test-Focused Prep (Grade 11)",
      goal: "Scores + confidence", 
      activities: [
        "1 full test every 2–3 weeks",
        "Focus on weak areas only",
        "Register for PSAT (Fall of 11th)",
        "Register for SAT/ACT (Spring of 11th)"
      ]
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpen(true)}
        sx={{ mb: 1, textTransform: 'none', width: '100%' }}
        startIcon={<MenuBookIcon />}
      >
        Complete Study Guide 2026
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
        <DialogTitle sx={{ bgcolor: 'error.main', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
          <MenuBookIcon />
          SAT & ACT 2026 Complete Study Guide
        </DialogTitle>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="SAT 2026" />
            <Tab label="ACT 2026" />
            <Tab label="Topic Checklist" />
            <Tab label="Study Plan" />
          </Tabs>
        </Box>

        <DialogContent sx={{ p: 0, height: '70vh', overflow: 'auto' }}>
          {/* SAT Tab */}
          <TabPanel value={tabValue} index={0}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <strong>SAT 2026 – Digital Format</strong><br/>
              The SAT is now fully digital and adaptive (modules adjust to your performance).
            </Alert>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={3}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                  <Typography variant="h6">{satContent.overview.duration}</Typography>
                  <Typography variant="caption">Duration</Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
                  <Typography variant="h6">{satContent.overview.sections}</Typography>
                  <Typography variant="caption">Sections</Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                  <Typography variant="h6">{satContent.overview.scoring}</Typography>
                  <Typography variant="caption">Score Range</Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light', color: 'white' }}>
                  <Typography variant="h6">Adaptive</Typography>
                  <Typography variant="caption">Format</Typography>
                </Paper>
              </Grid>
            </Grid>

            {satContent.sections.map((section, index) => (
              <Accordion key={index} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography variant="h6" color="primary">
                      {index + 1}. {section.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                      <Chip size="small" label={section.time} />
                      <Chip size="small" label={section.questions} />
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {section.skills && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Skills & Topics Tested
                      </Typography>
                      <List dense>
                        {section.skills.map((skill, idx) => (
                          <ListItem key={idx}>
                            <ListItemText primary={skill} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  {section.topics && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Topics Tested
                      </Typography>
                      <List dense>
                        {section.topics.map((topic, idx) => (
                          <ListItem key={idx}>
                            <ListItemText primary={topic} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  {section.features && (
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Key Features
                      </Typography>
                      <List dense>
                        {section.features.map((feature, idx) => (
                          <ListItem key={idx}>
                            <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </TabPanel>

          {/* ACT Tab */}
          <TabPanel value={tabValue} index={1}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              <strong>ACT 2026 Enhanced Format</strong><br/>
              The ACT is being offered in an enhanced version through 2026 with format changes.
            </Alert>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
                  <Typography variant="h6">1-36</Typography>
                  <Typography variant="caption">Composite Score</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.light', color: 'white' }}>
                  <Typography variant="h6">3-5</Typography>
                  <Typography variant="caption">Sections</Typography>
                </Paper>
              </Grid>
            </Grid>

            {actContent.sections.map((section, index) => (
              <Accordion key={index} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography variant="h6" color="secondary">
                      {index + 1}. {section.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                      <Chip size="small" label={section.time} />
                      <Chip size="small" label={section.questions} />
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {section.focus && (
                    <List dense>
                      {section.focus.map((item, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {section.topics && (
                    <List dense>
                      {section.topics.map((topic, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={topic} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {section.skills && (
                    <List dense>
                      {section.skills.map((skill, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={skill} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {section.note && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      {section.note}
                    </Alert>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </TabPanel>

          {/* Topic Checklist Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h5" gutterBottom color="primary">
              📋 Complete SAT & ACT 2026 Syllabus
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              <strong>Comprehensive Coverage:</strong> Detailed syllabus with expected question types, difficulty levels, and practice resources for SAT & ACT 2026.
            </Alert>

            {/* SAT 2026 Detailed Syllabus */}
            <Card sx={{ mb: 4, border: '2px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  📘 SAT 2026 - Digital Format (Detailed Syllabus)
                </Typography>
                
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <strong>New for 2026:</strong> Fully adaptive digital format, shorter test duration, integrated calculator for all math questions.
                </Alert>
                
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Section</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Topic</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Question Types Expected</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Difficulty</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Practice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Math Section - Detailed */}
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold', verticalAlign: 'top' }} rowSpan={18}>Math (70 min, 44 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Linear Equations (1 variable)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Solve ax + b = c<br/>• Word problems with linear relationships<br/>• Equations with fractions and decimals<br/>• Multi-step equations</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Easy-Medium<br/>(6-8 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/algebra" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Linear Equations (2 variables)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Find slope and y-intercept<br/>• Write equation from graph/points<br/>• Parallel and perpendicular lines<br/>• Systems of linear equations</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(4-6 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/algebra" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Systems of Equations</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Substitution and elimination methods<br/>• Graphical interpretation<br/>• No solution vs infinite solutions<br/>• Real-world applications</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium-Hard<br/>(3-4 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/algebra" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Linear Inequalities</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Solve and graph inequalities<br/>• Compound inequalities<br/>• Systems of inequalities<br/>• Real-world constraint problems</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Easy-Medium<br/>(2-3 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/algebra" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Functions</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Evaluate f(x) for given values<br/>• Domain and range<br/>• Function notation and composition<br/>• Interpreting graphs of functions</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(3-4 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/algebra" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f3e5f5' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Quadratic Equations</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Factoring and quadratic formula<br/>• Vertex form and standard form<br/>• Finding roots and vertex<br/>• Parabola properties</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium-Hard<br/>(4-5 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="secondary" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/advanced-math" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fce4ec' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Polynomial Operations</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Adding, subtracting polynomials<br/>• Multiplying polynomials<br/>• Factoring techniques<br/>• Polynomial division</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(2-3 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="secondary" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/advanced-math" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f3e5f5' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Exponents & Radicals</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Laws of exponents<br/>• Simplifying radical expressions<br/>• Rational exponents<br/>• Exponential growth/decay</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(2-3 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="secondary" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/advanced-math" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fce4ec' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Rational Expressions</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Simplifying rational expressions<br/>• Adding/subtracting rationals<br/>• Domain restrictions<br/>• Rational equations</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Hard<br/>(1-2 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="secondary" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/advanced-math" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Ratios & Proportions</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Direct and inverse variation<br/>• Scale factor problems<br/>• Unit rate calculations<br/>• Proportion word problems</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Easy-Medium<br/>(3-4 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="success" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/problem-solving-and-data-analysis" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Percentages</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Percent increase/decrease<br/>• Compound interest<br/>• Tax and discount problems<br/>• Percent of change</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Easy-Medium<br/>(3-4 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="success" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/problem-solving-and-data-analysis" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Statistics & Data</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Mean, median, mode, range<br/>• Standard deviation concepts<br/>• Interpreting data displays<br/>• Correlation vs causation</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(4-5 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="success" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/problem-solving-and-data-analysis" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Probability</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Basic probability rules<br/>• Conditional probability<br/>• Independent vs dependent events<br/>• Two-way tables</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(2-3 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="success" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/problem-solving-and-data-analysis" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fff3e0' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Area & Perimeter</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Rectangles, triangles, circles<br/>• Composite figures<br/>• Arc length and sector area<br/>• Optimization problems</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Easy-Medium<br/>(3-4 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="warning" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/geometry-and-trigonometry" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fafafa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Volume & Surface Area</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Prisms, cylinders, pyramids<br/>• Spheres and cones<br/>• Composite 3D figures<br/>• Real-world applications</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(2-3 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="warning" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/geometry-and-trigonometry" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fff3e0' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Coordinate Geometry</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Distance and midpoint formulas<br/>• Slope and equation of lines<br/>• Circles in coordinate plane<br/>• Transformations</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(2-3 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="warning" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/geometry-and-trigonometry" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fafafa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Trigonometry</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Right triangle trigonometry<br/>• SOH-CAH-TOA applications<br/>• Pythagorean theorem<br/>• Special right triangles (30-60-90, 45-45-90)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium-Hard<br/>(2-3 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="warning" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-math/geometry-and-trigonometry" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
                
                <Alert severity="success" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>💡 SAT Math Strategy:</strong> Focus on Algebra (40% of questions) and Problem Solving (30%). Calculator available for all questions in 2026 digital format.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>

            {/* SAT English Detailed Syllabus */}
            <Card sx={{ mb: 4, border: '2px solid', borderColor: 'secondary.main' }}>
              <CardContent>
                <Typography variant="h6" color="secondary" gutterBottom>
                  📚 SAT Reading & Writing 2026 - Detailed Syllabus
                </Typography>
                
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#9c27b0', color: 'white' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Domain</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Skill</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Question Types Expected</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Difficulty</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Practice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Reading & Writing Section - Detailed */}
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold', verticalAlign: 'top' }} rowSpan={8}>Information and Ideas (26-28 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Central Ideas & Details</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Main purpose of passage<br/>• Most important claim/point<br/>• Function of specific details<br/>• Supporting evidence identification</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Easy-Medium<br/>(8-10 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="success" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/information-ideas" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Command of Evidence</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Which choice best supports claim?<br/>• Textual evidence questions<br/>• Data interpretation from graphs<br/>• Quantitative evidence analysis</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(6-8 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="success" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/information-ideas" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Inferences</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• What can be reasonably concluded?<br/>• Implicit meaning questions<br/>• Author's unstated assumptions<br/>• Logical implications</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium-Hard<br/>(6-8 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="success" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/information-ideas" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Quantitative Information</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Reading data from tables/graphs<br/>• Completing statements with data<br/>• Trends and patterns in data<br/>• Comparing datasets</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Easy-Medium<br/>(4-6 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="success" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/information-ideas" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold', verticalAlign: 'top' }} rowSpan={4}>Craft and Structure (13-15 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Words in Context</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Best word/phrase to complete text<br/>• Vocabulary in context<br/>• Precise word choice<br/>• Connotation and tone</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(6-8 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="primary" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/craft-structure" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Text Structure & Purpose</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Overall structure of passage<br/>• Function of paragraphs/sentences<br/>• Author's purpose and tone<br/>• Rhetorical strategies</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium-Hard<br/>(4-5 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="primary" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/craft-structure" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Cross-Text Connections</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Compare viewpoints in paired texts<br/>• How would author of Text 1 respond to Text 2?<br/>• Similarities and differences<br/>• Synthesizing information</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Hard<br/>(3-4 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="primary" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/craft-structure" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      
                      <tr style={{ backgroundColor: '#f3e5f5' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold', verticalAlign: 'top' }} rowSpan={3}>Expression of Ideas (8-12 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Rhetorical Synthesis</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Complete text to accomplish goal<br/>• Add supporting evidence<br/>• Strengthen argument<br/>• Address counterarguments</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium-Hard<br/>(4-6 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="secondary" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/expression-ideas" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fce4ec' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Transitions</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Logical connectors between ideas<br/>• However, therefore, moreover, etc.<br/>• Sentence and paragraph transitions<br/>• Coherence and flow</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(4-6 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="secondary" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/expression-ideas" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      
                      <tr style={{ backgroundColor: '#fff3e0' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold', verticalAlign: 'top' }} rowSpan={5}>Standard English Conventions (11-15 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Boundaries</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Run-on sentences and fragments<br/>• Comma splices<br/>• Proper sentence structure<br/>• Coordinating/subordinating conjunctions</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Easy-Medium<br/>(3-4 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="warning" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/standard-english-conventions" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fafafa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Form, Structure & Sense</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Subject-verb agreement<br/>• Pronoun-antecedent agreement<br/>• Verb tense consistency<br/>• Modifier placement</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Medium<br/>(4-6 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="warning" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/standard-english-conventions" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fff3e0' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Punctuation</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>• Commas in series and with clauses<br/>• Semicolons and colons<br/>• Apostrophes for possession<br/>• End punctuation</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Easy-Medium<br/>(4-5 questions)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button variant="contained" color="warning" size="small" href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/standard-english-conventions" target="_blank" sx={{ textTransform: 'none' }}>Practice</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>💡 SAT Reading & Writing Strategy:</strong> Information & Ideas makes up 50% of questions. Focus on evidence-based reading and precise vocabulary.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>


            {/* SAT English Syllabus Table */}
            <Card sx={{ mb: 4, border: '2px solid', borderColor: 'secondary.main' }}>
              <CardContent>
                <Typography variant="h6" color="secondary" gutterBottom>
                  📚 SAT English Syllabus – Topic-wise Preview
                </Typography>
                
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#9c27b0', color: 'white' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Section</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Topic</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Key Skills</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Khan Academy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Reading and Writing Section */}
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold', verticalAlign: 'top' }} rowSpan={12}>Reading and Writing</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Information and Ideas</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Central ideas, supporting details, inferences</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/information-ideas" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Craft and Structure</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Words in context, text structure, purpose</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/craft-structure" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Expression of Ideas</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Rhetorical synthesis, transitions</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/expression-ideas" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Standard English Conventions</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Grammar, usage, punctuation</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/standard-english-conventions" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Reading Comprehension</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Literary analysis, evidence-based reading</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Vocabulary in Context</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Word choice, meaning in context</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/craft-structure" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Command of Evidence</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Textual evidence, supporting claims</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/information-ideas" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Analysis in History/Social Studies</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Historical documents, social science texts</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Analysis in Science</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Scientific texts, data interpretation</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Sentence Structure</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Sentence boundaries, subordination</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/standard-english-conventions" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Usage and Style</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Precision, concision, style</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/expression-ideas" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Punctuation</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>End-of-sentence, within-sentence punctuation</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/digital-sat/digital-sat-reading-writing/standard-english-conventions" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>💡 English Strategy:</strong> Focus on Information & Ideas and Standard English Conventions first - these make up 50% of the Reading & Writing section.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>

            {/* ACT Syllabus Table */}
            <Card sx={{ mb: 4, border: '2px solid', borderColor: 'warning.main' }}>
              <CardContent>
                <Typography variant="h6" color="warning.main" gutterBottom>
                  📋 ACT Syllabus – All Sections with Practice Links
                </Typography>
                
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f57c00', color: 'white' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Section</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Topic</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Key Skills</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Practice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* English Section */}
                      <tr style={{ backgroundColor: '#fff3e0' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold', verticalAlign: 'top' }} rowSpan={6}>English (35 min)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Usage & Mechanics</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Grammar, punctuation, sentence structure</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="warning"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-english" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fafafa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Rhetorical Skills</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Strategy, organization, style</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="warning"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-english" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fff3e0' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Subject-Verb Agreement</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Singular/plural agreement rules</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="warning"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-english" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fafafa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Comma Usage</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Series, introductory, nonessential elements</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="warning"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-english" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fff3e0' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Transitions & Organization</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Logical flow, paragraph order</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="warning"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-english" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fafafa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Wordiness & Redundancy</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Concise writing, eliminating excess</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="warning"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-english" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      
                      {/* Math Section */}
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold', verticalAlign: 'top' }} rowSpan={6}>Math (60 min)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Pre-Algebra</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Basic operations, fractions, decimals</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="primary"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-math" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Elementary Algebra</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Linear equations, inequalities, exponents</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="primary"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-math" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Intermediate Algebra</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Quadratics, functions, logarithms</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="primary"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-math" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Coordinate Geometry</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Graphing, distance, slope, conic sections</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="primary"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-math" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Plane Geometry</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Angles, triangles, circles, area, volume</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="primary"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-math" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Trigonometry</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Right triangles, trig functions, identities</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="primary"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-math" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      
                      {/* Reading Section */}
                      <tr style={{ backgroundColor: '#f3e5f5' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold', verticalAlign: 'top' }} rowSpan={4}>Reading (35 min)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Literary Narrative</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Fiction, character analysis, theme</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="secondary"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-reading" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fce4ec' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Social Science</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>History, psychology, sociology, economics</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="secondary"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-reading" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f3e5f5' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Humanities</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Art, literature, philosophy, music</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="secondary"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-reading" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#fce4ec' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Natural Science</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Biology, chemistry, physics, earth science</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="secondary"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-reading" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      
                      {/* Science Section */}
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold', verticalAlign: 'top' }} rowSpan={3}>Science (35 min)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Data Representation</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Graphs, tables, charts interpretation</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-science" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Research Summaries</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Experimental design, hypothesis testing</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-science" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e8f5e8' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Conflicting Viewpoints</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Compare theories, analyze arguments</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                          <Button 
                            variant="contained" 
                            color="success"
                            size="small" 
                            href="https://www.khanacademy.org/test-prep/act/act-science" 
                            target="_blank"
                            sx={{ textTransform: 'none' }}
                          >
                            Practice
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
                
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>🎯 ACT Strategy:</strong> English & Math are most important (50% of composite). Science tests reading skills, not science knowledge. Focus practice on weak sections first.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
            
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">📘 Reading Skills (SAT & ACT)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {topicChecklist.reading.map((topic, idx) => (
                    <ListItem key={idx}>
                      <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                      <ListItemText primary={topic} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">✍️ Grammar & Writing</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {topicChecklist.grammar.map((topic, idx) => (
                    <ListItem key={idx}>
                      <CheckCircleIcon color="secondary" sx={{ mr: 1 }} />
                      <ListItemText primary={topic} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">➗ Math (Most Important Area)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {topicChecklist.math.map((topic, idx) => (
                    <ListItem key={idx}>
                      <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      <ListItemText primary={topic} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </TabPanel>

          {/* Study Plan Tab */}
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h5" gutterBottom color="primary">
              🗓️ Study Plan for 10th Grade Student
            </Typography>
            
            <Alert severity="success" sx={{ mb: 3 }}>
              <strong>Daily Commitment:</strong> 90 minutes structured study + homework tracking<br/>
              <strong>Schedule:</strong> 60 min core study + 30 min practice/review
            </Alert>

            {/* Enhanced Daily Study Plan with Checklist */}
            <Card sx={{ mb: 4, border: '2px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScheduleIcon />
                  📅 Daily Study Plan (90 Minutes)
                </Typography>
                
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Day</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Core Study (60 min)</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Practice (30 min)</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Homework ✓</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Daily Goals</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Monday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          📊 <strong>Math Focus:</strong><br/>
                          • Linear equations (20 min)<br/>
                          • Word problems (20 min)<br/>
                          • Formula review (20 min)
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          • 15 algebra problems<br/>
                          • Khan Academy practice<br/>
                          • Error analysis
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          ☐ Math homework<br/>
                          ☐ Notes organized<br/>
                          ☐ Practice reviewed
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Master 3 equation types</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Tuesday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          📝 <strong>English Focus:</strong><br/>
                          • Grammar rules (20 min)<br/>
                          • Reading passage (20 min)<br/>
                          • Vocabulary (20 min)
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          • 10 grammar questions<br/>
                          • 1 reading passage<br/>
                          • 20 vocabulary words
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          ☐ English homework<br/>
                          ☐ Reading assignment<br/>
                          ☐ Vocab flashcards
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Learn 5 grammar rules</td>
                      </tr>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Wednesday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          🔄 <strong>Mixed Review:</strong><br/>
                          • Math review (30 min)<br/>
                          • English review (30 min)
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          • Mixed practice test<br/>
                          • Weak area focus<br/>
                          • Progress tracking
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          ☐ All subjects current<br/>
                          ☐ Weekly review done<br/>
                          ☐ Schedule updated
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Identify weak areas</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Thursday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          📊 <strong>Advanced Math:</strong><br/>
                          • Quadratics (20 min)<br/>
                          • Functions (20 min)<br/>
                          • Data analysis (20 min)
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          • 20 advanced problems<br/>
                          • Calculator practice<br/>
                          • Time management
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          ☐ Math homework<br/>
                          ☐ Formula sheet<br/>
                          ☐ Practice scheduled
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Solve complex equations</td>
                      </tr>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Friday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          📖 <strong>Reading & Writing:</strong><br/>
                          • Passage analysis (30 min)<br/>
                          • Essay writing (30 min)
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          • Timed reading test<br/>
                          • Writing practice<br/>
                          • Vocabulary quiz
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          ☐ Essays graded<br/>
                          ☐ Reading log<br/>
                          ☐ Week organized
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Improve reading speed</td>
                      </tr>
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Saturday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          🧪 <strong>Practice Test:</strong><br/>
                          • Full section test (60 min)
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          • Answer review<br/>
                          • Score analysis<br/>
                          • Next week planning
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          ☐ Test completed<br/>
                          ☐ Scores recorded<br/>
                          ☐ Weak areas noted
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Complete timed test</td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Sunday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          🎯 <strong>Review & Planning:</strong><br/>
                          • Week review (30 min)<br/>
                          • Next week prep (30 min)
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          • Light practice<br/>
                          • Goal setting<br/>
                          • Resource organization
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                          ☐ All homework done<br/>
                          ☐ Materials ready<br/>
                          ☐ Goals set
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Plan next week</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            </Card>

            {/* Daily Progress Tracker */}
            <Card sx={{ mb: 4, border: '2px solid', borderColor: 'success.main' }}>
              <CardContent>
                <Typography variant="h6" color="success.main" gutterBottom>
                  📈 Daily Progress Tracker
                </Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
                  <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
                    <Typography variant="subtitle1" fontWeight="bold">Math Daily Goals</Typography>
                    <List dense sx={{ color: 'white' }}>
                      <ListItem sx={{ py: 0.5 }}>
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                        <ListItemText primary="Complete 15-20 problems daily" primaryTypographyProps={{ fontSize: '0.9rem' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                        <ListItemText primary="Master 1 new concept per day" primaryTypographyProps={{ fontSize: '0.9rem' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                        <ListItemText primary="Review previous day's errors" primaryTypographyProps={{ fontSize: '0.9rem' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                        <ListItemText primary="Time practice (2 min per problem)" primaryTypographyProps={{ fontSize: '0.9rem' }} />
                      </ListItem>
                    </List>
                  </Paper>
                  
                  <Paper sx={{ p: 2, bgcolor: 'secondary.light', color: 'white' }}>
                    <Typography variant="subtitle1" fontWeight="bold">English Daily Goals</Typography>
                    <List dense sx={{ color: 'white' }}>
                      <ListItem sx={{ py: 0.5 }}>
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                        <ListItemText primary="Read 1 passage (10-15 min)" primaryTypographyProps={{ fontSize: '0.9rem' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                        <ListItemText primary="Learn 5 new vocabulary words" primaryTypographyProps={{ fontSize: '0.9rem' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                        <ListItemText primary="Practice 10 grammar questions" primaryTypographyProps={{ fontSize: '0.9rem' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                        <ListItemText primary="Write 1 paragraph summary" primaryTypographyProps={{ fontSize: '0.9rem' }} />
                      </ListItem>
                    </List>
                  </Paper>
                </Box>
              </CardContent>
            </Card>

            {/* Weekly Study Schedule Table */}
            <Card sx={{ mb: 4, border: '2px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScheduleIcon />
                  📅 Weekly Study Schedule
                </Typography>
                
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Day</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Time</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Subject Focus</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Activities</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Goals</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Monday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>30-40 min</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>📐 Math Concepts</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Linear equations, practice problems</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Master 1 algebra topic</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Tuesday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>30-40 min</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>✍️ Grammar Rules</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Subject-verb agreement, punctuation</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Learn 2-3 grammar rules</td>
                      </tr>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Wednesday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>30-40 min</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>📖 Reading Practice</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Short passages, main idea questions</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Complete 2-3 passages</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Thursday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>30-40 min</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>🔢 Math Practice</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Mixed practice problems, review errors</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Solve 15-20 problems</td>
                      </tr>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Friday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>30-40 min</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>📚 Review & Vocab</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Week review, vocabulary in context</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Review weak areas</td>
                      </tr>
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Saturday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>1-1.5 hours</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>🧪 Practice Test</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Full section or mini-test, review answers</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Complete 1 test section</td>
                      </tr>
                      <tr style={{ backgroundColor: '#f1f8e9' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Sunday</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Rest Day</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>🎯 Optional Review</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Light review or complete rest</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Relax and recharge</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            </Card>

            {/* Monthly Practice Test Schedule */}
            <Card sx={{ mb: 4, border: '2px solid', borderColor: 'secondary.main' }}>
              <CardContent>
                <Typography variant="h6" color="secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <QuizIcon />
                  📊 Monthly Practice Test Schedule
                </Typography>
                
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#9c27b0', color: 'white' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Week</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Practice Test</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Focus Area</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Time Limit</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Review Goals</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ backgroundColor: '#f3e5f5' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>Week 1</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Khan Academy Practice Test 1 (Math)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Algebra & Functions</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>70 minutes</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Identify weak algebra topics</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>Week 2</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Khan Academy Practice Test 1 (Reading)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Reading Comprehension</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>65 minutes</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Practice passage strategies</td>
                      </tr>
                      <tr style={{ backgroundColor: '#f3e5f5' }}>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>Week 3</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>College Board Practice Test 1 (Writing)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Grammar & Usage</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>35 minutes</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Master grammar rules</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>Week 4</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Full Practice Test (Timed)</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>All Sections</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>3 hours</td>
                        <td style={{ padding: '12px', border: '1px solid #ddd' }}>Assess overall progress</td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>📌 Test Strategy:</strong> Start with individual sections, then progress to full tests. 
                    Always review incorrect answers and understand why you got them wrong.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>

            {Object.entries(studyPlan).map(([key, phase], index) => (
              <Card key={key} sx={{ mb: 3, border: '2px solid', borderColor: 'primary.light' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <ScheduleIcon color="primary" />
                    <Typography variant="h6" color="primary">
                      Phase {index + 1}: {phase.title}
                    </Typography>
                  </Box>
                  
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Goal: {phase.goal}
                  </Typography>
                  
                  {phase.timeCommitment && (
                    <Chip label={phase.timeCommitment} color="primary" sx={{ mb: 2 }} />
                  )}
                  
                  {phase.schedule && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Weekly Structure:
                      </Typography>
                      <List dense>
                        {phase.schedule.map((item, idx) => (
                          <ListItem key={idx}>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  
                  {phase.focus && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        What to Do:
                      </Typography>
                      <List dense>
                        {phase.focus.map((item, idx) => (
                          <ListItem key={idx}>
                            <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  
                  {phase.activities && (
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Activities:
                      </Typography>
                      <List dense>
                        {phase.activities.map((activity, idx) => (
                          <ListItem key={idx}>
                            <CheckCircleIcon color="info" sx={{ mr: 1 }} />
                            <ListItemText primary={activity} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}

            <Card sx={{ bgcolor: 'warning.light' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📌 Study Tips
                </Typography>
                <List dense>
                  <ListItem>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    <ListItemText primary="Use official practice tests (SAT via College Board Bluebook; ACT via Official ACT Prep Guide)" />
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    <ListItemText primary="Focus on high-frequency skills (evidence, algebra, grammar rules)" />
                  </ListItem>
                  <ListItem>
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    <ListItemText primary="Time-practice to build pacing" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: 'info.light', mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  🤖 AI-Powered Practice from Google Gemini
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Google's Gemini app now offers free full-length SAT practice tests built with help from The Princeton Review, with instant AI feedback and explanations.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ textTransform: 'none' }}
                >
                  Try Gemini SAT Practice
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: 'error.light', mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  🎥 Best YouTube Channels for SAT & ACT
                </Typography>
                
                <Accordion sx={{ mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="bold">SAT Prep Videos</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Khan Academy SAT Practice" 
                          secondary="Complete SAT prep course - FREE official partner"
                        />
                        <Button 
                          size="small" 
                          href="https://www.youtube.com/c/khanacademy" 
                          target="_blank"
                          variant="outlined"
                        >
                          Watch
                        </Button>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="College Panda SAT Math" 
                          secondary="Advanced SAT Math strategies and practice"
                        />
                        <Button 
                          size="small" 
                          href="https://www.youtube.com/c/CollegePanda" 
                          target="_blank"
                          variant="outlined"
                        >
                          Watch
                        </Button>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Scalar Learning SAT" 
                          secondary="SAT Reading, Writing, and Math concepts"
                        />
                        <Button 
                          size="small" 
                          href="https://www.youtube.com/c/ScalarLearning" 
                          target="_blank"
                          variant="outlined"
                        >
                          Watch
                        </Button>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="SupertutorTV" 
                          secondary="SAT Reading and Writing strategies"
                        />
                        <Button 
                          size="small" 
                          href="https://www.youtube.com/c/SupertutorTV" 
                          target="_blank"
                          variant="outlined"
                        >
                          Watch
                        </Button>
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="bold">ACT Prep Videos</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="PrepScholar ACT" 
                          secondary="Complete ACT strategies for all sections"
                        />
                        <Button 
                          size="small" 
                          href="https://www.youtube.com/c/PrepScholar" 
                          target="_blank"
                          variant="outlined"
                        >
                          Watch
                        </Button>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Brooke Hanson ACT Prep" 
                          secondary="ACT English and Reading expert tips"
                        />
                        <Button 
                          size="small" 
                          href="https://www.youtube.com/c/BrookeHanson" 
                          target="_blank"
                          variant="outlined"
                        >
                          Watch
                        </Button>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="For the Love of ACT Science" 
                          secondary="ACT Science section strategies and practice"
                        />
                        <Button 
                          size="small" 
                          href="https://www.youtube.com/c/ForTheLoveOfACTScience" 
                          target="_blank"
                          variant="outlined"
                        >
                          Watch
                        </Button>
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="The Organic Chemistry Tutor" 
                          secondary="ACT Math concepts and problem solving"
                        />
                        <Button 
                          size="small" 
                          href="https://www.youtube.com/c/TheOrganicChemistryTutor" 
                          target="_blank"
                          variant="outlined"
                        >
                          Watch
                        </Button>
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>

                <Alert severity="success" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    📌 <strong>Pro Tip:</strong> Start with Khan Academy for SAT (official partner) and PrepScholar for ACT. 
                    Watch 2-3 videos per week alongside your regular study schedule.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </TabPanel>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            href="https://collegereadiness.collegeboard.org/sat"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
          >
            SAT Official
          </Button>
          <Button
            href="https://www.act.org"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
          >
            ACT Official
          </Button>
          <Button onClick={() => setOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudyGuide;