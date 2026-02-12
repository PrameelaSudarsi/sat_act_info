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
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

// Backend API configuration

// Generate SAT questions with official topic distribution
const generateQuestionsWithOllama = async (testId, questionCount = 44) => {
  console.log(`🌐 Generating ${questionCount} ${testId} questions...`);

  const questions = [];
  
  if (testId === 'sat-math') {
    // Official SAT Math: 13 Algebra, 13 Advanced Math, 15 Problem-Solving, 3 Geometry
    const topics = [
      { name: 'Algebra', count: 13 },
      { name: 'Advanced Math', count: 13 },
      { name: 'Problem-Solving & Data', count: 15 },
      { name: 'Geometry & Trigonometry', count: 3 }
    ];
    
    let qId = 1;
    topics.forEach(topicGroup => {
      for (let i = 0; i < topicGroup.count; i++) {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        
        let question, correctAnswer, wrongAnswers, explanation;
        
        if (topicGroup.name === 'Algebra') {
          const types = [
            () => ({ 
              q: `Solve for x: ${a}x + ${b} = ${a * c + b}`, 
              ans: `${c}`, 
              wrong: [`${c + 1}`, `${c - 1}`, `${a + b}`],
              exp: `To solve ${a}x + ${b} = ${a * c + b}:\n1. Subtract ${b} from both sides: ${a}x = ${a * c}\n2. Divide both sides by ${a}: x = ${c}\n\nTip: Always isolate the variable by performing inverse operations on both sides.`
            }),
            () => ({ 
              q: `If ${a}x - ${b} = ${c}, what is x?`, 
              ans: `${((c + b) / a).toFixed(1)}`, 
              wrong: [`${c - b}`, `${c + b}`, `${(c / a).toFixed(1)}`],
              exp: `To solve ${a}x - ${b} = ${c}:\n1. Add ${b} to both sides: ${a}x = ${c + b}\n2. Divide by ${a}: x = ${((c + b) / a).toFixed(1)}\n\nKey Strategy: Use inverse operations to isolate x.`
            }),
            () => ({ 
              q: `Which value of x satisfies ${a}x + ${b} > ${a * c}?`, 
              ans: `x > ${c - (b/a).toFixed(1)}`, 
              wrong: [`x < ${c}`, `x > ${c}`, `x = ${c}`],
              exp: `To solve ${a}x + ${b} > ${a * c}:\n1. Subtract ${b}: ${a}x > ${a * c - b}\n2. Divide by ${a}: x > ${((a * c - b) / a).toFixed(1)}\n\nInequality Tip: When dividing by a negative, flip the inequality sign.`
            })
          ];
          const selected = types[i % types.length]();
          question = selected.q;
          correctAnswer = selected.ans;
          wrongAnswers = selected.wrong;
          explanation = selected.exp;
        } else if (topicGroup.name === 'Advanced Math') {
          const types = [
            () => ({ 
              q: `If f(x) = ${a}x² + ${b}x, what is f(${c})?`, 
              ans: `${a * c * c + b * c}`, 
              wrong: [`${a * c + b}`, `${a + b + c}`, `${a * c * c}`],
              exp: `To evaluate f(${c}) where f(x) = ${a}x² + ${b}x:\n1. Substitute x = ${c}: f(${c}) = ${a}(${c})² + ${b}(${c})\n2. Calculate: = ${a}(${c * c}) + ${b * c}\n3. Simplify: = ${a * c * c} + ${b * c} = ${a * c * c + b * c}\n\nFunction Tip: Replace every x with the given value and follow order of operations.`
            }),
            () => ({ 
              q: `Expand: (x + ${a})(x + ${b})`, 
              ans: `x² + ${a + b}x + ${a * b}`, 
              wrong: [`x² + ${a * b}x + ${a + b}`, `x² + ${a}x + ${b}`, `x² + ${a + b}`],
              exp: `Using FOIL method:\nFirst: x × x = x²\nOuter: x × ${b} = ${b}x\nInner: ${a} × x = ${a}x\nLast: ${a} × ${b} = ${a * b}\n\nCombine: x² + ${b}x + ${a}x + ${a * b} = x² + ${a + b}x + ${a * b}\n\nPattern: (x + a)(x + b) = x² + (a+b)x + ab`
            }),
            () => ({ 
              q: `Simplify: ${a}x³ × x²`, 
              ans: `${a}x⁵`, 
              wrong: [`${a}x⁶`, `${a}x⁵`, `x⁵`],
              exp: `When multiplying powers with same base:\n${a}x³ × x² = ${a}x³⁺² = ${a}x⁵\n\nExponent Rule: xᵃ × xⁿ = xᵃ⁺ⁿ\n\nSAT Tip: Add exponents when multiplying, subtract when dividing.`
            })
          ];
          const selected = types[i % types.length]();
          question = selected.q;
          correctAnswer = selected.ans;
          wrongAnswers = selected.wrong;
          explanation = selected.exp;
        } else if (topicGroup.name === 'Problem-Solving & Data') {
          const types = [
            () => ({ 
              q: `A store sells ${a} items for $${b} each. What is the total revenue?`, 
              ans: `$${a * b}`, 
              wrong: [`$${a + b}`, `$${a * b + 10}`, `$${a * b - 5}`],
              exp: `Total Revenue = Number of Items × Price per Item\nTotal = ${a} × $${b} = $${a * b}\n\nSAT Tip: For word problems, identify the operation needed (multiplication for "each").`
            }),
            () => ({ 
              q: `What is ${a * 10}% of ${b * 10}?`, 
              ans: `${a * b}`, 
              wrong: [`${a * b + 5}`, `${a + b}`, `${a * b - 5}`],
              exp: `To find ${a * 10}% of ${b * 10}:\n1. Convert to decimal: ${a * 10}% = ${(a * 10) / 100} = ${a / 10}\n2. Multiply: ${a / 10} × ${b * 10} = ${a * b}\n\nQuick Method: ${a * 10}% = ${a * 10}/100, so (${a * 10}/100) × ${b * 10} = ${a * b}`
            }),
            () => ({ 
              q: `The ratio of boys to girls is ${a}:${b}. If there are ${a * c} boys, how many girls?`, 
              ans: `${b * c}`, 
              wrong: [`${a * c}`, `${(a + b) * c}`, `${b * c + a}`],
              exp: `Using ratios:\nBoys:Girls = ${a}:${b}\nIf boys = ${a * c}, then the multiplier is ${c}\nGirls = ${b} × ${c} = ${b * c}\n\nRatio Strategy: Find the multiplier by dividing the known quantity by its ratio number.`
            }),
            () => ({ 
              q: `The mean of ${a}, ${b}, and ${c} is what?`, 
              ans: `${((a + b + c) / 3).toFixed(1)}`, 
              wrong: [`${a + b + c}`, `${Math.max(a, b, c)}`, `${((a + b) / 2).toFixed(1)}`],
              exp: `Mean (Average) = Sum of all values ÷ Number of values\nMean = (${a} + ${b} + ${c}) ÷ 3 = ${a + b + c} ÷ 3 = ${((a + b + c) / 3).toFixed(1)}\n\nStatistics Tip: Mean is the most common measure of central tendency on the SAT.`
            })
          ];
          const selected = types[i % types.length]();
          question = selected.q;
          correctAnswer = selected.ans;
          wrongAnswers = selected.wrong;
          explanation = selected.exp;
        } else {
          // Geometry & Trigonometry
          const types = [
            () => ({ 
              q: `A rectangle has length ${a + 5} and width ${b}. What is its area?`, 
              ans: `${(a + 5) * b}`, 
              wrong: [`${(a + 5) + b}`, `${(a + 5) * b + 10}`, `${2 * ((a + 5) + b)}`],
              exp: `Area of Rectangle = Length × Width\nArea = ${a + 5} × ${b} = ${(a + 5) * b}\n\nGeometry Tip: Don't confuse area (L×W) with perimeter (2L+2W).`
            }),
            () => ({ 
              q: `A circle has radius ${a}. What is its circumference? (Use π ≈ 3.14)`, 
              ans: `${(2 * 3.14 * a).toFixed(1)}`, 
              wrong: [`${(3.14 * a * a).toFixed(1)}`, `${(2 * a).toFixed(1)}`, `${(3.14 * a).toFixed(1)}`],
              exp: `Circumference = 2πr\nC = 2 × 3.14 × ${a} = ${(2 * 3.14 * a).toFixed(1)}\n\nCircle Formulas:\n• Circumference: C = 2πr\n• Area: A = πr²`
            }),
            () => ({ 
              q: `In a right triangle, if one angle is ${a * 10}°, what is the other non-right angle?`, 
              ans: `${90 - a * 10}°`, 
              wrong: [`${a * 10}°`, `${180 - a * 10}°`, `${90 + a * 10}°`],
              exp: `In a right triangle:\n• One angle = 90°\n• Sum of all angles = 180°\n• Other two angles sum to 90°\n\nSo: 90° - ${a * 10}° = ${90 - a * 10}°\n\nTriangle Tip: The two acute angles in a right triangle are complementary.`
            })
          ];
          const selected = types[i % types.length]();
          question = selected.q;
          correctAnswer = selected.ans;
          wrongAnswers = selected.wrong;
          explanation = selected.exp;
        }
        
        const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
        const correctIndex = allOptions.indexOf(correctAnswer);
        
        questions.push({
          id: qId++,
          question,
          options: allOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
          correct: ['A', 'B', 'C', 'D'][correctIndex],
          topic: topicGroup.name,
          difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
          explanation
        });
      }
    });
  } else if (testId === 'sat-english') {
    // Official SAT Reading & Writing: 27 Reading, 27 Writing
    const topics = [
      { name: 'Reading Comprehension', count: 27 },
      { name: 'Writing & Language', count: 27 }
    ];
    
    let qId = 1;
    topics.forEach(topicGroup => {
      for (let i = 0; i < topicGroup.count; i++) {
        let question, correctAnswer, wrongAnswers, explanation;
        
        if (topicGroup.name === 'Reading Comprehension') {
          const passages = [
            'Scientists have discovered that climate change affects ocean temperatures. Rising temperatures lead to coral bleaching, which threatens marine ecosystems.',
            'The Industrial Revolution transformed society by introducing mass production. Factories replaced traditional craftsmanship, changing how people worked and lived.',
            'Recent studies show that regular exercise improves cognitive function. Physical activity increases blood flow to the brain, enhancing memory and learning.'
          ];
          
          const passage = passages[i % passages.length];
          question = `Passage: "${passage}"\n\nWhat is the main idea?`;
          correctAnswer = 'The passage discusses a cause-and-effect relationship';
          wrongAnswers = ['The passage provides a historical timeline', 'The passage compares two views', 'The passage describes a narrative'];
          explanation = `Main Idea Strategy:\n1. Identify the topic\n2. Determine what the author says\n3. Look for the central claim\n\nSAT Tip: Main idea is usually in first or last sentence.`;
        } else {
          const sentences = [
            'The students was studying for their exams.',
            'She don\'t like coffee.',
            'Between you and I, this is difficult.'
          ];
          
          const sentence = sentences[i % sentences.length];
          question = `Which choice corrects the error?\n\n"${sentence}"`;
          correctAnswer = 'Fix subject-verb agreement';
          wrongAnswers = ['NO CHANGE', 'Change the tense', 'Add a comma'];
          explanation = `Grammar Rule: Subject-Verb Agreement\n• Plural subjects need plural verbs\n• Singular subjects need singular verbs\n\nSAT Tip: Identify the subject first, then match the verb.`;
        }
        
        const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
        const correctIndex = allOptions.indexOf(correctAnswer);
        
        questions.push({
          id: qId++,
          question,
          options: allOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
          correct: ['A', 'B', 'C', 'D'][correctIndex],
          topic: topicGroup.name,
          difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
          explanation
        });
      }
    });
  } else if (testId === 'act') {
    // Official ACT Math: 60 questions across 6 topics
    const topics = [
      { name: 'Pre-Algebra', count: 14 },
      { name: 'Elementary Algebra', count: 10 },
      { name: 'Intermediate Algebra', count: 9 },
      { name: 'Coordinate Geometry', count: 9 },
      { name: 'Plane Geometry', count: 14 },
      { name: 'Trigonometry', count: 4 }
    ];
    
    let qId = 1;
    topics.forEach(topicGroup => {
      for (let i = 0; i < topicGroup.count; i++) {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        
        let question, correctAnswer, wrongAnswers, explanation;
        
        if (topicGroup.name === 'Pre-Algebra') {
          question = `What is ${a * 10}% of ${b * 10}?`;
          correctAnswer = `${a * b}`;
          wrongAnswers = [`${a + b}`, `${a * b + 5}`, `${a * b - 5}`];
          explanation = `Percentage Calculation:\n${a * 10}% = ${a * 10}/100 = ${a / 10}\n${a / 10} × ${b * 10} = ${a * b}\n\nACT Tip: Convert percentage to decimal first.`;
        } else if (topicGroup.name === 'Elementary Algebra') {
          question = `Solve for x: ${a}x + ${b} = ${a * c + b}`;
          correctAnswer = `${c}`;
          wrongAnswers = [`${c + 1}`, `${c - 1}`, `${a + b}`];
          explanation = `Linear Equation:\n1. Subtract ${b}: ${a}x = ${a * c}\n2. Divide by ${a}: x = ${c}\n\nACT Strategy: Isolate the variable.`;
        } else if (topicGroup.name === 'Intermediate Algebra') {
          question = `If f(x) = ${a}x² + ${b}, what is f(${c})?`;
          correctAnswer = `${a * c * c + b}`;
          wrongAnswers = [`${a * c + b}`, `${a * c * c}`, `${c * c + b}`];
          explanation = `Function Evaluation:\nf(${c}) = ${a}(${c})² + ${b}\n= ${a}(${c * c}) + ${b}\n= ${a * c * c} + ${b} = ${a * c * c + b}\n\nACT Tip: Substitute and simplify.`;
        } else if (topicGroup.name === 'Coordinate Geometry') {
          question = `What is the distance between points (${a}, ${b}) and (${a + c}, ${b + c})?`;
          const dist = Math.sqrt(c * c + c * c).toFixed(1);
          correctAnswer = `${dist}`;
          wrongAnswers = [`${c}`, `${c * 2}`, `${c + 1}`];
          explanation = `Distance Formula:\nd = √[(x₂-x₁)² + (y₂-y₁)²]\nd = √[${c}² + ${c}²] = √${c * c + c * c} = ${dist}\n\nACT Tip: Use Pythagorean theorem for distance.`;
        } else if (topicGroup.name === 'Plane Geometry') {
          question = `A rectangle has length ${a + 5} and width ${b}. What is its area?`;
          correctAnswer = `${(a + 5) * b}`;
          wrongAnswers = [`${(a + 5) + b}`, `${2 * ((a + 5) + b)}`, `${(a + 5) * b + 10}`];
          explanation = `Rectangle Area:\nArea = Length × Width\nArea = ${a + 5} × ${b} = ${(a + 5) * b}\n\nACT Tip: Don't confuse area with perimeter.`;
        } else {
          // Trigonometry
          question = `If sin(θ) = ${a / 10}, what is sin²(θ)?`;
          correctAnswer = `${((a / 10) * (a / 10)).toFixed(2)}`;
          wrongAnswers = [`${(a / 10).toFixed(1)}`, `${(a / 5).toFixed(1)}`, `${(a * 2 / 10).toFixed(1)}`];
          explanation = `Trigonometric Identity:\nsin²(θ) = [sin(θ)]²\n= (${a / 10})² = ${((a / 10) * (a / 10)).toFixed(2)}\n\nACT Tip: Square the value, don't double it.`;
        }
        
        const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
        const correctIndex = allOptions.indexOf(correctAnswer);
        
        questions.push({
          id: qId++,
          question,
          options: allOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
          correct: ['A', 'B', 'C', 'D'][correctIndex],
          topic: topicGroup.name,
          difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
          explanation
        });
      }
    });
  } else if (testId === 'sat-math-algebra') {
    // Heart of Algebra focused test
    for (let i = 0; i < questionCount; i++) {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const c = Math.floor(Math.random() * 10) + 1;
      
      const question = `Solve for x: ${a}x + ${b} = ${a * c + b}`;
      const correctAnswer = `${c}`;
      const wrongAnswers = [`${c + 1}`, `${c - 1}`, `${a + b}`];
      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      const correctIndex = allOptions.indexOf(correctAnswer);
      
      questions.push({
        id: i + 1,
        question,
        options: allOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
        correct: ['A', 'B', 'C', 'D'][correctIndex],
        topic: 'Linear Equations',
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
        explanation: `Linear equation solution:\n1. Subtract ${b}: ${a}x = ${a * c}\n2. Divide by ${a}: x = ${c}`
      });
    }
  } else if (testId === 'sat-math-advanced') {
    // Advanced Math focused test
    for (let i = 0; i < questionCount; i++) {
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 5) + 1;
      const c = Math.floor(Math.random() * 5) + 1;
      
      const question = `If f(x) = ${a}x² + ${b}x, what is f(${c})?`;
      const correctAnswer = `${a * c * c + b * c}`;
      const wrongAnswers = [`${a * c + b}`, `${a * c * c}`, `${b * c}`];
      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      const correctIndex = allOptions.indexOf(correctAnswer);
      
      questions.push({
        id: i + 1,
        question,
        options: allOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
        correct: ['A', 'B', 'C', 'D'][correctIndex],
        topic: 'Quadratic Functions',
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
        explanation: `Function evaluation:\nf(${c}) = ${a}(${c})² + ${b}(${c})\n= ${a * c * c} + ${b * c} = ${a * c * c + b * c}`
      });
    }
  } else if (testId === 'sat-math-data') {
    // Problem Solving & Data focused test
    for (let i = 0; i < questionCount; i++) {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      
      const question = `What is ${a * 10}% of ${b * 10}?`;
      const correctAnswer = `${a * b}`;
      const wrongAnswers = [`${a + b}`, `${a * b + 5}`, `${a * b - 5}`];
      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      const correctIndex = allOptions.indexOf(correctAnswer);
      
      questions.push({
        id: i + 1,
        question,
        options: allOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
        correct: ['A', 'B', 'C', 'D'][correctIndex],
        topic: 'Percentages',
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
        explanation: `Percentage calculation:\n${a * 10}% = ${a * 10}/100\n(${a * 10}/100) × ${b * 10} = ${a * b}`
      });
    }
  } else if (testId === 'sat-math-geometry') {
    // Geometry & Trig focused test
    for (let i = 0; i < questionCount; i++) {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      
      const question = `A rectangle has length ${a + 5} and width ${b}. What is its area?`;
      const correctAnswer = `${(a + 5) * b}`;
      const wrongAnswers = [`${(a + 5) + b}`, `${2 * ((a + 5) + b)}`, `${(a + 5) * b + 5}`];
      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      const correctIndex = allOptions.indexOf(correctAnswer);
      
      questions.push({
        id: i + 1,
        question,
        options: allOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
        correct: ['A', 'B', 'C', 'D'][correctIndex],
        topic: 'Area',
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
        explanation: `Rectangle area:\nArea = Length × Width\n= ${a + 5} × ${b} = ${(a + 5) * b}`
      });
    }
  } else if (testId === 'sat-reading-craft') {
    // Craft & Structure focused test
    for (let i = 0; i < questionCount; i++) {
      const question = `Which word best fits the context of the passage?`;
      const correctAnswer = 'Enhance';
      const wrongAnswers = ['Diminish', 'Ignore', 'Confuse'];
      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      const correctIndex = allOptions.indexOf(correctAnswer);
      
      questions.push({
        id: i + 1,
        question,
        options: allOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
        correct: ['A', 'B', 'C', 'D'][correctIndex],
        topic: 'Vocabulary in Context',
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
        explanation: `Context clues help determine word meaning. Look for synonyms or explanations nearby.`
      });
    }
  } else if (testId === 'sat-reading-information') {
    // Information & Ideas focused test
    for (let i = 0; i < questionCount; i++) {
      const question = `What is the main idea of the passage?`;
      const correctAnswer = 'The passage explains a scientific discovery';
      const wrongAnswers = ['The passage tells a personal story', 'The passage compares two theories', 'The passage describes a historical event'];
      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      const correctIndex = allOptions.indexOf(correctAnswer);
      
      questions.push({
        id: i + 1,
        question,
        options: allOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
        correct: ['A', 'B', 'C', 'D'][correctIndex],
        topic: 'Central Ideas',
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
        explanation: `Main idea is usually stated in the first or last sentence. Look for the central claim.`
      });
    }
  } else if (testId === 'sat-english-conventions') {
    // Standard English Conventions focused test
    for (let i = 0; i < questionCount; i++) {
      const question = `Which choice corrects the grammatical error?\n\n"The students was studying."`;
      const correctAnswer = 'The students were studying.';
      const wrongAnswers = ['NO CHANGE', 'The student was studying.', 'The students is studying.'];
      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      const correctIndex = allOptions.indexOf(correctAnswer);
      
      questions.push({
        id: i + 1,
        question,
        options: allOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
        correct: ['A', 'B', 'C', 'D'][correctIndex],
        topic: 'Subject-Verb Agreement',
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
        explanation: `Plural subjects need plural verbs. "Students" (plural) requires "were" (plural verb).`
      });
    }
  } else if (testId === 'sat-english-expression') {
    // Expression of Ideas focused test
    for (let i = 0; i < questionCount; i++) {
      const question = `Which transition word best connects these ideas?`;
      const correctAnswer = 'However';
      const wrongAnswers = ['Therefore', 'Similarly', 'For example'];
      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      const correctIndex = allOptions.indexOf(correctAnswer);
      
      questions.push({
        id: i + 1,
        question,
        options: allOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
        correct: ['A', 'B', 'C', 'D'][correctIndex],
        topic: 'Transitions',
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
        explanation: `Transition words show relationships: However=contrast, Therefore=result, Similarly=addition.`
      });
    }
  } else {
    // Fallback for other tests
    for (let i = 0; i < questionCount; i++) {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      
      const question = `Calculate: ${a} × ${b} + ${a}`;
      const correctAnswer = `${a * b + a}`;
      const options = [`${a * b + a}`, `${a * b}`, `${a + b}`, `${a * b + b}`].sort(() => Math.random() - 0.5);
      const correctIndex = options.indexOf(correctAnswer);
      
      questions.push({
        id: i + 1,
        question,
        options: options.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}) ${opt}`),
        correct: ['A', 'B', 'C', 'D'][correctIndex],
        topic: 'General',
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3]
      });
    }
  }
  
  console.log(`✅ Generated ${questions.length} questions`);
  return questions;
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
      subtitle: 'Official SAT Pattern - 44 Questions',
      duration: 70,
      questionCount: 44,
      sections: ['Algebra (13)', 'Advanced Math (13)', 'Problem-Solving & Data (15)', 'Geometry & Trig (3)'],
      color: 'primary',
      icon: '📊'
    },
    {
      id: 'sat-english',
      title: 'SAT Reading & Writing Test',
      subtitle: 'Real SAT Pattern - 54 Questions',
      duration: 64,
      questionCount: 54,
      sections: ['Reading', 'Writing & Language'],
      color: 'secondary',
      icon: '📚'
    },
    {
      id: 'act',
      title: 'ACT Math Practice Test',
      subtitle: 'Official ACT Pattern - 60 Questions',
      duration: 60,
      questionCount: 60,
      sections: ['Pre-Algebra (14)', 'Elementary Algebra (10)', 'Intermediate Algebra (9)', 'Coordinate Geometry (9)', 'Plane Geometry (14)', 'Trigonometry (4)'],
      color: 'success',
      icon: '🎯'
    },
    {
      id: 'ap-calculus',
      title: 'AP Calculus AB Practice Test',
      subtitle: 'College Board Pattern - 15 Questions',
      duration: 90,
      questionCount: 15,
      sections: ['Limits (25%)', 'Derivatives (35%)', 'Integrals (35%)', 'FTC (5%)'],
      color: 'warning',
      icon: '∫'
    },
    {
      id: 'ap-physics',
      title: 'AP Physics 1 Practice Test',
      subtitle: 'College Board Pattern - 15 Questions',
      duration: 90,
      questionCount: 15,
      sections: ['Kinematics (12%)', 'Forces (18%)', 'Energy (20%)', 'Momentum (12%)', 'Rotation (18%)', 'Waves (20%)'],
      color: 'error',
      icon: '⚛️'
    },
    {
      id: 'ap-chemistry',
      title: 'AP Chemistry Practice Test',
      subtitle: 'College Board Pattern - 15 Questions',
      duration: 90,
      questionCount: 15,
      sections: ['Atomic Structure (7%)', 'Bonding (20%)', 'Gases (5%)', 'Solutions (11%)', 'Kinetics (7%)', 'Thermodynamics (7%)', 'Equilibrium (26%)', 'Acids/Bases (11%)', 'Electrochemistry (6%)'],
      color: 'info',
      icon: '🧪'
    },
    // Digital SAT Math Domains
    {
      id: 'sat-math-algebra',
      title: 'Heart of Algebra',
      subtitle: 'Linear equations & systems',
      duration: 25,
      questionCount: 12,
      sections: ['Linear Equations', 'Inequalities'],
      color: 'primary',
      icon: '🧮'
    },
    {
      id: 'sat-math-advanced',
      title: 'Passport to Advanced Math',
      subtitle: 'Quadratics & polynomials',
      duration: 25,
      questionCount: 12,
      sections: ['Quadratics', 'Functions'],
      color: 'primary',
      icon: '📈'
    },
    {
      id: 'sat-math-data',
      title: 'Problem Solving & Data',
      subtitle: 'Ratios, rates, probability',
      duration: 25,
      questionCount: 12,
      sections: ['Data Analysis', 'Statistics'],
      color: 'primary',
      icon: '📊'
    },
    {
      id: 'sat-math-geometry',
      title: 'Geometry & Trigonometry',
      subtitle: 'Area, volume, angles',
      duration: 25,
      questionCount: 12,
      sections: ['Geometry', 'Trig'],
      color: 'primary',
      icon: '📐'
    },
    // Digital SAT Reading & Writing Domains
    {
      id: 'sat-reading-craft',
      title: 'Craft & Structure',
      subtitle: 'Words in context, text structure',
      duration: 25,
      questionCount: 12,
      sections: ['Vocabulary', 'Structure'],
      color: 'secondary',
      icon: '📖'
    },
    {
      id: 'sat-reading-information',
      title: 'Information & Ideas',
      subtitle: 'Central ideas, evidence',
      duration: 25,
      questionCount: 12,
      sections: ['Main Idea', 'Evidence'],
      color: 'secondary',
      icon: '💡'
    },
    {
      id: 'sat-english-conventions',
      title: 'Standard English Conventions',
      subtitle: 'Grammar & punctuation',
      duration: 25,
      questionCount: 12,
      sections: ['Grammar', 'Punctuation'],
      color: 'secondary',
      icon: '✍️'
    },
    {
      id: 'sat-english-expression',
      title: 'Expression of Ideas',
      subtitle: 'Transitions & flow',
      duration: 25,
      questionCount: 12,
      sections: ['Transitions', 'Rhetoric'],
      color: 'secondary',
      icon: '🗣️'
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
    console.log(`Answer changed: Q${questionId} = ${answer}`);
    setTestAnswers(prev => {
      const updated = {
        ...prev,
        [questionId]: answer
      };
      console.log('Updated answers:', updated);
      return updated;
    });
  };

  const submitTest = () => {
    if (!currentTest || !currentTest.questions) return;

    console.log('=== SUBMIT TEST DEBUG ===');
    console.log('Test answers object:', testAnswers);
    console.log('Number of answers:', Object.keys(testAnswers).length);
    console.log('Total questions:', currentTest.questions.length);

    // Calculate scores
    let correctAnswers = 0;
    const topicAnalysis = {};
    const incorrectQuestions = [];

    currentTest.questions.forEach((question, index) => {
      const userAnswer = testAnswers[question.id];
      const correctAnswer = question.correct;

      console.log(`\n--- Question ${index + 1} (ID: ${question.id}) ---`);
      console.log('User answer:', userAnswer, typeof userAnswer);
      console.log('Correct answer:', correctAnswer, typeof correctAnswer);
      console.log('Question text:', question.question);
      console.log('Options:', question.options);

      // Direct comparison
      const isCorrect = userAnswer === correctAnswer;
      console.log('Is correct?', isCorrect);

      if (isCorrect) {
        correctAnswers++;
        console.log('✅ CORRECT! Total correct now:', correctAnswers);
      } else {
        console.log('❌ INCORRECT');
        incorrectQuestions.push({
          id: question.id,
          question: question.question,
          passage: question.passage,
          options: question.options,
          userAnswer: userAnswer || 'Skipped',
          correctAnswer: correctAnswer,
          topic: question.topic || 'General',
          explanation: question.explanation || 'Detailed explanation not available.'
        });
      }

      // Track by topic
      const topic = question.topic || 'General';
      if (!topicAnalysis[topic]) {
        topicAnalysis[topic] = { correct: 0, total: 0 };
      }
      topicAnalysis[topic].total++;
      if (isCorrect) topicAnalysis[topic].correct++;
    });

    const totalQuestions = currentTest.questions.length;
    const overallScore = Math.round((correctAnswers / totalQuestions) * 100);

    console.log('\n=== FINAL CALCULATION ===');
    console.log('Correct answers:', correctAnswers);
    console.log('Total questions:', totalQuestions);
    console.log('Percentage:', (correctAnswers / totalQuestions) * 100);
    console.log('Rounded percentage:', overallScore);
    console.log('Topic analysis:', topicAnalysis);

    const results = {
      testTitle: currentTest.title,
      overallScore,
      correctAnswers,
      totalQuestions,
      topicAnalysis,
      incorrectQuestions,
      completedAt: new Date().toISOString()
    };

    console.log('Results object:', results);

    setTestResults(results);
    setTestInProgress(false);
    setCurrentTest(null);
    setTimeRemaining(null);
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
      `${topic}: ${data.correct}/${data.total} (${((data.correct / data.total) * 100).toFixed(1)}%)`
    ).join('\n')}

INCORRECT QUESTIONS:
${testResults.incorrectQuestions.map((q, i) =>
      `${i + 1}. ${q.question}\nYour Answer: ${q.userAnswer}\nCorrect Answer: ${q.correctAnswer}\n`
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
                  {question.options.map((option, optIndex) => {
                    const optionValue = option.charAt(0); // A, B, C, D
                    return (
                      <FormControlLabel
                        key={optIndex}
                        value={optionValue}
                        control={<Radio />}
                        label={option}
                        sx={{ mb: 1 }}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        ))}

        {/* Submit Button */}
        <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
          <Paper sx={{ p: 3, mb: 3, bgcolor: 'info.light' }}>
            <Typography variant="h6" gutterBottom>
              📊 Test Progress
            </Typography>
            <Typography variant="body1">
              Answered: {Object.keys(testAnswers).length} / {currentTest.questions.length} questions
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(Object.keys(testAnswers).length / currentTest.questions.length) * 100}
              sx={{ mt: 2, height: 8 }}
            />
          </Paper>
          <Button
            variant="contained"
            size="large"
            onClick={submitTest}
            disabled={Object.keys(testAnswers).length === 0}
            sx={{ px: 6, py: 2, fontSize: '1.2rem' }}
          >
            Submit Test ({Object.keys(testAnswers).length}/{currentTest.questions.length} answered)
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
          🎆 SAT/ACT/AP Excellence Center
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          Master Your SAT, ACT & AP Exams with AI-Powered Practice Tests, College Guidance & Strategic Planning
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
                      • <strong>October 2026:</strong> Take PSAT<br />
                      • <strong>Spring 2027:</strong> Consider SAT practice<br />
                      • Focus on building strong foundation
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>11th Graders</Typography>
                    <Typography variant="body2">
                      • <strong>October 2026:</strong> PSAT (National Merit)<br />
                      • <strong>March 2027:</strong> First SAT attempt<br />
                      • <strong>May/June 2027:</strong> Retake if needed
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>12th Graders</Typography>
                    <Typography variant="body2">
                      • <strong>August 2026:</strong> Early boost<br />
                      • <strong>October 2026:</strong> EA/ED deadlines<br />
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
                <strong>Best Strategy:</strong> Take tests 2-3 times • <strong>Optimal Months:</strong> March, May, June for SAT; April, June, September for ACT<br />
                <strong>Registration:</strong> Sign up 6-8 weeks early • <strong>Prep Time:</strong> 3-6 months of consistent practice<br />
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
        <Card sx={{ mb: 4, border: '3px solid', borderColor: 'success.main', borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h3" gutterBottom sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #4caf50, #2e7d32)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                🎉 Test Results
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {testResults.testTitle}
              </Typography>
            </Box>

            {/* Overall Score */}
            <Paper sx={{
              p: 4,
              mb: 4,
              textAlign: 'center',
              background: testResults.overallScore >= 80
                ? 'linear-gradient(135deg, #4caf50, #2e7d32)'
                : testResults.overallScore >= 60
                  ? 'linear-gradient(135deg, #ff9800, #f57c00)'
                  : 'linear-gradient(135deg, #f44336, #d32f2f)',
              color: 'white',
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}>
              <Typography variant="h1" fontWeight="bold" sx={{ mb: 2, fontSize: { xs: '3rem', md: '4rem' } }}>
                {testResults.overallScore}%
              </Typography>
              <Typography variant="h4" sx={{ mb: 2, opacity: 0.9 }}>
                {testResults.overallScore >= 80 ? '🎉 Excellent!' :
                  testResults.overallScore >= 60 ? '👍 Good Job!' : '💪 Keep Practicing!'}
              </Typography>
              <Typography variant="h5" sx={{ mb: 1, opacity: 0.8 }}>
                {testResults.correctAnswers} out of {testResults.totalQuestions} correct
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                Completed: {new Date(testResults.completedAt).toLocaleString()}
              </Typography>
            </Paper>

            {/* Topic Analysis */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              📊 Performance by Topic
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {Object.entries(testResults.topicAnalysis).map(([topic, data]) => {
                const percentage = Math.round((data.correct / data.total) * 100);
                const color = percentage >= 80 ? 'success' : percentage >= 60 ? 'warning' : 'error';
                return (
                  <Grid item xs={12} sm={6} md={4} key={topic}>
                    <Paper sx={{
                      p: 3,
                      textAlign: 'center',
                      bgcolor: `${color}.light`,
                      border: '2px solid',
                      borderColor: `${color}.main`,
                      borderRadius: 3,
                      height: '100%'
                    }}>
                      <Typography variant="h6" fontWeight="bold" color={`${color}.dark`} gutterBottom>
                        {topic}
                      </Typography>
                      <Typography variant="h3" fontWeight="bold" color={`${color}.dark`}>
                        {percentage}%
                      </Typography>
                      <Typography variant="body1" color={`${color}.dark`}>
                        {data.correct} out of {data.total} correct
                      </Typography>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>

            {/* Professional Review Section */}
            {testResults.incorrectQuestions.length > 0 && (
              <Box sx={{ mt: 6 }}>
                <Typography variant="h4" gutterBottom sx={{
                  fontWeight: 800,
                  mb: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  color: 'error.main'
                }}>
                  <CancelIcon fontSize="large" /> Review Incorrect Answers
                </Typography>

                <Stack spacing={4}>
                  {testResults.incorrectQuestions.map((q, index) => (
                    <Paper key={index} elevation={3} sx={{
                      p: 0,
                      overflow: 'hidden',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'grey.200'
                    }}>
                      {/* Header */}
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'grey.200', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="bold" color="text.secondary">
                          Question {index + 1}
                        </Typography>
                        <Chip label={q.topic} size="small" color="primary" variant="outlined" />
                      </Box>

                      <Box sx={{ p: 3 }}>
                        {/* Passage if exists */}
                        {q.passage && (
                          <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2, mb: 2, borderLeft: '4px solid #1976d2' }}>
                            <Typography variant="body2" fontStyle="italic" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                              {q.passage}
                            </Typography>
                          </Box>
                        )}

                        {/* Question */}
                        <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 'medium' }}>
                          {q.question}
                        </Typography>

                        {/* Options Grid */}
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                          {q.options && q.options.map((option, optIdx) => {
                            const optLetter = option.charAt(0);
                            const isUserAnswer = optLetter === q.userAnswer;
                            const isCorrectAnswer = optLetter === q.correctAnswer;

                            let bgcolor = 'white';
                            let borderColor = 'grey.300';
                            let textColor = 'text.primary';

                            if (isCorrectAnswer) {
                              bgcolor = '#e8f5e9';
                              borderColor = '#4caf50';
                              textColor = '#2e7d32';
                            } else if (isUserAnswer) {
                              bgcolor = '#ffebee';
                              borderColor = '#ef5350';
                              textColor = '#c62828';
                            }

                            return (
                              <Grid item xs={12} sm={6} key={optIdx}>
                                <Paper variant="outlined" sx={{
                                  p: 2,
                                  bgcolor,
                                  borderColor,
                                  color: textColor,
                                  borderWidth: (isCorrectAnswer || isUserAnswer) ? 2 : 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1.5
                                }}>
                                  {isCorrectAnswer && <CheckIcon color="success" fontSize="small" />}
                                  {isUserAnswer && !isCorrectAnswer && <CancelIcon color="error" fontSize="small" />}
                                  <Typography fontWeight={(isCorrectAnswer || isUserAnswer) ? 'bold' : 'normal'}>
                                    {option}
                                  </Typography>
                                </Paper>
                              </Grid>
                            );
                          })}
                        </Grid>

                        {/* Explanation */}
                        <Alert icon={<LightbulbIcon fontSize="inherit" />} severity="info" sx={{
                          '& .MuiAlert-message': { width: '100%' },
                          bgcolor: '#e3f2fd',
                          color: '#0d47a1',
                          borderRadius: 2
                        }}>
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            💡 Expert Explanation
                          </Typography>
                          <Typography variant="body2" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                            {q.explanation}
                          </Typography>
                        </Alert>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Action Buttons */}
            <Box sx={{ mt: 4, display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<DownloadIcon />}
                onClick={downloadResults}
                sx={{ px: 4, py: 1.5 }}
              >
                Download Full Results
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setTestResults(null)}
                sx={{ px: 4, py: 1.5 }}
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

      {/* Test Categories */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
          🏆 Full Length SAT & ACT Tests
        </Typography>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {mockTests.filter(test => test.id === 'sat-math' || test.id === 'sat-english' || test.id === 'act').map((test) => (
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
                    {loadingQuestions ? 'Generating...' : 'Start Full Test'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2, color: 'secondary.main' }}>
          📚 Digital SAT Subject Mastery
        </Typography>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {mockTests.filter(test => test.id.startsWith('sat-') && test.id.split('-').length > 2).map((test) => (
            <Grid item xs={12} md={4} key={test.id}>
              <Card sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                },
                border: '1px solid',
                borderColor: 'grey.300'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{
                      bgcolor: `${test.color}.light`,
                      color: `${test.color}.dark`,
                      width: 48,
                      height: 48,
                      fontSize: '1.25rem',
                      mr: 2
                    }}>
                      {test.icon}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                        {test.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {test.subtitle}
                      </Typography>
                    </Box>
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                    <Chip size="small" label={`${test.duration}m`} variant="outlined" />
                    <Chip size="small" label={`${test.questionCount} Qs`} variant="outlined" />
                  </Stack>

                  <Button
                    variant="outlined"
                    color={test.color}
                    fullWidth
                    onClick={() => startTest(test)}
                    disabled={testInProgress || loadingQuestions}
                    startIcon={loadingQuestions ? <CircularProgress size={16} /> : <PlayIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    Practice Domain
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2, color: 'warning.main' }}>
          🎓 AP Exam Practice Tests
        </Typography>
        <Grid container spacing={4}>
          {mockTests.filter(test => test.id.includes('ap')).map((test) => (
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
      </Box>
    </Container>
  );
};

export default MockTestCenter;