import React, { useState, useEffect } from 'react'
import './NewProduct.css'

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
    <div style={{ padding: '20px' }}>

      <div className='new-product-container-wrapper'>
        <div className='new-product-description'>
          <span>General Information</span>
          <p>Enter the product name and upload an image to represent your rental.</p> 
        </div>
        <div className='new-product-name-container'>
            <div>
              <span>Product Name</span>
              <input type="text" name='name' value={product.name} onChange={handleChange} /> <br />
            </div>
            <div className='product-image-upload-container'>
              <div className='product-image-upload'></div>
            </div>
        </div>
      </div>

      <hr className='new-product-divider' />

      <div className='new-product-container-wrapper'>
        <div className='new-product-description'>
          <span>Pricing</span>
          <p>Set the rental price customers will pay for your product.</p> 
        </div>
        <div className='new-product-pricing-container'>
          <div>
            <span>Flat fee</span>
            <p>Flat fee per period (for example: $50 per day)</p>
          </div>
          <div className='new-product-pricing-selection-container'>
            <div>
              <span>Price</span>
              <input type="number" name="price" value={product.pricePerDay} onChange={handleChange} />
            </div>

            <div>
              <span>Per</span>
              <div className='new-product-per'>Day</div>
            </div>

          </div>
        </div>
      </div>

      <button className='new-product-save-button'>Save</button>


        <form className='new-product-form' id='new-product-form' onSubmit={handleSubmit}>
            <div className="new-product-msg" style={{ color: error ? 'red' : 'green' }}> 
              { error || success }
            </div> <br />
            <input type="text" name='name' placeholder="name" value={product.name} onChange={handleChange} required /> <br />
            <input type="number" name='pricePerDay' placeholder="Number" value={product.pricePerDay} onChange={handleChange} required /> <br />
            <button type='submit'>Save</button>
        </form>
        

    </div>
  )
}

export default NewProduct