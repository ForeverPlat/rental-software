import React from "react";
import "../styles/Header.css";
import logo from "../../public/temp-logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} /> Renta.
      </div>

      <div className="user-container">
        <div className="circle"></div>
        <div className="user">
          <span className="username">John Doe</span>
          <span className="role">Owner</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
