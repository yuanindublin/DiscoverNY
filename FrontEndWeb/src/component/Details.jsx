import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useItineray from "../context/itineraryContext";
import fetchPoi from "../apis/fetchPoi";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { products, addToCart, removeFromCart } = useItineray();
  const [isincart, setIsInCart] = useState(false);

  useEffect(() => {
    const productIsInCart = products.find((product) => product.name === name);

    if (productIsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [products, name]);
  const handleClick = () => {
    const product = {
      name: poi.name,
      images: poi.images,
      // image: poi.images[0].image,
      id: poi.id,
      tags: poi.tags,
      addr_city: poi.addr_city,
      zone: poi.zone,
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

  // const poi = results.data.pois[0];
  const poi = results.data;

  return (
    <div className="details">
      <Carousel images={poi.images} />
      <div>
        <h1>{poi.name}</h1>
        <h2>
          {`${poi.addr_city} - ${poi.tags} - ${poi.zone}`}
          <button onClick={() => setShowModal(true)}>Add {poi.name}</button>
          <p>{poi.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to add {poi.name} into itinerary?</h1>
                <div className="buttons">
                  {/* <button> */}
                  <button onClick={handleClick} isincart={isincart}>
                    {/* <button onClick={handleClick}> */}
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>Go Back</button>
                </div>
              </div>
            </Modal>
          ) : null}
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
