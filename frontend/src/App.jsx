import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './Layout';

import Sidebar from './components/Sidebar/Sidebar';

import Signup from './features/auth/Signup'
import Login from './features/auth/Login'
import Bookings from './features/Bookings';
import Customers from './features/Customers/Customers'
import Dashboard from './features/Dashboard/Dashboard';
import Calendar from './features/Calendar';
import Inventory from './features/Inventory';

import NewBooking from './features/NewBooking/NewBooking';
import NewCustomer from './features/NewCustomer'
import NewProduct from './features/NewProduct';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />

          <Route path="/bookings/new" element={<NewBooking />} />
          <Route path="/customers/new" element={<NewCustomer />} />
          <Route path="/products/new" element={<NewProduct />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
