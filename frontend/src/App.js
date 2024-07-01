import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <Router>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Social Tennis Tournament
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
