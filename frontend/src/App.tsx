import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlayerLoginPage from './pages/PlayerLoginPage';
import PlayerEntryListPage from './pages/PlayerEntryListPage';
import ScoresPage from './pages/ScoresPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import AdminEntryListPage from './pages/AdminEntryListPage';
import AdminScoresPage from './pages/AdminScoresPage';
import AdminPairingsPage from './pages/AdminPairingsPage'; // Import the new page
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
          <Route path="/tournament/:tournamentId/admin" element={<AdminLoginPage />} />
          <Route path="/tournament/:tournamentId/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/tournament/:tournamentId/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/tournament/:tournamentId/admin/players" element={<AdminEntryListPage />} />
          <Route path="/tournament/:tournamentId/admin/scores" element={<AdminScoresPage />} />
          <Route path="/tournament/:tournamentId/admin/pairings" element={<AdminPairingsPage />} /> {/* Add the route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
