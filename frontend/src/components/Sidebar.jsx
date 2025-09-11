import React from 'react'
import { useNavigate } from 'react-router-dom';

import { RiDashboard3Line } from "react-icons/ri";
import { FaRegCalendarMinus } from "react-icons/fa6";
import { LuInbox } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";

const sidebarItems = [
    { name: "Dashboards", path: "/dashboard", icon: <RiDashboard3Line /> },
    { name: "Calendar", path: "/calendar", icon: <FaRegCalendarMinus /> },
    { name: "Bookings", path: "/bookings", icon: <LuInbox /> },
    { name: "Customer", path: "/customer", icon: <FaRegUser /> },
    { name: "Inventory", path: "/inventory", icon: <MdOutlineInventory2 /> }
]


const Sidebar = () => {

  const navigate = useNavigate();

  return (
    <nav>
      {
        sidebarItems.map(({ name, path, icon }) => (
          <div key={path} onClick={() => navigate(path)}>{icon}{name}</div>
        ))
      }
    </nav>
  )
}

export default Sidebar