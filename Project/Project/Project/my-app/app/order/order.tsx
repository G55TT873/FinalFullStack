'use client';

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './order.module.css';

const Order = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("userEmail");
    if (loggedInEmail) {
      setCustomerEmail(loggedInEmail);
    } else {
      setOrderStatus("Please log in to place an order.");
    }

    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleOrder = async () => {
    if (!selectedRecipe) {
      setOrderStatus("Please select a recipe to order.");
      return;
    }

    if (!customerEmail) {
      setOrderStatus("You need to be logged in to place an order.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerEmail, recipeId: selectedRecipe }),
      });

      const result = await response.json();
      if (response.ok) {
        // Navigate to the OrderStatusPage with order information
        navigate("/OrderStatusPage", { state: { orderId: result.orderId } });
      } else {
        setOrderStatus(result.error || "Failed to place the order.");
      }
    } catch (error) {
      setOrderStatus("Error placing order.");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to Taco House</h1>
        <p className={styles.subtitle}>Select your favorite recipe and place your order</p>
      </div>

      <div className={styles.menu}>
        {recipes.map((recipe) => (
          <div className={styles.menuItem} key={recipe._id}>
            <img src={recipe.image} alt={recipe.name} className={styles.menuImage} />
            <h3 className={styles.menuItemName}>{recipe.name}</h3>
            <p className={styles.menuItemDescription}>{recipe.description}</p>
            <button
              className={`${styles.addButton} ${selectedRecipe === recipe._id ? styles.selected : ''}`}
              onClick={() => setSelectedRecipe(recipe._id)}
              disabled={selectedRecipe === recipe._id}  // Disable the button once selected
            >
              {selectedRecipe === recipe._id ? "Selected" : "Select Recipe"}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.orderSection}>
        <button className={styles.orderButton} onClick={handleOrder}>Place Order</button>
        {orderStatus && <p className={styles.status}>{orderStatus}</p>}
      </div>
    </div>
  );
};

export default Order;