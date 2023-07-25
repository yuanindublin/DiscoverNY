import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import Discover from "./screens/Discover";
import ItemScreen from "./screens/ItemScreen";
import MapScreen from "./screens/MapScreen";
import HeatMapScreen from "./screens/HeatMapScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
import ProfileScreen from "./screens/ProfileScreen";
import ItineraryScreen from "./screens/ItineraryScreen";
import POIScreen from "./screens/POIScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
// import AppStack from "./navigation/AppStack";

//Add cart
import { Provider } from "react-redux";
import store from "./components/CartStore";

const Stack = createNativeStackNavigator();

export default function App() {
  // const isWeb = Platform.OS === "web";

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <AppStack /> */}
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="ItemScreen" component={ItemScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="HeatMapScreen" component={HeatMapScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="ItineraryScreen" component={ItineraryScreen} />
          <Stack.Screen name="POIScreen" component={POIScreen} />
          <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
