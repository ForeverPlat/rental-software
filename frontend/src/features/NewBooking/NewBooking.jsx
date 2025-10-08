import React, { useState, useEffect, useCallback } from 'react'
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

    const [booking, setBooking] = useState({
      "customerId": '',
      'pickupDate': '',
      'pickupTime': '',
      'returnDate': '',
      'returnTime': '' ,
      "status": 'pending',
      "products": [],
      "payment": {}
    });

    const [customer, setCustomer] = useState(null);

    const [products, setProducts] = useState([]);
    const [productTotal, setProductTotal] = useState([])

    const [pickupDate, setPickupDate] = useState(null);
    const [returnDate, setReturnDate]= useState(null);

    const [pickupTime, setPickupTime] = useState(null);
    const [returnTime, setReturnTime] = useState(null);

    const [payment, setPayment] = useState({ 'method': '', amount: 0 })

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


  // Handle selection from SearchBar
  const handleProductSelect  = (item) => {

    if (products.some(existingProduct => existingProduct._id === item._id)) {
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

  // do more reading on useCallBack
  // preventing infinite loop by ensuring this isn't called on every render?
  // but instead only when user makes change
  const handleProductTotalChange = useCallback((id, total) => {
    setProductTotal((prev) => {
      const updatedTotals = prev.filter((totalObj) => totalObj.product !== id);
      return [...updatedTotals, { product: id, total }];
    })

    const bookingTotal = 0;
      productTotal.forEach((product) => {
      bookingTotal += product.total;
    })

    setPayment({ total: bookingTotal });

    setBooking((booking) => ({
      ...booking,
      payment: {
        ...booking.payment,
        amount: bookingTotal
      }
    }))

  }, []);

  const getBookingTotal = () => {
    if (!productTotal.length) return 0;
    return productTotal.reduce((sum, item) => sum + (item.total || 0), 0).toFixed(2);
  }

  // const [booking, setBooking] = useState({
  //     "customerId": '',
  //     "products": [],
  //     'pickupDate': '',
  //     'pickupTime': '',
  //     'returnDate': '',
  //     'returnTime': '' 
  //   });

    const handleSubmit = async () => {
      const token = localStorage.getItem('token');

      const { customerId, products, pickupDate, pickupTime, returnDate, returnTime } = booking;
      
      if (customerId || products || pickupDate || pickupTime || returnDate || returnTime) {
        setError("All fields must be filled.");
      }

      try {
        const res = await fetch('http://localhost:2000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(booking), // update from startDate and other to pick up and return
        });

        const result = await res.json();

        if (res.ok) {
          // setSuccess('Verification email sent.');
          delayedMessage(setSuccess, 'Booking has been created.')
          setBooking({ "customerId": '', "products": [], "pickupDate": '', "pickupTime": '', "returnDate": '', "returnTime": '' });
        } else {
          delayedMessage(setError, result.error || 'Failed to create product.')
          // setError(result.error || 'Failed to create user.');
        }

      } catch (error) {
        delayedMessage(setError, 'An error occurred. Please try again later.');
        // setError('An error occurred. Please try again later.');
      }
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

              {
                products.length != 0 && (
                  <div className="product-row-titles">
                      <div className="product-row-description">
                          <div className="product-row-image-header"></div>
                          <div className="product-row-name-header"></div>
                      </div>
                      <div className="product-row-settings">
                          <div></div>
                          <div>Quantity</div>
                          <div>Duration</div>
                          <div>Price</div>
                      </div>
                      <div></div>
                  </div>
                )
              }

              {products.length != 0 && (
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
        
        {/* make it so button can only be clicked when all fields are filled */}
        <button className='new-booking-save-button' onClick={handleSubmit}>Save</button>



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