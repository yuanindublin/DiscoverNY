import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useItinerary from "../context/itineraryContext";
import empire from "../assets/categories/empire.jpg";
import axios from "axios";
import useUser from "../context/UserContext";

const PoiCard = ({ name, images, id, tags, location, zone, predictions }) => {
  const { products, addToCart, removeFromCart } = useItinerary();
  const [isincart, setIsInCart] = useState(false);
  const [isinbucket, setIsInBucket] = useState(false);
  const { userToken } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const productIsInCart = products.find((product) => product.name === name);

    if (productIsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [products, name]);
  const product = { name, images, id, tags, location, zone, predictions };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up

    if (isincart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
    console.log(`Added ${name} to cart`);
  };

  const handleClickBucket = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up
    axios
      .post(
        `http://127.0.0.1:8000/api/POIs/${id}/like/`,
        {},
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      )
      .then((response) => {
        setIsInBucket(true);
        console.log("userToken:", userToken);
      })
      .catch((error) => {
        navigate("/Login");
        console.log("userToken:", userToken);
      });
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
      <ButtonsContainer>
        <AddButton onClick={handleClick} isincart={isincart}>
          <p>{isincart ? "-" : "+"}</p>
          {/* <p>{isincart ? "❤️" : "♥"}</p> */}
        </AddButton>
        <BucketButton onClick={handleClickBucket} isinbucket={isinbucket}>
          {/* <p>{isincart ? "-" : "+"}</p> */}
          <p>{isinbucket ? "❤️" : "♥"}</p>
        </BucketButton>
      </ButtonsContainer>
      <TextContainer>
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

const BucketButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  left: 30px;
  width: 30px;
  height: 30px;
  // background: ${(props) => (props.isinbucket ? "#E55336" : "rgba(0,0,0,0)")};
  background: ${(props) => (props.isinbucket ? "#E55336" : "#60c95d")};
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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
`;
