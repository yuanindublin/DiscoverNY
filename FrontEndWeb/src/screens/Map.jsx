import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MapLeaf from "../component/MapLeaf";
import MapList from "../component/MapList";
import {
  Dropdown,
  DropdownButton,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../api/fetchSearch";
import fetchTaxizones from "../api/fetchTaxizones";
//import fetchAllPois from "../api/fetchAllPois";

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

export default function Map() {
  //select the category
  const [selectedItem, setSelectedItem] = useState("Catetegory");
  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
    setRequesParams({ category: eventKey });
    // console.log("selected Category: ", eventKey);
  };

  //fetch markers data of selected category
  const [requestParams, setRequesParams] = useState({
    category: "entertainment",
  });
  const results = useQuery(["search", requestParams], fetchSearch);
  const pois = results?.data ? results.data : [];

  //fetch taxizones data of selected time
  const [requestTaxizones, setRequesTaxizones] = useState({
    time: "1",
  });
  const resultsTaxi = useQuery(["search", requestTaxizones], fetchTaxizones);
  const taxizonesData = resultsTaxi?.data ? resultsTaxi.data : [];
  //fetch all pois data of selected time
  // const [requestAllPois, setRequesAllPois] = useState({
  //   time: "1",
  // });
  //const resultsAllPois = useQuery(["search", requestAllPois], fetchAllPois);
  //const AllPoisData = resultsAllPois?.data ? resultsAllPois.data : [];

  //select the prediction time
  const [Timevalue, setTimeValue] = useState(1);
  const handleChange = (event) => {
    setTimeValue(event.target.value);
    setRequesTaxizones({ time: event.target.value });
    setRequesAllPois({ time: event.target.value });
  };
  const formatTime = (time) => {
    const hours = time === 24 ? 12 : time % 12 || 12;
    const AmPm = time == 24 || time < 12 ? "AM" : "PM";
    return ` ${hours} ${AmPm}`;
  };

  //when click the marker, scroll info into current view
  const [childClicked, setChildClicked] = useState(null);

  return (
    <FullWidthContainer fluid>
      <Row>
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
          <WrapperCate>
            <div style={{ marginTop: "6px", marginLeft: "5px" }}>
              {" "}
              Choose Category:
            </div>
            <div>
              <DropdownButton
                variant="text-primary"
                id="dropdown-basic-button"
                title={selectedItem}
                onSelect={handleSelect}
              >
                {categories.map((category) => (
                  <Dropdown.Item key={category} eventKey={category}>
                    {category}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          </WrapperCate>
          <MapList pois={pois} time={Timevalue} childClicked={childClicked} />
        </Col>

        <Col sm={8}>
          <MapLeaf
            pois={pois}
            taxizonesData={taxizonesData}
            time={Timevalue}
            // AllPoisData={AllPoisData}
            setChildClicked={setChildClicked}
          />
        </Col>
      </Row>
    </FullWidthContainer>
  );
}

const FullWidthContainer = styled(Container)`
  padding: 0; /* Remove padding */
  width: 100vw; /* Take full width of viewport */
  height: 100vh; /* Take full height of viewport */
  overflow-y: scroll;
`;

const WrapperCate = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  @media (max-width: 768px) {
    grid-template-columns: auto; /* Change to a single column layout on smaller screens */
  }
`;
