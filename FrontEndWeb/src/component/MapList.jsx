import React, { useState, useEffect, createRef } from "react";
import { Button, Card } from "react-bootstrap";
import MapListCard from "./MapListCard";

export default function MapList({ pois, time, childClicked }) {
  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs((refs) =>
      Array(pois.length)
        .fill()
        .map((_, id) => refs[id] || createRef())
    );
  }, [pois]);
  console.log({ childClicked });
  return (
    <div style={{ height: "82vh", overflowY: "scroll" }}>
      {/* <div> */}
      {!pois.length ? (
        // <h1>No POIs Found</h1>
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      ) : (
        pois.map((poi, id) => (
          <div
            ref={elRefs[id]}
            key={id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MapListCard
              poi={poi}
              selected={childClicked === id}
              refProp={elRefs[id]}
              // key={poi.id}
              name={poi.name}
              tags={poi.tags}
              images={poi.images}
              location={poi.addr_street}
              id={poi.id}
              zone={poi.zone}
              opening_hours={poi.opening_hours}
              website={poi.website}
              predictions={poi.predictions}
              time={time}
            />
          </div>
        ))
      )}
    </div>
  );
}
