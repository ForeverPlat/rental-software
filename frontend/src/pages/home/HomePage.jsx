import React from "react";
import "../../styles/HomePage.css";
import StatsCard from "../../components/StatsCard";
import MonthlyRevenue from "../../components/MonthlyRevenue";
import QuickActions from "../../components/QuickActions";
import LowStockItems from "../../components/LowStockItems";

const stats = [
  { label: "Revenue", value: "$98k" },
  { label: "Bookings", value: "123" },
  { label: "Customers", value: "78" },
  { label: "Products", value: "12" },
];

const HomePage = () => {
  return (
    <div className="home-page">
      <StatsCard stats={stats} />
      <div className="home-page-second-row">
        <MonthlyRevenue />
        <QuickActions />
      </div>
      <LowStockItems />
    </div>
  );
};

export default HomePage;
