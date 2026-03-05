import React, { useState } from "react";
import { createCustomer } from "../../features/customers/api";
import { BsPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import "../../styles/CreateCustomerPage.css";

const CreateCustomerPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setMessage("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      await createCustomer({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });

      setMessage("Customer created successfully.");

      setForm({
        name: "",
        email: "",
        phone: "",
      });
    } catch (err) {
      setMessage(err?.message || "Failed to create customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-create-wrapper">
      {/* HEADER */}
      <div className="customer-create-header">
        <h1>Create Customer</h1>
        <p>Add a new customer to your system.</p>
      </div>

      {/* GRID */}
      <div className="customer-create-grid">
        {/* LEFT SIDE */}
        <div className="customer-create-main">
          {/* NAME */}
          <div className="customer-create-card">
            <h3 className="customer-create-card-title">
              <BsPersonFill /> Customer Name
            </h3>

            <div className="customer-field">
              <input
                value={form.name}
                onChange={handleChange("name")}
                placeholder="John Smith"
              />
            </div>
          </div>

          {/* CONTACT */}
          <div className="customer-create-card">
            <div className="customer-grid">
              <div className="customer-field">
                <label>
                  <MdEmail /> Email
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="john@email.com"
                />
              </div>

              <div className="customer-field">
                <label>
                  <FaPhone /> Phone
                </label>

                <input
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="(403) 555-1234"
                />
              </div>
            </div>
          </div>

          {message && <div className="customer-message success">{message}</div>}

          <button
            className="primary-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Customer"}
          </button>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="customer-create-preview">
          <div className="inventory-preview-header">
            <h3>Customer Preview</h3>
            <span>Live</span>
          </div>

          <div className="inventory-preview-body">
            <div className="inventory-preview-icon">👤</div>

            <div className="inventory-preview-row name-row">
              <div className="preview-label">Name</div>
              <div className="preview-name">{form.name || "-"}</div>
            </div>

            <div className="inventory-preview-divider" />

            <div className="inventory-preview-row">
              <div className="preview-label">Email</div>
              <div className="preview-value">{form.email || "-"}</div>
            </div>

            <div className="inventory-preview-divider" />

            <div className="inventory-preview-row">
              <div className="preview-label">Phone</div>
              <div className="preview-value">{form.phone || "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomerPage;
