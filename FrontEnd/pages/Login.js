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

function Login({ navigation, route, props }) {
  //   const globalContext = useContext(Context)
  //   const { setIsLoggedIn, appSettings, domain, userObj, setUserObj, setToken } = globalContext;

  const [securePassword, setSecurePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(email, password) {
    setError("");
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
  }

  return (
    <View style={containers().outerPage}>
      <View style={containers().formBox}>
        <Text style={[fonts().h1, margins.topTenPercent]}>LOGIN</Text>

        <Text style={fonts().errorLabel}>{error}</Text>

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
          onPress={() => handleLogin(email, password)}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <Text style={[fonts().inputLabel, margins.topTenPercent]}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[fonts().link]}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
