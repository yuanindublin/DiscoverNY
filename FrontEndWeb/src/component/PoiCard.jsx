import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useItinerary from "../context/itineraryContext";
import empire from "../assets/categories/empire.jpg";

const PoiCard = ({ name, images, id, tags, location, zone }) => {
  const { products, addToCart, removeFromCart } = useItinerary();
  const [isincart, setIsInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const productIsInCart = products.find((product) => product.id === id);

    if (productIsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [products, name]);

  const handleClick = (e) => {
    // const product = { name, images, id, tags, addr_city, zone };
    const product = { name, images, id, tags, location, zone };
    e.stopPropagation(); // Prevent the click event from bubbling up

    if (isincart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };

  const imageUrl =
    // images.length > 0 ? images[0].image : "./assets/categories/empire.jpg";
    images.length > 0 ? images[0].image : empire;

  return (
    <Wrapper
      background={imageUrl}
      onClick={() => {
        navigate(`/details/${id}`);
      }}
    >
      <AddButton onClick={handleClick} isincart={isincart}>
        {/* <p>{isInCart ? "-" : "+"}</p> */}
        <p>{isincart ? "❤️" : "♥"}</p>
      </AddButton>
      <TextContainer
      // onClick={() => {
      //   navigate(`/details/${id}`);
      // }}
      >
        <Title>{name}</Title>
        <Subtitle>⛳️ {location}</Subtitle>
      </TextContainer>
    </Wrapper>
  );
};

export default PoiCard;

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

const AddButton = styled.div`
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
