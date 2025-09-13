import React, { useState, useEffect } from 'react'

const BookingRow = () => {

    const [bookings, setBookings] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCustomers = async () => {
            try {
                setIsLoading(true);
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
                setIsLoading(false);
            }
        }

        getCustomers();
    }, [])

    if(isLoading) {
        return <div style={{ textAlign: 'center' }}>Loading bookings...</div>
    }

    // const { status, startDate, endDate, payment } = bookings;

  return (
    <div>

        {
            bookings.map(({ id, status, startDate, endDate, payment }) => (
                <div key={ id }>
                    {status},
                    {startDate}
                </div>
            )) 
        }

    </div>
  )
}

export default BookingRow