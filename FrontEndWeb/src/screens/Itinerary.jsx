// import React, { useState, useEffect, useContext } from "react";
import React from "react";
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
} from "react-bootstrap";
const formatTime = (time) => {
  const hours = time === 24 ? 12 : time % 12 || 12;
  const AmPm = time == 24 || time < 12 ? "AM" : "PM";
  return ` ${hours} ${AmPm}`;
};
export default function Itinerary() {
  // const [addedPois] = useContext(AddedPoiContext);
  const { products, total } = useItineray();

  // const [Timevalue, setTimeValue] = useState(1);
  // const handleChange = (event) => {
  //   // setTimeValue(event.target.value);
  //   // setRequesTaxizones({ time: event.target.value });
  //   // setRequesAllPois({ time: event.target.value });
  // };
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          width: "60%",
          margin: "20px auto",
          // padding: "15px",
        }}
      >
        {/* <FullWidthContainer fluid> */}
        {/* <div
          style={{
            width: "60%",
          }}
        >
          Forecast Time:{" "}
          <label htmlFor="hours">
  hours
  <select id="number" value={number}>
    <option value="">Select an option</option>
    {Numbers.map((number) => (
      <option key={number} value={number}>
        {number}
      </option>
    ))}
  </select>
</label>

        </div> */}
        {/* <Row>
            <Col sm={4}>
              <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                <Form.Label>Forecast Time: </Form.Label>
                {formatTime(Timevalue)}
              </p>
              <Form.Range
                min={1}
                max={24}
                step={1}
                value={Timevalue}
                onChange={handleChange}
                bsPrefix="custom-range" // Custom CSS class name prefix
              />
            </Col>
          </Row> */}
        {/* </FullWidthContainer> */}

        <Form.Label>Range</Form.Label>
        <Form.Range />
      </div>
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
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
