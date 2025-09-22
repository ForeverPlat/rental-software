import React from 'react'
import './CardResult.css'
import { useState } from 'react'
import { useEffect } from 'react'

const CardResult = () => {

    const [todaysBookings, setTodaysBookings] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getTodaysBookings = async () => {
          try {
            setIsLoading(true);

            // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
            const apiUrl = 'http://localhost:2000';
            const res = await fetch(`${apiUrl}/api/bookings/today`);

            if (!res.ok) {
              throw new Error(`Failed to fetch customers: ${res.status}`)
            }

            const result = await res.json();

            setTodaysBookings(result.data);

          } catch (error) {
            console.log('Error fetching customers:', error);
          } finally {
            setIsLoading(false);
          }

          getTodaysBookings();
      }
    },[])

    if (isLoading) {
      return <div style={{ textAlign: 'center' }}>Loading Bookings...</div>
    }

  return (
    <div className="dashboard-card-result">
        <span className="time">11:00</span>
        <div className="info">
            <div className="name">Test</div>
            <div className="email">luqman.o.ajani@gmail.com</div>
            <div className="reserved">1 reserved</div>
        </div>
        </div>
  )
}

export default CardResult