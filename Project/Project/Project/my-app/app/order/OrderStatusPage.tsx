'use client'
import React, { useState, useEffect } from 'react';
import styles from './orderStatus.module.css';

const OrderStatus: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ordersPerPage = 5; // Display 5 orders per page

  // Fetch orders and set logged-in email
  useEffect(() => {
    const loggedInEmail = localStorage.getItem('userEmail');
    if (loggedInEmail) {
      setCustomerEmail(loggedInEmail);
    } else {
      setOrderStatus('Please log in to leave a review.');
    }

    const fetchOrders = async () => {
      try {
        console.log(`Fetching orders for: ${loggedInEmail}`);
        const response = await fetch(`http://localhost:5000/get-customer-orders?customerEmail=${loggedInEmail}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrderStatus('Error fetching orders');
      }
    };

    fetchOrders();
  }, []);

  // Handle review submission
  const handleReviewSubmit = async () => {
    if (!selectedOrder) {
      setOrderStatus('Please select an order to review.');
      return;
    }

    if (!rating || !reviewText) {
      setOrderStatus('Please provide a rating and a review.');
      return;
    }

    if (!customerEmail) {
      setOrderStatus('You need to be logged in to submit a review.');
      return;
    }

    const newReview = {
      customerEmail,
      recipeId: selectedOrder,
      reviewText,
      rating,
    };

    try {
      const response = await fetch('http://localhost:5000/save-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setOrderStatus('Review submitted successfully!');
      resetReviewForm();
    } catch (error) {
      setOrderStatus(
        error instanceof Error
          ? `Error submitting review: ${error.message}`
          : 'An unknown error occurred.'
      );
    }
  };

  

  // Reset the review form after submission
  const resetReviewForm = () => {
    setRating(0);
    setReviewText('');
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>Order Dashboard</h1>
        <p>View your orders and leave reviews for completed ones.</p>
      </header>

      <section className={styles.ordersSection}>
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <div>
            <p>No orders found.</p>
            <button
              onClick={() => window.location.href = "http://localhost:3000/order"} // Redirect to order page
              className={styles.submitButton}
            >
              Make an Order
            </button>
          </div>
        ) : (
          <ul className={styles.ordersList}>
            {currentOrders.map((order) => (
              <li key={order._id} className={styles.orderItem}>
                <div className={styles.orderDetails}>
                  <div>
                    <h3>Order #{order._id.slice(0, 8)}...</h3>
                    <p>Status: {order.status}</p>
                    <p>Total: ${order.total || 'N/A'}</p>
                  </div>
                  <button
                    onClick={() =>
                      setSelectedOrder((prev) =>
                        prev === order._id ? null : order._id
                      )
                    }
                    className={styles.submitButton}
                  >
                    {selectedOrder === order._id ? 'Cancel Review' : 'Review Order'}
                  </button>
                </div>
                {selectedOrder === order._id && (
                  <div className={styles.reviewForm}>
                    <div className={styles.starRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`${styles.star} ${rating >= star ? styles.filled : ''}`}
                          onClick={() => setRating(star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <textarea
                      placeholder="Write your review..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className={styles.textarea}
                    />
                    <button onClick={handleReviewSubmit} className={styles.submitButton}>
                      Submit Review
                    </button>
                    {orderStatus && <p className={styles.statusMessage}>{orderStatus}</p>}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {orders.length > ordersPerPage && (
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>
      {orderStatus && <p className={styles.statusMessage}>{orderStatus}</p>}
    </div>
  );
};

export default OrderStatus;
