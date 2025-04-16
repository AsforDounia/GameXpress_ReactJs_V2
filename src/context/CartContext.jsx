import React, { createContext, useContext, useState } from 'react';
import { apiV2 } from '../api/axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartDetails, setCartDetails] = useState([]);
    const [panier, setPanier] = useState([]);
    const getCart = async () => {
        try {
          const response = await apiV2.get("getCart");
          setCartDetails(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching getCart:", error);
        }
      };

    const addToCart =(product) => {
      setPanier((prev) => {
        const productExists = prev.find((prod) => prod.id === product.id);
        if (productExists) {
          return prev.map((prod) => prod.id === product.id ? { ...prod, quantite: prod.quantite + 1 } : prod);
        }
        else{
          return [...prev, {...product, quantite: 1}];
        }
      });
    };

  return (
    <CartContext.Provider value={{ getCart , cartDetails,panier, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);