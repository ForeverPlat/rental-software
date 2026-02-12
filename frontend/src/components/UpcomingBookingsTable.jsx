import React from "react";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";

const columns = [
  {
    key: "customer",
    header: "Customer",
    render: (value) => <strong>{value}</strong>,
  },
  { key: "pickup", header: "Pickup Time" },
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

const UpcomingBookingsTable = ({ upcomingBookings }) => {
  return (
    <DataTable
      header={<h2>Upcoming Bookings</h2>}
      columns={columns}
      data={upcomingBookings}
    />
  );
};

export default UpcomingBookingsTable;
