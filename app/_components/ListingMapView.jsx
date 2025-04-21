"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";

function ListingMapView({ type }) {
  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchedAddress] = useState(null);
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [homeType, setHomeType] = useState(null);
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    getLatestListing();
  }, []);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select(`*, listingimages(url, listing_id)`)
      .eq("active", true)
      .eq("type", type)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching listings:", error);
      toast("Server Side Error");
    } else {
      setListing(data);
    }
  };

  const handleSearchClick = async () => {
    console.log("Searched Address Object:", searchedAddress);

    const searchTerm =
      searchedAddress?.value?.structured_formatting?.main_text ||
      searchedAddress?.label ||
      "";

    console.log("Search Term:", searchTerm);

    let query = supabase
      .from("listing")
      .select(
        `*, listingimages(
          url,
          listing_id
        )`
      )
      .eq("active", true)
      .eq("type", type)
      .gte("bedroom", parseInt(bedCount || 0))
      .gte("bathroom", parseInt(bathCount || 0))
      .gte("parking", parseInt(parkingCount || 0))
      .order("id", { ascending: false });

    if (searchTerm) {
      query = query.like("address", `%${searchTerm}%`);
    }

    if (homeType) {
      query = query.eq("propertyType", homeType);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Search error:", error);
      toast("Something went wrong while fetching listings.");
    }

    if (data) {
      setListing(data);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Listing
          listing={listing}
          handleSearchClick={handleSearchClick}
          searchedAddress={(v) => setSearchedAddress(v)}
          setBathCount={setBathCount}
          setBedCount={setBedCount}
          setParkingCount={setParkingCount}
          setHomeType={setHomeType}
          setCoordinates={setCoordinates}
        />
      </div>
      <div className="sticky top-0 h-[80vh] md:w-[350px] lg:w-[450px] xl:w-[650px] px-2">
        <GoogleMapSection listing={listing} coordinates={coordinates} />
      </div>
    </div>
  );
}

export default ListingMapView;
