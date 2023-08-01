// import fetch from "isomorphic-fetch";
import FormData from "form-data";

// import { useState, useEffect } from "react";
import { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import Poi from "./Poi";
import Results from "./Results";
// import useCategoryList from "./useCategoryList";
// import Results from "./Results";
// import AdoptedPetContext from "./AdoptedPetContext";
import axios from "axios";

// let counter = 0;
// const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const INTERESTS = ["POIs", "Events", "Restaurants", "Hotels"];
// const INTERESTS = ["POIs"];
// const INTERESTS = ["museum", "gallery", "Restaurants", "Hotels"];
const categories = [
  "museum",
  "park",
  "attraction",
  "theatre",
  "zoo",
  "entertainment",
  "shopping",
  "gallery",
  "library",
];

const SearchPramas = () => {
  // const location = "New York";
  // counter++;
  const [location, setLocation] = useState("");
  // const locationHook = useState("");
  // const location = locationHook[0];
  // const setLocation = locationHook[1];
  const [interests, setInterests] = useState("");
  const [category, setCategory] = useState("");
  const [pois, setPois] = useState([]);
  // const categories = ["museum"];
  // const [categories] = useCategoryList(interests);
  // const [adoptedP et] = useContext(AdoptedPetContext);

  const [requestParams, setRequesParams] = useState({
    location: "",
    interests: "",
    category: "",
  });

  const [error, setError] = useState("");
  useEffect(() => {
    requestPois();
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  async function requestPois() {
    if (category) {
      try {
        // Fetch the API response to get the URL for the selected category
        // const response = await axios.get(
        //   `http://127.0.0.1:8000/api/POIs/tag/${category}`
        // );
        const response = await axios.get(`http://127.0.0.1:8000/api/POIs/tag/`);
        const categoryURL = response.data[category];

        // Fetch the data for the selected category using the categoryURL
        const res = await axios.get(categoryURL);
        const poisInfo = res.data;

        // const json = JSON.stringify(poisInfo);
        // setPois(json.pois);
        setPois(poisInfo);
      } catch (error) {
        console.error("Fetch error", error);
      }
    } else {
      console.log("Please select a category.");
    }
  }

  // const results = useQuery(["search", requestParams], fetchSearch);
  // const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      {/* <h2>{counter}</h2> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPois();
          // const formData = new FormData(e.target);
          // const obj = {
          //   animal: formData.get("animal") ?? "",
          //   breed: formData.get("breed") ?? "",
          //   location: formData.get("location") ?? "",
          // };
          // setRequesParams(obj);
        }}
      >
        {/* {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null} */}
        <label htmlFor="locatons">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            // name="location"
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="interests">
          Interests
          <select
            id="interests"
            value={interests}
            // placeholder="Interests"
            onChange={(e) => {
              setInterests(e.target.value);
              // setCategory("");
            }}
          >
            <option />
            {INTERESTS.map((interests) => (
              <option key={interests}>{interests}</option>
            ))}
          </select>
        </label>
        <label htmlFor="category">
          Category
          <select
            id="category"
            // disabled={categories.length === 0} // no length, no show up
            name="category"
            value={category}
            // placeholder="Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option />
            {categories.map((category) => (
              <option key={category}> {category}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {/* {pois.map((poi) => (
        <Poi
          name={poi.name}
          interests="POIs"
          // interests={poi.animal}
          category={poi.tags}
          key={poi.id}
        />
      ))} */}
      <Results pois={pois} />
    </div>
  );
};

export default SearchPramas;
