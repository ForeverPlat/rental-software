import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import MetricsSummary from '../../components/MetricsSummary'
import MetricBar from '../../components/MetricBar/MetricsBar'
// import BookingRow from '../components/BookingsTable/BookingsRow/BookingsRow'
// import BookingsHeader from '../components/BookingsTable/BookingsHeader/BookingsHeader'
import Table from '../../components/Table/Table'

const Bookings = () => {

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const headers = [
      { display: 'Customer', key: 'customer' },
      { display: 'Status', key: 'status' },
      { display: 'From', key: 'pickupDate' },
      { display: 'Until', key: 'returnDate' },
      { display: 'Price', key: 'payment' },
      { display: 'Payment Status', key: 'paymentStatus' },
    ];

    const navigate = useNavigate();


    const getBookings = async () => {
      const token = localStorage.getItem('token');

      try {
        setIsLoading(true);

        // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
        const apiUrl = 'http://localhost:2000';
        const res = await fetch(`${apiUrl}/api/bookings/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch bookings: ${res.status}`)
        }

        const result = await res.json();

        console.log(result);
        
        setBookings(result.data);

      } catch (error) {
        console.log('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    }

    useEffect(() => {
      getBookings();
    }, [])
    // getBookings();

    const handleBookingClick = (booking) => {
        navigate('/bookings/details', { state: { booking } });
    }

  if (isLoading) {
      return <div style={{ textAlign: 'center' }}>Loading Bookings...</div>
    }
    // console.log(bookings)

  return (
    <div style={{ flexGrow: 1, padding: '20px' }}>
      {/* <MetricsSummary /> */}
      <MetricBar />

      <Table headers={headers} rows={bookings} onRowClick={handleBookingClick} type={"bookings"} />

        {/* <BookingsHeader/> */}
        {/* <BookingRow /> */}
    </div>
  )
}

export default Bookings