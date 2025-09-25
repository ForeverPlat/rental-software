import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar/SearchBar';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const NewBooking = () => {

  const [searchTerm, setSearchTerm] = useState('');

    // get userId from token (in localStorage)
    // booking name
    // booking email
    // booking number 

    //  check how to properly set up the number
    const [booking, setBooking] = useState({"customerId": '', "products": [{}], startDate: ''});

    // create the rolidex thing of customers
    // selecting the customer will give their id
    const [customer, setCustomer] = useState(null);

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

    const [value, setValue] = useState();

  // Handle selection from SearchBar
  const handleSelect = (item) => {
    setCustomer(item); // Store full item object or null
    setBooking((prev) => ({
      ...prev,
      customerId: item ? item._id : '', // Update booking.customerId
    }))
  }

  return (
      <div style={{ padding: '20px' }}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchType="customers"
          onSelect={handleSelect}
        />


      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label="Basic date picker" />
        </DemoContainer>
      </LocalizationProvider> */}


        {/* Display selected item details (optional, for debugging) */}
        {customer && (
          <div style={{ marginTop: '10px' }}>
            <p>Selected: {customer.name}</p>
            <p>Email: {customer.email}</p>
            <p>Number: {customer.number}</p>
          </div>
        )}
        {/* <form className='new-booking-form' id='new-booking-form' onSubmit={handleSubmit}>
            <div className="new-booking-msg" style={{ color: error ? 'red' : 'green' }}> 
              {error || success}
            </div> <br />
            <input type="text" name='name' placeholder="name" value={booking.name} onChange={handleChange} required /> <br />
            <input type="email" name='email' placeholder="Email" value={booking.email} onChange={handleChange} required /> <br />
            <input type="number" name='number' placeholder="Number" value={booking.number} onChange={handleChange} required /> <br />
        </form>
         */}

    </div>
  )
}

export default NewBooking