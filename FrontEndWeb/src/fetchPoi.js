// import { defaultContext } from "@tanstack/react-query";
import fetch from "isomorphic-fetch";
import axios from "axios";

const fetchPoi = async ({ queryKey }) => {
  const id = queryKey[1];

  // const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  // const apiRes = await fetch(`http://127.0.0.1:8000/api/POIs/${id}`);

  // async function requestPoi() {
  //   if (queryKey) {
  //     try {
  const response = await axios.get(`http://127.0.0.1:8000/api/POIs/${id}`);
  // const categoryURL = response.data[category];

  // Fetch the data for the selected category using the categoryURL
  // const res = await axios.get(categoryURL);
  // const poisInfo = response.data;

  // const json = JSON.stringify(poisInfo);
  // setPois(json.pois);
  // setPois(poisInfo);
  //     } catch (error) {
  //       console.error("Fetch error", error);
  //     }
  //   } else {
  //     console.log("Please select a category.");
  //   }
  // }
  return response;

  // if (!apiRes.ok) {
  //   console.log("Fetch POI id Error");
  //   throw new Error(`details/${id} fetch not ok`);
  // }
  // console.log("Fetch POI id OK");
  // return apiRes.json();
};

export default fetchPoi;
