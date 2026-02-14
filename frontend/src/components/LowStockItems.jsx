import React from "react";
import StatusBadge from "./StatusBadge";
import "../styles/LowStockItems.css";
import { useNavigate } from "react-router-dom";

const getStockStatus = (qty) => {
  if (qty <= 2) return "red";
  if (qty <= 4) return "yellow";
  if (qty >= 5) return "green";
  return "default";
};

// items prop later
const LowStockItems = ({ items }) => {
  const navigate = useNavigate();
  const lowestThree = [...items]
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 3);

  return (
    <div className="low-stock-card">
      <div className="low-stock-header">
        <h3>Low Stock Items</h3>
        <button className="view-all" onClick={() => navigate("/inventory")}>
          View All
        </button>
      </div>

      <div className="low-stock-list">
        {lowestThree.map((item, index) => (
          <div key={index} className="low-stock-row">
            <div className="thumbnail" />

            <div className="item-info">
              <span className="item-name">{item.product.name}</span>
            </div>

            <StatusBadge
              label={`${item.available} Left`}
              variant={getStockStatus(item.available)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockItems;
