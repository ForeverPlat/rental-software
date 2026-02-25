import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { updateBooking } from "../../features/bookings/api";
// import "../../styles/BookingDetails.css";
import "../../styles/DetailsBase.css";

const BookingDetails = () => {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) return <Navigate to="/inventory" />;

  const [updatedBooking, setUpdatedBooking] = useState(booking);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { customer, payment, pickupDate, returnDate, products, status } =
    updatedBooking;

  const handleTopLevelChange = (field, value) => {
    setUpdatedBooking((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setUpdatedBooking((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      await updateBooking(updatedBooking._id, updatedBooking);
      setMessage("Booking updated successfully");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="details-page">
      {/* Header */}
      <div className="details-header">
        <div>
          <h2 className="details-title">Booking</h2>
          <span className="details-id">#{customer.customerId}</span>

          {/* Booking Status Selector */}
          <select
            className="details-select booking-status-select"
            value={status}
            onChange={(e) => handleTopLevelChange("status", e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="picked-up">Picked Up</option>
            <option value="late">Late</option>
            <option value="returned">Returned</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button className="primary-btn" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && <p className="details-message">{message}</p>}

      <div className="details-grid">
        {/* Customer Card */}
        <div className="details-card">
          <h3>Customer</h3>

          <div className="details-row">
            <span>Name</span>
            <strong>{customer.name}</strong>
          </div>
          <div className="details-row">
            <span>Customer ID</span>
            <strong>#{customer.customerId}</strong>
          </div>
        </div>

        {/* Payment Card */}
        <div className="details-card">
          <h3>Payment</h3>

          <div className="details-row">
            <span>Amount</span>
            <strong>${payment.amount}</strong>
          </div>

          <div className="details-row">
            <span>Method</span>
            <span>{payment.method}</span>
          </div>

          <div className="details-row">
            <span>Status</span>
            <select
              className="details-select"
              value={payment.status}
              onChange={(e) =>
                handleNestedChange("payment", "status", e.target.value)
              }
            >
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
              <option value="overpaid">Overpaid</option>
            </select>
          </div>
        </div>

        {/* Rental Period */}
        <div className="details-card">
          <h3>Rental Period</h3>

          <div className="details-row">
            <span>Pickup</span>
            <strong>{pickupDate}</strong>
          </div>

          <div className="details-row">
            <span>Return</span>
            <strong>{returnDate}</strong>
          </div>
        </div>

        {/* Products */}
        <div className="details-card full-width">
          <h3>Products</h3>

          {products.map((product) => (
            <div className="product-row" key={product.productId}>
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <span className="product-id">#{product.productId}</span>
              </div>

              <strong className="product-qty">x{product.quantity}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
