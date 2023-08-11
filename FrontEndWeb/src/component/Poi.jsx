import React from "react";
import { Link } from "react-router-dom";
import empire from "../assets/categories/empire.jpg";

const Poi = (props) => {
  const {
    name,
    interests,
    category,
    images,
    location,
    id,
    zone,
    opening_hours,
  } = props;

  const imageUrl =
    // images.length > 0 ? images[0].image : "./assets/categories/empire.jpg";
    images.length > 0 ? images[0].image : empire;

  return (
    // <a href={`/details/${id}`} className="pet">
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
        {/* <img src={empire} alt={name} /> */}
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {location} - {interests} - {category} - {zone}
        </h2>
        <h2>{opening_hours}</h2>
      </div>
    </Link>
  );
};

export default Poi;
