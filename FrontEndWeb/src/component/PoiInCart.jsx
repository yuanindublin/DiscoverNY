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

//format time
const formatTime = (time) => {
  const hours = time === 24 ? 12 : time % 12 || 12;
  const AmPm = time == 24 || time < 12 ? "AM" : "PM";
  return ` ${hours} ${AmPm}`;
};

const PoiInCart = (props) => {
  const {
    name,
    interests,
    category,
    images,
    location,
    id,
    zone,
    time,
    predictions,
  } = props;

  const imageUrl =
    // images.length > 0 ? images[0].image : "./assets/categories/empire.jpg";
    images.length > 0 ? images[0].image : empire;

  //Select the predictions time
  // const selectedTimePrediction = predictions.find(
  //   (prediction) => new Date(prediction.time).getUTCHours() + 1 == time
  // );
  // const busyIndex = selectedTimePrediction
  //   ? selectedTimePrediction.busyindex.toString()
  //   : "N/A";

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
          {interests} - {category} - {zone} - {location}
        </h2>
        Forecast:{formatTime(time)}
        {/* <Badge bg={busybadge[busyIndex]} style={{ fontSize: "16px" }}>
          {busyIndex}
        </Badge> */}
        {/* <Badge
          bg={busybadge[predictions.busyIndex]}
          style={{ fontSize: "16px" }}
        ></Badge> */}
      </div>
    </Link>
  );
};

export default PoiInCart;
