import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/home/HomePage";
import BookingsPage from "./pages/bookings/BookingsPage";
import CustomersPage from "./pages/customers/CustomersPage";
import InventoryPage from "./pages/inventory/InventoryPage";

import CreateBookingsPage from "./pages/bookings/CreateBookingsPage";
import CreateCustomersPage from "./pages/customers/CreateCustomerPage";
import CreateInventoryPage from "./pages/inventory/CreateInventoryPage";

import BookingDetailsPage from "./pages/bookings/BookingDetailsPage";
import CustomerDetailsPage from "./pages/customers/CustomerDetailsPage";
import InventoryDetailsPage from "./pages/inventory/InventoryDetailsPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="bookings/new" element={<CreateBookingsPage />} />
          <Route path="bookings/details" element={<BookingDetailsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="customers/new" element={<CreateCustomersPage />} />
          <Route path="customers/details" element={<CustomerDetailsPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="inventory/new" element={<CreateInventoryPage />} />
          <Route path="inventory/details" element={<InventoryDetailsPage />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
