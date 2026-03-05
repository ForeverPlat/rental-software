import React from "react";
import "../styles/Header.css";
import logo from "../../public/temp-logo.png";
import { useAuth } from "../features/auth/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} /> Renta.
      </div>

      <div className="user-container">
        <div className="circle"></div>
        <div className="user">
          <span className="username">{user?.username}</span>
          <span className="role">{user?.role}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
