import React from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const TournamentAdminHomePage: React.FC = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>();

  const handleJoin = () => {
    // Handle admin join logic here
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h3" component="h1" gutterBottom>
          FNST
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Dublin LTC
        </Typography>
        <Paper elevation={3} sx={{ padding: 2, marginTop: 3, width: '100%' }}>
          <TextField
            label="Admin Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handleJoin}>
              Join
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default TournamentAdminHomePage;
