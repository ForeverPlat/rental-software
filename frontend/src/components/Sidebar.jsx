import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { HiArchiveBox } from "react-icons/hi2";
import { FaInbox } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

import "../styles/Sidebar.css";

const items = [
  { name: "Home", path: "/home", icon: <HiHome /> },
  { name: "Bookings", path: "/bookings", icon: <FaInbox /> },
  { name: "Customers", path: "/customers", icon: <BsPersonFill /> },
  { name: "Inventory", path: "/inventory", icon: <HiArchiveBox /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className="sidebar">
      <nav className="nav-items">
        {items.map(({ name, path, icon }) => {
          const isActive = pathname == path;

          return (
            <button
              key={path}
              className={`sidebar-item ${isActive ? "active" : ""}`}
              onClick={() => navigate(path)}
            >
              <span className="icon">{icon}</span>
              <span className="label">{name}</span>
            </button>
          );
        })}
      </nav>

      <button className="logout">
        <MdLogout />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
