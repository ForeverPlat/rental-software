import React from "react";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import "../styles/PrimaryButton.css";

const columns = [
  {
    key: "customer",
    header: "Customer",
    render: (value) => <strong>{value.name}</strong>,
  },
  {
    key: "status",
    header: "Status",
    render: (value) => <StatusBadge label={value} />,
  },
  {
    key: "pickupDate",
    header: "From",
    render: (value) => <strong>{value}</strong>,
  },
  {
    key: "returnDate",
    header: "Until",
    render: (value) => <strong>{value}</strong>,
  },
  {
    key: "payment",
    header: "Price",
    render: (value) => `$${value.amount}`,
  },
  {
    key: "payment",
    header: "Payment Status",
    render: (value) => <StatusBadge label={value.status} />,
  },
];

// create a format date function

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
