import React from 'react'

const MetricCard = ({ label, value }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      minWidth: '120px',
      textAlign: 'left',
      fontFamily: 'sans-serif',
      flex: '1'
     }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>
          { label }
        </h3>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          { value }
        </span>
    </div>
  )
}

export default MetricCard