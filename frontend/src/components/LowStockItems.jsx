import React from "react";
import StatusBadge from "./StatusBadge";
import "../styles/LowStockItems.css";

const items = [
  { id: 1, name: "Corn Hole", quantity: 2 },
  { id: 2, name: "Axe Throwing", quantity: 3 },
  { id: 3, name: "Bounce House", quantity: 5 },
  { id: 4, name: "Speaker System", quantity: 1 },
  { id: 5, name: "LED Dance Floor", quantity: 8 },
  { id: 6, name: "Folding Chairs (Set of 20)", quantity: 4 },
  { id: 7, name: "Photo Booth", quantity: 2 },
];

const getStockStatus = (qty) => {
  if (qty <= 2) return "red";
  if (qty <= 4) return "yellow";
  if (qty >= 5) return "green";
  return "default";
};

// items prop later
const LowStockItems = () => {
  const lowestThree = [...items]
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 3);

  return (
    <div className="low-stock-card">
      <div className="low-stock-header">
        <h3>Low Stock Items</h3>
        <button className="view-all">View All</button>
      </div>

      <div className="low-stock-list">
        {lowestThree.map((item, index) => (
          <div key={index} className="low-stock-row">
            <div className="thumbnail" />

            <div className="item-info">
              <span className="item-name">{item.name}</span>
            </div>

            <StatusBadge
              label={`${item.quantity} Left`}
              variant={getStockStatus(item.quantity)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockItems;
