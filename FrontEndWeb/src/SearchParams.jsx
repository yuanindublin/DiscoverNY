// import fetch from "isomorphic-fetch";
import FormData from "form-data";

// import { useState, useEffect } from "react";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
// import Pet from "./Pet";
import useBreedList from "./useBreedList";
import Results from "./Results";
import AdoptedPetContext from "./AdoptedPetContext";

// let counter = 0;
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchPramas = () => {
  // const location = "Seattle,WA";
  // counter++;
  // const [location, setLocation] = useState("");
  // const locationHook = useState("");
  // const location = locationHook[0];
  // const setLocation = locationHook[1];
  const [animal, setAnimal] = useState("");
  // const [breed, setBreed] = useState("");
  // const [pets, setPets] = useState([]);
  // const breeds = ["Poodle"];
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const [requestParams, setRequesParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  // useEffect(() => {
  //   requestPets();
  // }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  // async function requestPets() {
  //   const res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //   );
  //   const json = await res.json();

  //   setPets(json.pets);
  // }

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      {/* <h2>{counter}</h2> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // requestPets();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequesParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="locatons">
          Location
          <input
            // onChange={(e) => setLocation(e.target.value)}
            id="location"
            name="location"
            // value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              // setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={breeds.length === 0}
            name="breed"
            // value={breed}
            // onChange={(e) => {
            //   setBreed(e.target.value);
            // }}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}> {breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {/* {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))} */}
      <Results pets={pets} />
    </div>
  );
};

export default SearchPramas;
