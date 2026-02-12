import React from "react";
import InventoryTable from "../../components/InventoryTable";
// import "../../styles/InventoryPage.css";

const inventory = [
  {
    name: "Axe Throwing",
    rate: 75,
    available: 2,
    reserved: 6,
  },
  {
    name: "Bounce House",
    rate: 200,
    available: 1,
    reserved: 2,
  },
  {
    name: "Table Tennis",
    rate: 150,
    available: 2,
    reserved: 0,
  },
];

const InventoryPage = () => {
  return (
    <div className="inventory-page">
      <InventoryTable inventory={inventory} />
    </div>
  );
};

export default InventoryPage;
