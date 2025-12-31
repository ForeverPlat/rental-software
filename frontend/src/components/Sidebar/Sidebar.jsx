import React, { useState } from 'react'
import './Sidebar.css'
import { useLocation, useNavigate } from 'react-router-dom';

import { HiHome } from "react-icons/hi";
import { HiArchiveBox } from "react-icons/hi2";
import { FaInbox } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";

const items = [
  { name: "Home", path: '/home', icon: <HiHome /> },
  { name: "Bookings", path: "/bookings", icon: <FaInbox /> },
  { name: "Customers", path: "/customers", icon: <BsPersonFill /> },
  { name: "Inventory", path: "/inventory", icon: <HiArchiveBox /> }
]

const Sidebar = () => {
  const [page, setPage] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const currPath = location.pathname.toLowerCase();

  const getPage = () => {

  }

  return (
    <nav className='sidebar' style={Sidebar.css}>
      {items.map(({ name, path, icon }) => (
        <div
          className={ currPath === path ? 'sidebar-item curr-page' : 'sidebar-item' }
          key={path}
          onClick={() => navigate(path)}
        >
          {icon}{name}
        </div>
      ))}
    </nav>
  )
}

export default Sidebar