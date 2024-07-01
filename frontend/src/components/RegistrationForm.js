import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Container, Typography } from '@mui/material';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skillLevel: '',
    gender: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/register', formData)
      .then(response => {
        console.log(response.data);
        alert('Registration successful');
        setFormData({ name: '', email: '', skillLevel: '', gender: '' });
      })
      .catch(error => {
        console.error('There was an error registering!', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Register for the Tournament
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <FormControl fullWidth required margin="normal">
          <InputLabel>Skill Level</InputLabel>
          <Select
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
  );
}

export default RegistrationForm;
