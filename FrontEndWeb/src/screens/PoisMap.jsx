import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

// map center
const center = {
  lat: 40.76943354202675,
  lng: -73.989147061448,
};

export default function PoisMap() {
  // pois' markers from db
  const [pois, setPois] = useState([]);
  useEffect(() => {
    fetchPois();
  }, []);

  const fetchPois = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/POIs/");
      // const pois = await res.json();
      setPois(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100vh" }}
      center={center}
      zoom={12}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {/* <Marker position={{ lat: center.lat, lng: center.lng }}></Marker> */}
      {/* {markers.map(({ id, name, position }) => ( */}
      {pois.map(({ id, name, coordinate }) => (
        <Marker
          key={id}
          position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
          //   latitude={position.lat}
          //   longitude={position.lng}
          //   offsetLeft={-20}
          //   offsetTop={-10}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
