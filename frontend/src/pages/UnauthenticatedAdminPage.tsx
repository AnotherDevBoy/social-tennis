import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

interface UnauthenticatedAdminPageProps {
  onAuthenticate: () => void;
}

const UnauthenticatedAdminPage: React.FC<UnauthenticatedAdminPageProps> = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleJoin = () => {
    if (password.trim() === '') {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      onAuthenticate();
    }
  };

  return (
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
          <Button variant="contained" color="primary" fullWidth onClick={handleJoin}>
            Join
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UnauthenticatedAdminPage;
