// import { View, Text } from "react-native";
// import React from "react";

// const ItineraryScreen = () => {
//   return (
//     <View>
//       <Text>ItineraryScreen</Text>
//     </View>
//   );
// };

// export default ItineraryScreen;


import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import museum from '../assets/categories/museum.jpg';
import empire from '../assets/categories/empire.jpg';
import rock from '../assets/categories/rock.png';
import tower from '../assets/categories/tower.jpeg';
import statue from '../assets/categories/statue.jpeg';

// const ItineraryScreen = ({ positions }) => {

  const ItineraryScreen = () => {
  const positions =["Met Museum", "Empire state building",'Top of the Rock']

  const [selectedPositions, setSelectedPositions] = useState(new Set());
  const [showAlert, setShowAlert] = useState(false);
  const [selectedPositionName, setSelectedPositionName] = useState('');
  const [showDirectionView, setShowDirectionView] = useState(false);
  const navigation = useNavigation();

 
  const dictionary = {
    // 'Met Museum': ['museum', '9am - 10am', '40.779436,-73.963244'],
    // 'Empire state building': ['empire', '10am - 11:30am', '40.748817,-73.985428'],
    // 'Top of the Rock': ['rock', '10:30am - 12 noon', '40.758740,-73.978674'],
    // 'One World trade center': ['tower', '3pm - 5pm', '40.712742,-74.013382'],
    // 'Statue of liberty': ['statue', '4pm - 6pm', '40.689249,-74.044500'],

  'Met Museum': [require('../assets/categories/museum.jpg'), '9am - 10am', '40.779436,-73.963244'],
  'Empire state building': [require('../assets/categories/empire.jpg'), '10am - 11:30am', '40.748817,-73.985428'],
  'Top of the Rock': [require('../assets/categories/rock.png'), '10:30am - 12 noon', '40.758740,-73.978674'],
  'One World trade center': [require('../assets/categories/tower.jpeg'), '3pm - 5pm', '40.712742,-74.013382'],
  'Statue of liberty': [require('../assets/categories/statue.jpeg'), '4pm - 6pm', '40.689249,-74.044500'],

  };

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePositionSelection = (position) => {
    const updatedPositions = new Set(selectedPositions);
    if (selectedPositions.has(position)) {
      updatedPositions.delete(position);
    } else {
      updatedPositions.add(position);
    }
    setSelectedPositions(updatedPositions);
    // setShowAlert(true);
    setShowAlert(false);
    setSelectedPositionName(position);
  };

  const handleAlertConfirmation = () => {
    // setShowDirectionView(true);
    setShowDirectionView(false);
  };

  const handleAlertCancelation = () => {
    // Perform any necessary actions on alert cancellation
  };

  const handleContinueButton = () => {
    // navigation.navigate('NextScreen');
  };

  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, marginTop: 20 }}>
          Busy times today:
        </Text>
        <Text style={{ fontSize: 16, padding: 10 }}>{dateFormatter.format(new Date())}</Text>
        {positions.map((position) => {
          const [imageName, peakTime, coordinates] = dictionary[position];
          return (
            <TouchableOpacity
              key={position}
              onPress={() => handlePositionSelection(position)}
              style={{
                flexDirection: 'row',
                height: 100,
                backgroundColor: selectedPositions.has(position) ? 'yellow' : 'white',
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
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', marginBottom: 4 }}>
                  {position}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'light' }}>Peak time: </Text>
                  <Text style={{ fontSize: 16 }}>{peakTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          onPress={handleContinueButton}
          style={{
            backgroundColor: 'green',
            borderRadius: 8,
            padding: 10,
            margin: 10,
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      {showAlert && (
        <View>
          <Alert
            title={`Do you want directions to ${selectedPositionName}?`}
            confirmText="Yes"
            onConfirm={handleAlertConfirmation}
            onCancel={handleAlertCancelation}
          />
        </View>
      )}
      {showDirectionView && (
        <View>
          <Text>My Direction View</Text>
          {/* Render your direction view component here */}
        </View>
      )}
    </ScrollView>
  );
};

export default ItineraryScreen;
