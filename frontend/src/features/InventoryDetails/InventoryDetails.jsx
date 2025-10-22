import './InventoryDetails.css'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const InventoryDetails = () => {
  const location = useLocation();
  const { selectedProduct } = location.state || {};

  const [updatedInventory, setUpdatedInventory] = useState(selectedProduct);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle top level fields ex: totalStock, pricePerDay
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
    // console.log("id",updatedInventory.product._id);

    try {
      const apiUrl = 'http://localhost:2000';
      const res = await fetch(`${apiUrl}/api/inventory/${updatedInventory._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedInventory)
      });

      const result = await res.json();
      console.log(result);
      console.log(result.message);

      if (!res.ok) throw new Error("Failed to update inventory");
      setMessage("Inventory updated successfully");
    } catch (error) {
      setMessage("Error updating inventory");
      
    } finally {
      setLoading(false);
    }
  };

  if (!updatedInventory) return <p>No product data available.</p>;

  const { product, productName, totalStock } = updatedInventory;

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <section>
          <h3>Product</h3>
          <div className="product-details-row">
            <span>#{product?._id || '—'}</span>
            <input 
                type="text" 
                className='product-details-input'
                value={productName}
                onChange={(e) =>
                    handleTopLevelChange("productName", e.target.value)
                }
            />
            {/* <span>{productName || product?.name}</span> */}
          </div>
        </section>

        <hr />

        <section className="product-details-row">
          <span>Total Stock</span>
          <input
            type="number"
            className="product-details-input"
            value={totalStock}
            onChange={(e) =>
              handleTopLevelChange("totalStock", Number(e.target.value))
            }
          />
        </section>

        <section className="product-details-row">
          <span>Price Per Day</span>
          <div className="product-details-price-field">
            <span>$</span>
            <input
              type="number"
              className="product-details-input"
              value={product?.pricePerDay}
              onChange={(e) =>
                handleNestedChange("product", "pricePerDay", Number(e.target.value))
              }
            />
          </div>
        </section>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="product-detail-save-button"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {message && (
        <p className="product-details-status-message">{message}</p>
      )}
    </div>
  );
};

export default InventoryDetails;
