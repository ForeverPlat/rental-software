import React from 'react'
import { RiDashboard3Line } from "react-icons/ri";
import { FaRegCalendarMinus } from "react-icons/fa6";
import { BsInbox } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";

const sidebarItems = [
    { name: "Dashboards", path: "/dashboard", icon: <RiDashboard3Line /> },
    { name: "Calendar", path: "/calendar", icon: <FaRegCalendarMinus /> },
    { name: "Bookings", path: "/bookings", icon: <BsInbox /> },
    { name: "Customer", path: "/customer", icon: <FaRegUser /> },
    { name: "Inventory", path: "/inventory", icon: <MdOutlineInventory2 /> }
]


const Sidebar = () => {
  return (
    <nav>
      {
        sidebarItems.map(({name, path, icon}) => (
          <div>{icon}{name}</div>
        ))
      }
    </nav>
  )
}

export default Sidebar