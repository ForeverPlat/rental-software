import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './Layout';

import Sidebar from './components/Sidebar/Sidebar';

import Signup from './features/auth/signup/Signup'
import Login from './features/auth/Login/Login';
// import Login from './features/auth/Login/Login';
import Bookings from './features/bookings/Bookings';
import Customers from './features/Customers/Customers';
import Home from './features/home/Home';
// import Calendar from './features/Calendar';
import Inventory from './features/inventory/Inventory';

import NewBooking from './features/bookings/NewBooking'
import NewCustomer from './features/customers/NewCustomer'
import NewProduct from './features/inventory/NewProduct';

import BookingDetails from './features/bookings/BookingDetails';
import CustomerDetails from './features/customers/CustomerDetails';
import InventoryDetails from './features/inventory/InventoryDetails';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />

          <Route path="/bookings/new" element={<NewBooking />} />
          <Route path="/customers/new" element={<NewCustomer />} />
          <Route path="/products/new" element={<NewProduct />} />

          <Route path="/bookings/details" element={<BookingDetails />} />
          <Route path="/customers/details" element={<CustomerDetails />} />
          <Route path="/inventory/details" element={<InventoryDetails />} />

        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  )
}

export default App
