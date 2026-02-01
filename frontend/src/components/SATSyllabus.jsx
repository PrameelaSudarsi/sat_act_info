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
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Timer as TimerIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const SATSyllabus = () => {
  const [open, setOpen] = useState(false);

  const syllabusData = {
    overview: {
      duration: "3 hours",
      sections: 2,
      totalQuestions: "98 questions",
      scoreRange: "400-1600"
    },
    sections: [
      {
        name: "Reading and Writing",
        duration: "64 minutes",
        questions: "54 questions",
        domains: [
          {
            name: "Craft and Structure",
            skills: ["Words in Context", "Text Structure and Purpose", "Cross-Text Connections"]
          },
          {
            name: "Information and Ideas", 
            skills: ["Central Ideas and Details", "Command of Evidence", "Inferences"]
          },
          {
            name: "Standard English Conventions",
            skills: ["Boundaries", "Form, Structure, and Sense"]
          },
          {
            name: "Expression of Ideas",
            skills: ["Rhetorical Synthesis", "Transitions"]
          }
        ]
      },
      {
        name: "Math",
        duration: "70 minutes",
        questions: "44 questions",
        domains: [
          {
            name: "Algebra",
            skills: ["Linear equations in one variable", "Linear functions", "Systems of linear equations", "Linear inequalities"]
          },
          {
            name: "Advanced Math",
            skills: ["Equivalent expressions", "Nonlinear equations", "Nonlinear functions"]
          },
          {
            name: "Problem-Solving and Data Analysis",
            skills: ["Ratios, rates, proportional relationships", "Percentages", "One-variable data", "Two-variable data", "Probability and conditional probability"]
          },
          {
            name: "Geometry and Trigonometry",
            skills: ["Area and volume", "Lines, angles, and triangles", "Right triangles and trigonometry", "Circles"]
          }
        ]
      }
    ]
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ mb: 1, textTransform: 'none' }}
        startIcon={<SchoolIcon />}
      >
        View SAT 2026 Syllabus
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon />
          SAT 2026 Digital Test Structure
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {/* Overview */}
          <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Test Overview
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip icon={<TimerIcon />} label={`Duration: ${syllabusData.overview.duration}`} />
                <Chip icon={<AssignmentIcon />} label={`${syllabusData.overview.totalQuestions}`} />
                <Chip label={`Score: ${syllabusData.overview.scoreRange}`} />
                <Chip label={`${syllabusData.overview.sections} Sections`} />
              </Box>
            </CardContent>
          </Card>

          {/* Sections */}
          {syllabusData.sections.map((section, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Typography variant="h6" color="primary">
                    {section.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                    <Chip size="small" label={section.duration} />
                    <Chip size="small" label={section.questions} />
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {section.domains.map((domain, domainIndex) => (
                  <Box key={domainIndex} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" color="secondary" gutterBottom>
                      {domain.name}
                    </Typography>
                    <List dense>
                      {domain.skills.map((skill, skillIndex) => (
                        <ListItem key={skillIndex} sx={{ py: 0.5 }}>
                          <ListItemText 
                            primary={skill}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}

          <Card sx={{ mt: 3, bgcolor: 'info.light' }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                📝 Key Changes in 2026
              </Typography>
              <Typography variant="body2">
                • Fully digital format with adaptive testing<br/>
                • Shorter test duration (3 hours vs 4+ hours)<br/>
                • Integrated Reading and Writing section<br/>
                • Calculator allowed for entire Math section<br/>
                • Faster score reporting (days vs weeks)
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            href="https://collegereadiness.collegeboard.org/sat"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
          >
            Official SAT Info
          </Button>
          <Button onClick={() => setOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SATSyllabus;