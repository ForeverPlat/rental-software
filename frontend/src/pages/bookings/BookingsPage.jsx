import React, { useEffect, useState } from "react";
import "../../styles/BookingsPage.css";
import StatsCard from "../../components/StatsCard";
import BookingsTable from "../../components/BookingsTable";
import { getBookings, getBookingsStats } from "../../features/bookings/api";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";

// const stats = [
//   { label: "Revenue", value: "$98k" },
//   { label: "Bookings", value: "123" },
//   { label: "Items Ordered", value: "78" },
//   { label: "Due", value: "3" },
// ];

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingsPageData = async () => {
      try {
        const bookingsData = await getBookings();
        const statsData = await getBookingsStats();

        setBookings(bookingsData);
        setStats(statsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsPageData();
    // console.log(bookings);
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const bookingStatsDisplay = [
    { label: "Revenue", value: `$${stats.revenue}` },
    { label: "Bookings", value: stats.bookings },
    { label: "Items Ordered", value: stats.products },
    { label: "Due", value: stats.due },
  ];

  return (
    <div className="bookings-page">
      <StatsCard stats={bookingStatsDisplay} />
      <BookingsTable bookings={bookings} />
    </div>
  );
};

export default BookingsPage;
