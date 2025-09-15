import React from 'react'
import './BookingsHeader.css'

const BookingsHeader = () => {

  const bookingsHeaderItems = [
    'Customer',
    'Status',
    'From',
    'Until',
    'Price',
    'Payment Status'
  ]

  return (
    <div className='bookings-header'>

        {
          bookingsHeaderItems.map((item) => (
            <div key={item} className='bookings-header-item'>{item}</div>
          ))
        }

    </div>
  )
}

export default BookingsHeader