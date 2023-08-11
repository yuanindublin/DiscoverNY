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

// format the prediction time
const formatTime = (time) => {
  const hours = time === 24 ? 12 : time % 12 || 12;
  const AmPm = time == 24 || time < 12 ? "AM" : "PM";
  return ` ${hours} ${AmPm}`;
};

// order the busyness level
const busynessOrder = ["Not Busy", "A Little Busy", "Busy", "Very Busy"];

export default function Itinerary() {
  // const [addedPois] = useContext(AddedPoiContext);
  const { products, total } = useItineray();
  // get the prediction result of the selected pois

  // set the prediction time
  const [Timevalue, setTimeValue] = useState(1);
  const handleChange = (event) => {
    console.log(event.target.value);
    setTimeValue(event.target.value);
    // setRequesTaxizones({ time: event.target.value });
    // setRequesAllPois({ time: event.target.value });
  };

  //sort the order of pois
  const sortedProducts = products.slice().sort((poiA, poiB) => {
    const selectedTimePredictionA = poiA.predictions.find(
      (prediction) => new Date(prediction.time).getUTCHours() + 1 == Timevalue
    );
    const selectedTimePredictionB = poiB.predictions.find(
      (prediction) => new Date(prediction.time).getUTCHours() + 1 == Timevalue
    );
    // Assuming that predictions is an array of objects with a property called 'busyindex'
    const busyIndexA = selectedTimePredictionA?.busyindex || "Not Busy";
    const busyIndexB = selectedTimePredictionB?.busyindex || "Not Busy";
    // return busyIndexA - busyIndexB;
    const indexA = busynessOrder.indexOf(busyIndexA);
    const indexB = busynessOrder.indexOf(busyIndexB);
    // const indexA = busynessLevelIndexMap[busyIndexA];
    // const indexB = busynessLevelIndexMap[busyIndexB];
    if (indexA === indexB) {
      // If busyness levels are the same, order by busy index
      const busyIndexValueA = selectedTimePredictionA?.busylevel || 0;
      const busyIndexValueB = selectedTimePredictionB?.busylevel || 0;
      return busyIndexValueA - busyIndexValueB;
    } else {
      // If busyness levels are different, order by busyness level index
      return indexA - indexB;
    }
  });

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
          <Col className="d-flex justify-content-end">
            <Form.Label>Forecast Time: </Form.Label>
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
          sortedProducts.map((poi) => (
            <div key={poi.id}>
              <PoiInCart
                interests="POIs"
                name={poi.name}
                category={poi.tags}
                images={poi.images}
                location={poi.addr_city}
                id={poi.id}
                zone={poi.zone}
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
