import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPramas from "./SearchParams";
import Details from "./Details";
import AdoptedPetContext from "./AdoptedPetContext";
//Map-box
import Map from "./screens/Map";
import PoisMap from "./screens/PoisMap";
import Login from "./screens/Login";
import Register from "./screens/Register";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPetHook = useState(null);
  return (
    <BrowserRouter>
      {/* <div>
        {" "}
        <Mapbox />{" "}
      </div> */}
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPetHook}>
          <header>
            <Link to="/">
              <h1>Home</h1>
            </Link>
            <Link to="/">
              <h1>Discover</h1>
            </Link>
            <Link to="/PoisMap">
              <h1>POIs Map</h1>
            </Link>
            <Link to="/Map">
              <h1>Heat Map</h1>
            </Link>
            <Link to="/">
              <h1>Favorite</h1>
            </Link>
            <Link to="/Login">
              <h1>Sign up/in</h1>
            </Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchPramas />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/PoisMap" element={<PoisMap />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
