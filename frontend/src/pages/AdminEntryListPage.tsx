import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AdminAppBar from '../components/AdminAppBar';
import AdminDrawer from '../components/AdminDrawer';
import EntryList from '../components/EntryList';
import { checkAdminSession } from '../lib/auth';

const fakeEntries = [
  { level: 'A', name: 'John Doe' },
  { level: 'A', name: 'Jane Smith' },
  { level: 'B', name: 'Alice Johnson' },
  { level: 'B', name: 'Bob Brown' },
  { level: 'C', name: 'Charlie Davis' },
];

const AdminEntryListPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const navigate = useNavigate();
  const [entries, setEntries] = useState(fakeEntries);
  const [currentLevel, setCurrentLevel] = useState('A');

  useEffect(() => {
    if (!checkAdminSession()) {
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
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Player Entries
        </Typography>
        <EntryList entries={entries} setEntries={setEntries} currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />
      </Box>
    </Box>
  );
};

export default AdminEntryListPage;
