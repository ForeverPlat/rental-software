import './CustomerDetails.css'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const CustomerDetails = () => {
  const location = useLocation();
  const { selectedCustomer } = location.state || {};

  const [updatedCustomer, setUpdatedCustomer] = useState(selectedCustomer);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      const apiUrl = 'http://localhost:2000';
      const res = await fetch(`${apiUrl}/api/customers/${updatedCustomer._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCustomer)
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) throw new Error("Failed to update customer");
      setMessage("Customer updated successfully");
    } catch (error) {
      setMessage("Error updating customer");
    } finally {
      setLoading(false);
    }
  };

  if (!updatedCustomer) return <p>No customer data available.</p>;

  const { _id, name, email, number } = updatedCustomer;

  return (
    <div className="customer-details-container">
      <div className="card">
        <section>
          <h3>Customer</h3>
          <div className="row">
            <span>#{_id|| '—'}</span>
            <input 
                type="text" 
                className='product-details-input'
                value={name}
                onChange={(e) =>
                    handleTopLevelChange("name", e.target.value)
                }
            />
          </div>
        </section>

        <hr />

        <section className="row">
          <span>Email</span>
          <input
            type="email"
            className="customer-details-input"
            value={email}
            onChange={(e) => handleTopLevelChange("email", e.target.value)}
          />
        </section>

        <section className="row">
          <span>Phone</span>
          <input
            type="text"
            className="customer-details-input"
            value={number}
            onChange={(e) => handleTopLevelChange("number", e.target.value)}
          />
        </section>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="customer-detail-save-button"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {message && (
        <p className="customer-details-status-message">{message}</p>
      )}
    </div>
  );
};

export default CustomerDetails;
