import React from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { taxizonesData } from "../data/taxizones.js";

const center = [40.7896239, -73.9598939];
// const center = [40.63463151377654, -97.89969605983609]; //tutorial

export default function Map() {
  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=oDkEvbrhLJWIfjnkB1H0"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {taxizonesData.features.map((taxizones) => {
        const coordinates = taxizones.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        return (
          <Polygon
            // <MultiPolygon
            key={taxizones.id} // Add a unique key prop here
            pathOptions={{
              fillColor: "red",
              fillOpacity: Math.random(),
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: "white",
            }}
            positions={coordinates}
            // eventHandlers={{
            //   mouseover: (e) => {
            //     const layer = e.target;
            //     layer.setStyle({
            //       dashArray: "",
            //       fillColor: "#BD0026",
            //       fillOpacity: 0.7,
            //       weight: 2,
            //       opacity: 1,
            //       color: "white",
            //     });
            //     const taxizonesName = taxizones.properties.zone;
            //     const taxizonesID = taxizones.properties.location_id;
            //     const taxizonesINFO =
            //       taxizones.properties.location_id +
            //       taxizones.properties.location_id;
            //     console.log(taxizonesName, taxizonesID);
            //     layer.bindPopup(taxizonesINFO);
            //   },
            //   mouseout: (e) => {
            //     const layer = e.target;
            //     layer.setStyle({
            //       fillOpacity: 0.7,
            //       weight: 2,
            //       dashArray: "3",
            //       color: "white",
            //       fillColor: "#FD8D3C",
            //     });
            //   },
            // click: (e) => {},
            // }}
          />
        );
      })}
    </MapContainer>
  );
}
