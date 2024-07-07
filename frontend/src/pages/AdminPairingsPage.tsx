import React, { useState } from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, Popover, List, ListItem, ListItemText } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import AdminAppBar from '../components/AdminAppBar';
import AdminDrawer from '../components/AdminDrawer';
import LevelTabs from '../components/LevelTabs';

const generateRandomName = () => {
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Frank', 'Grace', 'Hank', 'Ivy'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis', 'Evans', 'Green', 'Harris', 'Irving', 'Jackson'];
  const genders = ['Male', 'Female'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const gender = genders[Math.floor(Math.random() * genders.length)];
  return { name: `${firstName} ${lastName}`, gender };
};

const generatePairings = (count: number) => {
  const pairings = [];
  for (let i = 0; i < count; i++) {
    pairings.push({ id: i, player1: generateRandomName(), player2: generateRandomName() });
  }
  return pairings;
};

const fakePairings = {
  A: generatePairings(10),
  B: generatePairings(10),
  C: generatePairings(10),
};

type PairingLevel = 'A' | 'B' | 'C';
type Player = { name: string; gender: string };
type Pairing = { id: number; player1: Player; player2: Player | null };
type Pairings = { [key in PairingLevel]: Pairing[] };

const shuffleArray = (array: any[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const shuffleByGender = (pairings: Pairing[]) => {
  const males: Player[] = [];
  const females: Player[] = [];

  pairings.forEach(pairing => {
    if (pairing.player1.gender === 'Male') {
      males.push(pairing.player1);
    } else {
      females.push(pairing.player1);
    }

    if (pairing.player2) {
      if (pairing.player2.gender === 'Male') {
        males.push(pairing.player2);
      } else {
        females.push(pairing.player2);
      }
    }
  });

  const shuffledPairings: Pairing[] = [];
  const maxPairs = Math.min(males.length, females.length);

  for (let i = 0; i < maxPairs; i++) {
    shuffledPairings.push({
      id: i,
      player1: males[i],
      player2: females[i],
    });
  }

  // Add remaining unpaired players
  const remainingMales = males.slice(maxPairs);
  const remainingFemales = females.slice(maxPairs);

  let remainingId = maxPairs;
  remainingMales.forEach(male => {
    shuffledPairings.push({ id: remainingId++, player1: male, player2: null });
  });
  remainingFemales.forEach(female => {
    shuffledPairings.push({ id: remainingId++, player1: female, player2: null });
  });

  return shuffledPairings;
};

const AdminPairingsPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<PairingLevel>('A');
  const [pairings, setPairings] = useState<Pairings>(fakePairings);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLevelChange = (level: string) => {
    setCurrentLevel(level as PairingLevel);
  };

  const handleFabClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: string) => {
    if (option === 'Random') {
      // Collect all players into a single array for shuffling
      const allPlayers: Player[] = [];
      pairings[currentLevel].forEach(pairing => {
        allPlayers.push(pairing.player1);
        if (pairing.player2) {
          allPlayers.push(pairing.player2);
        }
      });

      const shuffledPlayers = shuffleArray(allPlayers);
      const shuffledPairings: Pairing[] = [];

      for (let i = 0; i < shuffledPlayers.length; i += 2) {
        if (shuffledPlayers[i + 1]) {
          shuffledPairings.push({
            id: i / 2,
            player1: shuffledPlayers[i],
            player2: shuffledPlayers[i + 1],
          });
        } else {
          shuffledPairings.push({
            id: i / 2,
            player1: shuffledPlayers[i],
            player2: null,
          });
        }
      }

      setPairings((prevPairings) => ({
        ...prevPairings,
        [currentLevel]: shuffledPairings,
      }));
    } else if (option === 'By gender') {
      const genderShuffledPairings = shuffleByGender(pairings[currentLevel]);
      setPairings((prevPairings) => ({
        ...prevPairings,
        [currentLevel]: genderShuffledPairings,
      }));
    }
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'auto', position: 'relative' }}>
      <AdminAppBar onMenuClick={handleDrawerToggle} />
      <AdminDrawer open={drawerOpen} onClose={handleDrawerToggle} />
      <Container>
        <Box mt={4}>
          <LevelTabs currentLevel={currentLevel} onChange={handleLevelChange} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '50%', textAlign: 'center' }}>Player 1</TableCell>
                  <TableCell sx={{ width: '50%', textAlign: 'center' }}>Player 2</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pairings[currentLevel].map((pairing) => (
                  <TableRow key={pairing.id}>
                    <TableCell sx={{ textAlign: 'center' }}>{pairing.player1.name}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{pairing.player2 ? pairing.player2.name : ''}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Fab
        color="primary"
        onClick={handleFabClick}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List>
          <ListItem button onClick={() => handleMenuItemClick('Random')}>
            <ListItemText primary="Random" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('By gender')}>
            <ListItemText primary="By gender" />
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
};

export default AdminPairingsPage;
