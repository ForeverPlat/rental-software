import React from "react";
import "../styles/UserDropdown.css";

const UserDropdown = ({ user, goProfile, goSettings, handleLogout }) => {
  return (
    <div className="user-dropdown">
      <div className="dropdown-profile">
        <div className="dropdown-avatar">{user?.username?.charAt(0)}</div>

        <div className="dropdown-user-info">
          <span className="dropdown-username">{user?.username}</span>
          <span className="dropdown-email">{user?.email}</span>
        </div>
      </div>

      <div className="dropdown-divider" />

      <button onClick={goProfile}>Profile</button>
      <button onClick={goSettings}>Settings</button>

      <div className="dropdown-divider" />

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserDropdown;
