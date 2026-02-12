import React from "react";
import "../../styles/HomePage.css";
import StatsCard from "../../components/StatsCard";
import MonthlyRevenue from "../../components/MonthlyRevenue";
import QuickActions from "../../components/QuickActions";
import LowStockItems from "../../components/LowStockItems";
import UpcomingBookingsTable from "../../components/UpcomingBookingsTable";

const stats = [
  { label: "Revenue", value: "$98k" },
  { label: "Bookings", value: "123" },
  { label: "Customers", value: "54" },
  { label: "Products", value: "12" },
];

const upcomingBookings = [
  {
    customer: "Luqman Ajani",
    pickup: "Feb 12 - 12:30pm",
    price: 200,
    paymentStatus: "Paid",
  },
  {
    customer: "John Doe",
    pickup: "Feb 14 - 4:00pm",
    price: 75,
    paymentStatus: "Pending",
  },
];

const items = [
  { id: 1, name: "Corn Hole", quantity: 2 },
  { id: 2, name: "Axe Throwing", quantity: 3 },
  { id: 3, name: "Bounce House", quantity: 5 },
  { id: 4, name: "Speaker System", quantity: 1 },
  { id: 5, name: "LED Dance Floor", quantity: 8 },
  { id: 6, name: "Folding Chairs (Set of 20)", quantity: 4 },
  { id: 7, name: "Photo Booth", quantity: 2 },
];

const HomePage = () => {
  return (
    <div className="home-page">
      <StatsCard stats={stats} />
      <div className="home-page-second-row">
        <MonthlyRevenue />
        <QuickActions />
      </div>

      <div className="home-page-third-row">
        <LowStockItems items={items} />
        <UpcomingBookingsTable upcomingBookings={upcomingBookings} />
      </div>
    </div>
  );
};

export default HomePage;
