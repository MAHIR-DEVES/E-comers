import React, { createContext, useContext, useState } from 'react';

// 1. Context create করা
const CartContext = createContext();

// 2. Provider তৈরি করা
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // add to cart function
  const addToCart = product => {
    setCartItems(prev => [...prev, product]);
  };

  // remove from cart function (optional)
  const removeFromCart = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
export const useCart = () => useContext(CartContext);
