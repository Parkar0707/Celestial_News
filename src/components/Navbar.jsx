import React from "react";
import "../assets/css/navbar.css";
import saturn from "../assets/saturn.svg";

const Navbar = ({ handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={saturn}
          alt="Saturn Logo"
          className="navbar-logo"
        />
        <span className="navbar-title">Celestial News</span>
      </div>
    </nav>
  );
};

export default Navbar;
