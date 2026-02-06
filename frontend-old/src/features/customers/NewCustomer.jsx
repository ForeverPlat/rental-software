import React, { useState, useEffect } from 'react'
import './NewCustomer.css'

const NewCustomer = () => {

    // get userId from token (in localStorage)
    // customer name
    // customer email
    // customer number 

    //  check how to properly set up the number
    const [customer, setCustomer] = useState({ "name": '', "email": '', number: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleNameChange = (e) => {
      setCustomer((prevCustomer) => ({
          ...prevCustomer,
          name: e.target.value
      }))
    }

    const handleEmailChange = (e) => {
      setCustomer((prevCustomer) => ({
          ...prevCustomer,
          email: e.target.value
      }))
    }

    const handleNumberChange = (e) => {
      setCustomer((prevCustomer) => ({
          ...prevCustomer,
          number: e.target.value
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
    
    const handleSubmit = async () => {
      const token = localStorage.getItem('token');

      const { name, email, number } = customer;
      
      if ( !name || !email || !number) {
        setError("All fields must be filled.");
      }

      try {
        const res = await fetch('http://localhost:2000/api/customers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(customer),
        });

        const result = await res.json();
        console.log(result);
        

        if (res.ok) {
          // setSuccess('Verification email sent.');
          delayedMessage(setSuccess, 'Customer has been created.')
          setCustomer({ "name": '', "email": '', number: ''});
        } else {
          delayedMessage(setError, result.error || 'Failed to create customer.')
          // setError(result.error || 'Failed to create user.');
        }

      } catch (error) {
        // something is wrong here
        delayedMessage(setError, 'An error occurred. Please try again later.');
        console.error(error);
        // setError('An error occurred. Please try again later.');
      }
    }

  return (
    <div  style={{ padding: '20px', maxWidth: '450px' }}>

      <div className='new-customer-container'>

        {/* customer name input */}
        <input className='new-customer-customer-name-input' type="text" name='name' placeholder="Customer name" value={customer.name} onChange={handleNameChange} /> <br />

        <hr style={{ borderTop: ' 1px solid #ccc', marginBottom: '16px' }}/>


        {/* Information header */}
        <span className='new-customer-information-header'>Information</span>
        {/* email */}
        {/* customer type */}
        {/* phone */}
        <div className='new-customer-information-container'>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className='new-customer-subheader-span'>Email</span>
            <input type="email" name='email' placeholder="Email" value={customer.email} onChange={handleEmailChange} required /> 
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className='new-customer-subheader-span'>Phone Number</span>
            <input type="phone" name='number' placeholder="Number" value={customer.number} onChange={handleNumberChange} required /> 
          </div>
        </div>
        <div className="new-product-msg" style={{ color: error ? 'red' : 'green' }}> 
          { error || success }
        </div>
      </div>


        {/* make it so button can only be clicked when all fields are filled */}
        <button className='new-customer-save-button' onClick={handleSubmit}>Save</button>
    </div>
  )
}

export default NewCustomer