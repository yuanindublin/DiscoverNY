// import React, { useState, useEffect, useContext } from "react";
import React, { useState, useEffect } from "react";
// import AddedPoiContext from "../AddedPoiContext";
import useItineray from "../context/itineraryContext";
import PoiInCart from "../component/PoiInCart";
import { Accordion } from "react-bootstrap";
import {
  Dropdown,
  DropdownButton,
  Form,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
const formatTime = (time) => {
  const hours = time === 24 ? 12 : time % 12 || 12;
  const AmPm = time == 24 || time < 12 ? "AM" : "PM";
  return ` ${hours} ${AmPm}`;
};

export default function Itinerary() {
  // const [addedPois] = useContext(AddedPoiContext);
  const { products, total } = useItineray();

  const [Timevalue, setTimeValue] = useState(1);
  const handleChange = (event) => {
    console.log(event.target.value);
    setTimeValue(event.target.value);
    // setRequesTaxizones({ time: event.target.value });
    // setRequesAllPois({ time: event.target.value });
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Container
        style={{
          width: "60%",
          margin: "20px auto",
          // padding: "15px",
        }}
      >
        <Row>
          <Col>
            <Form.Label>Forecast Time:</Form.Label>
            {formatTime(Timevalue)}
          </Col>
          <Col>
            <Button
              variant="primary"
              onClick={() => {
                console.log("submitted");
                // navigate(`/details/${id}`);
              }}
            >
              Optimize route
            </Button>
          </Col>
        </Row>

        <Row>
          <Form.Range
            min={1}
            max={24}
            step={1}
            value={Timevalue}
            onChange={handleChange}
            bsPrefix="custom-range" // Custom CSS class name prefix
          />
        </Row>
      </Container>
      <div className="search-mid">
        {/* <div> */}
        {/* <div>Your cart total is {total}.00$</div> */}
        {!products.length ? (
          <h1>No POIs in itinerary now</h1>
        ) : (
          products.map((poi) => (
            <div key={poi.id}>
              <PoiInCart
                // interests={poi.interests}
                interests="POIs"
                name={poi.name}
                category={poi.tags}
                images={poi.images}
                // location={`${poi.city},${poi.state}`}
                location={poi.addr_city}
                id={poi.id}
                zone={poi.zone}
                // predictions={poi.predictions[0]}
                time={Timevalue}
                predictions={poi.predictions}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
