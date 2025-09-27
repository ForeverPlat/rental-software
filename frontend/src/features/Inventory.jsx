import React, { useEffect, useState } from 'react'
import Table from '../components/Table/Table';


const Inventory = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const headers = [
    { display: 'Name', key: 'name' },
    { display: 'Price Per Day', key: 'pricePerDay' },
    ,
    'Price Per Day'
  ]

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);

        // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
        const apiUrl = 'http://localhost:2000';
        const res = await fetch(`${apiUrl}/api/products`);

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

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>
  }

  return (
    <div style={{ flexGrow: 1, padding: '20px' }}>
      <Table rows={products} headers={headers} />
    </div>
  )
}

export default Inventory