import React from "react";
import DataTable from "./DataTable";
import "../styles/PrimaryButton.css";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    key: "name",
    header: "Name",
    render: (value) => <strong>{value}</strong>,
  },
  {
    key: "email",
    header: "Email",
    render: (value) => <strong>{value}</strong>,
  },
];

const CustomersTable = ({ customers }) => {
  const navigate = useNavigate();

  return (
    <DataTable
      header={
        <>
          <h2>Customers</h2>
          {/*change this to a component later*/}
          <button
            className="primary-btn"
            onClick={() => navigate("/customers/new")}
          >
            + New Customer
          </button>
        </>
      }
      columns={columns}
      data={customers}
    />
  );
};

export default CustomersTable;
