import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import "../../styles/DetailsBase.css";
import { updateInventory } from "../../features/inventory/api";

const InventoryDetails = () => {
  const { state } = useLocation();
  const inventory = state?.inventory;

  if (!inventory) return <Navigate to="/inventory" />;

  const [updatedInventory, setUpdatedInventory] = useState(inventory);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { product, productName, totalStock } = updatedInventory;

  const handleTopLevelChange = (field, value) => {
    setUpdatedInventory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setUpdatedInventory((prev) => ({
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
      await updateInventory(updatedInventory._id, updatedInventory);
      setMessage("Inventory updated successfully");
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
          <h2 className="details-title">Product</h2>
          <span className="details-id">#{product?._id || "—"}</span>
        </div>
        <button className="primary-btn" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message && <p className="details-message">{message}</p>}

      <div className="details-grid">
        {/* Product Card */}
        <div className="details-card">
          <h3>Product Info</h3>

          <div className="details-row">
            <span>Name</span>
            <input
              type="text"
              className="details-input"
              value={productName}
              onChange={(e) =>
                handleTopLevelChange("productName", e.target.value)
              }
            />
          </div>
        </div>

        {/* Stock & Pricing Card */}
        <div className="details-card">
          <h3>Stock & Pricing</h3>

          <div className="details-row">
            <span>Total Stock</span>
            <input
              type="number"
              className="details-input"
              value={totalStock}
              onChange={(e) =>
                handleTopLevelChange("totalStock", Number(e.target.value))
              }
            />
          </div>

          <div className="details-row">
            <span>Price Per Day</span>
            <div className="details-price-field">
              <span className="details-price-symbol">$</span>
              <input
                type="number"
                className="details-input"
                value={product?.pricePerDay}
                onChange={(e) =>
                  handleNestedChange(
                    "product",
                    "pricePerDay",
                    Number(e.target.value),
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetails;
