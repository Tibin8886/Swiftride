
"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowRight, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navItems = [
    {
      label: "Home",
      to: "/",
      
    },
    { label: "About Us", to: "/about" },
    {
      label: "Service",
      to: "/services",
      
    },
    {
      label: "Cars",
      to: "RentalCars",
      
    },
    {
      label: "Pages",
      to: "/",
      dropdown: [
        { label: "FAQ", to: "/faq" },
        { label: "Blog", to: "/blog" },
      ],
    },
    { label: "Contact Us", to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg" data-aos="fade-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-extrabold">
              <span className="text-orange-500">SWIFT</span>
              <span className="text-gray-900">RIDE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  to={item.to}
                  className="flex items-center text-gray-700 hover:text-orange-500 transition-colors duration-300 text-base font-semibold"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />}
                </Link>
                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 hidden group-hover:block">
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.to}
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-500 hover:text-white transition-colors duration-300 text-sm"
                        aria-label={`Navigate to ${subItem.label}`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
      <Link
        to="/signup"
        className="text-gray-700 hover:text-orange-500 transition-colors duration-300 text-base font-semibold"
        aria-label="Sign up for a new account"
      >
        Sign Up
      </Link>
      <Link
        to="/login"
        className="text-gray-700 hover:text-orange-500 transition-colors duration-300 text-base font-semibold"
        aria-label="Log in to your account"
      >
        Login
      </Link>
      <Link
        to="/dashboard"
        className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center"
        aria-label="Go to dashboard"
      >
        Go To Dashboard <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"} bg-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
          {navItems.map((item, index) => (
            <div key={index}>
              <Link
                to={item.to}
                className="block py-2 text-gray-700 hover:text-orange-500 transition-colors duration-300 text-base font-semibold"
                onClick={toggleMenu}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <div className="pl-4 space-y-2">
                  {item.dropdown.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.to}
                      className="block py-1 text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm"
                      onClick={toggleMenu}
                      aria-label={`Navigate to ${subItem.label}`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="block py-2 text-gray-700 hover:text-orange-500 transition-colors duration-300 text-base font-semibold"
                onClick={toggleMenu}
                aria-label="Go to user dashboard"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-orange-500 transition-colors duration-300 text-base font-semibold"
                aria-label="Log out"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 text-gray-700 hover:text-orange-500 transition-colors duration-300 text-base font-semibold"
                onClick={toggleMenu}
                aria-label="Log in to your account"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block py-2 text-gray-700 hover:text-orange-500 transition-colors duration-300 text-base font-semibold"
                onClick={toggleMenu}
                aria-label="Sign up for a new account"
              >
                Sign Up
              </Link>
              <Link
                to="/booking"
                className="block bg-orange-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 text-center"
                onClick={toggleMenu}
                aria-label="Book a rental car"
              >
                Book A Rental <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
