'use client';
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const busServices = [
  {
    id: 1,
    route: 'Downtown to Uptown',
    schedule: 'Every 30 minutes',
    fare: '$2.50',
  },
  {
    id: 2,
    route: 'Airport to City Center',
    schedule: 'Every 45 minutes',
    fare: '$5.00',
  },
  {
    id: 3,
    route: 'Suburbs to Downtown',
    schedule: 'Every hour',
    fare: '$3.00',
  },
];

const BusServices = () => {
  const [open, setOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [feedback, setFeedback] = useState('');
  
  const handleClickOpen = (service) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBook = () => {
    // Add booking logic here
    setSnackOpen(true);
    handleClose();
    setTimeout(() => {
      setFeedbackOpen(true); // Open feedback form after booking
    }, 1000);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
    setFeedback('');
  };

  const handleSubmitFeedback = () => {
    // Process the feedback (send to backend, etc.)
    console.log('Feedback Submitted:', feedback);
    setFeedbackOpen(false);
    setFeedback('');
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Bus Services
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Explore Our Bus Routes and Timings
      </Typography>

      <Grid container spacing={4}>
        {busServices.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card sx={{ transition: '0.3s', '&:hover': { boxShadow: 3 } }}>
              <CardContent>
                <Typography variant="h5">{service.route}</Typography>
                <Typography variant="body2">Schedule: {service.schedule}</Typography>
                <Typography variant="body2">Fare: {service.fare}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpen(service)}
                  sx={{ mt: 2 }}
                >
                  Book Ticket
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Ticket for {selectedService?.route}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Passenger Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Number of Tickets"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={1}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleBook} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Booking Confirmation */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message="Ticket booked successfully!"
        action={
          <IconButton size="small" aria-label="close" onClick={handleSnackClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onClose={handleFeedbackClose}>
        <DialogTitle>We Value Your Feedback</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Share your experience"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFeedbackClose}>Cancel</Button>
          <Button onClick={handleSubmitFeedback} variant="contained" color="primary">
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BusServices;
