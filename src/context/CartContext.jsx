import React, { createContext, useContext, useState } from 'react';
import api, { apiV2 } from '../api/axios';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartDetails, setCartDetails] = useState([]);
  // const [panier, setPanier] = useState([]);
  const { isAuthenticated } = useAuth();
  const getCart = async () => {
    try {
      if (isAuthenticated) {
        console.log("isAuthenticated ");
        const response = await apiV2.get("getCart");
        setCartDetails(response.data);
      }
      else {
        console.log("User is not authenticated. Fetching guest cart.");
        const response = await apiV2.get("getCart/Guest");
        setCartDetails(response.data);
        console.log(response.data);
      }
      console.log("getCart : ", response.data);
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

  const addToCart = async (product) => {
    try {
      if (isAuthenticated) {
        const response = await api.get("AddToCart/{product.id}");
        console.log(response.cart);
        // setPanier((prev) => {
        //   const productExists = prev.find((prod) => prod.id === product.id);
        //   if (productExists) {
        //     return prev.map((prod) => prod.id === product.id ? { ...prod, quantite: prod.quantite + 1 } : prod);
        //   }
        //   else {
        //     return [...prev, { ...product, quantite: 1 }];
        //   }
        // });
      }
      else {
        const response = await api.get("AddToCart/Guest/{product.id}");
        console.log(response);
      }
    } catch (error) {
      console.error("Error Add to Cart:", error);
    }
  }

  return (
    <CartContext.Provider value={{ getCart, cartDetails, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);