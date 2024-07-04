import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const TournamentCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [titleError, setTitleError] = useState(false);

  const handleSubmit = () => {
    if (title.trim() === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
      const tournamentId = uuidv4();
      navigate(`/tournament/${tournamentId}/admin`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4" component="h1" gutterBottom>
          Create a New Tournament
        </Typography>
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3, width: '100%' }}>
          <TextField
            label="Tournament Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={titleError}
            helperText={titleError ? 'Tournament Title is required' : ''}
          />
          <TextField
            label="Tournament Subtitle (optional)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <TextField
            label="Admin Password (optional)"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <TextField
            label="User Password (optional)"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default TournamentCreationPage;
