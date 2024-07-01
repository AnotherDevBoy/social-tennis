const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory data storage
const players = [];
const matches = [];

// Routes

// Register a player
app.post('/api/register', (req, res) => {
  const { name, email, skillLevel, gender } = req.body;
  const player = { id: players.length + 1, name, email, skillLevel, gender };
  players.push(player);
  res.status(201).json(player);
});

// Get all players
app.get('/api/players', (req, res) => {
  res.json(players);
});

// Generate pairs (simplified logic for demonstration)
app.post('/api/generate-pairs', (req, res) => {
  // Simplified pairing logic
  const pairs = [];
  if (players.length < 2) {
    return res.status(400).json({ error: 'Not enough players to generate pairs' });
  }

  for (let i = 0; i < players.length; i += 2) {
    if (players[i + 1]) {
      pairs.push({
        player1_id: players[i].id,
        player2_id: players[i + 1].id,
      });
    }
  }

  // Save matches
  pairs.forEach(pair => matches.push({
    id: matches.length + 1,
    player1_id: pair.player1_id,
    player2_id: pair.player2_id,
    score1: 0,
    score2: 0,
  }));

  res.json(matches);
});

// Record a match score
app.post('/api/matches/:id/score', (req, res) => {
  const { id } = req.params;
  const { score1, score2 } = req.body;
  const match = matches.find(m => m.id == id);
  if (match) {
    match.score1 = score1;
    match.score2 = score2;
    res.json(match);
  } else {
    res.status(404).json({ error: 'Match not found' });
  }
});

// Get all matches
app.get('/api/matches', (req, res) => {
  if (matches.length === 0) {
    return res.status(404).json({ error: 'No matches found' });
  }
  res.json(matches);
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
