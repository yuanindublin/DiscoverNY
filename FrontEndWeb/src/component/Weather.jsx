import React, { useState, useEffect } from "react";
// import axios from "axios";
import fetch from "isomorphic-fetch";

async function fetchWeatherData() {
  try {
    const apiRes = await fetch(`http://127.0.0.1:8000/api/weatherdata/`);

    if (!apiRes.ok) {
      throw new Error(`weatherdata fetch not ok`);
    }
    console.log("weatherdata fetch ok");
    return apiRes.json();
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
}

export default function Weather() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const data = await fetchWeatherData();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    fetchWeather();
  }, []);

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

  const getWeatherDescription = (code) => {
    // Your switch case remains unchanged
  };

  return (
    <div className="weather">
      {weather.length > 0 ? (
        <>
          <p>
            Temp: <br />
            {latestTemperature + "˚C"}
          </p>
          <p>
            Humidity: <br />
            {latestHumidity + "%"}
          </p>
          <p>
            Rain risk: <br />
            {latestprecipitation_probability + "%"}
          </p>
          <p>
            Weather: <br />
            {getWeatherDescription(latestweathercode)}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
