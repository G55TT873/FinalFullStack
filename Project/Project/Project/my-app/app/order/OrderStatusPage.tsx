"use client";

import { useEffect, useState } from "react";

type Order = {
  _id: string;
  customerEmail: string;
  status: string;
};

type Review = {
  orderId: string;
  rating: number;
  review: string;
};

export default function OrderStatus() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Fetch data initially
    fetchOrders();

    // Set up interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchOrders, 10000); // 10000 ms = 10 seconds

    // Cleanup the interval when component unmounts or re-renders
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once

  const handleReviewSubmit = async () => {
    if (selectedOrderId && rating > 0) {
      const newReview = {
        orderId: selectedOrderId,
        rating,
        review,
      };
  
      try {
        const response = await fetch("http://localhost:5000/save-review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API error:", errorData);
          alert(`Failed to submit review: ${errorData.message}`);
          return;
        }
  
        const result = await response.json();
        console.log("Review submitted:", result);
        setReviews([...reviews, newReview]);
        alert("Review submitted successfully!");
        setRating(0);
        setReview("");
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Failed to submit review.");
      }
    } else {
      alert("Please select an order and provide a rating.");
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Status</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Rate Service</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="hover:bg-gray-50"
              onClick={() => setSelectedOrderId(order._id)}
            >
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.customerEmail}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">
                {selectedOrderId === order._id && (
                  <>
                    <div className="flex items-center">
                      {/* Rating Stars */}
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`cursor-pointer ${
                            rating >= star ? "text-yellow-500" : "text-gray-300"
                          }`}
                          onClick={() => setRating(star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <textarea
                      className="mt-2 p-2 border border-gray-300 rounded w-full"
                      placeholder="Write your review..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                    <button
                      onClick={handleReviewSubmit}
                      className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Submit Review
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="border-b py-2">
                <p>
                  <strong>Order {review.orderId}:</strong> {review.review}
                </p>
                <p>Rating: {review.rating} ★</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
