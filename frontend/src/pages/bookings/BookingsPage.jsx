import React, { useEffect, useState } from "react";
import "../../styles/BookingsPage.css";
import StatsCard from "../../components/StatsCard";
import BookingsTable from "../../components/BookingsTable";
import { getBookings } from "../../features/bookings/api";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";

const stats = [
  { label: "Revenue", value: "$98k" },
  { label: "Bookings", value: "123" },
  { label: "Items Ordered", value: "78" },
  { label: "Due", value: "3" },
];

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
    // console.log(bookings);
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="bookings-page">
      <StatsCard stats={stats} />
      <BookingsTable bookings={bookings} />
    </div>
  );
};

export default BookingsPage;
