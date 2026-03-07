import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/SettingsSidebar.css";

const SettingsSidebar = () => {
  return (
    <aside className="settings-sidebar">
      <NavLink
        to="profile"
        className={({ isActive }) =>
          `settings-layout-link ${isActive ? "active" : ""}`
        }
      >
        Profile
      </NavLink>

      <NavLink
        to="security"
        className={({ isActive }) =>
          `settings-layout-link ${isActive ? "active" : ""}`
        }
      >
        Security
      </NavLink>

      <NavLink
        to="team"
        className={({ isActive }) =>
          `settings-layout-link ${isActive ? "active" : ""}`
        }
      >
        Team
      </NavLink>

      <NavLink
        to="company"
        className={({ isActive }) =>
          `settings-layout-link ${isActive ? "active" : ""}`
        }
      >
        Company
      </NavLink>

      <NavLink
        to="notifications"
        className={({ isActive }) =>
          `settings-layout-link ${isActive ? "active" : ""}`
        }
      >
        Notifications
      </NavLink>
    </aside>
  );
};

export default SettingsSidebar;
