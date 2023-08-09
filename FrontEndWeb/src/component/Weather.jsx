import React, { useState, useEffect } from "react";
// import fetchWeather from "../apis/fetchweather";
import { Badge, Button } from "react-bootstrap";
import axios from "axios";

export default function Weather() {
  const [weather, setWeather] = useState([]); // Set initial value as an empty array
  const fetchWeather = async () => {
    try {
      const apiRes = await axios.get(`http://127.0.0.1:8000/api/weatherdata/`);

      if (!apiRes.ok) {
        throw new Error(`weatherdata fetch not ok`);
      }
      console.log("weatherdata fetch ok");
      return apiRes.json();
    } catch (error) {
      throw new Error(`Error fetching weather data: ${error.message}`);
    }
  };

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const data = await fetchWeather(); // Use the mock function for testing
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    fetchWeatherData();
  }, []);

  // Get the latest temperature from the last element of the 'weather' array
  const latestTemperature =
    weather.length > 0 ? weather[weather.length - 1].temperature : null;
  const latestHumidity =
    weather.length > 0 ? weather[weather.length - 1].humidity : null;
  const latestprecipitation_probability =
    weather.length > 0
      ? weather[weather.length - 1].precipitation_probability
      : null;
  const latestweathercode =
    weather.length > 0 ? weather[weather.length - 1].weathercode : null;

  const getWeatherDescription = (latestweathercode) => {
    switch (latestweathercode) {
      case 0:
        return "Clear sky";
      case 1:
        return "Mainly clear";
      case 2:
        return "Partly cloudy";
      case 3:
        return "Overcast";
      case 45:
        return "Fog";
      case 48:
        return "Fog";
      case 51:
        return "Light Drizzle";
      case 53:
        return "Moderate Drizzle";
      case 55:
        return "Dense Drizzle";
      case 56:
        return "Light Freezing Drizzle";
      case 57:
        return "Dense Freezing Drizzle";
      case 61:
        return "Slight Rain";
      case 63:
        return "Moderate Rain";
      case 65:
        return "Heavy Rain";
      case 66:
        return "Light Freezing Rain";
      case 67:
        return "Heavy Freezing Rain";
      case 71:
        return "Light Snow";
      case 73:
        return "Moderate Snow";
      case 75:
        return "Heavy Snow";
      case 77:
        return "Granular snow";
      case 80:
        return "Light Shower";
      case 81:
        return "Moderate Shower";
      case 82:
        return "Heavy Shower";
      case 85:
        return "Snow shower light";
      case 86:
        return "Snow shower heavy";
      default:
        return "Unknown Weather";
    }
  };

  return (
    // <div>
    //   {weather.length > 0 ? (
    //     <>
    //       <p>Temp: {latestTemperature + "˚C"}</p>
    //       <p>Humidity: {latestHumidity + "%"}</p>
    //       <p>Risk of rain: {latestprecipitation_probability + "%"}</p>
    //       <p>Current Weather: {getWeatherDescription(latestweathercode)}</p>
    //     </>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
    <div className="weather">
      {weather.length > 0 ? (
        <>
          <p>
            Temp: <br />
            {latestTemperature + "˚C"}
          </p>
          {/* </div> */}
          {/* <div className="info"> */}
          <p>
            Humidity: <br />
            {latestHumidity + "%"}
          </p>
          {/* </div> */}
          {/* <div className="info" style={{ whiteSpace: "nowrap" }}> */}
          <p>
            Rain risk: <br />
            {latestprecipitation_probability + "%"}
          </p>
          {/* </div> */}
          {/* <div className="info" style={{ whiteSpace: "nowrap" }}> */}
          <p>
            Weather: <br />
            {getWeatherDescription(latestweathercode)}
          </p>
          {/* </div> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
