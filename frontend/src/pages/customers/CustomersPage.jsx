import React, { useEffect, useState } from "react";
// import "../../styles/CustomersPage.css";
import CustomersTable from "../../components/CustomersTable";
import { getCustomers } from "../../features/customers/api";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="customers-page">
      <CustomersTable customers={customers} />
    </div>
  );
};

export default CustomersPage;
