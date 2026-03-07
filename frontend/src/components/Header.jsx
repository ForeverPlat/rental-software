import React, { useEffect, useRef, useState } from "react";
import "../styles/Header.css";
import logo from "../../public/temp-logo.png";
import { useAuth } from "../features/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  const goProfile = () => {
    setOpen(false);
    navigate("/settings/profile");
  };

  const goSettings = () => {
    setOpen(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/home")}>
        <img src={logo} /> Renta.
      </div>

      <div
        ref={containerRef}
        className={`user-container ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className="circle"></div>
        <div className="user">
          <span className="username">{user?.username}</span>
          <span className="role">{user?.role}</span>
        </div>

        {open && (
          <UserDropdown
            user={user}
            goProfile={goProfile}
            goSettings={goSettings}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
