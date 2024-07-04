import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ListSubheader } from '@mui/material';
import { Home as HomeIcon, Settings as SettingsIcon, Person as PersonIcon, People as PeopleIcon, Numbers as NumbersIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

interface AdminDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AdminDrawer: React.FC<AdminDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { tournamentId } = useParams<{ tournamentId: string }>();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          <ListSubheader>Tournament</ListSubheader>
          <ListItem button onClick={() => handleNavigation(`/tournament/${tournamentId}/admin/dashboard`)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation(`/tournament/${tournamentId}/admin/settings`)}>
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
  );
};

export default AdminDrawer;
