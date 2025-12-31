import React, { useEffect, useState } from 'react'
import Table from '../../components/Table/Table';
import { useNavigate } from 'react-router-dom';


const Inventory = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const headers = [
    { display: 'Name', key: 'name' },
    { display: 'Price Per Day', key: 'pricePerDay' },
    { display: 'Available', key: 'available' },
    { display: 'Reserved', key: 'reserved' },
  ]

  useEffect(() => {
    const getProducts = async () => {
      const token = localStorage.getItem('token');
      
      try {
        setIsLoading(true);

        // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
        const apiUrl = 'http://localhost:2000';
        const res = await fetch(`${apiUrl}/api/inventory/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`)
        }

        const result = await res.json();
        const data = result.data;
        console.log(data);
        
        // const product = {
        //   'Name': data.name,
        //   'Price Per Day': data.pricePerDay
        // }

        setProducts(data);
        
      } catch (error) {
        console.log('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, [])

  const handleInventoryClick = (selectedProduct) => {
    navigate('/inventory/details', { state: { selectedProduct } });
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  return (
    <div style={{ flexGrow: 1, padding: '20px' }}>
      <Table rows={products} headers={headers} onRowClick={handleInventoryClick} type={"inventory"} />
    </div>
  )
}

export default Inventory