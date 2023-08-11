import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Heatmap,
  Callout,
} from "react-native-maps";
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

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

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
      // <Marker
      //   key={poi.id}
      //   coordinate={{
      //     latitude: poi.coordinate.latitude,
      //     longitude: poi.coordinate.longitude,
      //   }}
      //   title={poi.name}
      //   description={poi.description}
      // />
      <Marker
        key={poi.id}
        coordinate={{
          latitude: poi.coordinate.latitude,
          longitude: poi.coordinate.longitude,
        }}
        title={poi.name}
        description={poi.description}
      >
        <Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text
                style={{
                  color: "#428288",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {poi.name}
              </Text>
              <Text
                style={{
                  color: "#C41E3D",
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {poi.predictions[0].busyindex}
              </Text>
              <Text>Open:{poi.opening_hours}</Text>
              <Image
                style={styles.image}
                source={
                  poi.images && poi.images.length > 0
                    ? { uri: poi.images[0].image } // If images are available, use the first image URL
                    : require("../assets/categories/empire.jpg") // If no images, use the default image
                }
              />
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </View>
        </Callout>
      </Marker>
    ));
  };

  // Render the map for mobile (React Native)
  // Render the map for web
  return (
    <View>
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
        <Heatmap
          // region={mapRegion}
          points={pois.map((poi) => ({
            latitude: poi.coordinate.latitude,
            longitude: poi.coordinate.longitude,
            weight: poi.id,
            // weight: poi.predictions[0].busylevel,
          }))}
          gradient={{
            colors: ["green", "orange", "red"],
            startPoints: [0.2, 0.6, 1.0], // Adjust the start points based on your data
            colorMapSize: 256,

            // colors: ["green", "orange", "yellow", "red", "white"],
            // startPoints: [0.01, 0.04, 0.1, 0.2, 0.5],
            colorMapSize: 100,
          }}
          // radius={50}
          // gradient={{
          //   colors: ["green", "orange", "red"], // Adjust the colors
          //   startPoints: [0.1, 0.4, 0.8], // Adjust the start points
          //   colorMapSize: 100,
          // }}
        ></Heatmap>
        {renderMarkers()}

        {/* {pois.map((poi) => {
          return (
            <Marker
              key={poi.id}
              coordinate={{
                latitude: poi.coordinate.latitude,
                longitude: poi.coordinate.longitude,
              }}
              title={poi.name}
              description={poi.description}
            >
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text
                      style={{
                        color: "#428288",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {poi.name}
                    </Text>
                    <Text
                      style={{
                        color: "#428288",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {poi.predictions[0].busyindex}
                      {"\n"}
                    </Text>
                    <Text>{poi.opening_hours}</Text>
                    <Image
                      style={styles.image}
                      source={
                        poi.images && poi.images.length > 0
                          ? { uri: poi.images[0].image } // If images are available, use the first image URL
                          : require("../assets/categories/empire.jpg") // If no images, use the default image
                      }
                    />
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          );
        })} */}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  // map: {
  //   height: '100%'
  // },
  // Callout bubble
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBox: {
    position: "absolute",
    marginTop: 40,
    // marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: 90,
    // top:Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
