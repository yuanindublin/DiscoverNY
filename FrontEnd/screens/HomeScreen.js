import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
// import "../output.css";

const HomeScreen = () => {
  const isWeb = Platform.OS === "web";

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      {/** First Section */}
      <View className="flex-row px-6 mt-4 items-center space-x-2">
        <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
          <Text className="text-[#00BCC9] text-3xl font-semibold">Go</Text>
        </View>
        <Text className="text-[#2A2B4B] text-3xl font-semibold">
          Travel Manhattan
        </Text>
      </View>

      {/* * Second Section
      <View className="px-16 mt-8 space-y-3">
        <Text className="text-[#2A2B4B] text-3xl font-semibold">Manhattan</Text>
      </View> */}

      {/** Image Container */}
      <View className="flex-1 relative items-center justify-center">
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={{
            url: "https://cdn.pixabay.com/photo/2017/01/31/00/46/america-2022701_1280.png",
          }}
          className="w-full h-full object-cover mt-30"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Discover")}
          className="absolute bottom-100 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center"
        >
          <Animatable.View
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"}
            className="w-20 h-20 items-center justify-center rounded-full bg-[#00BCC9]"
          >
            <Text className="text-gray-50 text-[36px] font-semibold">Go</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  webContainer: {
    backgroundColor: "white",
  },
  rowContainer: {
    flexDirection: "row",
    paddingHorizontal: 6,
    marginTop: 8,
    alignItems: "left",
    justifyContent: "left",
  },
  text: {
    color: "red",
  },
});

export default HomeScreen;
