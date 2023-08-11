import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useItinerary from "../context/itineraryContext";
import empire from "../assets/categories/empire.jpg";
import { Button, Card, Carousel, Image, Stack, Badge } from "react-bootstrap";

// const busybadge = [
//   { badge: "success", busy: "Not Busy" },
//   { badge: "warning", busy: "A little Busy" },
//   { badge: "warning", busy: "Busy" },
//   { badge: "danger", busy: "Very Busy" },
// ];

const busybadge = {
  "Not Busy": "success",
  "A little Busy": "warning",
  Busy: "warning",
  "Very Busy": "danger",
};

//format time
const formatTime = (time) => {
  const hours = time === 24 ? 12 : time % 12 || 12;
  const AmPm = time == 24 || time < 12 ? "AM" : "PM";
  return ` ${hours} ${AmPm}`;
};

const MapListCard = ({
  name,
  images,
  id,
  tags,
  location,
  zone,
  opening_hours,
  website,
  predictions,
  time,
  selected,
  refProp,
}) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const { products, addToCart, removeFromCart } = useItinerary();
  const [isincart, setIsInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const productIsInCart = products.find((product) => product.name === name);

    if (productIsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [products, name]);

  //   const product = { name, images, id, tags, location, zone };
  const handleClick = () => {
    const product = {
      name: name,
      images: images,
      id: id,
      tags: tags,
      addr_city: location,
      zone: zone,
      predictions: predictions,
    };
    if (isincart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };

  //Select the predictions time
  const selectedTimePrediction = predictions.find(
    (prediction) =>
      prediction.time && new Date(prediction.time).getUTCHours() + 1 == time
  );
  const busyIndex = selectedTimePrediction
    ? selectedTimePrediction.busyindex.toString()
    : "N/A";

  return (
    <Card
      style={{
        width: "18rem",
        marginTop: "10px",
        boxShadow: "0px 10px 20px rgba(52, 53, 99, 0.2)",
      }}
    >
      {/* <Card.Img variant="top" src={imageUrl} /> */}{" "}
      <div style={{ height: "200px" }}>
        {" "}
        {/* Set a fixed height */}
        <Carousel style={{ height: "200px", overflow: "hidden" }}>
          {images.map((imageObj, index) => (
            <Carousel.Item key={index}>
              <Image
                //   className="d-block w-100"
                src={imageObj.image}
                //   alt={`Slide ${index}`}
                fluid
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <Card.Body>
        <Card.Title>
          {name}
          <AddMapButton onClick={handleClick} isincart={isincart}>
            <p>{isincart ? "❤️" : "♥"}</p>
          </AddMapButton>
        </Card.Title>
        Forecast:{formatTime(time)}
        {selectedTimePrediction && ( // Check if selectedTimePrediction is defined
          <>
            {"  "}
            <Badge bg={busybadge[busyIndex]} style={{ fontSize: "16px" }}>
              {busyIndex}
            </Badge>
          </>
        )}
        <Card.Text>
          <p className="no-padding-margin">
            Open Time: {opening_hours}
            <br />
            {/* <p className="no-padding-margin"> */}
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </p>
        </Card.Text>
        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            onClick={() => {
              navigate(`/details/${id}`);
            }}
          >
            Go Detail
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MapListCard;

const Wrapper = styled.div`
  display: grid;
  align-items: flex-end;
  width: 240px;
  height: 340px;
  border-radius: 20px;
  box-shadow: 0px 20px 40px rgba(52, 53, 99, 0.2),
    0px 1px 3px rgba(0, 0, 0, 0.05);
  background: ${(props) =>
    props.background && `url(${props.background}) center no-repeat`};
  background-size: 300px;
  overflow: hidden;
  position: relative;
`;

const AddMapButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  right: 30px;
  width: 30px;
  height: 30px;
  // background: ${(props) => (props.isincart ? "#E55336" : "rgba(0,0,0,0)")};
  background: ${(props) => (props.isincart ? "#E55336" : "#60c95d")};
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;

  :hover {
    transform: scale(1.2);
    transition: 1s;
  }

  p {
    font-size: 20px;
    margin: 0;
    color: white;
  }
`;

const TextContainer = styled.div`
  display: grid;
  gap: 10px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  width: 100%;
  padding: 20px;
`;

const Title = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  margin: 0;
  font-weight: bold;
  color: #ffffff;
  margin: 0px;
`;

const Subtitle = styled.p`
  font-weight: normal;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0px;
`;

const BucketButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  right: 30px;
  width: 30px;
  height: 30px;
  // background: ${(props) => (props.isInCart ? "#E55336" : "rgba(0,0,0,0)")};
  background: ${(props) => (props.isInCart ? "#E55336" : "#60c95d")};
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;

  :hover {
    transform: scale(1.2);
    transition: 1s;
  }

  p {
    font-size: 20px;
    margin: 0;
    color: white;
  }
`;
