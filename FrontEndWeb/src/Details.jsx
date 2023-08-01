import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchPoi from "./fetchPoi";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
  // const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();
  // // eslint-disable-next-line no-unused-vars
  // const [_, setAdoptedPet] = useContext(AdoptedPetContext);
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
    // <h2>hi{id}</h2>
    // <div onClick={() => alert("hi")} className="details"> // it is so coll!!
    <div className="details">
      {/* <Carousel images={poi.images} /> */}
      <div>
        <h1>{poi.name}</h1>
        {/* <h2>
          {poi.interests} - {poi.category} - {poi.location} */}
        {/* <button onClick={() => setShowModal(true)}>Adopt {poi.name}</button>
          <p>{poi.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adope {poi.name} ?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(poi);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null} */}
        {/* </h2> */}
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
