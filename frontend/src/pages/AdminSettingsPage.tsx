import React, { useState, useEffect } from 'react';
import {
  Box, Container, List, ListItem, ListItemText, Divider, Typography, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Button, Radio, RadioGroup, FormControlLabel, Slider, Switch
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { checkAdminSession } from '../lib/auth';
import AdminAppBar from '../components/AdminAppBar';
import AdminDrawer from '../components/AdminDrawer';

interface Settings {
  title: string;
  subtitle: string;
  adminPassword: string;
  userPassword: string;
  winningCondition: string;
  setsPerMatch: number;
  gamesPerSet: number;
  adScoring: boolean;
  championshipTieBreak: boolean;
}

const AdminSettingsPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentField, setCurrentField] = useState<keyof Settings | ''>('');
  const [currentValue, setCurrentValue] = useState<string>('');
  const [settings, setSettings] = useState<Settings>({
    title: 'FNST',
    subtitle: 'Dublin LTC',
    adminPassword: 'adminpassword123',
    userPassword: 'userpassword123',
    winningCondition: 'Total sets',
    setsPerMatch: 3,
    gamesPerSet: 6,
    adScoring: true,
    championshipTieBreak: false
  });
  const [sheetOpen, setSheetOpen] = useState(false);
  const [radioValue, setRadioValue] = useState(settings.winningCondition);

  useEffect(() => {
    if (!checkAdminSession()) {
      navigate(`/tournament/${tournamentId}/admin`);
    }
  }, [navigate, tournamentId]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDialogOpen = (field: keyof Settings, value: string) => {
    if (field === 'winningCondition') {
      setRadioValue(value);
      setSheetOpen(true);
    } else {
      setCurrentField(field);
      setCurrentValue(value);
      setDialogOpen(true);
    }
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

  const handleSheetClose = () => {
    setSheetOpen(false);
  };

  const handleSheetSave = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      winningCondition: radioValue
    }));
    setSheetOpen(false);
  };

  const getObscuredValue = (value: string) => '****';

  const handleSliderChange = (field: keyof Settings, value: number | number[]) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [field]: value as number
    }));
  };

  const handleToggleChange = (field: keyof Settings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [field]: !prevSettings[field]
    }));
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
            <ListItem button onClick={() => handleDialogOpen('winningCondition', settings.winningCondition)}>
              <ListItemText primary="Winning condition" secondary={settings.winningCondition} />
            </ListItem>
            <ListItem>
              <Box sx={{ width: '100%' }}>
                <Typography variant="body1" gutterBottom>
                  Sets per match
                </Typography>
                <Slider
                  value={settings.setsPerMatch}
                  min={1}
                  max={5}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                  onChange={(e, value) => handleSliderChange('setsPerMatch', value)}
                />
              </Box>
            </ListItem>
            <ListItem>
              <Box sx={{ width: '100%' }}>
                <Typography variant="body1" gutterBottom>
                  Games per set
                </Typography>
                <Slider
                  value={settings.gamesPerSet}
                  min={1}
                  max={6}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                  onChange={(e, value) => handleSliderChange('gamesPerSet', value)}
                />
              </Box>
            </ListItem>
            <ListItem>
              <ListItemText primary="Ad scoring" />
              <Switch
                checked={settings.adScoring}
                onChange={() => handleToggleChange('adScoring')}
                edge="end"
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Championship tie-break" />
              <Switch
                checked={settings.championshipTieBreak}
                onChange={() => handleToggleChange('championshipTieBreak')}
                edge="end"
              />
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
      <Dialog
        open={sheetOpen}
        onClose={handleSheetClose}
        fullWidth
        sx={{
          position: 'fixed',
          bottom: 0,
          margin: 0,
          maxWidth: 'none',
          height: 'auto',
          '& .MuiDialog-container': {
            alignItems: 'flex-end'
          },
          '& .MuiPaper-root': {
            width: '100%',
            margin: 0,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }
        }}
      >
        <DialogTitle>Winning Condition</DialogTitle>
        <DialogContent>
          <RadioGroup
            aria-label="winningCondition"
            name="winningCondition"
            value={radioValue}
            onChange={(e) => setRadioValue(e.target.value)}
          >
            <FormControlLabel value="Total sets" control={<Radio />} label="Total sets" />
            <FormControlLabel value="Total games" control={<Radio />} label="Total games" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSheetClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSheetSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminSettingsPage;
