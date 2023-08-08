// import fetch from "isomorphic-fetch";

// import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchZoneList from "./fetchZoneList";

// const localCache = {};

export default function useZoneList(category) {
  //   const [breedList, setBreedList] = useState([]);
  //   const [status, setStatus] = useState("unloaded");

  //   useEffect(() => {
  //     if (!animal) {
  //       setBreedList([]);
  //     } else if (localCache[animal]) {
  //       setBreedList(localCache[animal]);
  //     } else {
  //       requestBreedList();
  //     }

  //     async function requestBreedList() {
  //       setBreedList([]);
  //       setStatus("loading");

  //       const res = await fetch(
  //         `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  //       );
  //       const json = await res.json();
  //       localCache[animal] = json.breeds || [];
  //       setBreedList(localCache[animal]);
  //       setStatus("loaded");
  //     }
  //   }, [animal]);

  const results = useQuery(["categories", category], fetchZoneList);

  //   return [breedList, status];
  return [results?.data?.categories ?? [], results.status];
}
