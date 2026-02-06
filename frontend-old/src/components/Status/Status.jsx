import React from 'react'
import './Status.css'

const Status = ({statusType, statusText}) => {

    // complete: green
    // pending: grey

    // return text
    // RETURNED: green

  return (
    <div id="status-box" className={statusType}>
        {statusText}
    </div>
  )
}

export default Status