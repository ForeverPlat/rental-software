import React, { useState } from "react";
import { createInventory } from "../../features/inventory/api";
import { FaBox } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import { HiArchiveBox } from "react-icons/hi2";
// import "../../styles/FormPage.css";
import "../../styles/CreateInventoryPage.css";

const CreateInventoryPage = () => {
  const [form, setForm] = useState({
    name: "",
    pricePerDay: "",
    totalStock: "",
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

    const price = Number(form.pricePerDay);
    const stock = Number(form.totalStock);

    if (!form.name.trim() || isNaN(price) || isNaN(stock)) {
      setMessage("All fields are required.");
      return;
    }

    if (price < 0 || stock < 0) {
      setMessage("Values cannot be negative.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      await createInventory({
        name: form.name.trim(),
        pricePerDay: price,
        totalStock: stock,
      });

      setMessage("Inventory item created successfully.");

      setForm({
        name: "",
        pricePerDay: "",
        totalStock: "",
      });
    } catch (err) {
      setMessage(err?.message || "Failed to create inventory item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inventory-create-wrapper">
      {/* HEADER */}
      <div className="inventory-create-header">
        <h1>Create Inventory Item</h1>
        <p>Define a new rentable item.</p>
      </div>

      {/* MAIN GRID */}
      <div className="inventory-create-grid">
        {/* LEFT SIDE */}
        <div className="inventory-create-main">
          {/* ITEM CARD */}
          <div className="inventory-create-card">
            <h3 className="inventory-create-card-title">
              <FaBox /> Item Name
            </h3>
            <div className="inventory-field">
              <input
                value={form.name}
                onChange={handleChange("name")}
                placeholder="White Folding Chair"
              />
            </div>
          </div>

          {/* PRICING CARD */}
          <div className="inventory-create-card">
            <div className="inventory-grid">
              <div className="inventory-field">
                <label>
                  <FaDollarSign /> Price / Day
                </label>
                <div className="inventory-input-prefix">
                  <span>$</span>
                  <input
                    type="number"
                    min="0"
                    value={form.pricePerDay}
                    onChange={handleChange("pricePerDay")}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="inventory-field">
                <label>
                  <IoLayers /> Total Stock
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.totalStock}
                  onChange={handleChange("totalStock")}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {message && (
            <div className="inventory-message success">{message}</div>
          )}

          <button
            className="primary-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Item"}
          </button>
        </div>

        {/* RIGHT SIDE PREVIEW */}
        <div className="inventory-create-preview">
          <div className="inventory-preview-header">
            <h3>Item Preview</h3>
            <span>Live</span>
          </div>

          <div className="inventory-preview-body">
            <div className="inventory-preview-icon">📦</div>

            <div className="inventory-preview-row name-row">
              <div className="preview-label">Name</div>
              <div className="preview-name">{form.name || "-"}</div>
            </div>

            <div className="inventory-preview-divider" />

            <div className="inventory-preview-row">
              <div className="preview-label">Price / Day</div>
              <div className="preview-value">
                {form.pricePerDay ? `$${form.pricePerDay}` : "$0.00"}
              </div>
            </div>

            <div className="inventory-preview-divider" />

            <div className="inventory-preview-row">
              <div className="preview-label">Total Stock</div>
              <div className="preview-value">{form.totalStock || "0"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInventoryPage;
