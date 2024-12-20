/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import TacoLogo from '@/public/img/TacoLogo.png'; // This import is correct for static assets
import Link from 'next/link';
const Navbar = () => {
    return (
      <div className="navbar bg-MyDYellow rounded-b-sm text-white h-20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
              <li>
        <Link href="./">Homepage</Link>
      </li>
      <li>
        <Link href="../LogSign">Login</Link>
      </li>
      
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          {/* Corrected image usage */}
          <img src={TacoLogo.src} alt="Taco Logo" className="h-10 w-10 object-cover mr-2" />
          <a className="font-sans- text-2xl">Taco Restaurant</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    );
};

export default Navbar;
