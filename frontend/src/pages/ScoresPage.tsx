import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ScoresList from '../components/ScoresList';

const fakeScores = [
  { level: 'A', id: 1, players: 'John Doe / Jane Smith', wins: 10, losses: 2 },
  { level: 'A', id: 2, players: 'Alice Johnson / Bob Brown', wins: 8, losses: 4 },
  { level: 'B', id: 3, players: 'Charlie Davis / Diana Evans', wins: 6, losses: 6 },
  { level: 'B', id: 4, players: 'Frank Green / Grace Harris', wins: 4, losses: 8 },
  { level: 'C', id: 5, players: 'Hank Irving / Ivy Jackson', wins: 2, losses: 10 },
];

const ScoresPage: React.FC = () => {
  const [scores, setScores] = useState(fakeScores);
  const [currentLevel, setCurrentLevel] = useState('A');

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'auto', position: 'relative' }}>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Scores
        </Typography>
        <ScoresList scores={scores} setScores={setScores} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />
      </Box>
    </Box>
  );
};

export default ScoresPage;
