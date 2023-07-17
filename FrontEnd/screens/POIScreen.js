// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const POIScreen = () => {
//   return (
//     <View>
//       <Text>POIScreen</Text>
//     </View>
//   );
// };

// export default POIScreen;

// const styles = StyleSheet.create({});

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// photos
import museum from '../assets/categories/museum.jpg';
import empire from '../assets/categories/empire.jpg';
import rock from '../assets/categories/rock.png';
import tower from '../assets/categories/tower.jpeg';
import statue from '../assets/categories/statue.jpeg';

const photos = [museum, empire, rock, tower, statue];
const titles = [
  'Met Museum',
  'Empire state building',
  'Top of the Rock',
  'One World trade center',
  'Statue of liberty',
];
const positions = [
  'Met Museum',
  'Empire state building',
  'Top of the Rock',
  'One World trade center',
  'Statue of liberty',
];



const RowView = ({ imageName, title, isSelected, onSelect }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      <Image
        source={imageName}
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'gray',
          marginLeft: 10,
        }}
      />
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          fontWeight: 'bold',
          color: 'black',
          marginLeft: 10,
        }}
      >
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => onSelect(!isSelected)}
        style={{ paddingVertical: 5, marginRight: 25 }}
      >
        <Image
          source={
            isSelected
              ? require('../assets/icons/close.png')
              : require('../assets/icons/checkmark.jpeg')
          }
          style={{
            width: 24,
            height: 24,
            tintColor: isSelected ? 'green' : 'gray',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const POIScreen = () => {
  const [selectedButtonIndices, setSelectedButtonIndices] = useState(new Set());
  const [isContinueButtonVisible, setIsContinueButtonVisible] = useState(false);
  const [positions, setPositions] = useState([]);
  const [navigateToNextView, setNavigateToNextView] = useState(false);
  const navigation = useNavigation();

  const handleSelection = (index, isSelected) => {
    const updatedIndices = new Set(selectedButtonIndices);
    if (isSelected) {
      updatedIndices.add(index);
    } else {
      updatedIndices.delete(index);
    }
    setSelectedButtonIndices(updatedIndices);
    setIsContinueButtonVisible(updatedIndices.size > 0);
  };

  const handleContinueButton = () => {
    const selectedPositions = Array.from(selectedButtonIndices).map(
      (index) => titles[index]
    );
    setSelectedButtonIndices(new Set());
    setPositions(selectedPositions);
    // setNavigateToNextView(true);
    // navigation.navigate('ItineraryScreen', { positions: selectedPositions });
    console.log(selectedPositions)
    navigation.navigate('ItineraryScreen');
  };

  return (
    <ScrollView>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            padding: 10,
            marginTop: 20,
          }}
        >
          Select Things You Want to See on Your Trip
        </Text>
        {photos.map((photo, index) => (
          <RowView
            key={index}
            imageName={photo}
            title={titles[index]}
            isSelected={selectedButtonIndices.has(index)}
            onSelect={(isSelected) => handleSelection(index, isSelected)}
          />
        ))}
        {isContinueButtonVisible && (
          <TouchableOpacity
            onPress={handleContinueButton}
            style={{
              backgroundColor: 'green',
              borderRadius: 8,
              padding: 10,
              margin: 10,
            }}
            disabled={navigateToNextView}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default POIScreen;
