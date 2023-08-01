import Poi from "./Poi";

const Results = ({ pois }) => {
  return (
    <div className="search">
      {!pois.length ? (
        <h1>No POIs Found</h1>
      ) : (
        pois.map((poi) => (
          <Poi
            // interests={poi.interests}
            interests="POIs"
            key={poi.id}
            name={poi.name}
            category={poi.tags}
            images={poi.images}
            // location={`${poi.city},${poi.state}`}
            location={poi.addr_city}
            id={poi.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
