import React from 'react'
import { useLocation } from 'react-router-dom'

const CustomerDetails = () => {
    const location = useLocation();
    const { customer } = location.state || {};

    const [updatedCustomer, setUpdatedCustomer] = useState(customer);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // handles change when the value is nested
    const handleChange = (section, field, value) => {
        setUpdatedCustomer((prev) => ({
        ...prev,
        [section]: {
            ...prev[section],
            [field]: value,
        },
        }))
    }

    // handle top level fields ex: status
    const handleTopLevelChange = (field, value) => {
        setUpdatedCustomer((prev) => ({
        ...prev,
        [field]: value,
        }))
    }

    const handleSave = async () => {
        setLoading(true);

        try {
        // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
        const apiUrl = 'http://localhost:2000';
        const res = await fetch(`${apiUrl}/api/customers/${updatedCustomer._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })      

        const result = await res.json();
        console.log(result);
        
        if (!res.ok) throw new Error("Failed to update booking");

        setMessage("Booking updated successfully")
        } catch (error) {
            setMessage("Error updating booking")
        } finally {
            setLoading(false);
        }
        
    }

    if (!updatedCustomer) return <p>No customer data available.</p>

    const { name, email, number, _id } = updatedCustomer;

  return (
    <div>

    </div>
  )
}

export default CustomerDetails