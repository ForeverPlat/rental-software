import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import SettingsLayout from "./components/SettingsLayout";
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
import ProfileSettingsPage from "./pages/settings/ProfileSettingsPage";
import SecuritySettingsPage from "./pages/settings/SecuritySettingsPage";
import TeamSettingsPage from "./pages/settings/TeamSettingsPage";
import CompanySettingsPage from "./pages/settings/CompanySettingsPage";
import NotificationsSettingsPage from "./pages/settings/NotificationsSettingsPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./features/auth/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<HomePage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="bookings/new" element={<CreateBookingsPage />} />
            <Route path="bookings/details" element={<BookingDetailsPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="customers/new" element={<CreateCustomersPage />} />
            <Route path="customers/details" element={<CustomerDetailsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="inventory/new" element={<CreateInventoryPage />} />
            <Route
              path="inventory/details"
              element={<InventoryDetailsPage />}
            />

            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<ProfileSettingsPage />} />
              <Route path="security" element={<SecuritySettingsPage />} />
              <Route path="team" element={<TeamSettingsPage />} />
              <Route path="company" element={<CompanySettingsPage />} />
              <Route
                path="notifications"
                element={<NotificationsSettingsPage />}
              />
            </Route>
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
