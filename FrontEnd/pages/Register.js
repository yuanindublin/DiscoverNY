import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Context } from "../globalContext/globalContext.js"
import containers from "../styles/containers.js";
import fonts from "../styles/fonts.js";
import inputs from "../styles/inputs.js";
import margins from "../styles/margins.js";
import buttons from "../styles/buttons.js";

function Register({ navigation, route, props }) {
  //   const globalContext = useContext(Context)
  //   const { setIsLoggedIn, appSettings, domain, userObj, setUserObj, setToken } = globalContext;

  const [securePassword, setSecurePassword] = useState(true);
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleRegister(email, password) {
    setError("");
    axios
      .post(`http://127.0.0.1:8000/api/user/create/`, {
        name,
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
        console.log(`register error ${e}`);
        // setIsLoading(false);
      });
  }

  return (
    <View style={containers().outerPage}>
      <View style={containers().formBox}>
        <Text style={[fonts().h1, margins.topTenPercent]}>REGISTER</Text>

        <Text style={fonts().errorLabel}>{error}</Text>

        <Text style={[fonts().inputLabel, margins.topTenPercent]}>
          User Name
        </Text>
        <TextInput
          value={name}
          onChangeText={(text) => setUserName(text)}
          textContentType="username"
          autoCompleteType="username"
          style={inputs().textInput}
          placeholder="User Name"
        />

        <Text style={[fonts().inputLabel, margins.topTenPercent]}>
          Email Address
        </Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          textContentType="username"
          autoCompleteType="email"
          style={inputs().textInput}
          placeholder="Email"
        />

        <Text style={[fonts().inputLabel, margins.topTenPercent]}>
          Password
        </Text>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={securePassword}
          textContentType="password"
          autoCompleteType="password"
          style={inputs().textInput}
          placeholder="Password"
        />

        <TouchableOpacity
          style={[buttons().login, margins.topTenPercent]}
          onPress={() => handleRegister(email, password)}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Register;
