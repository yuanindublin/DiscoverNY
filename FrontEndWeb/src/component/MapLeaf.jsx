import React from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  LayersControl,
  LayerGroup,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import fetchTaxizones from "../api/fetchTaxizones.js";
import { Toast } from "react-bootstrap";

const center = [40.75, -73.93];

export default function MapLeaf({
  pois,
  taxizonesData,
  time,
  setChildClicked,
}) {
  // calculate the min and max of busyness level value
  const busynessRanges = {};
  taxizonesData.forEach((taxizone) => {
    const busyIndex = taxizone.predictzone[0]?.busyindex || "Not Busy";
    const busynessLevel = taxizone.predictzone[0]?.busylevel || 0;

    if (!(busyIndex in busynessRanges)) {
      busynessRanges[busyIndex] = { min: busynessLevel, max: busynessLevel };
    } else {
      busynessRanges[busyIndex].min = Math.min(
        busynessRanges[busyIndex].min,
        busynessLevel
      );
      busynessRanges[busyIndex].max = Math.max(
        busynessRanges[busyIndex].max,
        busynessLevel
      );
    }
  });
  const calculateFillColor = (busynessLevel, busyIndex) => {
    // Get the min and max values for the busyness index
    const { min, max } = busynessRanges[busyIndex] || { min: 0, max: 10000 };
    // Calculate the percentage of busyness level within the range (0 to 1)
    const percentage = (busynessLevel - min) / (max - min);
    // console.log("min:", min, "max:", max, "pert:", percentage);
    let colors;
    if (percentage <= 0.25) {
      colors = {
        "Not Busy": "#1f6924", // Green
        "A Little Busy": "#a1c349", // Light Yellow
        Busy: "#f3c053", // Light Red
        "Very Busy": "#ec3f13", // Dark Red
      };
    } else if (percentage <= 0.5) {
      colors = {
        "Not Busy": "#6a8532", // Green
        "A Little Busy": "#94b33d", // Light Yellow
        Busy: "#ffad33", // Light Red
        "Very Busy": "#a50104", // Dark Red
      };
    } else {
      colors = {
        "Not Busy": "#2d6a4f", // Green
        "A Little Busy": "#6a8532", // Light Yellow
        Busy: "#ff7e33", // Light Red
        "Very Busy": "#7a0103", // Dark Red
      };
    }
    const targetColor = colors[busyIndex] || "#1f6924";
    return targetColor;
  };

  // format the time of prediction
  function formatTime(timeString) {
    if (!timeString) return null;

    const options = { hour: "numeric", hour12: true };
    const formattedTime = new Date(timeString).toLocaleTimeString([], options);
    let upperCaseTime = formattedTime.replace(/\b(am|pm)\b/g, (match) =>
      match.toUpperCase()
    );
    if (upperCaseTime.startsWith("0")) {
      upperCaseTime = upperCaseTime.replace("0", "12");
    }
    return upperCaseTime;
  }

  return (
    <div className="map-container">
      {/* Map container and other map layers */}
      <MapContainer
        center={center}
        zoom={12}
        style={{ width: "100vw", height: "100vh" }}
      >
        <TileLayer
          // url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          maxZoom={20}
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        <LayersControl position="topleft">
          {/* Base layers */}
          <LayersControl.BaseLayer
            checked
            name="Show Markers"
            title="Switch to Show Markers"
          >
            <LayerGroup>
              {pois.map(({ id, name, coordinate }) => (
                <Marker
                  key={id}
                  position={[coordinate.latitude, coordinate.longitude]}
                  eventHandlers={{
                    // mouseover: (e) => {
                    //   e.target.openPopup();
                    // },
                    // mouseout: (e) => {
                    //   e.target.closePopup();
                    // },
                    click: () => {
                      setChildClicked(id);
                      console.log("marker clicked is", id, name);
                    },
                  }}
                >
                  {/* <Popup>
                    <div><h4>{name}</h4></div>
                  </Popup> */}
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer
            checked
            name="No Markers"
            title="Switch to No Markers"
          >
            <TileLayer
              // url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
              maxZoom={20}
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay name="Taxizones">
            <LayerGroup>
              {/* {taxizonesData.features.map((taxizones) => { */}
              {taxizonesData.map((taxizones) => {
                const coordinates = taxizones.geometry.coordinates[0].map(
                  (item) => [item[1], item[0]]
                );

                return (
                  <Polygon
                    // <MultiPolygon
                    // key={taxizones.id} // Add a unique key prop here
                    key={taxizones.location_id} // Add a unique key prop here
                    pathOptions={{
                      fillColor: calculateFillColor(
                        taxizones.predictzone[0]?.busylevel || 0,
                        taxizones.predictzone[0]?.busyindex || "Not Busy"
                      ),
                      fillOpacity: 1,
                      weight: 1,
                      opacity: 1,
                      dashArray: 3,
                      color: "white",
                    }}
                    positions={coordinates}
                    eventHandlers={{
                      mouseover: (e) => {
                        const layer = e.target;
                        layer.setStyle({
                          dashArray: "",
                          // fillColor: "#BD0026",
                          fillOpacity: 1,
                          weight: 5,
                          opacity: 1,
                          color: "gray",
                        });
                        layer.bindPopup(
                          `
                          <b >${taxizones.zone}</b><br/>
                         Forecast: <span style="color: ${calculateFillColor(
                           taxizones.predictzone[0]?.busylevel || 0,
                           taxizones.predictzone[0]?.busyindex || "Not Busy"
                         )}; font-weight: bold;">${
                            formatTime(taxizones.predictzone[0]?.time) || "N/A"
                          }</span><br/>
                          Busyness Index: <span style="color: ${calculateFillColor(
                            taxizones.predictzone[0]?.busylevel || 0,
                            taxizones.predictzone[0]?.busyindex || "Not Busy"
                          )}; font-weight: bold;">
                                ${taxizones.predictzone[0]?.busylevel}
                              </span><br/>
                              Busyness Level: <span style="color: ${calculateFillColor(
                                taxizones.predictzone[0]?.busylevel || 0,
                                taxizones.predictzone[0]?.busyindex ||
                                  "Not Busy"
                              )}; font-weight: bold;">${
                            taxizones.predictzone[0].busyindex
                          }</span>`
                        );
                        layer.openPopup();
                      },
                      mouseout: (e) => {
                        const layer = e.target;
                        layer.setStyle({
                          fillOpacity: 1,
                          weight: 2,
                          dashArray: "3",
                          color: "white",
                          // fillColor: "#FD8D3C",
                        });
                        layer.closePopup();
                      },
                      // click: (e) => {},
                    }}
                  />
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}
