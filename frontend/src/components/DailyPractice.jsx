import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  Divider,
} from '@mui/material';
import { CalendarMonth as CalendarIcon } from '@mui/icons-material';

const DailyPractice = () => {
  const [open, setOpen] = useState(false);

  const weeklySchedule = [
    {
      day: 'Monday',
      morning: { subject: 'SAT Math - Algebra', duration: '45 min', topics: 'Linear equations, Systems, Slopes', link: 'https://www.khanacademy.org/math/algebra' },
      evening: { subject: 'SAT English - Reading', duration: '45 min', topics: 'Main ideas, Evidence, Inferences', link: 'https://www.khanacademy.org/test-prep/sat/sat-reading-writing-practice' }
    },
    {
      day: 'Tuesday',
      morning: { subject: 'SAT Math - Advanced Math', duration: '45 min', topics: 'Quadratics, Exponentials, Functions', link: 'https://www.khanacademy.org/math/algebra2' },
      evening: { subject: 'SAT English - Grammar', duration: '45 min', topics: 'Punctuation, Verbs, Sentence structure', link: 'https://www.khanacademy.org/test-prep/sat/sat-reading-writing-practice' }
    },
    {
      day: 'Wednesday',
      morning: { subject: 'ACT Math - Pre-Algebra', duration: '45 min', topics: 'Ratios, Percentages, Fractions', link: 'https://www.khanacademy.org/math/pre-algebra' },
      evening: { subject: 'ACT English', duration: '45 min', topics: 'Grammar, Punctuation, Style', link: 'https://www.khanacademy.org/humanities/grammar' }
    },
    {
      day: 'Thursday',
      morning: { subject: 'SAT Math - Problem Solving', duration: '45 min', topics: 'Statistics, Probability, Data analysis', link: 'https://www.khanacademy.org/math/statistics-probability' },
      evening: { subject: 'ACT Reading', duration: '45 min', topics: 'Comprehension, Literary analysis', link: 'https://www.khanacademy.org/humanities/reading-comprehension' }
    },
    {
      day: 'Friday',
      morning: { subject: 'SAT Math - Geometry & Trig', duration: '45 min', topics: 'Area, Volume, Trigonometry', link: 'https://www.khanacademy.org/math/geometry' },
      evening: { subject: 'ACT Science', duration: '45 min', topics: 'Data interpretation, Experiments', link: 'https://www.khanacademy.org/science' }
    }
  ];

  return (
    <>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<CalendarIcon />}
        onClick={() => setOpen(true)}
        sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
      >
        Daily Practice Schedule
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700 }}>
          📅 Daily Practice Schedule - Monday to Friday
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Consistent daily practice is key to SAT/ACT success. Follow this schedule for 90 minutes per day (45 min morning + 45 min evening).
          </Typography>

          {weeklySchedule.map((schedule, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {schedule.day}
                </Typography>
                <Chip label="90 min total" size="small" color="success" />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="primary">
                        🌅 Morning Session
                      </Typography>
                      <Chip label={schedule.morning.duration} size="small" />
                    </Box>
                    <Typography variant="body2" fontWeight="600" gutterBottom>
                      {schedule.morning.subject}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                      {schedule.morning.topics}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      href={schedule.morning.link}
                      target="_blank"
                      sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                    >
                      Practice on Khan Academy
                    </Button>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, bgcolor: '#f3e5f5', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="secondary">
                        🌙 Evening Session
                      </Typography>
                      <Chip label={schedule.evening.duration} size="small" />
                    </Box>
                    <Typography variant="body2" fontWeight="600" gutterBottom>
                      {schedule.evening.subject}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                      {schedule.evening.topics}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      href={schedule.evening.link}
                      target="_blank"
                      sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                    >
                      Practice on Khan Academy
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Divider sx={{ my: 3 }} />

          <Paper sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="warning.main" gutterBottom>
              💡 Practice Tips
            </Typography>
            <Typography variant="body2" component="div">
              • <strong>Consistency:</strong> Practice at the same time daily<br/>
              • <strong>Focus:</strong> Eliminate distractions during sessions<br/>
              • <strong>Review:</strong> Spend 10 min reviewing mistakes<br/>
              • <strong>Track Progress:</strong> Keep a practice log<br/>
              • <strong>Weekend:</strong> Take full-length practice tests
            </Typography>
          </Paper>

          <Paper sx={{ p: 2, mt: 2, bgcolor: '#e8f5e9', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="success.main" gutterBottom>
              📊 Weekly Goals
            </Typography>
            <Typography variant="body2" component="div">
              • <strong>Total Practice Time:</strong> 7.5 hours per week<br/>
              • <strong>Math Practice:</strong> 3.75 hours (5 sessions × 45 min)<br/>
              • <strong>English Practice:</strong> 3.75 hours (5 sessions × 45 min)<br/>
              • <strong>Weekend Test:</strong> 1 full-length practice test (3 hours)
            </Typography>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DailyPractice;
