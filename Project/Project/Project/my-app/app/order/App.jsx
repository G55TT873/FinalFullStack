"use client";

import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [menu] = useState([
    {
      id: 1,
      name: 'Chicken Taco',
      description: 'A delicious chicken taco with fresh vegetables and salsa.',
      price: 150,  // Adjusted for Egyptian Pounds
      image: './images/ChickenTaco.jpg',
    },
    {
      id: 2,
      name: 'Beef Taco',
      description: 'A tasty beef taco with cheese, lettuce, and sour cream.',
      price: 250,  // Adjusted for Egyptian Pounds
      image: './images/Beef Taco.jpg',
    },
    {
      id: 3,
      name: 'Vegetarian Taco',
      description: 'A healthy vegetarian taco with grilled veggies and guacamole.',
      price: 90,  // Adjusted for Egyptian Pounds
      image: './images/Vegetarian Taco.jpg',
    },
  ]);

  const [cart, setCart] = useState([]);

  // Add item to the cart or increase the quantity if it already exists
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // If the item is already in the cart, increase the quantity by 1
        const updatedCart = prevCart.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        return updatedCart;
      } else {
        // If it's a new item, add it with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Decrease item quantity, or remove it if the quantity is 1
  const decreaseQuantity = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            // Decrease the quantity by 1 if it's greater than 1
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // Remove the item if its quantity is 1
            return null;
          }
        }
        return item;
      }).filter(item => item !== null); // Filter out the null values (items that should be removed)
      
      return updatedCart;
    });
  };

  // Increase item quantity
  const increaseQuantity = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return updatedCart;
    });
  };

  // Calculate total price of the cart in EGP
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Welcome to Taco House</h1>
        <p>Select your favorite tacos and add them to your cart</p>
      </div>

      <div className="menu">
        {menu.map((item) => (
          <div className="menu-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="price">{`EGP ${item.price.toFixed(2)}`}</div>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-details">
                    <p>
                      {item.quantity} x {item.name}
                    </p>
                    <p>{`EGP ${(item.price * item.quantity).toFixed(2)}`}</p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      className="decrease-btn"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -1
                    </button>
                    <button
                      className="increase-btn"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +1
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <strong>{`Total Price: EGP ${calculateTotal().toFixed(2)}`}</strong>
            </div>
            <div className="cart-actions">
              <button onClick={() => alert('Proceeding to checkout!')}>Checkout</button>
            </div>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default App;
