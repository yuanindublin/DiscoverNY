import React from "react";
import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPramas from "./screens/SearchParams";
import Details from "./component/Details";
import { ItineraryProvider } from "./context/itineraryContext";
import { UserProvider } from "./context/UserContext";
import Map from "./screens/Map";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Itinerary from "./screens/Itinerary";
import Favorite from "./screens/Favorite";
import Home from "./screens/Home";
import Welcome from "./screens/Welcome";
import { Container, Nav, Navbar } from "react-bootstrap";
import Weather from "./component/Weather";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ItineraryProvider>
            <Navbar />
            <Navbar
              className="navbar"
              style={{ backdropFilter: "blur(5px)" }}
              // fixed="top"
            >
              <Container fluid>
                <Navbar.Brand expand="lg" href="/">
                  <img
                    src="./assets/icons/logo.jpeg"
                    alt="Rain Risk"
                    height="25px"
                    width="25px"
                  />
                  Travel in Manhattan
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mx-auto">
                    <Nav.Link>
                      <Link to="/Home">Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/Discover">Discover</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/Map">Map</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/Itinerary">Itinerary</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/Favorite">BucketList</Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/Login">Sign Up</Link>
                    </Nav.Link>
                  </Nav>
                  <Weather />
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/Discover" element={<SearchPramas />} />
              <Route path="/Map" element={<Map />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Itinerary" element={<Itinerary />} />
              <Route path="/Favorite" element={<Favorite />} />
            </Routes>
          </ItineraryProvider>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
