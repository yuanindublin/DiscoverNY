// import { defaultContext } from "@tanstack/react-query";
import fetch from "isomorphic-fetch";

const fetchWeather = async () => {
  const apiRes = await fetch(`http://127.0.0.1:8000/api/weatherdata/`);

  if (!apiRes.ok) {
    throw new Error(`weatherdata fetch not ok`);
  }
  console.log("weatherdata fetch ok");
  return apiRes.json();
};

export default fetchWeather;
