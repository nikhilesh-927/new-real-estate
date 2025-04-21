import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import MarkerItem from './MarkerItem';
import 'leaflet/dist/leaflet.css';

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: 10,
};

const FitBounds = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(
      markers
        .map(item => {
          let coords;
          // Check if coordinates need parsing
          if (typeof item.coordinates === 'string') {
            coords = JSON.parse(item.coordinates);
          } else {
            coords = item.coordinates; // Already an object
          }

          return [parseFloat(coords.latitude), parseFloat(coords.longitude)];
        })
        .filter(Boolean)
    );

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);

  return null;
};

function GoogleMapSection({ coordinates, listing = [] }) {
  const [center, setCenter] = useState({
    latitude: 40.73061, // Default center (New York)
    longitude: -73.935242,
  });

  useEffect(() => {
    if (coordinates?.latitude && coordinates?.longitude) {
      setCenter({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });
    }
  }, [coordinates]);

  return (
    <div>
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={10}
        scrollWheelZoom
        style={containerStyle}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds markers={listing} />

        {listing.map((item, index) => {
          try {
            let coords;
            if (typeof item.coordinates === 'string') {
              coords = JSON.parse(item.coordinates);
            } else {
              coords = item.coordinates; // Already an object
            }

            const latitude = parseFloat(coords.latitude);
            const longitude = parseFloat(coords.longitude);

            if (latitude && longitude) {
              return <MarkerItem key={index} item={{ ...item, latitude: latitude, longitude: longitude }} />;
            }
          } catch (err) {
            console.error("Error parsing coordinates", err);
            return null;
          }
        })}
      </MapContainer>
    </div>
  );
}

export default GoogleMapSection;
