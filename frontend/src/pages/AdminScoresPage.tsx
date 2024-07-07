import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAppBar from '../components/AdminAppBar';
import AdminDrawer from '../components/AdminDrawer';
import ScoresList from '../components/ScoresList';
import { checkAdminSession } from '../lib/auth';

const fakeScores = [
  { level: 'A', id: 1, players: 'John Doe / Jane Smith', wins: 10, losses: 2 },
  { level: 'A', id: 2, players: 'Alice Johnson / Bob Brown', wins: 8, losses: 4 },
  { level: 'B', id: 3, players: 'Charlie Davis / Diana Evans', wins: 6, losses: 6 },
  { level: 'B', id: 4, players: 'Frank Green / Grace Harris', wins: 4, losses: 8 },
  { level: 'C', id: 5, players: 'Hank Irving / Ivy Jackson', wins: 2, losses: 10 },
];

const AdminScoresPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const navigate = useNavigate();
  const [scores, setScores] = useState(fakeScores);
  const [currentLevel, setCurrentLevel] = useState('A');

  useEffect(() => {
    if (!checkAdminSession()) {
      navigate(`/tournament/${tournamentId}/admin`);
    }
  }, [navigate, tournamentId]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'auto', position: 'relative' }}>
      <AdminAppBar onMenuClick={handleDrawerToggle} />
      <AdminDrawer open={drawerOpen} onClose={handleDrawerToggle} />
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Scores
        </Typography>
        <ScoresList scores={scores} setScores={setScores} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />
      </Box>
    </Box>
  );
};

export default AdminScoresPage;
