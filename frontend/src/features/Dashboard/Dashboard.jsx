import React from 'react';
import { useState, useEffect } from 'react';
import './Dashboard.css';
import CardResult from './CardResult';




const Dashboard = () => {

    const [todaysBookings, setTodaysBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getTodaysBookings = async () => {
          try {
            setIsLoading(true);
            const token = localStorage.getItem("token");

            // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
            const apiUrl = 'http://localhost:2000';
            const res = await fetch(`${apiUrl}/api/bookings/today`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            });

            if (!res.ok) {
              throw new Error(`Failed to fetch todays bookings: ${res.status}`)
            }

            const result = await res.json();
            console.log(result.data);
            

            setTodaysBookings(result.data)

            // if (Array.isArray(result.data)) {
            //   setTodaysBookings(result.data);
            // } else {
            //   console.warn('API did non return an array for bookings:', result.data)
            //   setTodaysBookings([]);
            // }


          } catch (error) {
            console.log('Error fetching customers:', error);
          } finally {
            setIsLoading(false);
          }

      }

      getTodaysBookings();
    },[])

    if (isLoading) {
      return <div style={{ textAlign: 'center' }}>Loading Bookings...</div>
    }

  return (
    // will prob have to make a component for this
    <div className="container">
      <div className="section">
        <h2 className='dashboard-card-header'>Going out</h2>
        <div className="results">
          {
            todaysBookings.length > 0 ? (
              todaysBookings.map((booking, bookingIndex) => (
                <CardResult key={bookingIndex} time={booking.startDate.substring(11, 19)} name={booking.name} email={booking.email} quantityReserved={booking.quantity} />
              ))
            ) : (
              <div>No bookings</div>
            )
              // todaysBookings.map((booking, bookingIndex) => (
              //   <CardResult key={bookingIndex} time={booking.startDate.substring(11, 19)} name={booking.name} email={booking.email} quantityReserved={booking.quantity} />
              // ))
          }
            
        </div>
        <div className="links">
          <div className="link">View late</div>
          <div className="link">View all</div>
        </div>
      </div>

      <div className="section">
        <h2 className='dashboard-card-header'>Coming back</h2>
        <div className="results">No results</div>
        <div className="links">
          <div className="link">View late</div>
          <div className="link">View all</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;