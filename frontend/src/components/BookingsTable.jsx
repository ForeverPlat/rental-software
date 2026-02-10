import React from "react";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import "../styles/PrimaryButton.css";

const columns = [
  {
    key: "customer",
    header: "Customer",
    render: (value) => <strong>{value}</strong>,
  },
  {
    key: "status",
    header: "Status",
    render: (value) => <StatusBadge label={value} />,
  },
  { key: "from", header: "From" },
  { key: "until", header: "Until" },
  {
    key: "price",
    header: "Price",
    render: (value) => `$${value}`,
  },
  {
    key: "paymentStatus",
    header: "Payment Status",
    render: (value) => <StatusBadge label={value} />,
  },
];

const BookingsTable = ({ bookings }) => {
  return (
    <DataTable
      header={
        <>
          <h2>Bookings</h2>
          {/*change this to a component later*/}
          <button className="primary-btn">+ New Booking</button>
        </>
      }
      columns={columns}
      data={bookings}
    />
  );
};

export default BookingsTable;
