import React from 'react'
import MetricsSummary from '../components/MetricsSummary'
import BookingRow from '../components/BookingsTable/BookingRow'

const Bookings = () => {
  return (
    <div style={{ flexGrow: 1, padding: '20px' }}>
        <MetricsSummary />
        <BookingRow />
    </div>
  )
}

export default Bookings