import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function MarkerItem({ item }) {
  const { latitude, longitude } = item;

  return (
    <Marker position={[latitude, longitude]} icon={new L.Icon.Default()}>
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
