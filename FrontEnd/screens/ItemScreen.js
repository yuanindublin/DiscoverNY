import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
// Add Cart
import { useDispatch, useSelector } from "react-redux";
import store from "../components/CartStore";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../components/CartReducer";
import Modal from "react-native-modal";

const ItemScreen = ({ route }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const data = route?.params?.param;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [mapRegion, setMapRegion] = useState({
    latitude: data?.latitude,
    longitude: data?.longitude,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.021,
  });
  console.log(mapRegion);

  //Add Cart
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const [item, setItem] = useState({
    name: data?.name,

    // imageSrc={
    //   data?.photo?.images?.medium?.url
    //     ? data?.photo?.images?.medium?.url
    //     : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg"
    // }
    // title={data?.name}
  });
  console.log(item);

  return (
    // <Provider store={store}>
    <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="relative bg-white shadow-lg">
          <Image
            source={{
              uri: data?.photo?.images?.large?.url
                ? data?.photo?.images?.large?.url
                : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg",
            }}
            className="w-full h-72 object-cover rounded-2xl"
          />

          <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
            <View className="flex-row space-x-2 items-center">
              <Text className="text-[12px] font-bold text-gray-100">
                {data?.price_level}
              </Text>
              <Text className="text-[32px] font-bold text-gray-100">
                {data?.price}
              </Text>
            </View>

            <View className="px-2 py-1 rounded-md bg-teal-100">
              <Text>{data?.open_now_text}</Text>
            </View>
          </View>
          {/* <MapView
            className="w-full h-72 object-cover rounded-2xl"
            region={mapRegion}
          >
            <Marker coordinate={mapRegion} title="Marker" />
          </MapView> */}
          <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
            <TouchableOpacity
              onPress={() => navigation.navigate("Discover")}
              className="w-10 h-10 rounded-md items-center justify-center bg-white"
            >
              <FontAwesome5 name="chevron-left" size={24} color="#06B2BE" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleModal}
              className="w-10 h-10 rounded-md items-center justify-center bg-[#06B2BE]"
            >
              <FontAwesome5 name="heartbeat" size={24} color="#fff" />
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    // flex: 1,
                    width: 300,
                    height: 250,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#B2E3E5",
                  }}
                >
                  <Text
                    style={{
                      color: "#428288",
                      fontWeight: "bold",
                      fontSize: 24,
                    }}
                  >
                    Welcome to Travel in Manhattan!
                  </Text>
                  <Text
                    style={{
                      color: "#777",
                      textAlign: "center",
                      marginTop: 10,
                      fontSize: 16,
                    }}
                  >
                    To access the bucket list, please sign in on our website.
                    {"\n"}
                    <Text
                      style={{
                        color: "#428288",
                        textDecorationLine: "underline",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                      onPress={() =>
                        Linking.openURL("http://csi6220-4-vm1.ucd.ie/")
                      }
                    >
                      http://csi6220-4-vm1.ucd.ie/
                    </Text>
                    {"\n"}
                    <Text
                      style={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: "#428288",
                        marginTop: 10,
                      }}
                    >
                      {"\n"}
                      We can't wait for you to explore Manhattan's hidden gems!
                    </Text>
                  </Text>

                  <Button
                    title="Close"
                    onPress={toggleModal}
                    color="#428288"
                    style={{ marginTop: 20 }}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-[#428288] text-[24px] font-bold">
            {data?.name}
          </Text>
          <View className="flex-row items-center space-x-2 mt-2">
            <FontAwesome name="map-marker" size={25} color="#8C9EA6" />
            <Text className="text-[#8C9EA6] text-[20px] font-bold">
              {data?.location_string}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-between">
          {data?.rating && (
            <View className=" flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <FontAwesome name="star" size={24} color="#D58574" />
              </View>
              <View>
                <Text className="text-[#515151]">{data?.rating}</Text>
                <Text className="text-[#515151]">Ratings</Text>
              </View>
            </View>
          )}

          {data?.price_level && (
            <View className=" flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <MaterialIcons name="attach-money" size={24} color="black" />
              </View>
              <View>
                <Text className="text-[#515151]">{data?.price_level}</Text>
                <Text className="text-[#515151]">Price Level</Text>
              </View>
            </View>
          )}

          {data?.bearing && (
            <View className=" flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <FontAwesome5 name="map-signs" size={24} color="black" />
              </View>
              <View>
                <Text className="text-[#515151] capitalize">
                  {data?.bearing}
                </Text>
                <Text className="text-[#515151]">Bearing</Text>
              </View>
            </View>
          )}
        </View>

        {data?.description && (
          <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#97A6AF]">
            {data?.description}
          </Text>
        )}

        {data?.cuisine && (
          <View className="flex-row gap-2 items-center justify-start flex-wrap mt-4">
            {data?.cuisine.map((n) => (
              <TouchableOpacity
                key={n.key}
                className="px-2 py-1 rounded-md bg-emerald-100"
              >
                <Text>{n.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text className="text-[#428288] text-[24px] font-bold  mt-4">
          Location
        </Text>
        <View className="space-y-2 mt-4 bg-gray-100 rounded-2xl px-1 py-1">
          <MapView className="w-full h-32" region={mapRegion}>
            <Marker coordinate={mapRegion} title="Marker" />
          </MapView>
        </View>

        <View className=" space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2">
          {data?.phone && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="phone" size={24} color="#428288" />
              <Text className="text-lg">{data?.phone}</Text>
            </View>
          )}
          {data?.email && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="envelope" size={24} color="#428288" />
              <Text className="text-lg">{data?.email}</Text>
            </View>
          )}
          {data?.address && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="map-pin" size={24} color="#428288" />
              <Text className="text-lg">{data?.address}</Text>
            </View>
          )}
          <TouchableOpacity onPress={() => addItemToCart(item)}>
            <View className="mt-4 px-4 py-4 rounded-lg bg-[#06B2BE] items-center justify-center mb-12">
              <Text className="text-3xl font-semibold uppercase tracking-wider text-gray-100">
                Add Now
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    // </Provider>
  );
};

export default ItemScreen;
