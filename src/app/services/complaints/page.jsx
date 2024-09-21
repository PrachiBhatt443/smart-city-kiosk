'use client'
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Complaints = () => {
  const [complaint, setComplaint] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the complaint to a backend or perform any other action here
    console.log('Complaint Submitted:', complaint);
    setSubmitted(true);
    setComplaint(''); // Clear the input field
  };

  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Complaint Submission
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Enter your complaint"
          variant="outlined"
          multiline
          rows={4}
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit Complaint
        </Button>
      </form>

      {/* Snackbar for feedback after submission */}
      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Complaint submitted successfully!"
        action={
          <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default Complaints;
