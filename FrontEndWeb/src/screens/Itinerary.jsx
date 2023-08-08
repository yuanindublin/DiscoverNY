// import React, { useState, useEffect, useContext } from "react";
import React from "react";
// import AddedPoiContext from "../AddedPoiContext";
import useItineray from "../context/itineraryContext";
import PoiInCart from "../component/PoiInCart";
import { Accordion } from "react-bootstrap";

export default function Itinerary() {
  // const [addedPois] = useContext(AddedPoiContext);
  const { products, total } = useItineray();
  return (
    <div className="search-mid">
      {/* <div> */}
      {/* <div>Your cart total is {total}.00$</div> */}
      <form>
        {!products.length ? (
          <h1>No POIs in itinerary</h1>
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
      </form>
    </div>
  );
}
