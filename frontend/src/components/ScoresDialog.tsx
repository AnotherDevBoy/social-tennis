import React, { useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Box, Button, Select, MenuItem, FormControl, InputLabel, Divider } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface ScoresDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (scores: number[][]) => void;
}

const ScoresDialog: React.FC<ScoresDialogProps> = ({ open, onClose, onSave }) => {
  const initialScores = Array(3).fill([0, 0]);

  const [scores, setScores] = useState<number[][]>(initialScores);

  const handleScoreChange = (setIndex: number, scoreIndex: number, value: number) => {
    const newScores = scores.map((set, i) => {
      if (i === setIndex) {
        const newSet = [...set];
        newSet[scoreIndex] = value;
        return newSet;
      }
      return set;
    });
    setScores(newScores);
  };

  const handleSave = () => {
    onSave(scores);
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            Scores
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Box p={3}>
        {['Set 1', 'Set 2', 'Set 3'].map((set, setIndex) => (
          <Box key={setIndex} mb={3}>
            <Typography variant="h6">{set}</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Score</InputLabel>
              <Select
                value={scores[setIndex][0]}
                onChange={(e) => handleScoreChange(setIndex, 0, e.target.value as number)}
              >
                {[...Array(8)].map((_, num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Score</InputLabel>
              <Select
                value={scores[setIndex][1]}
                onChange={(e) => handleScoreChange(setIndex, 1, e.target.value as number)}
              >
                {[...Array(8)].map((_, num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {setIndex < 2 && <Divider />}
          </Box>
        ))}
      </Box>
    </Dialog>
  );
};

export default ScoresDialog;
