import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import EntryList from '../components/EntryList';

const fakeEntries = [
  { level: 'A', name: 'John Doe' },
  { level: 'A', name: 'Jane Smith' },
  { level: 'B', name: 'Alice Johnson' },
  { level: 'B', name: 'Bob Brown' },
  { level: 'C', name: 'Charlie Davis' },
];

const PlayerEntryListPage: React.FC = () => {
  const [entries, setEntries] = useState(fakeEntries);
  const [currentLevel, setCurrentLevel] = useState('A');

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'auto', position: 'relative' }}>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Player Entries
        </Typography>
        <EntryList entries={entries} setEntries={setEntries} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />
      </Box>
    </Box>
  );
};

export default PlayerEntryListPage;
