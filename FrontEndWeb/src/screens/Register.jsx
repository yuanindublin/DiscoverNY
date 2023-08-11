import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUser from "../context/UserContext";

// const csrftoken = getCookie("csrftoken");
export default function Register() {
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { updateUserToken } = useUser();

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  function handleRegister(name, email, password) {
    const csrftoken = getCookie("csrftoken");
    console.log("csrftoken:", csrftoken);
    axios
      .post(
        `http://127.0.0.1:8000/api/user/create/`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "X-CSRFToken": csrftoken,
          },
        }
      )
      .then((res) => {
        let userInfo = res.data;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        // updateUserToken(userInfo.token);
        updateUserToken(csrftoken);
        console.log(userInfo);
        console.log("csrftoken:", csrftoken);
        navigate("/Home");
      })
      .catch((error) => {
        console.error("register  error", error);
      });
  }

  const handleButtonClick = () => {
    console.log("UserName:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div
      className="App"
      style={{
        marginTop: "20vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#e6f7f9",
          border: "1px solid lightgrey",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "-100px",
          marginLeft: "20%",
          marginRight: "20%",
        }}
      >
        {/* Image */}
        <div style={{ textAlign: "center" }}>
          <img
            src="./assets/icons/homeImage.png"
            alt="Image"
            style={{ width: "200px", height: "200px" }}
          />
          <h1>Register</h1>
        </div>

        {/* Textbox */}
        <div
          style={{
            textAlign: "center",
            width: "50%",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="User Name"
            style={{ margin: "10px", marginLeft: "0px", width: "100%" }}
          />
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            style={{ margin: "10px", marginLeft: "0px", width: "100%" }}
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            style={{ margin: "10px", marginLeft: "0px", width: "100%" }}
          />

          {/* Button */}
          <div
            style={{
              textAlign: "center",
              width: "70%",
              margin: "0 auto",
              marginTop: "25px",
              marginBottom: "25px",
            }}
          >
            <button
              type="button"
              onClick={() => handleRegister(name, email, password)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
