import fetch from "isomorphic-fetch";

const fetchWeather = async () => {
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
};

export default fetchWeather;
