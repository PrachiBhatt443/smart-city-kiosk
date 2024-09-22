'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views'; // For carousel effect

// Sample announcement data
const announcements = [
  { id: 1, title: "Road Maintenance Alert", description: "Main Street will be closed for repairs from Sept 23-25. Please use alternate routes." },
  { id: 2, title: "Community Event", description: "Join us for the Smart City Fair on Sept 30th at the Central Park." },
  { id: 3, title: "Public Health Notice", description: "Free vaccinations will be available at all public health centers this weekend." },
  { id: 4, title: "Weather Advisory", description: "Heavy rainfall expected on Sept 24th. Stay safe and avoid waterlogged areas." },
];

const AnnouncementPage = () => {
  const theme = useTheme();
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  const handleNext = () => {
    setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
  };

  const handleBack = () => {
    setCurrentAnnouncement((prev) => (prev === 0 ? announcements.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(120deg, #4b6cb7, #182848)', // New gradient
        color: '#fff',
      }}
    >
      <Typography 
        variant="h3" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          mb: 4, 
          fontFamily: 'Roboto, sans-serif', // Modern typography
          letterSpacing: 2 
        }}
      >
        📢 City Announcements
      </Typography>

      <Box
        sx={{
          width: '80%',
          maxWidth: '600px',
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.15)', // Light transparency
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)', // Shadow effect
        }}
      >
        <SwipeableViews index={currentAnnouncement} onChangeIndex={(index) => setCurrentAnnouncement(index)}>
          {announcements.map((announcement, index) => (
            <Paper 
              key={index} 
              elevation={6} 
              sx={{ 
                padding: theme.spacing(4), 
                textAlign: 'center', 
                borderRadius: 2, 
                background: 'rgba(255, 255, 255, 0.85)' // Soft background for readability
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 2, 
                  color: '#ff9800', // Brighter title color 
                  fontFamily: 'Roboto, sans-serif',
                  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' // Title shadow for depth
                }}
              >
                {announcement.title}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1.1rem', 
                  color: '#333' // Darker text for readability 
                }}
              >
                {announcement.description}
              </Typography>
            </Paper>
          ))}
        </SwipeableViews>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', width: '80%', maxWidth: '600px' }}>
        <Button 
          variant="contained" 
          onClick={handleBack} 
          startIcon={<ArrowBack />} 
          sx={{ 
            bgcolor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient button
            color: '#fff',
            borderRadius: 3,
            padding: '10px 20px'
          }}
        >
          Previous
        </Button>
        <Button 
          variant="contained" 
          onClick={handleNext} 
          endIcon={<ArrowForward />} 
          sx={{ 
            bgcolor: 'linear-gradient(45deg, #66bb6a 30%, #43a047 90%)', // Gradient button
            color: '#fff',
            borderRadius: 3,
            padding: '10px 20px'
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default AnnouncementPage;
