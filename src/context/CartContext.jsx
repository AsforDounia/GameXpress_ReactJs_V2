import React, { createContext, useContext, useState } from 'react';
import { apiV2 } from '../api/axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartDetails, setCartDetails] = useState([]);

    const getCart = async () => {
        try {
          const response = await apiV2.get("categories");
          setCartDetails(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

  return (
    <CartContext.Provider value={{ getCart , cartDetails }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);