import React, { useEffect, useState } from "react";
import InventoryTable from "../../components/InventoryTable";
import { getInventory } from "../../features/inventory/api";
import ErrorState from "../../components/ErrorState";
import LoadingState from "../../components/LoadingState";
// import "../../styles/InventoryPage.css";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventory();
        setInventory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="inventory-page">
      <InventoryTable inventory={inventory} />
    </div>
  );
};

export default InventoryPage;
