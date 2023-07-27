import React from "react";
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
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const ListItem = React.memo(({ item, viewableItems }) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === item.id)
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  const [pois, setPois] = useState([]);
  useEffect(() => {
    getPois();
    return () => {};
  }, []);
  const getPois = () => {
    const apiDB = `http://127.0.0.1:8000/api/POIs/`;
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
  const onClickItem = (item) => {
    const newArrPois = pois.map((newItem) => {
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

  return (
    // <Animated.View
    //   style={[
    //     {
    //       height: 80,
    //       width: "90%",
    //       backgroundColor: "#78CAD2",
    //       alignSelf: "center",
    //       borderRadius: 15,
    //       marginTop: 20,
    //     },
    //     rStyle,
    //   ]}
    // />
    <TouchableOpacity
      style={[
        styles.item,
        { backgroundColor: item.selected ? "lightgray" : "#78CAD2" },
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
});

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 10,
  },
});

export default ListItem;
