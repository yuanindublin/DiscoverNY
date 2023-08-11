import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import museum from "../assets/categories/museum.jpg";
import empire from "../assets/categories/empire.jpg";
import rock from "../assets/categories/rock.png";
import tower from "../assets/categories/tower.jpeg";
import statue from "../assets/categories/statue.jpeg";

const ItineraryScreen = ({ route }) => {
  // const { selectedItems } = route?.params?.param;
  const selectedItems = route?.params?.param;
  // const { selectedItems } = route?.params?.param;

  console.log(selectedItems);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.item,
        { backgroundColor: item.selected ? "white" : "white" },
      ]}
      // onPress={() => onClickItem(item, index)}
    >
      <Image
        style={styles.image}
        source={
          item.images && item.images.length > 0
            ? { uri: item.images[0].image } // If images are available, use the first image URL
            : require("../assets/categories/empire.jpg") // If no images, use the default image
        }
        resize="contain" //Warning: Failed prop type: Invalid prop `resizeMethod` of value `contain` supplied to `Image`, expected one of ["auto","resize","scale"].
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: "bold",
            color: "black",
            marginLeft: 10,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            color: "black",
            marginLeft: 10,
          }}
        >
          Busyness Level:
          {item.predictions[0].busyindex}
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            color: "black",
            marginLeft: 10,
          }}
        >
          {item.opening_hours}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* {selectedItems.length === 0 ? (
        <Text>Loading...</Text> // or show a loading indicator here
      ) : (
        <> */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          padding: 10,
          marginTop: 20,
        }}
      >
        Busy times today:
      </Text>
      <Text style={{ fontSize: 16, padding: 10 }}>
        {dateFormatter.format(new Date())}
      </Text>

      {selectedItems && (
        <FlatList
          data={selectedItems}
          renderItem={renderItem}
          keyExtractor={(item) => `key-${item.id}`}
        />
      )}
      {/* </> */}
      {/* )} */}
    </SafeAreaView>
  );
};

export default ItineraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 8,
  },
  wrapButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 16,
    backgroundColor: "orange",
  },
  item: {
    flexDirection: "row",
    height: 100,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 10,
  },
  wrapText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
  ckItem: {
    width: 15,
    height: 15,
    marginTop: 5,
  },
});
