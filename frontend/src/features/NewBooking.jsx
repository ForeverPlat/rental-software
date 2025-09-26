import React, { useState, useEffect } from 'react'
import './NewBooking.css'
import SearchBar from '../components/SearchBar/SearchBar';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewBooking = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');

    // get userId from token (in localStorage)
    // booking name
    // booking email
    // booking number 

    //  check how to properly set up the number
    const [booking, setBooking] = useState({"customerId": '', "products": [{}], 'startDate': ''});

    // create the rolidex thing of customers
    // selecting the customer will give their id
    const [customer, setCustomer] = useState(null);

    // this will work similarly to the customers
    // but will be an array of products the user chooses
    const [products, setProducts] = useState([{}]);

    // this will be selected using a calender component
    // i beg please look for a component library
    const [pickupDate, setPickupDate] = useState(null);
    const [returnDate, setReturnDate]= useState(null);

    const [pickupTime, setPickupTime] = useState(null);
    const [returnTime, setReturnTime] = useState(null);

    // drop down menu?
    // status starts of as a default maybe?

    // method should be a drop down menu of option
    const [payment, setPayment] = useState({ 'method': '', amount: 0 })

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


  // Handle selection from SearchBar
  const handleProductSelect  = (item) => {
    setProducts(item); // Store full item object or null
    setBooking((prev) => ({
      ...prev,
      products: item ? item : [{}], // Update booking.customerId
    }))
  }

  const handleCustomerSelect= (item) => {
    setCustomer(item); // Store full item object or null
    setBooking((prev) => ({
      ...prev,
      customerId: item ? item._id : '', // Update booking.customerId
    }))
  }

  return (


      <div style={{ padding: '20px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

          <div className='search-container-wrapper'>
            <div className='search-header'>
              <span>Customers</span>
            </div>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchType="customers"
              onSelect={handleCustomerSelect}
            />
          </div>

        {
          console.log(searchTerm)
          
        }


          <div className='date-picking-container'>

            <div style={{ marginBottom: '10px' }}>
              <div className='pickup-header'>
                <span>Pick Up</span>
              </div>

              <div className='pickup-date-section'>
                <DatePicker
                  className='booking-date-picker'
                  selected={pickupDate}
                  onChange={(date) => setPickupDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Select date"
                />

                <DatePicker
                  className='booking-time-picker'
                  selected={pickupTime}
                  onChange={(time) => setPickupTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText='Time'
                />
              </div>

            </div>

            <div style={{ marginBottom: '10px' }}>
              <div className='return-header'>
                <span>Return</span>
              </div>

              <div className='return-date-section'>
                <DatePicker
                  className='booking-date-picker'
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Select date"
                />

                <DatePicker
                  className='booking-time-picker'
                  selected={returnTime}
                  onChange={(time) => setReturnTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText='Time'
                />
              </div>

            </div>

          </div>

          {pickupDate && <p>You picked: {pickupDate.toString()}</p>}


            {/* {selectedDate && <p>You picked: {selectedDate.toDateString()}</p>} */}

          {/* the search needs to be in a div with the date picker */}

        </div>


        <div className='booking-products-container'>
            <div className='search-header'>
              <span>Products</span>
            </div>
            <SearchBar
              searchTerm={productSearchTerm}
              setSearchTerm={setProductSearchTerm}
              searchType="products"
              onSelect={handleProductSelect}
              replaceInputOnSelect={false}
            />

            <div className='booking-product-display'>
              {/* temp display for testing */}

              {/* {products && (
                products.map(({ name, quantity }) => (
                  <div style={{ marginTop: '10px' }}>
                    <p>Selected: {name}</p>
                    <p>Email: {quantity}</p>
                  </div>
                ))
              )} */}
            </div>

            <div className='booking-total'>

            </div>

        </div>


        
        {customer && (
          <div style={{ marginTop: '10px' }}>
            <p>Selected: {customer.name}</p>
            <p>Email: {customer.email}</p>
            <p>Number: {customer.number}</p>
          </div>
        )}



        {/* Display selected item details (optional, for debugging) */}
        
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