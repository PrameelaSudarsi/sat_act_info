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

const ACTSyllabus = () => {
  const [open, setOpen] = useState(false);

  const syllabusData = {
    overview: {
      duration: "2 hours 55 minutes",
      sections: 4,
      totalQuestions: "215 questions",
      scoreRange: "1-36"
    },
    sections: [
      {
        name: "English",
        duration: "45 minutes",
        questions: "75 questions",
        domains: [
          {
            name: "Usage/Mechanics",
            skills: ["Punctuation", "Grammar and Usage", "Sentence Structure"]
          },
          {
            name: "Rhetorical Skills",
            skills: ["Strategy", "Organization", "Style"]
          }
        ]
      },
      {
        name: "Mathematics",
        duration: "60 minutes",
        questions: "60 questions",
        domains: [
          {
            name: "Pre-Algebra",
            skills: ["Basic operations", "Integers", "Rational numbers", "Statistics", "Probability"]
          },
          {
            name: "Elementary Algebra",
            skills: ["Linear equations", "Inequalities", "Polynomials", "Factoring"]
          },
          {
            name: "Intermediate Algebra",
            skills: ["Quadratic equations", "Systems of equations", "Logarithms", "Sequences"]
          },
          {
            name: "Coordinate Geometry",
            skills: ["Graphing", "Properties of circles", "Other curves", "Transformations"]
          },
          {
            name: "Plane Geometry",
            skills: ["Angles", "Triangles", "Quadrilaterals", "Circles", "Perimeter", "Area", "Volume"]
          },
          {
            name: "Trigonometry",
            skills: ["Trigonometric ratios", "Identities", "Equations", "Graphing"]
          }
        ]
      },
      {
        name: "Reading",
        duration: "35 minutes",
        questions: "40 questions",
        domains: [
          {
            name: "Key Ideas and Details",
            skills: ["Close reading", "Central ideas", "Summarizing", "Relationships"]
          },
          {
            name: "Craft and Structure",
            skills: ["Word meanings", "Text structure", "Author's purpose", "Point of view"]
          },
          {
            name: "Integration of Knowledge",
            skills: ["Arguments", "Multiple texts", "Analyzing claims"]
          }
        ]
      },
      {
        name: "Science",
        duration: "35 minutes",
        questions: "40 questions",
        domains: [
          {
            name: "Interpretation of Data",
            skills: ["Graphs", "Tables", "Diagrams", "Scatterplots"]
          },
          {
            name: "Scientific Investigation",
            skills: ["Experimental design", "Tools and procedures", "Hypotheses"]
          },
          {
            name: "Evaluation of Models",
            skills: ["Scientific information", "Inferences", "Predictions", "Conclusions"]
          }
        ]
      }
    ]
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
        sx={{ mb: 1, textTransform: 'none' }}
        startIcon={<SchoolIcon />}
      >
        View ACT 2026 Syllabus
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
        <DialogTitle sx={{ bgcolor: 'secondary.main', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon />
          ACT 2026 Test Structure
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {/* Overview */}
          <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="secondary">
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
                  <Typography variant="h6" color="secondary">
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
                    <Typography variant="subtitle1" fontWeight="bold" color="primary" gutterBottom>
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

          <Card sx={{ mt: 3, bgcolor: 'warning.light' }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                📝 ACT Test Features
              </Typography>
              <Typography variant="body2">
                • Paper-based test format<br/>
                • No penalty for wrong answers<br/>
                • Calculator allowed only in Math section<br/>
                • Optional Writing section (40 minutes)<br/>
                • Composite score is average of four sections
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            href="https://www.act.org/content/act/en/products-and-services/the-act.html"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
          >
            Official ACT Info
          </Button>
          <Button onClick={() => setOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ACTSyllabus;