import React, { useState } from "react";
import styled from "styled-components";
import HomeResults from "../component/HomeResults";
import { useQuery } from "@tanstack/react-query";
// import fetchSearch from "../apis/fetchSearch";
import { Button, Form, Placeholder } from "react-bootstrap";
import axios from "axios";

async function fetchSearch({ queryKey }) {
  const { category } = queryKey[1];
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/POIs/tag/`);
    const categoryURL = response.data[category];
    const res = await axios.get(categoryURL);
    if (!res || !res.data) {
      throw new Error(`poi search not successful for category: ${category}`);
    }
    return res.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

const Home = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  // const [category, setCategory] = useState("attraction");

  const [requestParams, setRequesParams] = useState({ category: "attraction" });
  // const [pois, setPois] = useState([]);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pois = results?.data ? results.data : [];

  const handleClick = (index) => {
    setSelectedItemIndex(index);
    // setCategory(categories[index].name);
    setRequesParams({ category: categories[index].name });
  };

  const categories = [
    { name: "attraction", icon: "⛩️" },
    { name: "museum", icon: "🏛️" },
    { name: "shopping", icon: "🛍️" },
    { name: "entertainment", icon: "🎭" },
    { name: "library", icon: "📚" },
    { name: "theatre", icon: "🎟️" },
    { name: "park", icon: "🌳" },
    { name: "zoo", icon: "🦓" },
  ];

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <h4>Category</h4>

        <CategoryWrapper>
          <CategoryContainer>
            {categories.map((category, index) => (
              // <Wrapper
              //   key={index}
              //   // isSelected={selectedItemIndex === index}
              //   onClick={() => handleClick(index)}
              // >
              //   <TextContainer isSelected={selectedItemIndex === index}>
              //     <Title>
              //       {category.icon} {category.name}
              //     </Title>
              //   </TextContainer>
              // </Wrapper>
              <Button
                variant="light"
                key={index}
                onClick={() => handleClick(index)}
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </CategoryContainer>
        </CategoryWrapper>
      </div>
      <div style={{ marginTop: "10px" }}>
        <h4>Interest</h4>
      </div>
      <HomeResults pois={pois} />
    </>
  );
};

export default Home;

const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  @media (max-width: 768px) {
    grid-template-columns: auto; /* Change to a single column layout on smaller screens */
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow the items to wrap to a new line if there's not enough space */
  gap: 10px; /* Gap between each CategoryCard */
`;
const Wrapper = styled.div`
  display: grid;
  align-items: flex-end;
  width: 190px;
  height: 55px;
  border-radius: 10px;
  box-shadow: 0px 20px 40px rgba(52, 53, 99, 0.2),
    0px 1px 3px rgba(0, 0, 0, 0.05);
  // background-size: 200px;
  overflow: hidden;
  position: relative;
  // border: 1px solid #333;
`;

const TextContainer = styled.div`
  display: grid;
  // gap: 10px;
  background: ${(props) =>
    props.isSelected ? "rgba(0, 0, 0, 0.1)" : "rgba(0,0,0,0)"};
  // backdrop-filter: blur(2px);
  width: 100%;
  padding: 10%;

  :hover {
    transform: scale(1.07);
    transition: 0.5s;
  }

  p {
    font-size: 20px;
    margin: 0;
    color: #333;
  }
`;

const Title = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  margin: 0;
  font-weight: normal;
  color: black;
  margin: 0px;
`;
