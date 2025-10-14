import React from "react";
import "./BookingDetails.css";
import { useLocation } from "react-router-dom";

const BookingDetails = () => {
  const location = useLocation();
  const { booking } = location.state || {};
  const { customer, payment, pickupDate, returnDate, products, status } = booking;

  return (
    <div className="booking-container">

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
            <span>{payment.status}</span>
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
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
