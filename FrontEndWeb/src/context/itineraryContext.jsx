import { createContext, useReducer, useContext } from "react";
import itineraryReducer, { initialState } from "./itineraryReducer";

const ItineraryContext = createContext(initialState);

export const ItineraryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itineraryReducer, initialState);

  const addToCart = (product) => {
    const isProductInCart = state.products.some(
      (item) => item.id === product.id
    );

    if (!isProductInCart) {
      const updatedCart = state.products.concat(product);
      updatePrice(updatedCart);
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          products: updatedCart,
        },
      });
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = state.products.filter(
      (currentProduct) => currentProduct.id !== product.id
      // (currentProduct) => currentProduct.name !== product.name
    );

    updatePrice(updatedCart);

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCart,
      },
    });
  };

  const updatePrice = (products) => {
    let total = 0;
    // products.forEach((product) => (total += product.price));
    products.forEach((product) => (total += product.id));

    dispatch({
      type: "UPDATE_PRICE",
      payload: {
        total,
      },
    });
  };

  const value = {
    total: state.total,
    products: state.products,
    addToCart,
    removeFromCart,
  };
  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};

const useItinerary = () => {
  const context = useContext(ItineraryContext);

  if (context === undefined) {
    throw new Error("useItinerary must be used within itineraryContext");
  }

  return context;
};

export default useItinerary;
