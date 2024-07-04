import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { checkAdminSession } from '../lib/auth';
import AdminAppBar from '../components/AdminAppBar';
import AdminDrawer from '../components/AdminDrawer';
import { People as PeopleIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';

const AdminDashboardPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAdminSession()) {
      navigate(`/tournament/${tournamentId}/admin`);
    }
  }, [navigate, tournamentId]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'auto', position: 'relative', pb: 8 }}>
      <AdminAppBar onMenuClick={handleDrawerToggle} />
      <AdminDrawer open={drawerOpen} onClose={handleDrawerToggle} />
      <Box p={2} sx={{ width: '100%' }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <PeopleIcon fontSize="large" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="h4">34</Typography>
                <Typography color="textSecondary">Entries</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <AccessTimeIcon fontSize="large" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="h6">Entry Open</Typography>
                <Typography color="textSecondary">Tournament Status</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ position: 'fixed', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary">
          Start
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;
