import React, { useState } from 'react';
import {
  Container, Tabs, Tab, Box, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Divider, Fab
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { faker } from '@faker-js/faker';
import RegistrationDialog from '../components/RegistrationDialog';
import UserVerificationDialog from '../components/UserVerificationDialog';

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenDialog = () => {
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

  const handleOpenVerifyDialog = () => {
    setVerifyDialogOpen(true);
  };

  const handleCloseVerifyDialog = () => {
    setVerifyDialogOpen(false);
  };

  const handleConfirmVerifyDialog = (email: string) => {
    // Handle confirm logic here
    console.log('Verified email:', email);
    setVerifyDialogOpen(false);
  };

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
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={handleOpenVerifyDialog}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" sx={{ color: 'red' }} onClick={handleOpenVerifyDialog}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
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
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={handleOpenVerifyDialog}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" sx={{ color: 'red' }} onClick={handleOpenVerifyDialog}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
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
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={handleOpenVerifyDialog}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" sx={{ color: 'red' }} onClick={handleOpenVerifyDialog}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < playersC.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>
      </Box>
      <FloatingButton color="primary" aria-label="add" onClick={handleOpenDialog}>
        <AddIcon />
      </FloatingButton>
      <RegistrationDialog open={dialogOpen} onClose={handleCloseDialog} onSave={handleSave} />
      <UserVerificationDialog
        open={verifyDialogOpen}
        onClose={handleCloseVerifyDialog}
        onConfirm={handleConfirmVerifyDialog}
      />
    </Container>
  );
};

export default PlayerEntryListPage;
