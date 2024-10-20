import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/tournament');
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Tournament Management System
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Easily create, manage, and participate in tournaments with ease.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGetStarted}>
          Click to get started
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
