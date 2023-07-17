// import {
//   View,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Platform,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";
// import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from "react-native-maps";
// import { GoogleMap, useLoadScript, LoadScript } from "@react-google-maps/api";

// import {
//   Attractions,
//   Avatar,
//   Hotels,
//   NotFound,
//   Restaurants,
//   Mapicon,
//   Favicon,
//   Icons,
// } from "../assets";

// const HeatMapScreen = () => {
//   const navigation = useNavigation();
//   const isMobile = Platform.OS !== "web";

//   const [pois, setPois] = useState([]);
//   useEffect(() => {
//     fetchPois();
//   }, []);

//   const [mapRegion, setMapRegion] = useState({
//     latitude: 40.76943354202675,
//     longitude: -73.989147061448,
//     latitudeDelta: 0.1853,
//     longitudeDelta: 0.0842,
//   });

//   const fetchPois = async () => {
//     const res = await fetch("http://127.0.0.1:8000/pois/");
//     const pois = await res.json();
//     setPois(pois);
//   };

//   const renderMarkers = () => {
//     return pois.map((poi) => (
//       <Marker
//         key={poi.id}
//         coordinate={{
//           latitude: poi.latitude,
//           longitude: poi.longitude,
//         }}
//         title={poi.name}
//         description={poi.description}
//       />
//     ));
//   };

//   // Render the map for mobile (React Native)
//   // Render the map for web
//   return (
//     <View>
//       {isMobile ? (
//         <MapView
//           provider={PROVIDER_GOOGLE}
//           className="w-full h-full object-cover rounded-2xl"
//           region={mapRegion}
//         >
//           {/* {renderMarkers()} */}
//           <Heatmap
//             region={mapRegion}
//             points={pois.map((poi) => ({
//               latitude: poi.latitude,
//               longitude: poi.longitude,
//               weight: poi.id,
//             }))}
//             radius={50}
//             gradient={{
//               colors: ["green", "orange", "yellow", "red", "white"],
//               startPoints: [0.01, 0.04, 0.1, 0.45, 0.5],
//               colorMapSize: 100,
//             }}
//           ></Heatmap>
//         </MapView>
//       ) : (
//         <LoadScript googleMapsApiKey="AIzaSyBCc1BjkGUYR-w4mQOxXfPHorN9zwWXlvI">
//           <SafeAreaView className="flex-1 bg-white relative">
//             <View className="relative bg-white shadow-lg">
//               <GoogleMap
//                 zoom={10}
//                 center={{
//                   lat: 40.76943354202675,
//                   lng: -73.989147061448,
//                 }}
//               ></GoogleMap>
//             </View>
//           </SafeAreaView>
//         </LoadScript>
//       )}
//     </View>
//   );
// };

// export default HeatMapScreen;

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker, Heatmap } from "react-native-maps";
import { GoogleMap, useLoadScript, LoadScript } from "@react-google-maps/api";

import {
  Attractions,
  Avatar,
  Hotels,
  NotFound,
  Restaurants,
  Mapicon,
  Favicon,
  Icons,
} from "../assets";

const HeatMapScreen = () => {
  const navigation = useNavigation();
  // const isMobile = Platform.OS !== "web";

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
    const res = await fetch("http://127.0.0.1:8000/api/POIs/");
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

  // Render the map for mobile (React Native)
  // Render the map for web
  return (
    <View>
      {isMobile ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 16,
          }}
          region={mapRegion}
        >
          {/* {renderMarkers()} */}
          <Heatmap
            region={mapRegion}
            points={pois.map((poi) => ({
              latitude: poi.latitude,
              longitude: poi.longitude,
              weight: poi.id,
            }))}
            radius={50}
            gradient={{
              colors: ["green", "orange", "yellow", "red", "white"],
              startPoints: [0.01, 0.04, 0.1, 0.45, 0.5],
              colorMapSize: 100,
            }}
          ></Heatmap>
        </MapView>
      ) : (
        <LoadScript googleMapsApiKey="AIzaSyBCc1BjkGUYR-w4mQOxXfPHorN9zwWXlvI">
          <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View
              style={{
                position: "relative",
                backgroundColor: "white",
                // shadowColor: "black",
                // shadowOffset: { width: 0, height: 2 },
                // shadowOpacity: 0.25,
                // shadowRadius: 4,
                // elevation: 5,
              }}
            >
              <GoogleMap
                zoom={10}
                center={{
                  lat: 40.76943354202675,
                  lng: -73.989147061448,
                }}
              ></GoogleMap>
            </View>
          </SafeAreaView>
        </LoadScript>
      )}
    </View>
  );
};

export default HeatMapScreen;
