import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // for navigation
import { FaTachometerAlt, FaUsers, FaCogs, FaSignOutAlt } from "react-icons/fa"; // for icons
import { useAuth } from "../ProtectedRoute/AuthProvider";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { handleLogout, user } = useAuth()
  const { pathname } = useLocation()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out`}
      >
        <div className={`flex items-center ${!isSidebarOpen ? 'justify-center' : 'justify-between'} p-4 border-b border-gray-700`}>
          <h1
            className={`text-xl font-bold transition-all duration-300 ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            {user.role === "admin" ? "Admin" : "Doctor"} Panel
          </h1>
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <span className="text-2xl">&#9776;</span>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="mt-6">
          <ul>
            { user.role === "admin" ?
            <>
                <li>
                <Link
                    to="/admin"
                    className={`flex items-center ${!isSidebarOpen && 'justify-center'} px-4 py-2 hover:bg-gray-700 transition-colors ${pathname === "/admin" && 'bg-gray-600'}`}
                >
                    <FaTachometerAlt className="mr-4 text-xl" />
                    <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Dashboard
                    </span>
                </Link>
                </li>
                <li>
                <Link
                    to="/admin/user"
                    className={`flex items-center ${!isSidebarOpen && 'justify-center'} px-4 py-2 hover:bg-gray-700 transition-colors ${pathname === "/admin/user" && 'bg-gray-600'}`}
                >
                    <FaUsers className="mr-4 text-xl" />
                    <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Users
                    </span>
                </Link>
                </li>
                <li>
                <Link
                    to="/admin/appoinment"
                    className={`flex items-center ${!isSidebarOpen && 'justify-center'} px-4 py-2 hover:bg-gray-700 transition-colors`}
                >
                    <FaUsers className="mr-4 text-xl" />
                    <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Appoinment
                    </span>
                </Link>
                </li>
                <li>
                  <Link
                      to="/my-profile"
                      className={`flex items-center ${!isSidebarOpen && 'justify-center'} px-4 py-2 hover:bg-gray-700 transition-colors`}
                  >
                      <FaUsers className="mr-4 text-xl" />
                      <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                        Profile
                      </span>
                  </Link>
                </li>
            </> : <>
                <li>
                    <Link 
                        to={'/doctor'}
                        className={`flex items-center ${!isSidebarOpen && 'justify-center'} px-4 py-2 hover:bg-gray-700 transition-colors ${pathname === "/doctor" && 'bg-gray-600'}`}
                    >
                        <CgProfile className="mr-4 text-xl" />
                        <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                            Home
                        </span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to={'/doctor/appoinment'}
                        className={`flex items-center ${!isSidebarOpen && 'justify-center'} px-4 py-2 hover:bg-gray-700 transition-colors ${pathname === "/doctor/appoinment" && 'bg-gray-600'}`}
                    >
                        <CgProfile className="mr-4 text-xl" />
                        <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                            Appoinment
                        </span>
                    </Link>
                </li>
                <li>
                  <Link
                      to="/my-profile"
                      className={`flex items-center ${!isSidebarOpen && 'justify-center'} px-4 py-2 hover:bg-gray-700 transition-colors`}
                  >
                      <FaUsers className="mr-4 text-xl" />
                      <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                        Profile
                      </span>
                  </Link>
                </li>
            </>}
            <li>
              <p
                className={`flex items-center ${!isSidebarOpen && 'justify-center'} px-4 py-2 hover:bg-gray-700 transition-colors cursor-pointer`}
                onClick={() => {
                    handleLogout()
                }}
              >
                <FaSignOutAlt className="mr-4 text-xl" />
                <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                  Logout
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
  );
};

export default Sidebar;
