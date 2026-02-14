import React, { useEffect, useState } from "react";
import "../../styles/HomePage.css";
import StatsCard from "../../components/StatsCard";
import MonthlyRevenue from "../../components/MonthlyRevenue";
import QuickActions from "../../components/QuickActions";
import LowStockItems from "../../components/LowStockItems";
import UpcomingBookingsTable from "../../components/UpcomingBookingsTable";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";
import { getHomeStats, getLowStockProducts } from "../../features/home/api";

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
  const [stats, setStats] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const statsData = await getHomeStats();
        const lowStockData = await getLowStockProducts();
        console.log(lowStockData);

        setStats(statsData);
        setLowStockProducts(lowStockData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const homeStatsDisplay = [
    { label: "Revenue", value: `$${stats.revenue}` },
    { label: "Bookings", value: stats.bookings },
    { label: "Customers", value: stats.customers },
    { label: "Products", value: stats.products },
  ];

  return (
    <div className="home-page">
      <StatsCard stats={homeStatsDisplay} />
      <div className="home-page-second-row">
        <MonthlyRevenue />
        <QuickActions />
      </div>

      <div className="home-page-third-row">
        <LowStockItems items={lowStockProducts} />
        <UpcomingBookingsTable upcomingBookings={upcomingBookings} />
      </div>
    </div>
  );
};

export default HomePage;
