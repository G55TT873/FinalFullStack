'use client';

import React, { useState, useEffect } from "react";
import styles from './order.module.css';

const Order = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");

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
        setOrderStatus("Order placed successfully!");
      } else {
        setOrderStatus(result.error || "Failed to place the order.");
      }
    } catch (error) {
      setOrderStatus("Error placing order.");
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Order Your Recipe</h1>
      <div className={styles.recipeSelect}>
        <h2 className={styles.label}>Select a Recipe</h2>
        <select
          className={styles.recipeDropdown}
          onChange={(e) => setSelectedRecipe(e.target.value)}
          value={selectedRecipe || ""}
        >
          <option value="">-- Choose a recipe --</option>
          {recipes.map((recipe) => (
            <option key={recipe._id} value={recipe._id}>
              {recipe.name}
            </option>
          ))}
        </select>
      </div>
      <button className={styles.orderButton} onClick={handleOrder}>Place Order</button>
      {orderStatus && <p className={styles.status}>{orderStatus}</p>}
    </div>
  );
};

export default Order;
