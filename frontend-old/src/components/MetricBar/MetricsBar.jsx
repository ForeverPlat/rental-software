import React, { useEffect, useState } from 'react'
import MetricCard from './MetricCard'
import styles from './MetricsBar.module.css'

const MetricsSummary = () => {

    const [metrics, setMetrics] = useState({
        bookings: 0,
        items: 0,
        revenue: 0,
        due: 0
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getMetrics = async () => {
            try {
                setIsLoading(true);
                // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
                const apiUrl = 'http://localhost:2000';
                const res = await fetch(`${apiUrl}/api/bookings/metrics`);

                if (!res.ok) {
                    throw new Error(`Failed to fetch metrics: ${res.status}`);
                }

                const result = await res.json();
                const { bookings, products, revenue, due } = result.data;
 
                setMetrics({
                    bookings,
                    items: products,
                    revenue,
                    due
                });

            } catch (error) {
                console.error('Error fetching metrics: ', error);
                console.log("message:", result.message);
                
            } finally {
                setIsLoading(false);
            }
        }

        getMetrics();
    }, []);

    if(isLoading) {
        return <div style={{ textAlign: 'center' }}>Loading metrics...</div>
    }

    const { bookings, items, revenue, due } = metrics;

  return (
    <div className={styles.bar}>
        <MetricCard label='Revenue' value={revenue} isCurrency />
        <MetricCard label='Bookings' value={bookings} />
        <MetricCard label='Items ordered' value={items} />
        <MetricCard label='Due' value={due} isCurrency />
    </div>
  )
}

export default MetricsSummary