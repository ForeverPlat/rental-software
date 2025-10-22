import React, { useEffect, useState } from 'react'
import './Customers.css'
import Table from '../../components/Table/Table';
import { useNavigate } from 'react-router-dom';

const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    const headers = [
      { display: 'Name', key: 'name'},
      { display: 'Email', key: 'email' }
    ];

    const navigate = useNavigate();

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setIsLoading(true);

        // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
        const apiUrl = 'http://localhost:2000';
        const res = await fetch(`${apiUrl}/api/customers`);

        if (!res.ok) {
          throw new Error(`Failed to fetch customers: ${res.status}`)
        }

        const result = await res.json();

        setCustomers(result.data);
        console.log(result.data);
        // console.log(result.data);

      } catch (error) {
        console.log('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    }
 
    getCustomers();
  }, [])
  
  const handleCustomerClick = (selectedCustomer) => {
    navigate('/customers/details', { state: { selectedCustomer } })
  }

  if(isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading customers...</div>
  }

  return (
    <div style={{ flexGrow: 1, padding: '20px' }}>
      <Table rows={customers} headers={headers} onRowClick={handleCustomerClick} type={"customers"} />
    </div>
  )
}

export default Customers