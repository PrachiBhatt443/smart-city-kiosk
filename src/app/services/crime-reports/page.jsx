'use client';
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Grid, Snackbar, IconButton, Select, InputLabel, FormControl, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Available languages for foreign visitors
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

const crimeTypes = ['Theft', 'Assault', 'Vandalism', 'Robbery', 'Other'];

const CrimeReports = () => {
  const [report, setReport] = useState({
    description: '',
    crimeType: '',
    location: null,
    language: 'English',
  });
  const [submitted, setSubmitted] = useState(false);
  const [mapLocation, setMapLocation] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to New York City (or use user's location)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const handleMapClick = (e) => {
    const { latLng } = e;
    setMapLocation({ lat: latLng.lat(), lng: latLng.lng() });
    setReport((prevReport) => ({
      ...prevReport,
      location: { lat: latLng.lat(), lng: latLng.lng() },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Crime Report Submitted:', report);
    setSubmitted(true);
    setReport({
      description: '',
      crimeType: '',
      location: null,
      language: 'English',
    });
  };

  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Crime Report Submission
      </Typography>

      {/* Language Selector for Foreign Visitors */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Preferred Language</InputLabel>
        <Select
          name="language"
          value={report.language}
          onChange={handleInputChange}
        >
          {languages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Crime Report Form */}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Crime Description"
          name="description"
          variant="outlined"
          multiline
          rows={4}
          value={report.description}
          onChange={handleInputChange}
          required
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Crime Type</InputLabel>
          <Select
            name="crimeType"
            value={report.crimeType}
            onChange={handleInputChange}
            required
          >
            {crimeTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Google Maps for Selecting Location */}
        <Box sx={{ height: '400px', mb: 2 }}>
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={mapLocation}
              zoom={12}
              onClick={handleMapClick}
            >
              {report.location && <Marker position={report.location} />}
            </GoogleMap>
          </LoadScript>
        </Box>

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit Crime Report
        </Button>
      </form>

      {/* Snackbar for feedback after submission */}
      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Crime report submitted successfully!"
        action={
          <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default CrimeReports;
