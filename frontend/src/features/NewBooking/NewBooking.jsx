import React, { useState, useEffect } from 'react'
import './NewBooking.css'
// import SearchBar from '../../components'
import SearchBar from '../../components/SearchBar/SearchBar';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductRow from './ProductRow';

const NewBooking = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');

    // get userId from token (in localStorage)
    // booking name
    // booking email
    // booking number 

    //  check how to properly set up the number
    const [booking, setBooking] = useState({"customerId": '', "products": [{}], 'pickupDate': '', 'pickupTime': '', 'returnDate': '', 'returnTime': '' });

    // create the rolidex thing of customers
    // selecting the customer will give their id
    const [customer, setCustomer] = useState(null);

    // this will work similarly to the customers
    // but will be an array of products the user chooses
    const [products, setProducts] = useState([]);
    const [productTotal, setProductTotal] = useState([{}])

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

    if (products.some(existingProduct => existingProduct.id === item.id)) {
      console.log(`Product with ID ${item.id} already selected`);
      return;
    }

    setProducts((prevProducts) => [...prevProducts, item]);
    
    setBooking((prev) => ({
      ...prev,
      products: [...prev.products, item],
    }))
  }

  const handleCustomerSelect = (customer) => {
    setCustomer(customer); // Store full item object or null
    setBooking((prev) => ({
      ...prev,
      customerId: customer ? customer._id : '', // Update booking.customerId
    }))
  }

  // time handlers

  const handlePickupDateSelect = (date) => {
    setPickupDate(date);

    setBooking((prev) => ({
      ...prev,
      pickupDate: date
    }))
  }

  const handlePickupTimeSelect = (time) => {
    setPickupTime(time);

    setBooking((prev) => ({
      ...prev,
      pickupTime: time 
    }))
  }

  const handleReturnTimeSelect = (time) => {
    setReturnTime(time);

    setBooking((prev) => ({
      ...prev,
      returnTime: time 
    }))
  }

  const handleReturnDateSelect = (date) => {
    setReturnDate(date);

    setBooking((prev) => ({
      ...prev,
      returnDate: date
    }))
  }

  // end of time handlers

  const handleProductClear = (id) => {
    setProducts(products.filter((product) => product._id !== id));
    setProductTotal((prev) => prev.filter((total) => total.product !== id));
    setBooking((prev) => ({
      ...prev,
      products: prev.products.filter((product) => product._id !== id),
    }))
  }

  const handleProductTotalChange = (id, total) => {
    setProductTotal((prev) => {
      const updatedTotals = prev.filter((totalObj) => totalObj.product !== id);
      return [...updatedTotals, { product: id, total }];
    })
  }

  const getBookingTotal = () => {
    if (!productTotal.length) return 0;
    return productTotal.reduce((sum, item) => sum + (item.total || 0), 0).toFixed(2);
  }

  // console.log(booking);
  

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


          <div className='date-picking-container'>
            <div style={{ marginBottom: '10px' }}>
              <div className='pickup-header'>
                <span>Pick Up</span>
              </div>

              <div className='pickup-date-section'>
                <DatePicker
                  className='booking-date-picker'
                  selected={pickupDate}
                  onChange={(date) => handlePickupDateSelect(date)}
                  timeFormat="HH:mm"
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Select date"
                />

                <DatePicker
                  className='booking-time-picker'
                  selected={pickupTime}
                  onChange={(time) => handlePickupTimeSelect(time)}
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
                  onChange={(date) => handleReturnDateSelect(date)}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Select date"
                />

                <DatePicker
                  className='booking-time-picker'
                  selected={returnTime}
                  onChange={(time) => handleReturnTimeSelect(time)}
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
        </div> {/* end of date pickers */}


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
              {products && (
                products.map((product , productIndex) => (
                  <ProductRow key={productIndex} product={product} onClear={handleProductClear} onTotalChange={handleProductTotalChange} />
                ))
              )}
            </div>

            <div className='booking-total'>
              {/* Subtotal underneath */}
              {/* Taxes and security deposit? */}

              {
                products.length > 0 && (
                  <div>
                    <strong>Total: ${getBookingTotal()}</strong>
                  </div>
                )
              }

              

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