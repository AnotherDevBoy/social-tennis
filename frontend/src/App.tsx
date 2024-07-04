// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import PlayerEntryListPage from './pages/PlayerEntryListPage';
import ScoresPage from './pages/ScoresPage';
import theme from './theme'; // Importing the theme from theme.ts

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<PlayerEntryListPage />} />
          <Route path="/scores" element={<ScoresPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
