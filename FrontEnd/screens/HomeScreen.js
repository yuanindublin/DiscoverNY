import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import * as SecureStore from "expo-secure-store";
// import "../output.css";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import buttons from "../styles/buttons.js";
import { Context } from "../context/globalContext.js";

const HomeScreen = () => {
  const isWeb = Platform.OS === "web";

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // const globalContext = useContext(Context);
  // const { setIsLoggedIn, appSettings, domain, userObj, setUserObj, setToken } =
  //   globalContext; // cannot read property 'setIsLoggedIn' of undefined
  // const [loggedIn, setLoggedIn] = useContext(LoginContext); // cannot read property 'setIsLoggedIn' of undefined
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const { isLoading, login } = useContext(AuthContext);
  // const location = useLocation();
  const navigate = useNavigation();

  const onSignInPressed = () => {
    console.warn("Sign in pressed");
  };
  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password pressed");
  };
  function handleSignIn(email, password) {
    axios
      .post(`http://127.0.0.1:8000/api/user/token/`, {
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        // setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        // setIsLoading(false);
        navigation.navigate("Discover");
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        // setIsLoading(false);
      });
    // e.preventDefault();
    // const url = "http://127.0.0.1:8000/api/user/token/";
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //   }),
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((json) => {
    //     // localStorage.setItem("access", data.access);
    //     // localStorage.setItem("refresh", data.refresh);
    //     // setLoggedIn(true);
    //     // navigation.navigate("Discover");
    //     // console.warn(json);
    //     console.warn("Logged in successfully");
    //   })
    //   .catch((err) => {
    //     console.warn(err);
    //   });
  }

  function handleSignUp(name, email, password) {
    axios
      .post(`http://127.0.0.1:8000/api/user/create/`, {
        name,
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        // setIsLoading(false);
        navigation.navigate("Discover");
      })
      .catch((e) => {
        console.log(`login error ${e}`);
        // setIsLoading(false);
      });
    //   // e.preventDefault();
    //   const url = "http://127.0.0.1:8000/api/user/create/";
    //   fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //     }),
    //   })
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((json) => {
    //       // localStorage.setItem("access", data.access);
    //       // localStorage.setItem("refresh", data.refresh);
    //       // setLoggedIn(true);
    //       // navigation.navigate("Discover");
    //       console.warn(json);
    //       console.warn("Sign up successfully");
    //     })
    //     .catch((err) => {
    //       console.warn(err);
    //     });
  }
  // useEffect(() => {
  //   handleSignIn();
  // }, []);

  // const register = () => {
  //   // Register logic here
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/** First Section */}
      <View style={styles.firstSection}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>Go</Text>
        </View>
        <Text style={styles.sectionText}>Travel Manhattan</Text>
      </View>

      {/* * Second Section
      <View className="px-16 mt-8 space-y-3">
        <Text className="text-[#2A2B4B] text-3xl font-semibold">Manhattan</Text>
      </View> */}

      {/** Image Container */}
      <View style={styles.imageContainer}>
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={{
            url: "https://cdn.pixabay.com/photo/2017/01/31/00/46/america-2022701_1280.png",
          }}
          style={styles.image}
        />

        {/* <TouchableOpacity
          style={buttons.login}
          onPress={() => navigation.navigate("Login")}
        > */}
        <TouchableOpacity
          // onPress={() => navigation.navigate("Discover")}
          onPress={() => navigation.navigate("Login")}
          style={styles.buttonContainer}
        >
          <Animatable.View
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Go</Text>
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
  usercontainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  firstSection: {
    flexDirection: "row",
    paddingHorizontal: 6,
    marginTop: 4,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "black",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "#00BCC9",
    fontSize: 30,
    fontWeight: "bold",
  },
  sectionText: {
    color: "#2A2B4B",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    marginTop: 30,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
  },
  button: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderTopWidth: 4,
    borderColor: "#00BCC9",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00BCC9",
  },
  buttonText: {
    color: "gray",
    fontSize: 36,
    fontWeight: "bold",
  },
  wrapper: {
    width: "80%",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: "blue",
  },
});

export default HomeScreen;
