import React from 'react'
import MetricsSummary from '../components/MetricsSummary'
// import BookingRow from '../components/BookingsTable/BookingsRow/BookingsRow'
// import BookingsHeader from '../components/BookingsTable/BookingsHeader/BookingsHeader'
import Table from '../components/Table/Table'

const Bookings = () => {

    
      const rows = [
      {
        customer: 'John Doe',
        status: 'Confirmed',
        from: '2025-09-20',
        until: '2025-09-22',
        price: '$200',
        'payment status': 'Paid',
      },
      {
        customer: 'Jane Smith',
        status: 'Pending',
        from: '2025-09-21',
        until: '2025-09-23',
        price: '$250',
        'payment status': 'Unpaid',
      },
      {
        Customer: 'Alice Johnson',
        status: 'Cancelled',
        from: '2025-09-22',
        until: '2025-09-24',
        Price: '$180',
        'payment status': 'Refunded',
      },
    ];
    const headers = [
      'Customer',
      'Status',
      'From',
      'Until',
      'Price',
      'Payment Status'
    ]

    

  return (
    <div style={{ flexGrow: 1, padding: '20px' }}>
      <MetricsSummary />

      <Table headers={headers} rows={rows} />

        {/* <BookingsHeader/> */}
        {/* <BookingRow /> */}
    </div>
  )
}

export default Bookings