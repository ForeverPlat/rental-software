import React, { useState, useEffect } from 'react'

const NewCustomer = () => {

    // get userId from token (in localStorage)
    // customer name
    // customer email
    // customer number 

    //  check how to properly set up the number
    const [customer, setCustomer] = useState({ "name": '', "email": '', number: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
      const { name, value } = e.target;
      
      setCustomer((prevCustomer) => ({
          ...prevCustomer,
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
    <div>
        <form className='new-customer-form' id='new-customer-form' onSubmit={handleSubmit}>
            <div className="new-customer-msg" style={{ color: error ? 'red' : 'green' }}> 
              {error || success}
            </div> <br />
            <input type="text" name='name' placeholder="name" value={customer.name} onChange={handleChange} required /> <br />
            <input type="email" name='email' placeholder="Email" value={customer.email} onChange={handleChange} required /> <br />
            <input type="phone" name='number' placeholder="Number" value={customer.number} onChange={handleChange} required /> <br />
            <button id="new-customer-button" type="submit">Create Customer</button>
        </form>
        

    </div>
  )
}

export default NewCustomer