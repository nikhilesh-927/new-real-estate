'use client'; // Needed if using Next.js App Router

import React, { useCallback, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import MarkerItem from './MarkerItem'; // Your custom MarkerItem component
import 'leaflet/dist/leaflet.css'; // Make sure this is included!

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: 10,
};

// Component to fit bounds dynamically
const FitBounds = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 0) return;

    const bounds = L.latLngBounds(
      markers.map(item => [item.latitude, item.longitude])
    );

    map.invalidateSize(); // Important fix for layout issues
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [markers, map]);

  return null;
};

function GoogleMapSection({ coordinates, listing = [] }) {
  const [center, setCenter] = useState({
    lat: 40.73061,
    lng: -73.935242, // Default to NYC
  });

  const [map, setMap] = useState(null);

  // Update center when coordinates prop changes
  useEffect(() => {
    if (coordinates?.latitude && coordinates?.longitude) {
      setCenter({
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      });
    }
  }, [coordinates]);

  // Filter out invalid listings
  const validListings = listing.filter(
    item => item.latitude != null && item.longitude != null
  );

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={10}
        style={containerStyle}
        whenCreated={onLoad}
        whenReady={() => {
          if (map && validListings.length > 0) {
            const bounds = L.latLngBounds(
              validListings.map(item => [item.latitude, item.longitude])
            );
            map.fitBounds(bounds, { padding: [50, 50] });
          }
        }}
        scrollWheelZoom
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Auto fit bounds */}
        <FitBounds markers={validListings} />

        {/* Render custom marker components */}
        {validListings.map((item, index) => (
          <MarkerItem key={index} item={item} />
        ))}
      </MapContainer>
    </div>
  );
}

export default GoogleMapSection;
