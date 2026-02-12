import React from "react";
// import "../../styles/CustomersPage.css";
import CustomersTable from "../../components/CustomersTable";

const customers = [
  {
    name: "Luqman",
    email: "Luqman.o.ajani@gmail.com",
  },
  {
    name: "Rashidat",
    email: "Rashidat.o.ajani@gmail.com",
  },
  {
    name: "Ismail",
    email: "Ismail.o.ajani@gmail.com",
  },
  {
    name: "Rahdiyah",
    email: "Rahdiyah.o.ajani@gmail.com",
  },
  {
    name: "Faaiz",
    email: "Faaiz.o.ajani@gmail.com",
  },
];

const CustomersPage = () => {
  return (
    <div className="customers-page">
      <CustomersTable customers={customers} />
    </div>
  );
};

export default CustomersPage;
