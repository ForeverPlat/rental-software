import React from 'react'
import MetricsSummary from '../components/MetricsSummary'
import BookingRow from '../components/BookingsTable/BookingsRow/BookingsRow'
import BookingsHeader from '../components/BookingsTable/BookingsHeader/BookingsHeader'

const Bookings = () => {
  return (
    <div style={{ flexGrow: 1, padding: '20px' }}>
        <MetricsSummary />
        <BookingsHeader/>
        <BookingRow />
    </div>
  )
}

export default Bookings