import React, { useState } from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import AdminAppBar from '../components/AdminAppBar';
import AdminDrawer from '../components/AdminDrawer';
import LevelTabs from '../components/LevelTabs';

const generateRandomName = () => {
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Frank', 'Grace', 'Hank', 'Ivy'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis', 'Evans', 'Green', 'Harris', 'Irving', 'Jackson'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
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
type Pairings = { [key in PairingLevel]: { id: number; player1: string; player2: string; }[] };

const AdminPairingsPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<PairingLevel>('A');
  const [pairings, setPairings] = useState<Pairings>(fakePairings);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLevelChange = (level: string) => {
    setCurrentLevel(level as PairingLevel);
  };

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
                    <TableCell sx={{ textAlign: 'center' }}>{pairing.player1}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{pairing.player2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Fab
        color="primary"
        onClick={() => {}}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default AdminPairingsPage;
