import React, { createContext, useContext, useState } from 'react';
import api, { apiV1, apiV2 } from '../api/axios';
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
      // console.log("getCart (auth) : ", response.data);
    setCartDetails(response.data);

    } else {
      const CartItems = localStorage.getItem("cartItems");
      if (CartItems) {
        setCartDetails(JSON.parse(CartItems));
      }
    }


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

        const cartData = localStorage.getItem('cartItems');
        let cartItems = cartData ? JSON.parse(cartData) : [];
      
        const existingItemIndex = cartItems.findIndex(item => item.product_id === product.id);
      
        if (existingItemIndex !== -1) {

          if (cartItems[existingItemIndex].quantity < product.stock) {
            cartItems[existingItemIndex].quantity += 1;
          } else {
            alert("Not enough stock available");
          }
        } else {
          const newItem = {
            product_id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            stock: product.stock,
            image: product.product_images.length > 0
              ? product.product_images[0].url
              : null
          };
      
          cartItems.push(newItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  
    } catch (error) {
      console.error("Error Add to Cart:", error);
    }
  }



  const mergeCart = async () => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const items = JSON.parse(cartItems);
      for (const item of items) {
        await addToCart(item);
      }
      localStorage.removeItem("cartItems");
    }
  };


  const checkout = async () => {
    try {
      const response = await api.post("v3/checkout");
      window.open(response.data.session.url, "_blank");
    }
    catch(error){
      console.error("Error Checkout:", error);
    }
  }
  return (
    <CartContext.Provider value={{ getCart, cartDetails, addToCart , mergeCart , checkout}}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);