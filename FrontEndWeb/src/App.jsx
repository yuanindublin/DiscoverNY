import React from "react";
import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPramas from "./screens/SearchParams";
import Details from "./component/Details";
import { ItineraryProvider } from "./context/itineraryContext";
import Map from "./screens/Map";
import PoisMap from "./screens/PoisMap";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Itinerary from "./screens/Itinerary";
import Home from "./screens/Home";
import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";

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
    // <ItineraryProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ItineraryProvider>
          <Navbar
            className="navbar"
            style={{ backgroundColor: "#e3f2fd" }}
            // fixed="top"
          >
            <Container fluid>
              <Navbar.Brand expand="lg" href="#home">
                Travel in Manhattan
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="mx-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/Discover">Discover</Nav.Link>
                  <Nav.Link href="/Map">Map</Nav.Link>
                  <Nav.Link href="/Itinerary">Itinerary</Nav.Link>
                  <Nav.Link href="/Login">Sign up/in</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/Discover" element={<SearchPramas />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/PoisMap" element={<PoisMap />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Itinerary" element={<Itinerary />} />
          </Routes>
        </ItineraryProvider>
      </QueryClientProvider>
    </BrowserRouter>
    // </ItineraryProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
