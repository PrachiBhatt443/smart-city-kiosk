'use client';
import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DeleteIcon from '@mui/icons-material/Delete';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportIcon from '@mui/icons-material/Report';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NewsRibbon from './components/NewsRibbon'; 

// Dynamic import for the OpenLayers map
const OpenLayersMap = dynamic(() => import('./components/Map'), { ssr: false });

const services = [
  {
    title: 'Public Transport',
    description: 'Real-time information on public transportation.',
    icon: <DirectionsBusIcon sx={{ fontSize: 60, color: '#1976d2' }} />, // Blue
    link: '/services/public-transport' // Updated path for the public transport page
  },
  {
    title: 'Waste Management',
    description: 'Monitor waste collection schedules.',
    icon: <DeleteIcon sx={{ fontSize: 60, color: 'grey' }} />, // Grey
    link: '/services/waste-management' // Updated path for the waste management page
  },
  {
    title: 'Local Announcements',
    description: 'Get the latest updates from the city administration.',
    icon: <CampaignIcon sx={{ fontSize: 60, color: '#ff9800' }} />, // Orange
    link: '/services/announcement' // Updated path for the announcements page
  },
  {
    title: 'Crime Reports',
    description: 'View crime reports in your area.',
    icon: <ReportIcon sx={{ fontSize: 60, color: '#4caf50' }} />, // Green
    link: '/services/crime-reports' // Updated path for the crime reports page
  },
  {
    title: 'Emergency Services',
    description: 'Access emergency services in your city.',
    icon: <LocalHospitalIcon sx={{ fontSize: 60, color: 'red' }} />, // Red
    link: '/services/emergency-services' // Updated path for the emergency services page
  },
  {
    title: 'Complaints',
    description: 'Submit your complaints regarding city services.',
    icon: <FeedbackIcon sx={{ fontSize: 60, color: '#9c27b0' }} />, // Purple
    link: '/services/complaints' // Updated path for the complaints page
  }
];

export default function HomePage() {
  const router = useRouter();

  const handleMapClick = () => {
    router.push('/map-details');
  };

  return (
    <Container sx={{overflow: 'hidden'}}>
      <NewsRibbon />
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to the Smart City Kiosk
      </Typography>
      <Typography variant="h6" align="center" gutterBottom sx={{ mt: 5 }}>
        Interactive Map
      </Typography>

      {/* OpenLayers map with search functionality */}
      <OpenLayersMap />

      <Button
        onClick={handleMapClick}
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
      >
        View Detailed Map
      </Button>

      <Typography variant="h6" align="center" gutterBottom>
        Explore Our Services
      </Typography>

      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box 
              sx={{
                transition: '0.3s',
                borderRadius: '16px', 
                overflow: 'hidden', 
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', 
                  transform: 'translateY(-5px)', 
                }
              }}
            >
              <Card >
                <CardContent>
                  {service.icon}
                  <Typography gutterBottom variant="h5" component="div">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                  <Button 
                    onClick={() => router.push(service.link)} 
                    variant="contained" 
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
