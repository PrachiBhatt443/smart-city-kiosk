'use client'
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  Snackbar, 
  Rating,
  Box,
  CircularProgress
} from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useSession } from 'next-auth/react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const RatingPage = () => {
//   const { data: session, status } = useSession();
  const [ratings, setRatings] = useState({
    crimeReduction: 0,
    roadCondition: 0,
    complaintResolution: 0,
    noiseReduction: 0,
    overcrowding: 0,
    traffic: 0,
    airQuality: 0,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

//   useEffect(() => {
//     if (session) {
//       fetchUserRatings();
//     }
//   }, [session]);

  const fetchUserRatings = async () => {
    try {
      const response = await fetch('/api/ratings');
      if (response.ok) {
        const data = await response.json();
        const userRating = data.find(rating => rating.userId === session.user.id);
        if (userRating) {
          setRatings(userRating);
        }
      }
    } catch (err) {
      console.error('Error fetching user ratings:', err);
    }
  };

  const handleInputChange = (key) => (event, newValue) => {
    setRatings((prev) => ({ ...prev, [key]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
console.log(ratings);
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: null,
          ...ratings,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
          setRatings({
            crimeReduction: 0,
            roadCondition: 0,
            complaintResolution: 0,
            noiseReduction: 0,
            overcrowding: 0,
            traffic: 0,
            airQuality: 0,
          });
      } else {
        throw new Error('Failed to submit ratings');
      }
    } catch (err) {
      setError('Failed to submit ratings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSubmitted(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Rate Various Parameters
            </Typography>
            <Typography variant="body1" gutterBottom align="center" color="textSecondary">
              Help us improve by rating these aspects of your area
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              {Object.entries(ratings).map(([key, value]) => (
                <Box key={key} sx={{ mb: 3 }}>
                  <Typography component="legend">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </Typography>
                  <Rating
                    name={key}
                    value={value}
                    onChange={handleInputChange(key)}
                    icon={<StarIcon fontSize="inherit" />}
                    emptyIcon={<StarIcon fontSize="inherit" />}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
          <CardActions>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={handleSubmit}
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit Rating'}
            </Button>
          </CardActions>
        </Card>
        <Snackbar
          open={submitted}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Ratings submitted successfully!"
        />
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
          message={error}
        />
      </Container>
    </ThemeProvider>
  );
};

export default RatingPage;