import React, { useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Box, TextField, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface UserVerificationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (email: string) => void;
}

const UserVerificationDialog: React.FC<UserVerificationDialogProps> = ({ open, onClose, onConfirm }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleConfirm = () => {
    if (email.trim() === '') {
      setEmailError(true);
    } else {
      onConfirm(email);
      setEmailError(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            Verify your identity
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box p={3}>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? 'Email is required' : ''}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="text" color="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default UserVerificationDialog;
