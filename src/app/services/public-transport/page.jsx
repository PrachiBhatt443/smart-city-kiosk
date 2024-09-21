'use client';
import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BusServices = () => {
  const [busServices, setBusServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  useEffect(() => {
    fetchBusServices();
  }, []);

  // Fetch bus services from API
  const fetchBusServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/busService');
      if (response.ok) {
        const data = await response.json();
        setBusServices(data);
      } else {
        throw new Error('Failed to fetch bus services');
      }
    } catch (error) {
      console.error('Error fetching bus services:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle opening the booking dialog
  const handleClickOpen = (service) => {
    setSelectedService(service);
    setOpen(true);
  };

  // Handle closing the booking dialog
  const handleClose = () => {
    setOpen(false);
    setPassengerName('');
    setNumberOfTickets(1);
  };

  // Book a ticket via the API
  const handleBook = async () => {
    try {
      const response = await fetch('/api/busService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'bookTicket',
          serviceId: selectedService._id,
          passengerName,
          numberOfTickets,
        }),
      });

      if (response.ok) {
        setSnackOpen(true);
        handleClose();
        setTimeout(() => {
          setFeedbackOpen(true);
        }, 1000);
      } else {
        throw new Error('Failed to book ticket');
      }
    } catch (error) {
      console.error('Error booking ticket:', error);
      setError(error.message);
    }
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
    setFeedback('');
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback Submitted:', feedback);
    setFeedbackOpen(false);
    setFeedback('');
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center">
          Error: {error}
        </Typography>
      </Container>
    );
  }

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
          <Grid item xs={12} sm={6} md={4} key={service._id}>
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
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Number of Tickets"
            type="number"
            fullWidth
            variant="outlined"
            value={numberOfTickets}
            onChange={(e) => setNumberOfTickets(parseInt(e.target.value))}
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
