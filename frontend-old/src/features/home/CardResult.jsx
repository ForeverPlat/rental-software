import React from 'react'
import './CardResult.css'
import { useState } from 'react'
import { useEffect } from 'react'

const CardResult = ({ time, name, email, quantityReserved, isLoading }) => {

  return (
    <div className="dashboard-card-result">
        <span className="time">{time}</span>
        <div className="info">
        <div className="name">{name}</div>
            <div className="email">{email}</div>
            <div className="reserved">{quantityReserved} reserved</div>
        </div>
    </div>
  )
}

export default CardResult