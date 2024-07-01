import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, List, ListItem, ListItemText, TextField } from '@mui/material';

function Dashboard() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matchesError, setMatchesError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/players')
      .then(res => setPlayers(res.data))
      .catch(err => console.error('Error fetching players:', err));

    axios.get('http://localhost:5000/api/matches')
      .then(res => {
        setMatches(res.data);
        setMatchesError('');
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          setMatchesError('No matches found');
        } else {
          console.error('Error fetching matches:', err);
        }
      });
  }, []);

  const generatePairs = () => {
    axios.post('http://localhost:5000/api/generate-pairs')
      .then(res => {
        setMatches(res.data);
        setMatchesError('');
      })
      .catch(err => {
        console.error('Error generating pairs:', err);
      });
  };

  const recordScore = (matchId, score1, score2) => {
    axios.post(`http://localhost:5000/api/matches/${matchId}/score`, { score1, score2 })
      .then(res => {
        setMatches(matches.map(m => m.id === matchId ? res.data : m));
      })
      .catch(err => console.error('Error recording score:', err));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button variant="contained" color="primary" onClick={generatePairs}>
        Generate Pairs
      </Button>
      <Typography variant="h6" gutterBottom>
        Players
      </Typography>
      <List>
        {players.map(player => (
          <ListItem key={player.id}>
            <ListItemText primary={`${player.name} (${player.skillLevel})`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Matches
      </Typography>
      {matchesError ? (
        <Typography variant="body1" color="error">{matchesError}</Typography>
      ) : (
        <List>
          {matches.map(match => (
            <ListItem key={match.id}>
              <ListItemText primary={`${match.player1_id} vs ${match.player2_id}`} />
              <TextField
                type="number"
                placeholder="Score 1"
                onBlur={(e) => recordScore(match.id, e.target.value, match.score2)}
                margin="normal"
              />
              <TextField
                type="number"
                placeholder="Score 2"
                onBlur={(e) => recordScore(match.id, match.score1, e.target.value)}
                margin="normal"
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default Dashboard;
