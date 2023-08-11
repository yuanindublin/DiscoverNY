// import React, { useState, useEffect, useContext } from "react";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useItineray from "../context/itineraryContext";
import Poi from "../component/Poi";
import { Accordion } from "react-bootstrap";
import {
  Dropdown,
  DropdownButton,
  Form,
  Container,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import useUser from "../context/UserContext";
import axios from "axios";
import fetch from "isomorphic-fetch";
import Spinner from "react-bootstrap/Spinner";

const fetchPoi = async ({ queryKey }) => {
  const id = queryKey[1];

  // const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  const apiRes = await fetch(`http://127.0.0.1:8000/api/POIs/${id}/`);
  if (!apiRes.ok) {
    console.log("Fetch POI id Error");
    throw new Error(`details/${id} fetch not ok`);
  }
  console.log("Fetch POI id OK");

  // The response from fetch is not directly accessible with ".data" property
  // You can parse the response and log it if needed
  const responseData = await apiRes.json();
  console.log(responseData);

  return responseData;
};

function QueryPoiDetails({ id }) {
  const { data, isLoading, error } = useQuery(["details", id], fetchPoi);

  if (isLoading) {
    return <p>Loading POI details...</p>;
  }

  if (error) {
    return <p>Error fetching POI details: {error.message}</p>;
  }

  const poi = data;

  return (
    <Poi
      interests="POIs"
      name={poi.name}
      category={poi.tags}
      images={poi.images}
      location={poi.addr_city}
      id={poi.id}
      zone={poi.zone}
    />
  );
}

export default function Favorite() {
  const [bucketlistData, setBucketlistData] = useState([]); // Store bucketlist data here
  const { userToken } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchBucketList() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/bucketlist/bucketlist-item/`,
          {
            headers: {
              Authorization: `Token ${userToken}`,
            },
          }
        );
        if (!response || !response.data) {
          throw new Error("Fetching bucketlist data failed");
        }
        setBucketlistData(response.data); // Set fetched data in state
        // console.log(response.data);
      } catch (error) {
        setShowModal(true);
        // navigate("/Login");
        console.error("Error fetching data:", error.message);
      }
    }

    fetchBucketList(); // Call the fetching function
  }, [userToken]); // Include userToken as a dependency to refetch data when it changes

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {showModal && ( // Display the modal if showModal is true
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>🎯</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              To access the bucket list, please <Link to="/login">sign in</Link>
              . {/* Use Link for navigation */}
              <br />
              We can't wait for you to explore Manhattan's hidden gems!
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Container
        style={{
          width: "60%",
          margin: "20px auto",
          // padding: "15px",
        }}
      >
        <Row>Bucket List</Row>
      </Container>
      <div className="search-mid">
        {/* <div> */}
        {/* <div>Your cart total is {total}.00$</div> */}
        {!bucketlistData.length ? (
          <h4>
            No POIs in Bucket List now
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
          </h4>
        ) : (
          bucketlistData.map((item) => (
            // <div key={poi.id}>
            //   {poi.id}
            //   <PoiCard
            //     interests="POIs"
            //     name={poi.name}
            //     category={poi.tags}
            //     images={poi.images}
            //     location={poi.addr_city}
            //     id={poi.id}
            //     zone={poi.zone} />
            // </div>

            <div key={item.id}>
              {item.id}
              <QueryPoiDetails id={item.poi} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
