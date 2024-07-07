import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Container, Button } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import LevelTabs from './LevelTabs';

interface Entry {
  level: string;
  name: string;
}

interface EntryListProps {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  currentLevel: string;
  setCurrentLevel: React.Dispatch<React.SetStateAction<string>>;
}

const EntryList: React.FC<EntryListProps> = ({ entries, setEntries, currentLevel, setCurrentLevel }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');

  const handleAddClick = () => {
    setCurrentName('');
    setCurrentEmail('');
    setEditIndex(null);
    setDialogOpen(true);
  };

  const handleEditClick = (index: number) => {
    setCurrentName(entries[index].name);
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleDeleteClick = (index: number) => {
    setEditIndex(index);
    setVerificationDialogOpen(true);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = { level: currentLevel, name: currentName };
      setEntries(updatedEntries);
    } else {
      setEntries([...entries, { level: currentLevel, name: currentName }]);
    }
    setDialogOpen(false);
  };

  const handleVerificationConfirm = () => {
    if (editIndex !== null) {
      const updatedEntries = entries.filter((_, index) => index !== editIndex);
      setEntries(updatedEntries);
    }
    setVerificationDialogOpen(false);
  };

  return (
    <Box>
      <Container>
        <Box mt={4}>
          <LevelTabs currentLevel={currentLevel} onChange={setCurrentLevel} />
          <List>
            {entries.filter(entry => entry.level === currentLevel).map((entry, index) => (
              <ListItem key={index} secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(index)} sx={{ color: 'red' }}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <ListItemText primary={entry.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
      <Fab
        color="primary"
        onClick={handleAddClick}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editIndex !== null ? 'Edit Entry' : 'Add Entry'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={verificationDialogOpen} onClose={() => setVerificationDialogOpen(false)}>
        <DialogTitle>Verify your identity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVerificationDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleVerificationConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EntryList;
