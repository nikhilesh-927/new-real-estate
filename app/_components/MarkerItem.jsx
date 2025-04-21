import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function MarkerItem({ item }) {
  const { latitude, longitude } = item;

  // Create a custom icon using the pin.png image
  const customIcon = new L.Icon({
    iconUrl: '/pin.png', // Path to your custom pin image
    iconSize: [32, 32], // Set the size of the icon (optional, adjust as needed)
    iconAnchor: [16, 32], // The point of the icon which will correspond to the marker's position
    popupAnchor: [0, -32], // Position of the popup relative to the icon
  });

  return (
    <Marker position={[latitude, longitude]} icon={customIcon}>
      <Popup>
        <div>
          <h3>{item.address}</h3>
          <p>{item.description}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default MarkerItem;
