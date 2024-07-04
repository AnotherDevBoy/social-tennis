import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Card, CardContent, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ListSubheader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Home as HomeIcon, Settings as SettingsIcon, Person as PersonIcon, People as PeopleIcon, Numbers as NumbersIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';

const AuthenticatedAdminPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'auto', position: 'relative', pb: 8 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
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
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
          <List>
            <ListSubheader>Tournament</ListSubheader>
            <ListItem button onClick={() => handleNavigation('/tournament/:tournamentId/admin')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <Divider />
            <ListSubheader>Player</ListSubheader>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Entries" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Pairings" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <NumbersIcon />
              </ListItemIcon>
              <ListItemText primary="Scores" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
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
      </Box>
      <Box sx={{ position: 'fixed', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary">
          Start
        </Button>
      </Box>
    </Box>
  );
};

export default AuthenticatedAdminPage;
