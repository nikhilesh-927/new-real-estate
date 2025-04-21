"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";
import Select from "react-select";

const LOCATIONIQ_API_KEY = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;

function LocationIQAddressSearch({ selectedAddress, setCoordinates}) {
  const [options, setOptions] = useState([]);

  const handleInputChange = async (inputValue) => {
    if (inputValue.length < 3) return;

    try {
      const res = await fetch(
        `https://api.locationiq.com/v1/autocomplete?key=${LOCATIONIQ_API_KEY}&q=${inputValue}&limit=5&normalizeaddress=1`
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        const formatted = data.map((place) => ({
          label: place.display_name,
          value: place,
        }));
        setOptions(formatted);
      }
    } catch (err) {
      console.error("Autocomplete error:", err);
    }
  };

  const handleChange = async (selectedOption) => {
    if (!selectedOption) return;

   selectedAddress(selectedOption);

    try {
      const res = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${selectedOption.label}&format=json`
      );
      const data = await res.json();

      if (data && data[0]) {
        const { lat, lon } = data[0];
        setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  return (
    <div className="flex items-center w-full">
      <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200" />
      <Select
        placeholder="Search Property Address"
        isClearable
        className="w-full"
        options={options}
        onInputChange={(inputValue, { action }) => {
          if (inputValue.length >= 3) {
            handleInputChange(inputValue);
          } else {
            setOptions([]); // clear options when input is empty or too short
          }
          return inputValue;
        }}
        onChange={handleChange}
        filterOption={() => true} // disables internal filtering so external results are shown
        noOptionsMessage={() => "No address found"} // 👈 displays when no match
        styles={{
          control: (base) => ({
            ...base,
            height: "40px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }),
        }}
      />
    </div>
  );
}

export default LocationIQAddressSearch;
