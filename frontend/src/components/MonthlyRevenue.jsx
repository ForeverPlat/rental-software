import React from "react";
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
  const maxValue = Math.max(...monthlyRevenue.map((m) => m.value));
  const activeMonth = "Jun";

  return (
    <div className="monthly-revenue-card">
      <div className="monthly-revenue-header">
        <h2>Monthly Revenue</h2>
        <div className="revenue-amount">$5,000</div>
      </div>

      <div className="revenue-chart">
        {monthlyRevenue.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;
          const isActive = item.month === activeMonth;

          return (
            <div key={index} className="revenue-bar-wrapper">
              {isActive && (
                <div className="revenue-tooltip">
                  ${item.value.toLocaleString()}
                </div>
              )}

              <div
                className={`revenue-bar ${isActive ? "active" : ""}`}
                style={{ height: `${heightPercent}%` }}
              />

              <span className="revenue-month">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyRevenue;
