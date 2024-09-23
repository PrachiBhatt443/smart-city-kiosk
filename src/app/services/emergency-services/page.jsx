'use client'
import React from 'react';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import { LocalHospital, LocalPolice, FireExtinguisher, LocationOn } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const EmergencyServicesPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #ffebee, #e3f2fd)', 
        padding: theme.spacing(4),
      }}
    >
      <Typography 
        variant="h2" 
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#b71c1c', // Dark red for urgency
          mb: 4,
          fontFamily: 'Roboto, sans-serif',
          letterSpacing: 1.5,
        }}
      >
        🚨 Emergency Services
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Police */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={5} 
            sx={{ 
              padding: theme.spacing(3), 
              backgroundColor: '#e57373', // Light red for police
              color: '#fff',
              textAlign: 'center',
              borderRadius: 3,
              '&:hover': {
                backgroundColor: '#ef5350', // Darker red on hover
              },
            }}
          >
            <LocalPolice fontSize="large" sx={{ mb: 1 }} />
            <Typography variant="h5" gutterBottom>
              Call Police
            </Typography>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#b71c1c' }} 
              onClick={() => alert('Calling Police...')}
            >
              Dial 100
            </Button>
          </Paper>
        </Grid>

        {/* Ambulance */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={5} 
            sx={{ 
              padding: theme.spacing(3), 
              backgroundColor: '#81c784', // Light green for ambulance
              color: '#fff',
              textAlign: 'center',
              borderRadius: 3,
              '&:hover': {
                backgroundColor: '#66bb6a', // Darker green on hover
              },
            }}
          >
            <LocalHospital fontSize="large" sx={{ mb: 1 }} />
            <Typography variant="h5" gutterBottom>
              Call Ambulance
            </Typography>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#388e3c' }} 
              onClick={() => alert('Calling Ambulance...')}
            >
              Dial 108
            </Button>
          </Paper>
        </Grid>

        {/* Fire Department */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            elevation={5} 
            sx={{ 
              padding: theme.spacing(3), 
              backgroundColor: '#ffb74d', // Light orange for fire department
              color: '#fff',
              textAlign: 'center',
              borderRadius: 3,
              '&:hover': {
                backgroundColor: '#ffa726', // Darker orange on hover
              },
            }}
          >
            <FireExtinguisher fontSize="large" sx={{ mb: 1 }} />
            <Typography variant="h5" gutterBottom>
              Call Fire Department
            </Typography>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#f57c00' }} 
              onClick={() => alert('Calling Fire Department...')}
            >
              Dial 101
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Location and Info Section */}
      <Box
        sx={{
          mt: 5,
          textAlign: 'center',
          padding: theme.spacing(3),
          backgroundColor: '#ffffff',
          borderRadius: 3,
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
          maxWidth: '500px',
        }}
      >
        <LocationOn fontSize="large" sx={{ color: '#ff7043', mb: 1 }} />
        <Typography variant="h5" sx={{ color: '#455a64' }}>
          Your Current Location: 
        </Typography>
        <Typography variant="body1" sx={{ color: '#455a64' }}>
          Latitude: 28.7041° N, Longitude: 77.1025° E
        </Typography>
        <Typography variant="body2" sx={{ color: '#757575', mt: 2 }}>
          If GPS access is enabled, your location will be sent automatically to the emergency responders.
        </Typography>
      </Box>
    </Box>
  );
};

export default EmergencyServicesPage;
