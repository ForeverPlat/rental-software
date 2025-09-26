import React from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';

import { RiDashboard3Line } from "react-icons/ri";
import { FaRegCalendarMinus } from "react-icons/fa6";
import { LuInbox } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";

const topItems = [
  { name: "Dashboard", path: "/dashboard", icon: <RiDashboard3Line /> },
  { name: "Calendar", path: "/calendar", icon: <FaRegCalendarMinus /> },
];

const bottomItems = [
  { name: "Bookings", path: "/bookings", icon: <LuInbox /> },
  { name: "Customers", path: "/customers", icon: <FaRegUser /> },
  { name: "Inventory", path: "/inventory", icon: <MdOutlineInventory2 /> }
];


const Sidebar = () => {

  const navigate = useNavigate();

  return (
    <nav className='sidebar' style={Sidebar.css}>

      <button className='new-booking-btn' onClick={ () => navigate('/bookings/new') }>New Booking</button>

      {/* top group */}

      {
        topItems.map(({ name, path, icon }) => (
          <div className='sidebar-item' key={path} onClick={() => navigate(path)}>
            {icon}
            {name}
          </div>
        ))
      }

      <hr className='sidebar-divider' />

      {/* bottom group */}
      {
        bottomItems.map(({ name, path, icon }) => (
          <div className='sidebar-item' key={path} onClick={() => navigate(path)}>
            {icon}
            {name}
          </div>
        ))
      }

      <hr className='sidebar-divider' />
      
    </nav>
  )
}

export default Sidebar