'use client';
import React, { useState, useEffect } from "react";
import TacoLogo from "@/public/img/TacoLogo.png";

const LoginSign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user email from localStorage or sessionStorage if already logged in
  useEffect(() => {
    const loggedInEmail = localStorage.getItem("userEmail"); // assuming you store it in localStorage
    if (loggedInEmail) {
      setEmail(loggedInEmail); // Auto-fill email if logged in
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/validate-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Save email to localStorage upon successful login
        localStorage.setItem("userEmail", email);

        // Redirect based on the accountType returned by the server
        switch (result.accountType) {
          case "admin":
            window.location.href = "http://localhost:5000/admin"; // Admin page
            break;
          case "chef":
            window.location.href = "http://localhost:5000/chef"; // Chef page
            break;
          case "customer":
            window.location.href = "http://localhost:3000/order"; // Customer order page
            break;
          default:
            setErrorMessage("Unknown account type");
        }
      } else {
        setErrorMessage(result.error || "Incorrect credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Error connecting to the server.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            src={TacoLogo.src}
            alt="Taco Logo"
            className="h-10 w-10 object-cover mr-2"
          />
          Taco
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              {errorMessage && (
                <p className="text-sm font-light text-red-500 mt-2">
                  {errorMessage}
                </p>
              )}
            </form>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account?{" "}
              <a
                href="/Register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSign;
