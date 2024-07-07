import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Player, Pairing } from '../lib/pairing';

interface PairingDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (pairing: Pairing, oldPlayer1: string, oldPlayer2: string) => void;
  players: Player[];
  selectedPairing: Pairing | null;
}

const PairingDialog: React.FC<PairingDialogProps> = ({ open, onClose, onSave, players, selectedPairing }) => {
  const [player1, setPlayer1] = useState<string>('');
  const [player2, setPlayer2] = useState<string>('');
  const [oldPlayer1, setOldPlayer1] = useState<string>('');
  const [oldPlayer2, setOldPlayer2] = useState<string>('');

  useEffect(() => {
    if (selectedPairing) {
      setPlayer1(selectedPairing.player1.name);
      setPlayer2(selectedPairing.player2 ? selectedPairing.player2.name : '');
      setOldPlayer1(selectedPairing.player1.name);
      setOldPlayer2(selectedPairing.player2 ? selectedPairing.player2.name : '');
    }
  }, [selectedPairing]);

  const handlePlayer1Change = (e: SelectChangeEvent<string>) => {
    setPlayer1(e.target.value as string);
  };

  const handlePlayer2Change = (e: SelectChangeEvent<string>) => {
    setPlayer2(e.target.value as string);
  };

  const handleSave = () => {
    if (player1 === player2) {
      alert("Player 1 and Player 2 cannot be the same.");
      return;
    }
    if (selectedPairing) {
      const updatedPairing: Pairing = {
        id: selectedPairing.id,
        player1: { ...selectedPairing.player1, name: player1 },
        player2: player2 ? { ...selectedPairing.player2!, name: player2 } : null,
      };
      onSave(updatedPairing, oldPlayer1, oldPlayer2);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Pairing</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Player 1</InputLabel>
          <Select
            value={player1}
            onChange={handlePlayer1Change}
          >
            {players.map((player, index) => (
              <MenuItem key={index} value={player.name}>
                {player.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Player 2</InputLabel>
          <Select
            value={player2}
            onChange={handlePlayer2Change}
          >
            {players.map((player, index) => (
              <MenuItem key={index} value={player.name}>
                {player.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PairingDialog;
