import React, { createContext, useContext, useState } from 'react';
import { apiV1, apiV2 } from '../api/axios';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartDetails, setCartDetails] = useState([]);
    const { isAuthenticated} = useAuth();

const getCart = async () => {
  try {
    let response;
    if (isAuthenticated) {
      response = await apiV2.get("getCart");
      console.log("getCart (auth) : ", response.data);
    } else {
      console.log("User is not authenticated. Fetching guest cart.");
      response = await apiV2.get("getCart/Guest");
      console.log("getCart (guest) : ", response.data);
    }

    setCartDetails(response.data);

  } catch (error) {
    console.error("Error fetching getCart:", error);
  }
};

    // const getCardGuest = async () => {
    //   try {
    //     const response = await apiV2.get("getCart/Guest");
    //     setCartDetails(response.data);
    //     console.log("getCardGuest : ",response.data);
    //   }
    //   catch (error) {
    //     console.error("Error fetching getCardGuest:", error);
    //   }
    // };

  return (
    <CartContext.Provider value={{ getCart , cartDetails }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);