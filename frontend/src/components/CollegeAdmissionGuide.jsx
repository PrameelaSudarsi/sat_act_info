import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Grid,
  Paper,
  Alert,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  School as SchoolIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  MonetizationOn as MoneyIcon,
  ExpandMore as ExpandMoreIcon,
  Launch as LaunchIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const CollegeAdmissionGuide = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );

  const topColleges = [
    { name: "Harvard University", acceptance: "3.4%", sat: "1460-1580", act: "33-35", tuition: "$54,269" },
    { name: "Stanford University", acceptance: "3.9%", sat: "1440-1570", act: "32-35", tuition: "$56,169" },
    { name: "MIT", acceptance: "4.1%", sat: "1510-1580", act: "34-36", tuition: "$53,790" },
    { name: "Yale University", acceptance: "4.6%", sat: "1460-1580", act: "33-35", tuition: "$59,950" },
    { name: "Princeton University", acceptance: "4.0%", sat: "1460-1570", act: "32-35", tuition: "$56,010" }
  ];

  const illinoisColleges = [
    {
      name: "University of Illinois Urbana-Champaign",
      acceptance: "59.7%",
      sat: "1340-1510",
      act: "30-34",
      tuition: "$16,862 (in-state), $34,316 (out-of-state)",
      gpa: "3.8+",
      requirements: [
        "4 years English",
        "3-4 years Math (through Algebra II)",
        "2-4 years Science (lab sciences)",
        "2-4 years Social Studies",
        "2 years Foreign Language",
        "Personal Statement",
        "Letters of Recommendation"
      ],
      programs: ["Engineering", "Business", "Computer Science", "Agriculture", "Liberal Arts"],
      deadlines: "Early Action: Nov 1, Regular: Jan 2"
    },
    {
      name: "Northwestern University",
      acceptance: "7.0%",
      sat: "1450-1570",
      act: "33-35",
      tuition: "$60,276",
      gpa: "4.0+",
      requirements: [
        "4 years English",
        "4 years Math",
        "3-4 years Science",
        "2-3 years Social Studies",
        "2-4 years Foreign Language",
        "Common Application Essay",
        "Supplemental Essays",
        "2 Teacher Recommendations"
      ],
      programs: ["Journalism", "Engineering", "Business", "Medicine", "Law"],
      deadlines: "Early Decision: Nov 1, Regular: Jan 3"
    },
    {
      name: "University of Chicago",
      acceptance: "6.2%",
      sat: "1470-1570",
      act: "33-35",
      tuition: "$59,298",
      gpa: "4.0+",
      requirements: [
        "4 years English",
        "4 years Math",
        "3-4 years Science",
        "3-4 years Social Studies",
        "2+ years Foreign Language",
        "Unique UChicago Essays",
        "2 Teacher Recommendations",
        "Counselor Recommendation"
      ],
      programs: ["Economics", "Political Science", "Physics", "Medicine", "Business"],
      deadlines: "Early Decision: Nov 16, Regular: Jan 2"
    },
    {
      name: "Illinois Institute of Technology",
      acceptance: "57%",
      sat: "1230-1450",
      act: "27-32",
      tuition: "$48,670",
      gpa: "3.5+",
      requirements: [
        "4 years English",
        "4 years Math (including Calculus)",
        "3 years Science (Physics, Chemistry)",
        "2 years Social Studies",
        "Personal Statement",
        "Letter of Recommendation"
      ],
      programs: ["Engineering", "Computer Science", "Architecture", "Applied Technology"],
      deadlines: "Rolling Admissions"
    },
    {
      name: "DePaul University",
      acceptance: "70%",
      sat: "1160-1350",
      act: "25-30",
      tuition: "$42,378",
      gpa: "3.4+",
      requirements: [
        "4 years English",
        "3 years Math",
        "3 years Science",
        "3 years Social Studies",
        "Personal Statement",
        "Letter of Recommendation"
      ],
      programs: ["Business", "Liberal Arts", "Music", "Theatre", "Education"],
      deadlines: "Early Action: Nov 15, Regular: Feb 1"
    },
    {
      name: "Southern Illinois University",
      acceptance: "87%",
      sat: "1030-1240",
      act: "21-27",
      tuition: "$13,481 (in-state), $28,729 (out-of-state)",
      gpa: "2.5+",
      requirements: [
        "4 years English",
        "3 years Math",
        "3 years Science",
        "3 years Social Studies",
        "2 years Electives",
        "Personal Statement (optional)"
      ],
      programs: ["Aviation", "Agriculture", "Engineering", "Medicine", "Education"],
      deadlines: "Rolling Admissions"
    }
  ];

  const timeline = [
    { grade: "9th Grade", tasks: ["Focus on grades", "Join extracurriculars", "Build study habits"] },
    { grade: "10th Grade", tasks: ["Take PSAT", "Continue strong GPA", "Leadership roles"] },
    { grade: "11th Grade", tasks: ["Take SAT/ACT", "AP exams", "College research", "Summer programs"] },
    { grade: "12th Grade", tasks: ["Applications due", "FAFSA", "Final transcripts", "Decision time"] }
  ];

  const applicationTips = [
    { title: "Personal Essay", tip: "Tell your unique story, show don't tell, be authentic" },
    { title: "Letters of Recommendation", tip: "Ask teachers who know you well, give them time" },
    { title: "Extracurriculars", tip: "Quality over quantity, show leadership and impact" },
    { title: "Test Scores", tip: "Take tests multiple times, prep thoroughly" },
    { title: "GPA", tip: "Consistency matters, upward trend is good" }
  ];

  return (
    <>
      <Button
        variant="contained"
        color="info"
        onClick={() => setOpen(true)}
        sx={{ mb: 1, textTransform: 'none', width: '100%' }}
        startIcon={<SchoolIcon />}
      >
        College Admission Guide
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2, maxHeight: '90vh' } }}
      >
        <DialogTitle sx={{ bgcolor: 'info.main', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon />
          SAT/ACT Excellence Center - College Admission Guidance
        </DialogTitle>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Timeline" />
            <Tab label="Top Colleges" />
            <Tab label="Illinois Colleges" />
            <Tab label="Application Tips" />
            <Tab label="Financial Aid" />
          </Tabs>
        </Box>

        <DialogContent sx={{ p: 0, height: '70vh', overflow: 'auto' }}>
          {/* Timeline Tab */}
          <TabPanel value={tabValue} index={0}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <strong>4-Year College Preparation Timeline</strong><br/>
              Start early and stay organized for the best results.
            </Alert>

            {timeline.map((year, index) => (
              <Card key={index} sx={{ mb: 2, border: '2px solid', borderColor: 'primary.light' }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {year.grade}
                  </Typography>
                  <List dense>
                    {year.tasks.map((task, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <CheckIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary={task} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}

            <Paper sx={{ p: 2, bgcolor: 'warning.light' }}>
              <Typography variant="h6" gutterBottom>📅 Key Deadlines</Typography>
              <Typography variant="body2">
                • Early Decision: November 1-15<br/>
                • Regular Decision: January 1-15<br/>
                • FAFSA Opens: October 1<br/>
                • CSS Profile: Check individual college deadlines
              </Typography>
            </Paper>
          </TabPanel>

          {/* Top Colleges Tab */}
          <TabPanel value={tabValue} index={1}>
            <Alert severity="success" sx={{ mb: 3 }}>
              <strong>Top US Universities</strong><br/>
              Admission statistics and requirements for elite institutions.
            </Alert>

            <Grid container spacing={2}>
              {topColleges.map((college, index) => (
                <Grid item xs={12} key={index}>
                  <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" color="primary">
                          {college.name}
                        </Typography>
                        <Chip label={`${college.acceptance} acceptance`} color="error" size="small" />
                      </Box>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Paper sx={{ p: 1, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                            <Typography variant="caption">SAT Range</Typography>
                            <Typography variant="body2" fontWeight="bold">{college.sat}</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={3}>
                          <Paper sx={{ p: 1, textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
                            <Typography variant="caption">ACT Range</Typography>
                            <Typography variant="body2" fontWeight="bold">{college.act}</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={3}>
                          <Paper sx={{ p: 1, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                            <Typography variant="caption">Tuition</Typography>
                            <Typography variant="body2" fontWeight="bold">{college.tuition}</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<LaunchIcon />}
                            href={`https://www.google.com/search?q=${college.name}+admissions`}
                            target="_blank"
                            sx={{ width: '100%' }}
                          >
                            Apply
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Card sx={{ mt: 3, bgcolor: 'info.light' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>🎯 Target Score Ranges</Typography>
                <Typography variant="body2">
                  • <strong>Ivy League:</strong> SAT 1450+, ACT 32+<br/>
                  • <strong>Top 20:</strong> SAT 1400+, ACT 30+<br/>
                  • <strong>Top 50:</strong> SAT 1300+, ACT 28+<br/>
                  • <strong>State Schools:</strong> SAT 1200+, ACT 25+
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>

          {/* Illinois Colleges Tab */}
          <TabPanel value={tabValue} index={2}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <strong>Illinois State Colleges & Universities</strong><br/>
              Comprehensive guide to Illinois higher education institutions with admission requirements.
            </Alert>

            <Card sx={{ mb: 3, border: '3px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  🏛️ University of Illinois Urbana-Champaign (UIUC)
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Flagship public research university, ranked #15 in public universities nationally.
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 1, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                      <Typography variant="caption">Acceptance Rate</Typography>
                      <Typography variant="h6">59.7%</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 1, textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
                      <Typography variant="caption">SAT Range</Typography>
                      <Typography variant="body2">1340-1510</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 1, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                      <Typography variant="caption">ACT Range</Typography>
                      <Typography variant="body2">30-34</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 1, textAlign: 'center', bgcolor: 'warning.light', color: 'white' }}>
                      <Typography variant="caption">Min GPA</Typography>
                      <Typography variant="body2">3.8+</Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom>📋 Application Requirements</Typography>
                <List dense>
                  {illinoisColleges[0].requirements.map((req, idx) => (
                    <ListItem key={idx}>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h6" gutterBottom>🎓 Top Programs</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {illinoisColleges[0].programs.map((program, idx) => (
                    <Chip key={idx} label={program} color="primary" variant="outlined" />
                  ))}
                </Box>

                <Typography variant="body2" color="text.secondary">
                  <strong>Deadlines:</strong> {illinoisColleges[0].deadlines}<br/>
                  <strong>Tuition:</strong> {illinoisColleges[0].tuition}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  href="https://admissions.illinois.edu"
                  target="_blank"
                  startIcon={<LaunchIcon />}
                  sx={{ mt: 2 }}
                >
                  Apply to UIUC
                </Button>
              </CardContent>
            </Card>

            <Typography variant="h6" gutterBottom>🏫 Other Illinois Colleges</Typography>
            {illinoisColleges.slice(1).map((college, index) => (
              <Accordion key={index} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography variant="h6" color="primary">{college.name}</Typography>
                    <Chip label={`${college.acceptance} acceptance`} size="small" color="info" />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>SAT:</strong> {college.sat}</Typography>
                      <Typography variant="body2"><strong>ACT:</strong> {college.act}</Typography>
                      <Typography variant="body2"><strong>GPA:</strong> {college.gpa}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Tuition:</strong> {college.tuition}</Typography>
                      <Typography variant="body2"><strong>Deadlines:</strong> {college.deadlines}</Typography>
                    </Grid>
                  </Grid>

                  <Typography variant="subtitle2" gutterBottom>Requirements:</Typography>
                  <List dense>
                    {college.requirements.map((req, idx) => (
                      <ListItem key={idx} sx={{ py: 0 }}>
                        <ListItemIcon><CheckIcon color="success" fontSize="small" /></ListItemIcon>
                        <ListItemText primary={req} primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="subtitle2" gutterBottom>Top Programs:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {college.programs.map((program, idx) => (
                      <Chip key={idx} label={program} size="small" variant="outlined" />
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    size="small"
                    href={`https://www.google.com/search?q=${college.name}+admissions`}
                    target="_blank"
                    startIcon={<LaunchIcon />}
                  >
                    Visit Website
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}

            <Paper sx={{ p: 2, bgcolor: 'info.light', mt: 3 }}>
              <Typography variant="h6" gutterBottom>💡 Illinois Resident Benefits</Typography>
              <Typography variant="body2">
                • <strong>In-State Tuition:</strong> Significant savings at public universities<br/>
                • <strong>MAP Grant:</strong> Illinois Monetary Award Program for residents<br/>
                • <strong>AIM HIGH:</strong> Merit scholarships for middle-income families<br/>
                • <strong>Community College Transfer:</strong> Guaranteed admission agreements
              </Typography>
            </Paper>
          </TabPanel>

          {/* Application Tips Tab */}
          <TabPanel value={tabValue} index={3}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              <strong>Application Success Strategies</strong><br/>
              Professional tips from admission counselors.
            </Alert>

            {applicationTips.map((tip, index) => (
              <Accordion key={index} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarIcon color="primary" />
                    <Typography variant="h6">{tip.title}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">{tip.tip}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}

            <Card sx={{ mt: 3, border: '2px solid', borderColor: 'success.main' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="success.main">
                  📝 Common Application
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Apply to 900+ colleges with one application. Save time and effort.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  href="https://www.commonapp.org"
                  target="_blank"
                  startIcon={<LaunchIcon />}
                >
                  Start Common App
                </Button>
              </CardContent>
            </Card>
          </TabPanel>

          {/* Financial Aid Tab */}
          <TabPanel value={tabValue} index={4}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <strong>Financial Aid & Scholarships</strong><br/>
              Make college affordable with proper planning.
            </Alert>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Card sx={{ height: '100%', bgcolor: 'primary.light', color: 'white' }}>
                  <CardContent>
                    <MoneyIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">FAFSA</Typography>
                    <Typography variant="body2">
                      Free Application for Federal Student Aid. Opens October 1st.
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{ mt: 2, color: 'white', borderColor: 'white' }}
                      href="https://studentaid.gov/h/apply-for-aid/fafsa"
                      target="_blank"
                    >
                      Apply FAFSA
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ height: '100%', bgcolor: 'secondary.light', color: 'white' }}>
                  <CardContent>
                    <AssignmentIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">CSS Profile</Typography>
                    <Typography variant="body2">
                      Required by many private colleges for institutional aid.
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{ mt: 2, color: 'white', borderColor: 'white' }}
                      href="https://cssprofile.collegeboard.org"
                      target="_blank"
                    >
                      CSS Profile
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>💰 Scholarship Resources</Typography>
            <List>
              {[
                { name: "Fastweb", url: "https://www.fastweb.com" },
                { name: "Scholarships.com", url: "https://www.scholarships.com" },
                { name: "College Board Scholarship Search", url: "https://bigfuture.collegeboard.org/scholarship-search" },
                { name: "Cappex", url: "https://www.cappex.com" }
              ].map((resource, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <MoneyIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Link href={resource.url} target="_blank" rel="noopener">
                        {resource.name}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Paper sx={{ p: 2, bgcolor: 'success.light', mt: 2 }}>
              <Typography variant="h6" gutterBottom>💡 Financial Aid Tips</Typography>
              <Typography variant="body2">
                • Apply early for maximum aid<br/>
                • Don't skip FAFSA even if you think you won't qualify<br/>
                • Look for local scholarships with less competition<br/>
                • Consider community college for first two years<br/>
                • Compare net price, not sticker price
              </Typography>
            </Paper>
          </TabPanel>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            href="https://www.commonapp.org"
            target="_blank"
            variant="outlined"
          >
            Common Application
          </Button>
          <Button
            href="https://studentaid.gov"
            target="_blank"
            variant="outlined"
          >
            Federal Student Aid
          </Button>
          <Button onClick={() => setOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CollegeAdmissionGuide;