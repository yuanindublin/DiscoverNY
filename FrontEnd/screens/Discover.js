import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import {
  Attractions,
  Avatar,
  Hotels,
  NotFound,
  Restaurants,
  Mapicon,
} from "../assets";
import MenuContainer from "../components/MenuContainer";

import { FontAwesome } from "@expo/vector-icons";
import ItemCarDontainer from "../components/ItemCarDontainer";
import { getPlacesData } from "../api";

const Discover = () => {
  const navigation = useNavigation();

  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      setMainData(data);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", relative: true }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 8,
        }}
      >
        {/* <TouchableOpacity onPress={() => navigation.openDrawer()}> */}
        <TouchableOpacity onPress={() => navigation.navigate("POIScreen")}>
        {/* <TouchableOpacity> */}
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: "white",
              // borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              // shadowColor: "#000",
              // shadowOffset: { width: 0, height: 2 },
              // shadowOpacity: 0.8,
              // shadowRadius: 2,
              // elevation: 5,
            }}
          >
            <Image
              source={require("../assets/icons/menu.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 40, color: "#0B646B", fontWeight: "bold" }}>
            Discover
          </Text>
          <Text style={{ color: "#527283", fontSize: 36 }}>Manhattan</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              // shadowColor: "#000",
              // shadowOffset: { width: 0, height: 2 },
              // shadowOpacity: 0.8,
              // shadowRadius: 2,
              // elevation: 5,
            }}
          >
            <Image
              source={require("../assets/mapicon.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Text style={{ color: "#0B646B", fontSize: 20, fontWeight: "bold" }}>
            Map
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          margin: 4,
          borderRadius: 20,
          paddingVertical: 1,
          paddingHorizontal: 4,
          // shadowColor: "#000",
          // shadowOffset: { width: 0, height: 2 },
          // shadowOpacity: 0.2,
          // shadowRadius: 2,
          // elevation: 5,
        }}
      >
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search a place"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log(details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest?.lat);
            setBl_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            key: "AIzaSyBCc1BjkGUYR-w4mQOxXfPHorN9zwWXlvI",
            language: "en",
          }}
        />
      </View>

      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 8,
              marginTop: 8,
            }}
          >
            <MenuContainer
              key={"hotels"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 4,
                marginTop: 8,
              }}
            >
              <Text
                style={{ color: "#2C7379", fontSize: 28, fontWeight: "bold" }}
              >
                Top Tips
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 4,
                }}
              >
                <Text
                  style={{ color: "#A0C4C7", fontSize: 20, fontWeight: "bold" }}
                >
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#A0C4C7"
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: 4,
                marginTop: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCarDontainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View
                    style={{
                      width: "100%",
                      height: 400,
                      alignItems: "center",
                      justifyContent: "space-y-8",
                    }}
                  >
                    <Image
                      source={NotFound}
                      style={{ width: 128, height: 128, objectFit: "cover" }}
                    />
                    <Text
                      style={{
                        fontSize: 28,
                        color: "#428288",
                        fontWeight: "bold",
                      }}
                    >
                      Opps...No Data Found
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
