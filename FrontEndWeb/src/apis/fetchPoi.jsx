// import { defaultContext } from "@tanstack/react-query";
import fetch from "isomorphic-fetch";

const fetchPoi = async ({ queryKey }) => {
  const id = queryKey[1];

  // const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  const apiRes = await fetch(`http://127.0.0.1:8000/api/POIs/${id}/`);
  if (!apiRes.ok) {
    console.log("Fetch POI id Error");
    throw new Error(`details/${id} fetch not ok`);
  }
  console.log("Fetch POI id OK");

  // The response from fetch is not directly accessible with ".data" property
  // You can parse the response and log it if needed
  const responseData = await apiRes.json();
  console.log(responseData);

  return responseData;
};

export default fetchPoi;
