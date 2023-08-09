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
  console.log(apiRes.data);
  return apiRes.json();
};

export default fetchPoi;
