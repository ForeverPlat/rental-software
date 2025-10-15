import React from 'react'
import './Table.css'

const Table = ({ headers, rows, onRowClick, type }) => {

    // will have to move this to booking its self, then pass an onclick value in to this I think
    // const handleRowClick = (booking) => {
    //     navigate('/bookings/details', { state: { booking } });
    // }

    const bookingChecks = (row, key) => {
        return key === 'status' ? row[key].replace(/-/g, ' ') : // removing the dash
        key === 'payment' ? row[key].amount :
        key === 'paymentStatus' ? row.payment.status :
        key === 'customer' && row[key] != null ? row[key].name :
        key === 'customer' && row[key] == null ? '-' :
        key != null ? row[key] :
        row[key]
    }

    const inventoryChecks = (row, key) => {
        return key === 'name' ? row.productName : 
        row[key]
    }

    const customerChecks = (row, key) => {
        return row[key]
    }

  return (
    <div style={{ 'width': '100%' }}>

        <table className='table-container'>
            <thead>
                <tr className='table-header' >
                    {
                        headers.map((header, headerIndex) => (
                            <th key={headerIndex} className='header-cell'>{ header.display }</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className='table-row'>
                            {
                                headers.map((header, dataIndex) => (
                                    <td key={dataIndex} className='cell' onClick={() => onRowClick(row)} >
                                        { 
                                            type === "bookings" ? bookingChecks(row, header.key) :
                                            type === "inventory" ? inventoryChecks(row, header.key) :
                                            type === "customers" ? customerChecks(row, header.key) :
                                            null
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>

        </table>
    </div>
  )
}

export default Table