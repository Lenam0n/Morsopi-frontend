// src/container/Navbar/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import "./Navbar.css";

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Morsopi
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-item">
              Home
            </Link>
          </li>
          <li className="navbar-item dropdown">
            <span className="dropdown-title">
              Builder <FaChevronDown className="dropdown-icon" />
            </span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/mermaid-builder" className="dropdown-item">
                  Mermaid Builder
                </Link>
              </li>
              <li>
                <Link to="/struktogramm-builder" className="dropdown-item">
                  Struktogramm Builder
                </Link>
              </li>
              <li>
                <Link to="/cv-builder" className="dropdown-item">
                  CV Builder
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div id="bufferblock" style={{ width: "auto" }}>
              BUFFERBLOCK
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
