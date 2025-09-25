import React, { useState, useEffect } from 'react'

const NewProduct = () => {

    // get userId from token (in localStorage)
    // product name
    // product pricePerDay 

    //  check how to properly set up the number
    const [product, setProduct] = useState({ "name": '', pricePerDay: 0 });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
      const { name, value } = e.target;
      
      setProduct((prevProduct) => ({
          ...prevProduct,
          [name]: value
      }))
    }

    const delayedMessage = (setter, message) => {
      setter(''); 
      setTimeout(() => {
        setter(message);
        setTimeout(() => {
          setter(''); // Clear message after 5 seconds
        }, 5000);
      }, 100); // Small delay to ensure previous message clears
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');

      const { name, pricePerDay } = product;
      
      if ( !name || pricePerDay) {
        setError("All fields must be filled.");
      }

      try {
        const res = await fetch('http://localhost:2000/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(product),
        });

        const result = await res.json();

        if (res.ok) {
          // setSuccess('Verification email sent.');
          delayedMessage(setSuccess, 'Product has been created.')
          setProduct({ "name": '', pricePerDay: '' });
        } else {
          delayedMessage(setError, result.error || 'Failed to create product.')
          // setError(result.error || 'Failed to create user.');
        }

      } catch (error) {
        delayedMessage(setError, 'An error occurred. Please try again later.');
        // setError('An error occurred. Please try again later.');
      }
    }

  return (
    <div>
        <form className='new-product-form' id='new-product-form' onSubmit={handleSubmit}>
            <div className="new-product-msg" style={{ color: error ? 'red' : 'green' }}> 
              { error || success }
            </div> <br />
            <input type="text" name='name' placeholder="name" value={product.name} onChange={handleChange} required /> <br />
            <input type="number" name='pricePerDay' placeholder="Number" value={product.pricePerDay} onChange={handleChange} required /> <br />
        </form>
        

    </div>
  )
}

export default NewProduct