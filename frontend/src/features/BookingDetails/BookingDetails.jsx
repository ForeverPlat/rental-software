import React, { useState } from "react";
import "./BookingDetails.css";
import { useLocation } from "react-router-dom";

const BookingDetails = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  const [updatedBooking, setUpdatedBooking] = useState(booking);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handles change when the value is nested
  const handleChange = (section, field, value) => {
    setUpdatedBooking((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  // handle top level fields ex: status
  const handleTopLevelChange = (field, value) => {
    setUpdatedBooking((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setLoading(true);

    try {
      // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
      const apiUrl = 'http://localhost:2000';
      const res = await fetch(`${apiUrl}/api/bookings/${updatedBooking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBooking)
      })      

      const result = await res.json();
      console.log(result);
      
      if (!res.ok) throw new Error("Failed to update booking");

      setMessage("Booking updated successfully")
    } catch (error) {
      setMessage("Error updating booking")
    } finally {
      setLoading(false);
    }
    
  }

  if (!updatedBooking) return <p>No booking data available.</p>

  const { customer, payment, pickupDate, returnDate, products, status } = updatedBooking;

  return (
    <div className="booking-details-container">

      <div className="card">
        <section>
          <h3>Customer</h3>
          <div className="row">
            <span>#{customer.customerId}</span>
            <span>{customer.name}</span>
          </div>
        </section>

        <hr />

        <section>
          <h3>Payment</h3>
          <div className="row">
            <span>Amount</span>
            <span>${payment.amount}</span>
          </div>
          <div className="row">
            <span>Method</span>
            <span>{payment.method}</span>
          </div>
          <div className="row">
            <span>Status</span>
            {/* <span>{payment.status}</span> */}
            <select className="booking-status-selector" name="status" value={payment.status} onChange={(e) => handleChange("payment", "status", e.target.value)}>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
              <option value="overpaid">Overpaid</option>
            </select>
          </div>
        </section>

        <hr />

        <section className="row">
          <span>Pickup Date</span>
          <span>{pickupDate}</span>
        </section>

        <section className="row">
          <span>Return Date</span>
          <span>{returnDate}</span>
        </section>
      </div>

      <div className="card">
        <h3>Products</h3>
        {products.map((p) => (
          <div className="row" key={p.productId}>
            <span>#{p.productId}</span>
            <span>{p.quantity}</span>
            <span>{p.name}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Status</h3>
        <div className="row">
          {/* <span>{status}</span> */}
          <select name="status" value={status} onChange={(e) => handleTopLevelChange("status", e.target.value)}>
            <option value="pending">Pending</option>
            <option value="picked-up">Picked Up</option>
            <option value="late">Late</option>
            <option value="returned">Returned</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <button onClick={handleSave} disabled={loading} className="booking-detail-save-button">
        { loading ? "Saving" : "Save Changes" }
      </button>

        { message && <p style={{ fontSize: "0.9rem" }}>{message}</p> }
    </div>
  );
};

export default BookingDetails;
