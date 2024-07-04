import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, AppBar, Toolbar, IconButton, Card, CardContent } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, People as PeopleIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';

const TournamentAdminHomePage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleJoin = () => {
    if (password.trim() === '') {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setIsAuthenticated(true);
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      {!isAuthenticated ? (
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
      ) : (
        <Box sx={{ width: '100%' }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                FNST
              </Typography>
              <IconButton edge="end" color="inherit" aria-label="notifications">
                <NotificationsIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box p={2} sx={{ width: '100%' }}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PeopleIcon fontSize="large" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h4">34</Typography>
                    <Typography color="textSecondary">Entries</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <AccessTimeIcon fontSize="large" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Entry Open</Typography>
                    <Typography color="textSecondary">Tournament Status</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" color="primary">
                Start
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default TournamentAdminHomePage;
