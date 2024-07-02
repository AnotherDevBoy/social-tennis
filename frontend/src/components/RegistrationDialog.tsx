// src/components/RegistrationDialog.tsx
import React, { useState } from 'react';
import {
  Dialog, AppBar, Toolbar, IconButton, Typography, Button, DialogContent, Box, TextField, Tooltip, FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface RegistrationDialogProps {
  open: boolean;
  onClose: () => void;
}

const RegistrationDialog: React.FC<RegistrationDialogProps> = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({ firstName: '', surname: '', email: '', gender: '', level: '' });
  const [formErrors, setFormErrors] = useState({ firstName: false, surname: false, email: false, gender: false, level: false });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name) {
      setFormValues({
        ...formValues,
        [name]: value as string,
      });
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    }
  };

  const handleSave = () => {
    const errors = {
      firstName: !formValues.firstName,
      surname: !formValues.surname,
      email: !formValues.email,
      gender: !formValues.gender,
      level: !formValues.level,
    };
    setFormErrors(errors);

    if (!errors.firstName && !errors.surname && !errors.email && !errors.gender && !errors.level) {
      // Form is valid, proceed with save
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    setFormValues({ firstName: '', surname: '', email: '', gender: '', level: '' });
    setFormErrors({ firstName: false, surname: false, email: false, gender: false, level: false });
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            Registration
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
            error={formErrors.firstName}
            helperText={formErrors.firstName && "First name is required"}
          />
          <TextField
            label="Surname"
            variant="outlined"
            fullWidth
            name="surname"
            value={formValues.surname}
            onChange={handleInputChange}
            error={formErrors.surname}
            helperText={formErrors.surname && "Surname is required"}
          />
          <Tooltip title="Use for identification purpose. Will not be stored.">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              error={formErrors.email}
              helperText={formErrors.email && "Email is required"}
            />
          </Tooltip>
          <FormControl fullWidth variant="outlined" error={formErrors.gender}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              name="gender"
              value={formValues.gender}
              onChange={handleSelectChange}
            >
              <MenuItem value="male">Man</MenuItem>
              <MenuItem value="female">Woman</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {formErrors.gender && <FormHelperText>Gender is required</FormHelperText>}
          </FormControl>
          <FormControl fullWidth variant="outlined" error={formErrors.level}>
            <InputLabel id="level-label">Level</InputLabel>
            <Select
              labelId="level-label"
              label="Level"
              name="level"
              value={formValues.level}
              onChange={handleSelectChange}
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Select>
            {formErrors.level && <FormHelperText>Level is required</FormHelperText>}
          </FormControl>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
