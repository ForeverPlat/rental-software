import React from 'react'
import './Table.css'

const Table = ({ headers, rows }) => {

    const headerLength = headers.length;

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
                                    <td key={dataIndex} className='cell'>
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