import React, { useEffect, useState } from 'react'

const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

      } catch (error) {
        console.log('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    }
 
    getCustomers();
  }, [])

  if(isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading customers...</div>
  }

  return (
    <div>
      {
        customers.map(({ id,name, email }) => (
          <div key={id}>
            <div>{ name }</div>
            <div>{ email }</div>
          </div>
        ))
      }
    </div>
  )
}

export default Customers