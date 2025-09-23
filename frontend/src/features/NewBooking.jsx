import React, { useState, useEffect } from 'react'

const NewBooking = () => {

    // get userId from token (in localStorage)
    // booking name
    // booking email
    // booking number 

    //  check how to properly set up the number
    const [booking, setBooking] = useState({"customerId": '', "products": [{}], startDate: ''});

    // create the rolidex thing of customers
    // selecting the customer will give their id
    const [customer, setCustomer] = useState({});

    // this will work similarly to the customers
    // but will be an array of products the user chooses
    const [products, setProducts] = useState([{}]);

    // this will be selected using a calender component
    // i beg please look for a component library
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate]= useState('');

    // drop down menu?
    // status starts of as a default maybe?

    // method should be a drop down menu of option
    const [payment, setPayment] = useState({ 'method': '', amount: 0 })

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
      const { name, value } = e.target;
      
      setBooking((prevBooking) => ({
          ...prevBooking,
          [name]: value
      }))
    }

    const delayedMessage = (setter, message) => {
      setter('');
      useEffect(() => {
        setTimeout(() => {
          setter(message);
        }, 5000);
      });
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');

      const { name, email, number } = booking;
      
      if ( !name || !email || !number) {
        setError("All fields must be filled.");
      }

      try {
        const res = await fetch('http://localhost:2000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(booking),
        });

        const result = await res.json();

        if (res.ok) {
          // setSuccess('Verification email sent.');
          delayedMessage(setSuccess, 'Booking has been created.')
          setUser({ "name": '', "email": '', number: ''});
        } else {
          delayedMessage(setError, result.error || 'Failed to create booking.')
          // setError(result.error || 'Failed to create user.');
        }

      } catch (error) {
        delayedMessage(setError, 'An error occurred. Please try again later.');
        // setError('An error occurred. Please try again later.');
      }
    }

  return (
    <div>
        <form className='new-booking-form' id='new-booking-form' onSubmit={handleSubmit}>
            <h2>New Booking</h2>
            <div className="new-booking-msg" style={{ color: error ? 'red' : 'green' }}> 
              {error || success}
            </div> <br />
            <input type="text" name='name' placeholder="name" value={booking.name} onChange={handleChange} required /> <br />
            <input type="email" name='email' placeholder="Email" value={booking.email} onChange={handleChange} required /> <br />
            <input type="number" name='number' placeholder="Number" value={booking.number} onChange={handleChange} required /> <br />
        </form>
        

    </div>
  )
}

export default NewBooking