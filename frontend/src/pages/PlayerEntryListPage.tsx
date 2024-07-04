// src/pages/PlayerEntryListPage.tsx
import React, { useState } from 'react';
import {
  Container, Tabs, Tab, Box, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Fab, Popover, MenuItem,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { faker } from '@faker-js/faker';
import RegistrationDialog from '../components/RegistrationDialog';

type Gender = 'male' | 'female' | 'other';

interface Player {
  name: string;
  gender: Gender;
}

const genderIcons: Record<Gender, string> = {
  male: '♂️',
  female: '♀️',
  other: '⚧️',
};

const generateRandomPlayers = (numPlayers: number): Player[] => {
  const players: Player[] = [];
  for (let i = 0; i < numPlayers; i++) {
    const gender: Gender = faker.datatype.boolean() ? 'male' : 'female';
    const name = faker.name.fullName({ sex: gender === 'male' ? 'male' : 'female' });
    players.push({ name, gender });
  }
  return players;
};

const TabPanel = ({ children, value, index }: { children: React.ReactNode, value: number, index: number }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

const FloatingButton = styled(Fab)({
  position: 'fixed',
  bottom: 16,
  right: 16,
});

const PlayerEntryListPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [playersA, setPlayersA] = useState<Player[]>(generateRandomPlayers(50));
  const [playersB, setPlayersB] = useState<Player[]>(generateRandomPlayers(50));
  const [playersC, setPlayersC] = useState<Player[]>(generateRandomPlayers(50));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    handleClosePopover();
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = (newPlayer: Player, level: string) => {
    if (level === 'A') {
      setPlayersA((prev) => [...prev, newPlayer]);
    } else if (level === 'B') {
      setPlayersB((prev) => [...prev, newPlayer]);
    } else if (level === 'C') {
      setPlayersC((prev) => [...prev, newPlayer]);
    }
    setDialogOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Container>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth" centered>
          <Tab label="Level A" />
          <Tab label="Level B" />
          <Tab label="Level C" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <List>
            {playersA.map((player, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{genderIcons[player.gender]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={player.name} />
                </ListItem>
                {index < playersA.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <List>
            {playersB.map((player, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{genderIcons[player.gender]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={player.name} />
                </ListItem>
                {index < playersB.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <List>
            {playersC.map((player, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{genderIcons[player.gender]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={player.name} />
                </ListItem>
                {index < playersC.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>
      </Box>
      <FloatingButton color="primary" aria-label="add" onClick={handleButtonClick}>
        <AddIcon />
      </FloatingButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        disableScrollLock // This allows scrolling when the popover is open
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuItemClick}>Join Tournament</MenuItem>
      </Popover>
      <RegistrationDialog open={dialogOpen} onClose={handleCloseDialog} onSave={handleSave} />
    </Container>
  );
};

export default PlayerEntryListPage;
