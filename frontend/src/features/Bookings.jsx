import React, { useState, useEffect } from 'react'
import MetricsSummary from '../components/MetricsSummary'
// import BookingRow from '../components/BookingsTable/BookingsRow/BookingsRow'
// import BookingsHeader from '../components/BookingsTable/BookingsHeader/BookingsHeader'
import Table from '../components/Table/Table'

const Bookings = () => {

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const headers = [
      { display: 'Customer', key: 'customer' },
      { display: 'From', key: 'from' },
      { display: 'Until', key: 'until' },
      { display: 'Price', key: 'price' },
      { display: 'Payment Status', key: 'paymentStatus' },
    ];

    useEffect(() => {
        const getBookings = async () => {
          try {
            setIsLoading(true);

            // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
            const apiUrl = 'http://localhost:2000';
            const res = await fetch(`${apiUrl}/api/bookings`);

            if (!res.ok) {
              throw new Error(`Failed to fetch customers: ${res.status}`)
            }

            const result = await res.json();

            setBookings(result.data);

          } catch (error) {
            console.log('Error fetching customers:', error);
          } finally {
            setIsLoading(false);
          }

          getBookings();
      }
    }, []);

    if (isLoading) {
      return <div style={{ textAlign: 'center' }}>Loading Bookings...</div>
    }
    console.log(bookings)

  return (
    <div style={{ flexGrow: 1, padding: '20px' }}>
      <MetricsSummary />

      <Table headers={headers} rows={bookings} />

        {/* <BookingsHeader/> */}
        {/* <BookingRow /> */}
    </div>
  )
}

export default Bookings