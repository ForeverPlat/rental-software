import React from "react";
import "../../styles/BookingsPage.css";
import StatsCard from "../../components/StatsCard";
import BookingsTable from "../../components/BookingsTable";

const BookingsPage = () => {
  return (
    <div className="bookings-page">
      <StatsCard />

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
