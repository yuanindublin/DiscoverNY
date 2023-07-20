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

// const MapScreen = () => {
//   const navigation = useNavigation();
//   const isMobile = Platform.OS !== "web";

//   const [pois, setPois] = useState([]);
//   useEffect(() => {
//     fetchPois();
//   }, []);

//   // const { isLoaded } = useLoadScript({
//   //   googleMapsApiKey: "AIzaSyBCc1BjkGUYR-w4mQOxXfPHorN9zwWXlvI",
//   //   // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   // });

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
//           <TouchableOpacity
//             className="items-right justify-rightspace-y-2"
//             onPress={() => navigation.navigate("HeatmapScreen")}
//           >
//             <View className="w-12 h-12 bg-[rgb(0,0,0)]  rounded-md items-center justify-center shadow-lg">
//               <Image
//                 source={require("../assets/mapicon.png")}
//                 className="w-full h-full rounded-md object-cover"
//               />
//             </View>
//             <Text className="text-[rgb(23,44,46)] text-l font-semibold">
//               HeatMap
//             </Text>
//           </TouchableOpacity>
//           {renderMarkers()}
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

// export default MapScreen;

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

const MapScreen = () => {
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
          <TouchableOpacity
            onPress={() => navigation.navigate("HeatMapScreen")}
            style={{
              alignItems: "flex-right",
              justifyContent: "flex-end",
              marginTop: 8,
              marginRight: 8,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: "rgba(0, 0, 0, 0)",
                // borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                // shadowColor: "black",
                // shadowOffset: { width: 0, height: 2 },
                // shadowOpacity: 0.25,
                // shadowRadius: 4,
                // elevation: 5,
                marginTop: 4,
              }}
            >
              <Image
                source={require("../assets/mapicon.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            </View>
            <Text
              style={{
                color: "rgb(23, 44, 46)",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 4,
              }}
            >
              HeatMap
            </Text>
          </TouchableOpacity>
          {renderMarkers()}
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
                elevation: 5,
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

export default MapScreen;
