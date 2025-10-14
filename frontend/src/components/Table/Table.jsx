import React from 'react'
import './Table.css'
import { useNavigate } from 'react-router-dom'

const Table = ({ headers, rows, onRowClick }) => {

    const navigate = useNavigate();

    // will have to move this to booking its self, then pass an onclick value in to this I think
    // const handleRowClick = (booking) => {
    //     navigate('/bookings/details', { state: { booking } });
    // }

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
                                            header.key === 'payment' ? row[header.key].amount :
                                            header.key === 'paymentStatus' ? row.payment.status :
                                            header.key === 'customer' && row[header.key] != null ? row[header.key].name :
                                            header.key === 'customer' && row[header.key] == null ? '-' :
                                            header.key != null ? row[header.key] :
                                            row[header.key]
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