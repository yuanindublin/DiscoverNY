import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useItineray from "../context/itineraryContext";
// import fetchPoi from "../apis/fetchPoi";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import fetch from "isomorphic-fetch";
import axios from "axios";
import { CloseButton } from "react-bootstrap";
import useUser from "../context/UserContext";

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

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { products, addToCart, removeFromCart } = useItineray();
  const [isincart, setIsInCart] = useState(false);
  const [error, setError] = useState("");
  const { userToken } = useUser();

  useEffect(() => {
    const productIsInCart = products.find((product) => product.name === name);

    if (productIsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [products, name]);

  const handleClickItinerary = () => {
    const product = {
      name: poi.name,
      images: poi.images,
      // image: poi.images[0].image,
      id: poi.id,
      tags: poi.tags,
      addr_city: poi.addr_city,
      zone: poi.zone,
      predictions: poi.predictions,
    };

    if (isincart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }

    console.log(`Added ${poi.name} to cart`);
    navigate("/Itinerary");
  };
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPoi);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const handleClickBucket = () => {
    setError("");
    axios
      .post(
        `http://127.0.0.1:8000/api/POIs/${poi.id}/like/`,
        {},
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      )
      .then((response) => {
        // handle success
        console.log("userToken:", userToken);
      })
      .catch((error) => {
        navigate("/Login");
        console.log("userToken:", userToken);
      });
  };

  // const poi = results.data.pois[0];
  const poi = results.data;

  return (
    <div className="details">
      <Carousel images={poi.images} />
      <div>
        <h1>{poi.name}</h1>
        <h2>
          {" "}
          ⛳️
          {`${poi.addr_city} - ${poi.zone}${
            poi.addr_street ? ` - ${poi.addr_street}` : ""
          }`}
          <br />
          Open Time: {poi.opening_hours}
          <button onClick={() => setShowModal(true)}>Add {poi.name}</button>
          <p>
            {poi.website ? (
              <>
                {" "}
                Website:{" "}
                <a href={poi.website} target="_blank" rel="noopener noreferrer">
                  {poi.website}
                </a>
              </>
            ) : (
              ""
            )}
          </p>
          <p>{poi.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <div className="d-flex justify-content-end">
                  <CloseButton
                    aria-label="Hide"
                    onClick={() => setShowModal(false)}
                    className="ml-auto"
                  >
                    Close
                  </CloseButton>
                </div>
                <h2>Would you like to add {poi.name} into itinerary?</h2>
                <div className="buttons">
                  <button
                    onClick={handleClickItinerary}
                    isincart={isincart.toString()}
                  >
                    Yes
                  </button>
                  <button onClick={handleClickBucket}>
                    Add into Bucketlist
                  </button>
                </div>
              </div>
            </Modal>
          ) : // </CloseButton>
          null}
        </h2>
      </div>
    </div>
  );
};

// function DetailsErrorBoundary() {  // if get props into details, it will get killed here
//   return (
//     <ErrorBoundary>
//       <Details />
//     </ErrorBoundary>
//   );
// }

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

// export default Details;
export default DetailsErrorBoundary;
