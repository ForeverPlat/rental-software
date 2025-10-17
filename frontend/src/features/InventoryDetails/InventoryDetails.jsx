import React from 'react'
import { useLocation } from 'react-router-dom'

const InventoryDetails = () => {

    const location = useLocation();
    const { customer } = location.state || {};

    const [updatedInventory, setUpdatedInventory] = useState(customer);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // handles change when the value is nested
    const handleChange = (section, field, value) => {
        setUpdatedInventory((prev) => ({
        ...prev,
        [section]: {
            ...prev[section],
            [field]: value,
        },
        }))
    }

    // handle top level fields ex: status
    const handleTopLevelChange = (field, value) => {
        setUpdatedInventory((prev) => ({
        ...prev,
        [field]: value,
        }))
    }

    const handleSave = async () => {
        setLoading(true);

        try {
        // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
        const apiUrl = 'http://localhost:2000';
        const res = await fetch(`${apiUrl}/api/inventory/${updatedInventory._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedInventory)
        })      

        const result = await res.json();
        console.log(result);
        
        if (!res.ok) throw new Error("Failed to update inventory");

        setMessage("Inventory updated successfully")
        } catch (error) {
            setMessage("Error updating inventory")
        } finally {
            setLoading(false);
        }
        
    }

    if (!updatedInventory) return <p>No product data available.</p>

    const { name, email, number, _id } = updatedInventory;



  return (
    <div></div>
  )
}

export default InventoryDetails