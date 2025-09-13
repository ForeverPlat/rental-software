import React, { useEffect, useState } from 'react'
import MetricCard from './MetricCard'

const MetricsSummary = () => {

    const [metrics, setMetrics] = useState({
        bookings: 0,
        items: 0,
        revenue: 0,
        due: 0
    });

    useEffect(() => {
        const getMetrics = async () => {
            try {
                const res = await fetch('http://localhost:2000/bookings/metrics');
                const result = await res.json();

                setMetrics(result.data);

            } catch (error) {
                console.error('Error fetching metrics: ', error);
            }
        }

        getMetrics();
    }, []);

    const { bookings, items, revenue, due } = metrics;

  return (
    <div>
        <MetricCard label='Bookings' value={bookings} />
        <MetricCard label='Items ordered' value={items} />
        <MetricCard label='Revenue' value={revenue} />
        <MetricCard label='Due' value={due} />
    </div>
  )
}

export default MetricsSummary