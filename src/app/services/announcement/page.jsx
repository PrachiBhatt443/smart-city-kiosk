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
        background: 'linear-gradient(120deg, #e0f7fa, #f1f8e9)', // Light background gradient
        color: '#333', // Soft dark text color
      }}
    >
      <Typography 
        variant="h3" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          mb: 4, 
          fontFamily: 'Roboto, sans-serif', 
          letterSpacing: 2,
          color: '#3e2723', // Light brown for a softer title
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
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light and translucent
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
        }}
      >
        <SwipeableViews index={currentAnnouncement} onChangeIndex={(index) => setCurrentAnnouncement(index)}>
          {announcements.map((announcement, index) => (
            <Paper 
              key={index} 
              elevation={0} 
              sx={{ 
                padding: theme.spacing(4), 
                textAlign: 'center', 
                borderRadius: 2, 
                background: '#ffffff', // Clean white background
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 2, 
                  color: '#4caf50', // Soft green for titles
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                {announcement.title}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1.1rem', 
                  color: '#555' // Softer dark color for text
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
            bgcolor: 'linear-gradient(45deg, #81d4fa 30%, #b2dfdb 90%)', // Soft blue-green gradient
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
            bgcolor: 'linear-gradient(45deg, #aed581 30%, #c5e1a5 90%)', // Soft green gradient
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
