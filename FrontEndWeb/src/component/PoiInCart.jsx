import React from "react";
import { Link } from "react-router-dom";
import empire from "../assets/categories/empire.jpg";
import { Button, Card, Carousel, Image, Stack, Badge } from "react-bootstrap";

const busybadge = {
  "Not Busy": "success",
  "A little Busy": "warning",
  Busy: "warning",
  "Very Busy": "danger",
};
const PoiInCart = (props) => {
  const { name, interests, category, images, location, id, zone } = props;

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
        {/* {predictions} */}
        {/* <Badge
          bg={busybadge[predictions.busyindex]}
          style={{ fontSize: "16px" }}
        >
          {predictions.busyindex}
        </Badge> */}
      </div>
    </Link>
  );
};

export default PoiInCart;
