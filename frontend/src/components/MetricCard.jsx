import React from 'react'

const MetricCard = ({ label, value }) => {
  return (
    <div>
        <h3>{ label }</h3>
        <span>{ value }</span>
    </div>
  )
}

export default MetricCard