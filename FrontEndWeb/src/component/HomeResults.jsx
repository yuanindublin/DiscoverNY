import PoiCard from "./PoiCard";
import styled from "styled-components";

const Results = ({ pois }) => {
  return (
    <ProductsWrapper>
      {!pois.length ? (
        // <h1>No POIs Found</h1>
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      ) : (
        pois.map((poi) => (
          <PoiCard
            key={poi.id}
            name={poi.name}
            tags={poi.tags}
            images={poi.images}
            location={poi.addr_street}
            id={poi.id}
            zone={poi.zone}
          />
        ))
      )}
    </ProductsWrapper>
  );
};

export default Results;

const ProductsWrapper = styled.div`
  //   width: fit-content;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 50px;
  @media (max-width: 768px) {
    grid-template-columns: auto; /* Change to a single column layout on smaller screens */
  }
`;
