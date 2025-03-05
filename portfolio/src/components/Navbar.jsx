import React, { useState } from "react";
import { FiMenu, FiX, FiHome, FiUser, FiPhone, FiBriefcase } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Track if the sidebar is open

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the sidebar when hamburger icon is clicked
  };

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling to the section
      });
    }
    setIsOpen(false); // Close the sidebar when a link is clicked
  };

  return (
    <nav className="navbar">
      <a
        href="#about"
        className="logo"
        onClick={(e) => {
          e.preventDefault();
          handleScroll("about"); // Scroll to the "about" section
        }}
      >
        <span className="K">K</span>AVITA
      </a>
      {/* Hamburger menu - only visible on mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        <FiMenu />
      </div>
      {/* Sidebar navigation - only visible when menu is open */}
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        {/* Close icon inside the sidebar */}
        <div className="close-icon" onClick={toggleMenu}>
          <FiX />
        </div>
        <li>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("home");
            }}
          >
            <FiHome /> Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("about");
            }}
          >
            <FiUser /> About
          </a>
        </li>
        <li>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("projects");
            }}
          >
            <FiBriefcase /> Projects
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("contact");
            }}
          >
            <FiPhone /> Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
