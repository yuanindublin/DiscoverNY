import React, { useState } from "react";
import { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(""); // Set an initial value

  const updateUserToken = (token) => {
    setUserToken(token);
  };

  return (
    <UserContext.Provider value={{ userToken, updateUserToken }}>
      {children}
    </UserContext.Provider>
  );
};

// export default UserProvider;

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserContext");
  }

  return context;
};

export default useUser;
