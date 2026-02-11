import React, { useState } from "react";
import "../styles/MonthlyRevenue.css";

const monthlyRevenue = [
  { month: "Mar", value: 1000 },
  { month: "Apr", value: 6000 },
  { month: "May", value: 2000 },
  { month: "Jun", value: 5000 },
  { month: "Jul", value: 1200 },
  { month: "Aug", value: 2200 },
];

const MonthlyRevenue = () => {
  const [hoveredMonth, setHoveredMonth] = useState(
    monthlyRevenue[monthlyRevenue.length - 1].month,
  );

  const maxValue = Math.max(...monthlyRevenue.map((m) => m.value));

  return (
    <div className="monthly-revenue-card">
      <div className="monthly-revenue-header">
        <h2>Monthly Revenue</h2>
        <div className="revenue-amount">
          $
          {hoveredMonth
            ? monthlyRevenue
                .find((m) => m.month === hoveredMonth)
                ?.value.toLocaleString()
            : "-"}
        </div>
      </div>

      <div
        className="revenue-chart"
        onMouseLeave={() =>
          setHoveredMonth(monthlyRevenue[monthlyRevenue.length - 1].month)
        }
      >
        {monthlyRevenue.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;
          const isActive = item.month === hoveredMonth;

          return (
            <div
              key={index}
              className="revenue-bar-wrapper"
              onMouseEnter={() => setHoveredMonth(item.month)}
            >
              <div
                className={`revenue-bar ${isActive ? "active" : ""}`}
                style={{ height: `${heightPercent}%` }}
              >
                {isActive && (
                  <div className="revenue-tooltip">
                    ${item.value.toLocaleString()}
                  </div>
                )}
              </div>
              <span className="revenue-month">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyRevenue;
