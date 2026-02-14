import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  Divider,
  Chip,
  Paper,
  Alert,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const SAT2026StudyGuide = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

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

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700 }}>
          📚 SAT & ACT 2026 Complete Study Guide
        </DialogTitle>
        
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
          <Tab label="SAT Math" />
          <Tab label="SAT English" />
          <Tab label="ACT Math" />
          <Tab label="ACT English" />
          <Tab label="Test Strategy" />
        </Tabs>

        <DialogContent sx={{ p: 4 }}>
          {/* SAT MATH TAB */}
          {tabValue === 0 && (
            <Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight="bold">🎯 Digital SAT Math: 44 Questions | 70 Minutes | 2 Modules (22Q each, 35min each)</Typography>
                <Typography variant="body2">Calculator allowed for all questions. Built-in Desmos graphing calculator provided.</Typography>
              </Alert>

              <Typography variant="h5" fontWeight="bold" gutterBottom>Content Domains</Typography>
              
              <Paper sx={{ p: 3, mb: 3, bgcolor: '#e3f2fd' }}>
                <Typography variant="h6" fontWeight="bold" color="primary">1. Algebra (35% | 13-15 Questions)</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Linear Equations & Inequalities:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Solve ax + b = c, ax + b &lt; c<br/>
                  • Multi-step equations with variables on both sides<br/>
                  • Word problems translating to linear equations<br/>
                  • Absolute value equations: |x + a| = b
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Systems of Equations:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Solve by substitution, elimination, or graphing<br/>
                  • Interpret solutions (one solution, no solution, infinite solutions)<br/>
                  • Real-world applications (mixture, rate, cost problems)
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Linear Functions:</Typography>
                <Typography variant="body2" component="div">
                  • Slope-intercept form: y = mx + b<br/>
                  • Point-slope form: y - y₁ = m(x - x₁)<br/>
                  • Parallel lines (same slope), Perpendicular lines (negative reciprocal slopes)<br/>
                  • Interpret slope and y-intercept in context
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 3, bgcolor: '#f3e5f5' }}>
                <Typography variant="h6" fontWeight="bold" color="secondary">2. Advanced Math (35% | 13-15 Questions)</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Quadratic Functions:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Standard form: ax² + bx + c<br/>
                  • Vertex form: a(x - h)² + k<br/>
                  • Factored form: a(x - r₁)(x - r₂)<br/>
                  • Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a<br/>
                  • Parabola properties: vertex, axis of symmetry, roots
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Exponential Functions:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Growth: y = a(1 + r)ᵗ, Decay: y = a(1 - r)ᵗ<br/>
                  • Compound interest: A = P(1 + r/n)ⁿᵗ<br/>
                  • Exponential vs. linear growth comparison
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Polynomials & Rational Expressions:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Operations with polynomials (add, subtract, multiply)<br/>
                  • Factoring: GCF, difference of squares, trinomials<br/>
                  • Simplify rational expressions<br/>
                  • Solve rational equations
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Radicals & Exponents:</Typography>
                <Typography variant="body2" component="div">
                  • Properties: xᵃ · xᵇ = xᵃ⁺ᵇ, (xᵃ)ᵇ = xᵃᵇ<br/>
                  • Simplify radicals: √(ab) = √a · √b<br/>
                  • Rationalize denominators
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 3, bgcolor: '#e8f5e9' }}>
                <Typography variant="h6" fontWeight="bold" color="success.main">3. Problem Solving & Data Analysis (15% | 5-7 Questions)</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Ratios, Rates & Proportions:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Unit rates and conversions<br/>
                  • Proportional relationships: a/b = c/d<br/>
                  • Scale factors and similar figures<br/>
                  • Percent increase/decrease: (new - old)/old × 100%
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Statistics:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Mean (average), Median (middle value), Mode (most frequent)<br/>
                  • Range, Standard deviation (measure of spread)<br/>
                  • Interpret data from tables, bar graphs, histograms, box plots<br/>
                  • Scatterplots: positive/negative correlation, line of best fit
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Probability:</Typography>
                <Typography variant="body2" component="div">
                  • Basic probability: P(event) = favorable outcomes / total outcomes<br/>
                  • Conditional probability: P(A|B) = P(A and B) / P(B)<br/>
                  • Independent vs. dependent events
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, bgcolor: '#fff3e0' }}>
                <Typography variant="h6" fontWeight="bold" color="warning.main">4. Geometry & Trigonometry (15% | 5-7 Questions)</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Area & Volume:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Rectangle: A = lw, Triangle: A = ½bh<br/>
                  • Circle: A = πr², Circumference: C = 2πr<br/>
                  • Rectangular prism: V = lwh, Cylinder: V = πr²h<br/>
                  • Sphere: V = (4/3)πr³, Cone: V = (1/3)πr²h
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Angles & Triangles:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Triangle angle sum: 180°<br/>
                  • Pythagorean theorem: a² + b² = c²<br/>
                  • Special right triangles: 30-60-90 (1:√3:2), 45-45-90 (1:1:√2)<br/>
                  • Similar triangles: corresponding sides proportional
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Trigonometry:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • SOH-CAH-TOA: sin θ = opp/hyp, cos θ = adj/hyp, tan θ = opp/adj<br/>
                  • Unit circle values for 0°, 30°, 45°, 60°, 90°<br/>
                  • Radians: π rad = 180°
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Circles:</Typography>
                <Typography variant="body2" component="div">
                  • Standard form: (x - h)² + (y - k)² = r²<br/>
                  • Arc length: s = rθ (θ in radians)<br/>
                  • Sector area: A = ½r²θ
                </Typography>
              </Paper>
            </Box>
          )}

          {/* SAT ENGLISH TAB */}
          {tabValue === 1 && (
            <Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight="bold">📝 Digital SAT Reading & Writing: 54 Questions | 64 Minutes | 2 Modules (27Q each, 32min each)</Typography>
                <Typography variant="body2">Short passages (25-150 words) with one question per passage.</Typography>
              </Alert>

              <Typography variant="h5" fontWeight="bold" gutterBottom>Content Domains</Typography>

              <Paper sx={{ p: 3, mb: 3, bgcolor: '#e3f2fd' }}>
                <Typography variant="h6" fontWeight="bold" color="primary">1. Craft & Structure (28% | 13-15 Questions)</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Words in Context:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Determine precise meaning of words/phrases based on context<br/>
                  • Distinguish between similar words with different connotations<br/>
                  • Identify best word choice for clarity and tone
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Text Structure & Purpose:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Analyze overall structure (chronological, cause-effect, compare-contrast)<br/>
                  • Identify purpose of specific sentences or paragraphs<br/>
                  • Understand how parts relate to the whole
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Cross-Text Connections:</Typography>
                <Typography variant="body2" component="div">
                  • Compare and synthesize information from two related texts<br/>
                  • Identify agreements, disagreements, or complementary information<br/>
                  • Draw connections between paired passages
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 3, bgcolor: '#f3e5f5' }}>
                <Typography variant="h6" fontWeight="bold" color="secondary">2. Information & Ideas (26% | 12-14 Questions)</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Central Ideas & Details:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Identify main idea or central claim<br/>
                  • Distinguish between main ideas and supporting details<br/>
                  • Summarize key points accurately
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Command of Evidence:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Select best textual evidence to support a claim<br/>
                  • Evaluate strength and relevance of evidence<br/>
                  • Identify which quotation best supports a conclusion
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Inferences:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Draw logical conclusions from stated information<br/>
                  • Make reasonable predictions based on text<br/>
                  • Understand implied meanings
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Quantitative Information:</Typography>
                <Typography variant="body2" component="div">
                  • Interpret data from graphs, tables, and charts<br/>
                  • Integrate information from text and graphics<br/>
                  • Analyze trends and patterns in data
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 3, bgcolor: '#e8f5e9' }}>
                <Typography variant="h6" fontWeight="bold" color="success.main">3. Standard English Conventions (26% | 11-15 Questions)</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Sentence Boundaries:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Correct use of periods, semicolons, commas<br/>
                  • Fix run-on sentences and comma splices<br/>
                  • Proper use of colons and dashes
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Verb Forms:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Subject-verb agreement (singular/plural)<br/>
                  • Verb tense consistency and sequence<br/>
                  • Irregular verb forms
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Pronouns:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Pronoun-antecedent agreement<br/>
                  • Clear pronoun reference (avoid ambiguity)<br/>
                  • Correct pronoun case (I vs. me, who vs. whom)
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Other Conventions:</Typography>
                <Typography variant="body2" component="div">
                  • Modifier placement (avoid dangling/misplaced modifiers)<br/>
                  • Parallel structure in lists and comparisons<br/>
                  • Possessives and plurals
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, bgcolor: '#fff3e0' }}>
                <Typography variant="h6" fontWeight="bold" color="warning.main">4. Expression of Ideas (20% | 8-12 Questions)</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Rhetorical Synthesis:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Combine information from notes into effective sentences<br/>
                  • Meet specified rhetorical goals<br/>
                  • Integrate multiple sources smoothly
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Transitions:</Typography>
                <Typography variant="body2" component="div">
                  • Choose appropriate transition words (however, therefore, moreover, etc.)<br/>
                  • Show logical relationships between ideas<br/>
                  • Contrast: however, nevertheless, on the other hand<br/>
                  • Cause/Effect: therefore, consequently, as a result<br/>
                  • Addition: moreover, furthermore, in addition
                </Typography>
              </Paper>
            </Box>
          )}

          {/* ACT MATH TAB */}
          {tabValue === 2 && (
            <Box>
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight="bold">🎯 ACT Math: 60 Questions | 60 Minutes | Calculator Allowed</Typography>
                <Typography variant="body2">Questions increase in difficulty. Covers 6 content areas.</Typography>
              </Alert>

              <Typography variant="h5" fontWeight="bold" gutterBottom>Content Areas</Typography>

              <Paper sx={{ p: 3, mb: 2, bgcolor: '#e3f2fd' }}>
                <Typography variant="h6" fontWeight="bold" color="primary">1. Pre-Algebra (20-25% | 12-14 Questions)</Typography>
                <Typography variant="body2" component="div" sx={{ mt: 2 }}>
                  • Operations with integers, fractions, decimals<br/>
                  • Square roots and exponents<br/>
                  • Scientific notation<br/>
                  • Factors, multiples, prime factorization<br/>
                  • Ratios, proportions, percentages<br/>
                  • Absolute value<br/>
                  • Simple probability and counting
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 2, bgcolor: '#f3e5f5' }}>
                <Typography variant="h6" fontWeight="bold" color="secondary">2. Elementary Algebra (15-20% | 10-12 Questions)</Typography>
                <Typography variant="body2" component="div" sx={{ mt: 2 }}>
                  • Solve linear equations and inequalities<br/>
                  • Substitute values into expressions<br/>
                  • Simplify algebraic expressions<br/>
                  • Multiply polynomials<br/>
                  • Factor simple quadratics<br/>
                  • Linear equations with one variable
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 2, bgcolor: '#e8f5e9' }}>
                <Typography variant="h6" fontWeight="bold" color="success.main">3. Intermediate Algebra (15-20% | 9-11 Questions)</Typography>
                <Typography variant="body2" component="div" sx={{ mt: 2 }}>
                  • Quadratic formula and factoring<br/>
                  • Rational and radical expressions<br/>
                  • Absolute value equations and inequalities<br/>
                  • Systems of equations<br/>
                  • Logarithms and exponential functions<br/>
                  • Sequences and patterns<br/>
                  • Complex numbers (a + bi)
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 2, bgcolor: '#fff3e0' }}>
                <Typography variant="h6" fontWeight="bold" color="warning.main">4. Coordinate Geometry (15-20% | 9-11 Questions)</Typography>
                <Typography variant="body2" component="div" sx={{ mt: 2 }}>
                  • Graphing points and lines<br/>
                  • Slope, distance, midpoint formulas<br/>
                  • Parallel and perpendicular lines<br/>
                  • Equations of circles<br/>
                  • Graphing parabolas and other conics<br/>
                  • Transformations (translations, reflections)
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 2, bgcolor: '#fce4ec' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#c2185b' }}>5. Plane Geometry (20-25% | 12-14 Questions)</Typography>
                <Typography variant="body2" component="div" sx={{ mt: 2 }}>
                  • Properties of triangles, quadrilaterals, circles<br/>
                  • Angle relationships (complementary, supplementary, vertical)<br/>
                  • Perimeter, area, volume formulas<br/>
                  • Pythagorean theorem<br/>
                  • Similar and congruent figures<br/>
                  • Properties of parallel lines and transversals
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, bgcolor: '#f1f8e9' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#558b2f' }}>6. Trigonometry (5-10% | 4-6 Questions)</Typography>
                <Typography variant="body2" component="div" sx={{ mt: 2 }}>
                  • Right triangle trigonometry (SOH-CAH-TOA)<br/>
                  • Trigonometric ratios and values<br/>
                  • Graphing sine, cosine, tangent<br/>
                  • Trigonometric identities<br/>
                  • Law of Sines and Law of Cosines<br/>
                  • Radians and degrees conversion
                </Typography>
              </Paper>
            </Box>
          )}

          {/* ACT ENGLISH TAB */}
          {tabValue === 3 && (
            <Box>
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight="bold">✍️ ACT English: 75 Questions | 45 Minutes | 5 Passages</Typography>
                <Typography variant="body2">Each passage has 15 questions testing grammar, punctuation, and rhetoric.</Typography>
              </Alert>

              <Typography variant="h5" fontWeight="bold" gutterBottom>Content Categories</Typography>

              <Paper sx={{ p: 3, mb: 3, bgcolor: '#e3f2fd' }}>
                <Typography variant="h6" fontWeight="bold" color="primary">1. Production of Writing (29-32 Questions)</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Topic Development:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Relevance: Does sentence support main idea?<br/>
                  • Adding/deleting sentences for clarity<br/>
                  • Choosing most effective opening/closing sentences
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Organization:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Logical order of sentences and paragraphs<br/>
                  • Effective transitions between ideas<br/>
                  • Introduction and conclusion placement
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Unity & Cohesion:</Typography>
                <Typography variant="body2" component="div">
                  • Maintain focus on topic<br/>
                  • Eliminate redundancy<br/>
                  • Ensure smooth flow of ideas
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 3, bgcolor: '#f3e5f5' }}>
                <Typography variant="h6" fontWeight="bold" color="secondary">2. Knowledge of Language (13-19 Questions)</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Word Choice:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Precise and appropriate vocabulary<br/>
                  • Avoid wordiness and redundancy<br/>
                  • Maintain consistent style and tone
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Style & Tone:</Typography>
                <Typography variant="body2" component="div">
                  • Match formality level to purpose<br/>
                  • Eliminate ambiguity<br/>
                  • Choose most effective phrasing
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, bgcolor: '#e8f5e9' }}>
                <Typography variant="h6" fontWeight="bold" color="success.main">3. Conventions of Standard English (40-44 Questions)</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Sentence Structure:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Fix run-ons, fragments, comma splices<br/>
                  • Proper use of conjunctions<br/>
                  • Subordination and coordination<br/>
                  • Parallel structure
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Punctuation:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Commas (lists, introductory phrases, nonessential clauses)<br/>
                  • Semicolons (join independent clauses)<br/>
                  • Colons (introduce lists or explanations)<br/>
                  • Apostrophes (possessives and contractions)<br/>
                  • Dashes and parentheses
                </Typography>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Usage:</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                  • Subject-verb agreement<br/>
                  • Pronoun-antecedent agreement<br/>
                  • Verb tense consistency<br/>
                  • Pronoun case (I vs. me, who vs. whom)<br/>
                  • Modifier placement<br/>
                  • Idioms and commonly confused words (affect/effect, their/there/they're)
                </Typography>
              </Paper>
            </Box>
          )}

          {/* TEST STRATEGY TAB */}
          {tabValue === 4 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>Test-Taking Strategies</Typography>

              <Paper sx={{ p: 3, mb: 3, bgcolor: '#e3f2fd' }}>
                <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>SAT Adaptive Testing Strategy</Typography>
                <Typography variant="body2" component="div">
                  • <strong>Module 1 is Critical:</strong> Need ~15/22 correct (68%) to unlock harder Module 2<br/>
                  • <strong>Harder Module 2 = Higher Scores:</strong> Only way to score 700+<br/>
                  • <strong>Time Per Question:</strong> ~95 seconds for Math, ~71 seconds for English<br/>
                  • <strong>Use Desmos Wisely:</strong> Great for graphing, intersections, but don't over-rely<br/>
                  • <strong>No Penalty for Guessing:</strong> Always answer every question
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 3, bgcolor: '#e8f5e9' }}>
                <Typography variant="h6" fontWeight="bold" color="success.main" gutterBottom>ACT Pacing Strategy</Typography>
                <Typography variant="body2" component="div">
                  • <strong>Math:</strong> 60 seconds per question - questions get harder<br/>
                  • <strong>English:</strong> 36 seconds per question - skim passage first<br/>
                  • <strong>Reading:</strong> 8.75 minutes per passage - read strategically<br/>
                  • <strong>Science:</strong> 5 minutes per passage - focus on data interpretation<br/>
                  • <strong>Skip and Return:</strong> Don't get stuck on hard questions
                </Typography>
              </Paper>

              <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff3e0' }}>
                <Typography variant="h6" fontWeight="bold" color="warning.main" gutterBottom>General Test Tips</Typography>
                <Typography variant="body2" component="div">
                  • <strong>Practice Under Timed Conditions:</strong> Build stamina and speed<br/>
                  • <strong>Review Mistakes Thoroughly:</strong> Understand why you got it wrong<br/>
                  • <strong>Learn Formula Shortcuts:</strong> Memorize key formulas<br/>
                  • <strong>Read Questions Carefully:</strong> Underline key words<br/>
                  • <strong>Eliminate Wrong Answers:</strong> Narrow down choices<br/>
                  • <strong>Check Your Work:</strong> If time permits, review flagged questions
                </Typography>
              </Paper>

              <Alert severity="info">
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>📚 Recommended Resources</Typography>
                <Typography variant="body2" component="div">
                  • <strong>Official Practice:</strong> Khan Academy (SAT), ACT.org practice tests<br/>
                  • <strong>Books:</strong> College Board Official SAT Study Guide, The Official ACT Prep Guide<br/>
                  • <strong>Apps:</strong> Desmos (graphing), Quizlet (vocab flashcards)<br/>
                  • <strong>YouTube:</strong> Khan Academy, Scalar Learning, The Organic Chemistry Tutor
                </Typography>
              </Alert>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SAT2026StudyGuide;
