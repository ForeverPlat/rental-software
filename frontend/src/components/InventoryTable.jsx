import React from "react";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
import "../styles/PrimaryButton.css";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    key: "name",
    header: "Name",
    render: (value) => <strong>{value}</strong>,
  },
  {
    key: "rate",
    header: "Rate",
    render: (value) => <strong>{value}</strong>,
  },
  {
    key: "available",
    header: "Available",
    render: (value, row) => (
      <StatusBadge
        label={`${value} Left`}
        variant={getStockStatus(row.available, row.reserved)}
      />
    ),
  },
  {
    key: "reserved",
    header: "Reserved",
    render: (value) => <strong>{value}</strong>,
  },
];

const getStockStatus = (available, reserved) => {
  const total = available + reserved;

  if (total === 0) return "default";

  const percentOut = (reserved / total) * 100;

  if (percentOut >= 75) return "red";
  if (percentOut >= 40) return "yellow";
  return "green";
};

const InventoryTable = ({ inventory }) => {
  const navigate = useNavigate();

  return (
    <DataTable
      header={
        <>
          <h2>Inventory</h2>
          {/*change this to a component later*/}
          <button
            className="primary-btn"
            onClick={() => navigate("/inventory/new")}
          >
            + New Product
          </button>
        </>
      }
      columns={columns}
      data={inventory}
    />
  );
};

export default InventoryTable;
