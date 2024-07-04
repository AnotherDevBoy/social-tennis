import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlayerLoginPage from './pages/PlayerLoginPage';
import PlayerEntryListPage from './pages/PlayerEntryListPage';
import ScoresPage from './pages/ScoresPage';
import TournamentAdminHomePage from './pages/TournamentAdminHomePage';
import TournamentCreationPage from './pages/TournamentCreationPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tournament" element={<TournamentCreationPage />} />
          <Route path="/tournament/:tournamentId" element={<PlayerLoginPage />} />
          <Route path="/tournament/:tournamentId/players" element={<PlayerEntryListPage />} />
          <Route path="/tournament/:tournamentId/scores" element={<ScoresPage />} />
          <Route path="/tournament/:tournamentId/admin" element={<TournamentAdminHomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
