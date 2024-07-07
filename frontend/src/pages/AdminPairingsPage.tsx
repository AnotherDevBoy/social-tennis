import React, { useState } from 'react';
import {
  Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Fab, Popover, List, ListItem, ListItemText
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import AdminAppBar from '../components/AdminAppBar';
import AdminDrawer from '../components/AdminDrawer';
import LevelTabs from '../components/LevelTabs';
import PairingDialog from '../components/PairingDialog';
import {
  generatePairings, shuffleArray, shuffleByGender,
  Player, Pairing, Pairings
} from '../lib/pairing';

const fakePairings: Pairings = {
  A: generatePairings(10),
  B: generatePairings(10),
  C: generatePairings(10),
};

type PairingLevel = 'A' | 'B' | 'C';

const AdminPairingsPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<PairingLevel>('A');
  const [pairings, setPairings] = useState<Pairings>(fakePairings);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPairing, setSelectedPairing] = useState<Pairing | null>(null);

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

  const handleRowClick = (pairing: Pairing) => {
    setSelectedPairing(pairing);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPairing(null);
  };

  const handleSave = (updatedPairing: Pairing, oldPlayer1: string, oldPlayer2: string) => {
    const updatedPairings = pairings[currentLevel].map(pairing => {
      if (pairing.id === updatedPairing.id) {
        return updatedPairing;
      }
      return pairing;
    });

    // Perform the swap
    const swappedPairings = updatedPairings.map(pairing => {
      if (pairing.player1.name === updatedPairing.player2?.name && pairing.id !== updatedPairing.id) {
        return { ...pairing, player1: { ...pairing.player1, name: oldPlayer2 } };
      } else if (pairing.player2 && pairing.player2.name === updatedPairing.player2?.name && pairing.id !== updatedPairing.id) {
        return { ...pairing, player2: { ...pairing.player2, name: oldPlayer2 } };
      } else if (pairing.player1.name === updatedPairing.player1.name && pairing.id !== updatedPairing.id) {
        return { ...pairing, player1: { ...pairing.player1, name: oldPlayer1 } };
      } else if (pairing.player2 && pairing.player2.name === updatedPairing.player1.name && pairing.id !== updatedPairing.id) {
        return { ...pairing, player2: { ...pairing.player2, name: oldPlayer1 } };
      }
      return pairing;
    });

    setPairings((prevPairings) => ({
      ...prevPairings,
      [currentLevel]: swappedPairings,
    }));
    handleDialogClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const allPlayers = pairings[currentLevel].flatMap(pairing => [pairing.player1, pairing.player2]).filter(player => player) as Player[];

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
                  <TableRow key={pairing.id} onClick={() => handleRowClick(pairing)} sx={{ cursor: 'pointer' }}>
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
      <PairingDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSave={handleSave}
        players={allPlayers}
        selectedPairing={selectedPairing}
      />
    </Box>
  );
};

export default AdminPairingsPage;
