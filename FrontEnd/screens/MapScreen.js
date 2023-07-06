import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  const [pois, setPois] = useState([]);
  useEffect(() => {
    fetchPois();
  }, []);

  const [mapRegion, setMapRegion] = useState({
    latitude: 40.76943354202675,
    longitude: -73.989147061448,
    latitudeDelta: 0.1853,
    longitudeDelta: 0.0842,
  });

  const fetchPois = async () => {
    const res = await fetch("http://127.0.0.1:8000/pois/");
    const pois = await res.json();
    setPois(pois);
  };

  const renderMarkers = () => {
    return pois.map((poi) => (
      <Marker
        key={poi.id}
        coordinate={{
          latitude: poi.latitude,
          longitude: poi.longitude,
        }}
        title={poi.name}
        description={poi.description}
      />
    ));
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="relative bg-white shadow-lg">
        <MapView
          className="w-full h-full object-cover rounded-2xl"
          region={mapRegion}
        >
          {renderMarkers()}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
