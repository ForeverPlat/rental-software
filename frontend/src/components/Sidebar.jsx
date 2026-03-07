import React from "react";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { HiArchiveBox } from "react-icons/hi2";
import { FaInbox } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

import "../styles/Sidebar.css";
import { useAuth } from "../features/auth/AuthContext";

const items = [
  { name: "Home", path: "/home", icon: <HiHome /> },
  { name: "Bookings", path: "/bookings", icon: <FaInbox /> },
  { name: "Customers", path: "/customers", icon: <BsPersonFill /> },
  { name: "Inventory", path: "/inventory", icon: <HiArchiveBox /> },
];

const Sidebar = ({ collapsed }) => {
  const { logout } = useAuth();

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <nav className="nav-items">
        {items.map(({ name, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <span className="icon">{icon}</span>
            {!collapsed && <span className="label">{name}</span>}
          </NavLink>
        ))}
      </nav>

      <button className="logout" onClick={logout}>
        <MdLogout />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
