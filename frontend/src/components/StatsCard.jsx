import React from "react";
import "../styles/StatsCard.css";

const stats = [
  { label: "Revenue", value: "$98k" },
  { label: "Bookings", value: "123" },
  { label: "Items Ordered", value: "78" },
  { label: "Due", value: "3" },
];

// prop here later
const StatsCard = () => {
  return (
    <div className="stats-card">
      {stats.map((stat, index) => (
        <div key={stat.label} className="stat">
          <div className="stat-text">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
          </div>

          {index !== stats.length - 1 && <div className="divider" />}
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
