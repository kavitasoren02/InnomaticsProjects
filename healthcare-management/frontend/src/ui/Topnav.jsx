import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaUserMd, FaCalendarCheck, FaUsers, FaCogs } from "react-icons/fa";
import { useAuth } from "../ProtectedRoute/AuthProvider";

const TopNav = () => {
  const { user, handleLogout } = useAuth(); // Fetch user from context
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To toggle mobile menu
  
  // Toggle the mobile menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="bg-blue-900 text-white shadow-md">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Name */}
        <div className="flex items-center">
          <Link className="text-2xl font-semibold" to={'/'}>Doctor Management</Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <span className="text-xl">☰</span> {/* Hamburger icon */}
          </button>
        </div>

        {/* Navigation Links for larger screens */}
        <div className={`hidden md:flex space-x-6`}>
          {user && 
            <>
              <Link to="/appointments" className="hover:text-gray-200 flex items-center">
                <FaCalendarCheck className="mr-2" /> Appointments
              </Link>
              <Link to="/profile" className="hover:text-gray-200 flex items-center">
                <FaCalendarCheck className="mr-2" /> Profile
              </Link>
            </>
          }
          {user ? (
            // If user is logged in, show logout button
            <p
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center"
              onClick={() => {
                handleLogout()
              }}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </p>
          ) : (
            // If user is not logged in, show login button
            <Link
              to="/auth/login"
              className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu - visible only if `isMenuOpen` is true */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 bg-blue-600 text-white py-4 px-6">
          {user &&<Link to="/appointments" className="hover:text-gray-200 flex items-center">
            <FaCalendarCheck className="mr-2" /> Appointments
          </Link>}
          <div className="mt-4">
            {user ? (
              <p
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center"
                onClick={() => {
                    handleLogout()
                }}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </p>
            ) : (
              <Link
                to="/auth/login"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNav;
