'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Snackbar, IconButton, Select, InputLabel, FormControl, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Icon, Style } from 'ol/style';

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
  const [map, setMap] = useState(null);
  const [mapLocation, setMapLocation] = useState({ lat: 30.3165, lng: 78.0322 });

  useEffect(() => {
    const locationCoordinates = fromLonLat([mapLocation.lng, mapLocation.lat]);

    const initialMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: locationCoordinates,
        zoom: 12,
      }),
    });

    const marker = new Feature({
      geometry: new Point(locationCoordinates),
    });

    const markerStyle = new Style({
      image: new Icon({
        src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
          </svg>
        `)}`,
        scale: 0.1,
      }),
    });

    marker.setStyle(markerStyle);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
    });

    initialMap.addLayer(vectorLayer);

    // Attach click event handler
    initialMap.on('click', (event) => {
      const coordinates = event.coordinate;
      const lonLat = initialMap.getView().getProjection().getCode() === 'EPSG:3857' ? fromLonLat(coordinates) : coordinates;

      setMapLocation({ lat: lonLat[1], lng: lonLat[0] });
      setReport((prevReport) => ({
        ...prevReport,
        location: { lat: lonLat[1], lng: lonLat[0] },
      }));
    });

    setMap(initialMap);

    // Clean up map on unmount
    return () => {
      if (initialMap) {
        initialMap.setTarget(null);
      }
    };
  }, []); // Empty dependency array to ensure the map is only initialized once

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };
  console.log(report);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/crimeReports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });

    if (response.ok) {
      setSubmitted(true);
      setReport({
        description: '',
        crimeType: '',
        location: null,
        language: 'English',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Crime Report Submission
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Preferred Language</InputLabel>
        <Select name="language" value={report.language} onChange={handleInputChange}>
          {languages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
          <Select name="crimeType" value={report.crimeType} onChange={handleInputChange} required>
            {crimeTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* OpenLayers Map for Location Selection */}
        <Box sx={{ height: '400px', mb: 2 }}>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </Box>

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit Crime Report
        </Button>
      </form>

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
