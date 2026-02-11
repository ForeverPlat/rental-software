import React from "react";
import "../../styles/BookingsPage.css";
import StatsCard from "../../components/StatsCard";
import BookingsTable from "../../components/BookingsTable";

const stats = [
  { label: "Revenue", value: "$98k" },
  { label: "Bookings", value: "123" },
  { label: "Items Ordered", value: "78" },
  { label: "Due", value: "3" },
];

const BookingsPage = () => {
  return (
    <div className="bookings-page">
      <StatsCard stats={stats} />

      <BookingsTable
        bookings={[
          {
            customer: "Luqman Ajani",
            status: "Returned",
            from: "10/05/25",
            until: "11/05/25",
            price: 200,
            paymentStatus: "Paid",
          },
          {
            customer: "John Doe",
            status: "Returned",
            from: "10/05/25",
            until: "11/05/25",
            price: 75,
            paymentStatus: "Overdue",
          },
        ]}
      />
    </div>
  );
};

export default BookingsPage;
