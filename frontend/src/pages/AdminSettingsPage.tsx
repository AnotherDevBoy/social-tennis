import React, { useState, useEffect } from 'react';
import { Box, Container, List, ListItem, ListItemText, Divider, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { checkAdminSession } from '../lib/auth';
import AdminAppBar from '../components/AdminAppBar';
import AdminDrawer from '../components/AdminDrawer';

const AdminSettingsPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [settings, setSettings] = useState({
    title: 'FNST',
    subtitle: 'Dublin LTC',
    adminPassword: 'adminpassword123',
    userPassword: 'userpassword123'
  });

  useEffect(() => {
    if (!checkAdminSession()) {
      navigate(`/tournament/${tournamentId}/admin`);
    }
  }, [navigate, tournamentId]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDialogOpen = (field: string, value: string) => {
    setCurrentField(field);
    setCurrentValue(value);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [currentField]: currentValue
    }));
    setDialogOpen(false);
  };

  const getObscuredValue = (value: string) => '****';

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
            <ListItem button onClick={() => handleDialogOpen('title', settings.title)}>
              <ListItemText primary="Tournament Title" secondary={settings.title} />
            </ListItem>
            <ListItem button onClick={() => handleDialogOpen('subtitle', settings.subtitle)}>
              <ListItemText primary="Tournament Subtitle" secondary={settings.subtitle} />
            </ListItem>
            <ListItem button onClick={() => handleDialogOpen('adminPassword', settings.adminPassword)}>
              <ListItemText primary="Admin Password" secondary={getObscuredValue(settings.adminPassword)} />
            </ListItem>
            <ListItem button onClick={() => handleDialogOpen('userPassword', settings.userPassword)}>
              <ListItemText primary="User Password" secondary={getObscuredValue(settings.userPassword)} />
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
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit {currentField}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={currentField}
            type={currentField.includes('Password') ? 'password' : 'text'}
            fullWidth
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminSettingsPage;
