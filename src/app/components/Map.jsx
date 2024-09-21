import React, { useEffect, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { defaults as defaultControls } from 'ol/control';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const OpenLayersMap = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [map, setMap] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);

  useEffect(() => {
    const locationCoordinates = fromLonLat([78.777, 30.153]); // Pauri Garhwal coordinates

    // Create the map
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
      controls: defaultControls({
        attributionOptions: { collapsible: false },
      }),
    });

    setMap(initialMap);

    // Create Marker for current location
    const marker = new Feature({
      geometry: new Point(locationCoordinates),
    });

    // Red marker style for current location
    const currentMarkerStyle = new Style({
      image: new Icon({
        src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="480px" height="480px">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
          </svg>
        `)}`,
        scale: 0.08,
      }),
    });

    marker.setStyle(currentMarkerStyle);
    setCurrentMarker(marker);

    // Add the marker to a vector layer
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
    });

    initialMap.addLayer(vectorLayer);

    return () => {
      initialMap.setTarget(null); // Cleanup map instance on component unmount
    };
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchTerm)}&format=json&limit=1`);
      const data = await response.json();

      if (data.length > 0) {
        const [lon, lat] = [data[0].lon, data[0].lat];
        const newCoordinates = fromLonLat([parseFloat(lon), parseFloat(lat)]);
        map.getView().animate({ center: newCoordinates, zoom: 12 });

        // Remove previous search marker if it exists
        if (searchMarker) {
          map.removeLayer(searchMarker.getLayer());
        }

        // Create a new marker for the searched location
        const newSearchMarker = new Feature({
          geometry: new Point(newCoordinates),
        });

        // Blue marker style for searched location
        const searchMarkerStyle = new Style({
          image: new Icon({
            src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" width="480px" height="480px">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
              </svg>
            `)}`,
            scale: 0.08,
          }),
        });

        newSearchMarker.setStyle(searchMarkerStyle);
        setSearchMarker(newSearchMarker);

        const searchVectorSource = new VectorSource({
          features: [newSearchMarker],
        });

        const searchVectorLayer = new VectorLayer({ source: searchVectorSource });
        map.addLayer(searchVectorLayer);
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label="Search Location"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', width: '300px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginLeft: '10px' }}
      >
        Search
      </Button>
      <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
    </div>
  );
};

export default OpenLayersMap;
