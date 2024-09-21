'use client'
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Complaints = () => {
  const [complaint, setComplaint] = useState('');
  const [location, setLocation] = useState(''); // Field for location
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          setError('Could not fetch location. Please allow location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: complaint,
          location,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setComplaint(''); // Clear the input fields
      } else {
        const { message } = await res.json();
        setError(message || 'Something went wrong!');
      }
    } catch (err) {
      setError('Error submitting complaint. Please try again.');
    }
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

        {/* Location will be auto-added through geolocation */}
        {/* <TextField
          fullWidth
          label="Location (auto-filled)"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)} // Optional if user wants to input a custom location
          sx={{ mb: 2 }}
          disabled
        /> */}

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

      {error && (
        <Typography color="error" variant="body1" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default Complaints;
