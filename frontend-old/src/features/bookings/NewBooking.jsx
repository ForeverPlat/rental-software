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
import Status from '../../components/Status/Status';

const NewBooking = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');

    const [booking, setBooking] = useState({
      "customer": { 'customerId': '', 'name': '' },
      "products": [],
      'pickupDate': '',
      'returnDate': '',
      "status": 'pending',
      "payment": { 'status': 'pending', 'method': 'card', amount: 0 }
    });

    const [customer, setCustomer] = useState(null);

    const [products, setProducts] = useState([]);
    const [productTotal, setProductTotal] = useState([])

    const [pickupDate, setPickupDate] = useState(null);
    const [returnDate, setReturnDate]= useState(null);

    const [pickupTime, setPickupTime] = useState(null);
    const [returnTime, setReturnTime] = useState(null);

    const [payment, setPayment] = useState({ 'status': '' ,'method': '', amount: 0 })

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


  // Handle selection from SearchBar
  const handleProductSelect  = (item) => {

    if (products.some(existingProduct => existingProduct._id === item._id)) {
      console.log(`Product with ID ${item.id} already selected`);
      return;
    }


    // i need to sleep but these are the next steps to fix
    // we are not sending quantity and i think id for the product

    // find a way to get quantity from productRow
    // and use the id we have here
    // construct a new item object and that is what we will set the state to
    // from what i remember item will look like { productId: '', quantity: '' }

    console.log(item);

    const newProduct = { name: item.name, productId: item._id, quantity: 1 };

    setProducts((prevProducts) => [...prevProducts, item]);
    
    setBooking((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }))
  }

  const handleProductClear = (id) => {
    setProducts(products.filter((product) => product._id !== id));
    setProductTotal((prev) => prev.filter((total) => total.product !== id));
    setBooking((prev) => ({
      ...prev,
      products: prev.products.filter((product) => product._id !== id),
    }))
  }

  const handleCustomerSelect = (customer) => {
    setCustomer(customer); // Store full item object or null
    setBooking((prevBooking) => ({
      ...prevBooking,
      customer: {
        ...prevBooking.customer,

        customerId: customer._id,
        name: customer.name
      }
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

  const handleReturnDateSelect = (date) => {
    setReturnDate(date);

    setBooking((prev) => ({
      ...prev,
      returnDate: date
    }))
  }

  // end of time handlers


  const handlePaymentMethodChange = (e) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      payment: {
        ...prevBooking.payment,
        method: e.target.value
      }
    }))
  }

  const handlePaymentStatusChange = (e) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      payment: {
        ...prevBooking.payment,
        status: e.target.value
      }
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
  }, []);

  const handleQuantityChange = useCallback((id, quantity) => {
    setBooking((prev) => ({
      ...prev,
      products: prev.products.map((product) => 
        product.productId === id ? { ...product, quantity } : product )
    }))
  }, [])

  const handleAmountChange = () => {
    let bookingTotal = getBookingTotal();

    // console.log("get total",getBookingTotal());
    setPayment({ amount: bookingTotal });
    // console.log(payment.amount);
    // console.log("handle prod change booking", bookingTotal);

    setBooking((booking) => ({
      ...booking,
      payment: {
        ...booking.payment,
        amount: bookingTotal
      }
    }))
  }

  
  useEffect(() => {
    console.log(booking);
    
  }, [booking])

  useEffect(() => {
    handleAmountChange();
  }, [productTotal])

  const getBookingTotal = () => {
    if (!productTotal.length) return 0;
    return productTotal.reduce((sum, item) => sum + (item.total || 0), 0).toFixed(2);
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

      const { customerId, products, pickupDate, returnDate, payment } = booking;
      
      if (!customerId || !products.length || !pickupDate || !returnDate || !payment.method, !payment.status) {
        setError("All fields must be filled.");
      }

      // console.log(booking);
      

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
        console.log(result)

        if (result.ok) {
          // setSuccess('Verification email sent.');
          delayedMessage(setSuccess, 'Booking has been created.')
          setBooking({ "customerId": '', "products": [], "pickupDate": '', "pickupTime": '', "returnDate": '', "returnTime": '' });
        } else {
          delayedMessage(setError, result.error || 'Failed to create product.')
          // setError(result.error || 'Failed to create user.');
        }

      } catch (error) {
        delayedMessage(setError, 'An error occurred. Please try again later.');
        setError('An error occurred. Please try again later.', result.message);
      }
    }

  // console.log(booking);
  

  return (


      <div style={{ padding: '20px', maxWidth: '750px' }}>

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
                  className={`booking-date-picker ${pickupDate ? 'booking-date-picker-selected' : 'booking-date-picker-unselected'}`}
                  selected={pickupDate}
                  onChange={(date) => handlePickupDateSelect(date)}
                  timeFormat="HH:mm"
                  dateFormat="yyyy/MM/dd"
                  showTimeSelect
                  timeIntervals={30}
                  timeCaption='Time'
                  placeholderText="Select date and time"
                />
              </div>

            </div>

            <div style={{ marginBottom: '10px' }}>
              <div className='return-header'>
                <span>Return</span>
              </div>

              <div className='return-date-section'>
                <DatePicker
                  className={`booking-date-picker ${returnDate ? 'booking-date-picker-selected' : 'booking-date-picker-unselected'}`}
                  selected={returnDate}
                  onChange={(date) => handleReturnDateSelect(date)}
                  timeFormat='HH:mm'
                  dateFormat="yyyy/MM/dd"
                  showTimeSelect
                  timeIntervals={30}
                  timeCaption='Time'
                  placeholderText="Select date and time"
                />
              </div>

            </div>

          </div>
        </div> {/* end of date pickers */}

        <div className='booking-payment-container'>
          

            {/* <div className='new-product-pricing-container'> */}
              <div>
                <span className='new-payment-header-span'>Payment</span>
                <p>Select the payment method and current payment status</p>
              </div>
              <div className='booking-payment-selection-container'>
                <div>
                  <span>Method</span>
                  <select value={payment.method} onChange={handlePaymentMethodChange} >
                    <option value="card">Card</option>
                    <option value="cash">Cash</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>

                <div>
                  <span>Status</span>
                  <select value={payment.status} onChange={handlePaymentStatusChange} >
                    <option value="pending">Pending</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                    <option value="overpaid">Overpaid</option>
                  </select>
                </div>

              </div>
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
                  <ProductRow key={productIndex} product={product} onClear={handleProductClear} onTotalChange={handleProductTotalChange} onQuantityChange={handleQuantityChange} />
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

         {/* <Status statusType={"complete"} statusText={"RETURNED"} /> */}

    </div>
  )
}

export default NewBooking