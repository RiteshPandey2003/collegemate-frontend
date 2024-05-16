import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-gray-700 text-white flex justify-between items-center px-4 py-3 lg:justify-around sticky top-0 z-1000">
      <div className="flex items-center">
        <p className="text-2xl font-extrabold">Colagemate</p>
        {/* Dropdown Menu */}
      </div>

      {/* Profile Link */}
      <div className="flex items-cente">
        <div className="relative ml-4">
          <button
            onClick={toggleDropdown}
            className="text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 focus:outline-none"
          >
            Services
          </button>
          {/* Dropdown Content */}
          {isDropdownOpen && (
            <ul className="absolute top-full left-0 bg-gray-800 text-white rounded-md shadow-lg">
              <li>
                <Link
                  to="/services/pg"
                  className="block px-4 py-2 hover:bg-gray-700 transition duration-300"
                >
                  pg
                </Link>
              </li>
              <li>
                <Link
                  to="/services/food"
                  className="block px-4 py-2 hover:bg-gray-700 transition duration-300"
                >
                  Food
                </Link>
              </li>
              <li>
                <Link
                  to="/services/dress"
                  className="block px-4 py-2 hover:bg-gray-700 transition duration-300"
                >
                  Dress
                </Link>
              </li>
              <li>
                <Link
                  to="/services/store"
                  className="block px-4 py-2 hover:bg-gray-700 transition duration-300"
                >
                  Store
                </Link>
              </li>
            </ul>
          )}
        </div>
        <Link
          to="/profile"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <FiUser className="mr-2" />
          Profile
        </Link>
      </div>
    </header>
  );
};

export default Header;
