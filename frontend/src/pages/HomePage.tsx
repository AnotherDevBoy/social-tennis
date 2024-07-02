// src/pages/HomePage.tsx
import React from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
}));

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '400px',
  marginTop: theme.spacing(4),
}));

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/player-entries');
  };

  return (
    <Container>
      <CenteredBox>
        <Typography variant="h2" gutterBottom>
          Tournament
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Enter the tournament password to join
        </Typography>
        <FormBox>
          <TextField
            label="Tournament Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleJoinClick}>
            Join
          </Button>
        </FormBox>
      </CenteredBox>
    </Container>
  );
};

export default HomePage;
