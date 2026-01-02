import React from 'react'
import styles from './MetricsBar.module.css'

const MetricCard = ({ label, value, isCurrency }) => {

  const formattedValue = isCurrency ? (
    <>
      <span className={styles.dollar}>$</span>
      {Math.round(value)}
    </>
  ) : (
    value
  );

  return (

    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{formattedValue}</span>
    </div>

    // <div style={{ 
      // border: '1px solid #ddd',
      // backgroundColor: '#ffffff',
      // borderRadius: '8px',
      // padding: '1rem',
      // minWidth: '120px',
      // textAlign: 'left',
      // fontFamily: 'sans-serif',
      // flex: '1'
    //  }}>
    //     <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>
    //       { label }
    //     </h3>
    //     <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
    //       { value }
    //     </span>
    // </div>
  )
}

export default MetricCard