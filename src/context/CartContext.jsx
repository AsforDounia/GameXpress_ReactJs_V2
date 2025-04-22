import React, { createContext, useContext, useState } from 'react';
import api, { apiV2 } from '../api/axios';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartDetails, setCartDetails] = useState([]);
  const { isAuthenticated } = useAuth();

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

  const addToCart = async (product) => {
    try {
      if (isAuthenticated) {
        const data = {
          quantity: 1,
        };
        const response = await apiV2.post(`AddToCart/${product.id}`, data);
        // console.log(cartDetails);
      }
      else {
        const response = await api.get("AddToCart/Guest/{product.id}");
        console.log(response);
      }
    } catch (error) {
      console.error("Error Add to Cart:", error);
    }
  }

  // const updateQuantity = async (id, qty) => {
  //   try{
  //     const response = api.post('v2/updatequantity', qty , {
  //       headers: {
  //       'X-HTTP-Method-Override': 'PUT'
  //       }
  //   });
  //   }
  const updateQty = async (id, qty) => {
    try {
      const response = await apiV2.post(`/updatequantity/${id}`, { quantity: qty }, {
        headers: {
          'X-HTTP-Method-Override': 'PUT'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  // if (qty <= 0) return removeFromCart(id);
  // setPanier((prev) =>
  //   prev.map((item) =>
  //     item.id === id ? { ...item, quantite: qty } : item
  //   )
  // );
  // };

  const removeFromCart = async (id) => {
    try {
      const response = await apiV2.delete(`/destroyProductForClient/${id}`);
      setCartDetails((prev) => Object.entries(prev).filter((item) => item.product_id !== id));
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <CartContext.Provider value={{ getCart, cartDetails, addToCart, updateQty, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);