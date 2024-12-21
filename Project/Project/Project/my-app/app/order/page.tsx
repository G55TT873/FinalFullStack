'use client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Order from './order';
import OrderStatusPage from './OrderStatusPage';

const Page = () => {
  return (
    <Router>
      <Routes>
        <Route path="/order" element={<Order />} />
        <Route path="/OrderStatusPage" element={<OrderStatusPage />} />
      </Routes>
    </Router>
  );
};

export default Page;