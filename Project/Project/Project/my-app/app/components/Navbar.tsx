'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);  // State to track visibility
  const [lastScrollY, setLastScrollY] = useState(0);   // To track the previous scroll position

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      // Update last scroll position
      setLastScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-MyYellow bg-opacity-65 shadow-lg transition-all duration-300 ease-in-out ${
        showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%]'
      }`}
      style={{
        zIndex: 1000,
      }}
    >
      <div className="flex justify-between items-center p-4 ">
        <div className="text-3xl font-bold font-serif">Taco Odyssey</div>
        <ul className="flex space-x-6">
          <li><Link href="./">Home</Link></li>
          <li><Link href="../LogSign">Login</Link></li>
          <li><Link href="../Register">Register</Link></li>
          <li><Link href="../AboutUs">About Us</Link></li>
          <li><Link href="../order">Order</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
