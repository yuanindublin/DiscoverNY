import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ViewToken,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "../components/ListItem";
import { useSharedValue } from "react-native-reanimated";

const POIScreen = () => {
  const [isContinueButtonVisible, setIsContinueButtonVisible] = useState(false);
  const [navigateToNextView, setNavigateToNextView] = useState(false);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  //checkbox
  const [isSelected, setSelection] = useState(false);
  const [pois, setPois] = useState([]);
  useEffect(() => {
    getPois();
    return () => {};
  }, []);
  const getPois = () => {
    const apiDB = `http://127.0.0.1:8000/api/POIs/`;
    // const apiDB = `http://18.233.101.78:8000/api/POIs/`;
    fetch(apiDB)
      .then((res) => res.json())
      .then((resJson) => {
        setPois(resJson);
        // setIsLoading(false); // Set isLoading to false after fetching data
      })
      .catch((error) => {
        console.log("Error:", error);
        // setIsLoading(false); // Set isLoading to false after fetching data
      });
  };
  const onChangeValue = (itemSelected, index) => {
    const newArrPois = pois.map((newItem, index) => ({
      ...newItem,
      selected: newItem.id === itemSelected.id,
    }));
    setPois(newArrPois);
    console.log("selected:");
  };

  const onClickItem = (item, index) => {
    const newArrPois = pois.map((newItem, newindex) => {
      if (newItem.id === item.id) {
        return {
          ...newItem,
          selected: !newItem.selected, // Toggle the selected state
        };
      }
      return newItem;
    });
    setPois(newArrPois);
    console.log("selected:");
    setIsContinueButtonVisible(newArrPois.length > 0);
  };

  const [viewableItems, setViewableItems] = useState([]);
  const onViewableItemsChanged = useRef(({ viewableItems: vItems }) => {
    setViewableItems(vItems);
  });
  // const viewableItemsRef = useRef([]);
  // const viewableItems = useSharedValue([]);
  // const onViewableItemsChanged = ({ viewableItems }) => {
  //   console.log(viewableItems);
  // };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.item,
        { backgroundColor: item.selected ? "lightgray" : "white" },
        // { backgroundColor: item.selected ? "lightgray" : "#78CAD2" },
      ]}
      onPress={() => onClickItem(item, index)}
    >
      <Image
        style={styles.image}
        source={require("../assets/categories/empire.jpg")}
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
          Open Time:
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
  // const renderItem = ({ item }) => <Item name={item.name} />;
  const getImageSource = (item) => {
    // Assuming 'images' is an array of image URLs or image data in the 'item' object
    if (item.images && item.images.length > 0) {
      // Return the first image URL or image data
      return { uri: item.images[0] };
    }
    // Return a default image source in case 'images' is empty
    return require("../assets/categories/empire.jpg"); // Replace 'default.jpg' with your default image file path
  };

  const onShowItemSelected = () => {
    const selectedItems = pois.filter((item) => item.selected == true);
    if (selectedItems.length > 0) {
      navigation.navigate("ItineraryScreen", { param: selectedItems }); // Replace "NextScreen" with the name of your next screen
    } else {
      Alert.alert("Please select at least one item.");
    }
    setPois(selectedItems);
    console.log("selected:", selectedItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      {pois.length === 0 ? (
        // <Text>Loading...</Text> // or show a loading indicator here
        // ) : (
        // {isLoading ? ( // Show loading indicator while fetching data
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              padding: 10,
              marginTop: 20,
            }}
          >
            Select Things You Want to See on Your Trip
          </Text>

          {pois && (
            <FlatList
              data={pois}
              // onViewableItemsChanged={onViewableItemsChanged} // Moved outside of FlatList

              onViewableItemsChanged={onViewableItemsChanged.current}
              renderItem={renderItem}
              // renderItem={({ item }) => {
              //   return <ListItem item={item} viewableItems={viewableItems} />;
              // }}
              keyExtractor={(item) => `key-${item.id}`}
              maxToRenderPerBatch={7} //render only 7 items per scroll.
            />
          )}
          {isContinueButtonVisible && (
            <View style={styles.wrapButton}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#78CAD2",
                  borderRadius: 8,
                  padding: 10,
                  margin: 10,
                }}
                onPress={onShowItemSelected}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Itinerary
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default POIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 8,
  },
  wrapButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    height: 100,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 10,
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
