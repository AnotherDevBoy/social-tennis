import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminLoginPage: React.FC = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {
    if (password.trim() === '') {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      Cookies.set('admin-session', 'true', { expires: 1 }); // Expires in 1 day
      navigate(`/tournament/${tournamentId}/admin/dashboard`);
    }
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
        <Paper elevation={3} sx={{ padding: 2, marginTop: 3, width: '80%', maxWidth: 400 }}>
          <TextField
            label="Admin Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError ? 'Password is required' : ''}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminLoginPage;
