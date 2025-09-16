import React, { useState, useEffect } from 'react'
import './BookingsRow.css';

const BookingRow = () => {

    const [bookings, setBookings] = useState([]);
    const [customers, setCustomers] = useState({});
    const [isLoadingBookings, setIsLoadingBookings] = useState(false);
    const [isLoadingNames, setIsLoadingNames] = useState(false);

    useEffect(() => {
        const getBookings = async () => {
            try {
                setIsLoadingBookings(true);
                // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
                const apiUrl = 'http://localhost:2000';
                const res = await fetch(`${apiUrl}/api/bookings`);

                if (!res.ok) {
                    throw new Error(`Failed to fetch bookings: ${res.status}`)
                }

                const result = await res.json();

                setBookings(result.data);

            } catch (error) {
                console.error('Error fetching metrics: ', error);
            } finally {
                setIsLoadingBookings(false);
            }
        }

        getBookings();
    }, [])

    useEffect(() => {
        if (!bookings) return;

        const getCustomers = async () => {
            try {
                setIsLoadingNames(true);
                const ids = bookings.map((booking) => booking.customerId);

                // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
                const apiUrl = 'http://localhost:2000';
                const res = await fetch(`${apiUrl}/api/customers/batch`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ids })
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch customers: ${res.status}`);
                }

                const result = await res.json();

                setCustomers(result.data || {});

            } catch (error) {
                console.error('Error fetching customers: ', error);
            } finally {
                setIsLoadingNames(false);
            }
        }

        getCustomers();
    }, [bookings])

    if(isLoadingBookings || isLoadingNames) {
        return <div style={{ textAlign: 'center' }}>Loading bookings...</div>
    }
    
    if (bookings.length === 0) {
        return <div style={{ textAlign: 'center' }}>No bookings found.</div>;
    }

  return (
    <div>
        {
            bookings.map(({ customerId, id, status, startDate, endDate, payment }) => (
                <div key={ id } className='booking-row'>
                    {/* these should probably be turned into components T.T */}
                    <div>{ customers[customerId]?.name || 'Unknown Customer' }</div>
                    <div className='booking-status'>{status}</div>
                    <div>{ new Date(startDate).toLocaleDateString() }</div>
                    <div>{ new Date(endDate).toLocaleDateString() }</div>
                    <div>${payment.amount.toFixed(2)}</div>
                </div>
            )) 
        }
    </div>
  )
}

export default BookingRow