import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import "../../styles/DetailsBase.css";
import { updateCustomer } from "../../features/customers/api";

const CustomerDetails = () => {
  const { state } = useLocation();
  const customer = state?.customer;

  if (!customer) return <Navigate to="/customers" />;

  const [updatedCustomer, setUpdatedCustomer] = useState(customer);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { _id, name, email, number } = updatedCustomer;

  const handleTopLevelChange = (field, value) => {
    setUpdatedCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      await updateCustomer(updatedCustomer._id, updatedCustomer);
      setMessage("Customer updated successfully");
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
          <h2 className="details-title">Customer</h2>
          <span className="details-id">#{_id}</span>
        </div>
        <button className="primary-btn" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && <p className="details-message">{message}</p>}

      <div className="details-grid">
        {/* Customer Info Card */}
        <div className="details-card full-width">
          <h3>Customer Info</h3>

          <div className="details-row">
            <span>Name</span>
            <input
              type="text"
              className="details-input"
              value={name}
              onChange={(e) => handleTopLevelChange("name", e.target.value)}
            />
          </div>

          <div className="details-row">
            <span>Email</span>
            <input
              type="email"
              className="details-input"
              value={email}
              onChange={(e) => handleTopLevelChange("email", e.target.value)}
            />
          </div>

          <div className="details-row">
            <span>Phone</span>
            <input
              type="text"
              className="details-input"
              value={number}
              onChange={(e) => handleTopLevelChange("number", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
