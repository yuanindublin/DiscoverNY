import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View, Platform } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Discover from "./screens/Discover";
import ItemScreen from "./screens/ItemScreen";
import MapScreen from "./screens/MapScreen";
import HeatmapScreen from "./screens/HeatmapScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Stack = createNativeStackNavigator();

export default function App() {
  const isWeb = Platform.OS === "web";

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="ItemScreen" component={ItemScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="HeatmapScreen" component={HeatmapScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
