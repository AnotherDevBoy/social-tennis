import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import UnauthenticatedAdminPage from './UnauthenticatedAdminPage';
import AuthenticatedAdminPage from './AuthenticatedAdminPage';

const AdminHomePage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionCookie = Cookies.get('admin-session');
    if (sessionCookie) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuthenticate = () => {
    Cookies.set('admin-session', 'true', { expires: 1 }); // Expires in 1 day
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={80} sx={{ color: '#00953B' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} disableGutters>
      {!isAuthenticated ? (
        <UnauthenticatedAdminPage onAuthenticate={handleAuthenticate} />
      ) : (
        <AuthenticatedAdminPage />
      )}
    </Container>
  );
};

export default AdminHomePage;
