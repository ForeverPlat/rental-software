import React from "react";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";

const columns = [
  {
    key: "customer",
    header: "Customer",
    render: (value) => <strong>{value.name}</strong>,
  },
  {
    key: "pickupDate",
    header: "Pickup Time",
    render: (value) => <strong>{value}</strong>,
  },
  {
    key: "payment",
    header: "Price",
    render: (value) => `$${value.price}`,
  },
  {
    key: "payment",
    header: "Payment Status",
    render: (value) => <StatusBadge label={value.status} />,
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
