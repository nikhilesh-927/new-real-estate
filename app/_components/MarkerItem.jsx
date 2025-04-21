import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

function MarkerItem({ item }) {
  return (
    <Marker
      position={[item.latitude, item.longitude]}
      icon={defaultIcon}
    >
      <Popup>
        <div>
          <strong>Listing</strong><br />
          Lat: {item.latitude}, Lng: {item.longitude}
        </div>
      </Popup>
    </Marker>
  );
}

export default MarkerItem;
