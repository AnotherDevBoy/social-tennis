import React, { useState, useEffect } from 'react';
import { Box, Container, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import AdminAppBar from '../components/AdminAppBar';
import AdminDrawer from '../components/AdminDrawer';

const AdminSettingsPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionCookie = Cookies.get('admin-session');
    if (!sessionCookie) {
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
      <Container maxWidth={false}>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            ADMIN SETTINGS
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Tournament Title" secondary="FNST" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Tournament Subtitle" secondary="Dublin LTC" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Admin Password" secondary="****" />
            </ListItem>
            <ListItem>
              <ListItemText primary="User Password" secondary="****" />
            </ListItem>
          </List>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" gutterBottom>
            TOURNAMENT FORMAT
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Winning condition" secondary="Most sets" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Set format" secondary="Best of 3 games" />
            </ListItem>
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminSettingsPage;
