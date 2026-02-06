import React, { useEffect, useState } from 'react'
import './ProductRow.css'

const ProductRow = ({ product, onClear, onTotalChange, onQuantityChange }) => {
    const { _id, name, pricePerDay } = product;

    {/* image | name | available (amt left) | quantity (+/-) | (selection for days) price per day | total for that rental*/}
    const [quantity, setQuantity] = useState(1);
    const [selectedDays, setSelectedDays] = useState(1);
    const [available, setAvailable] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const price = selectedDays * pricePerDay;
    const totalPrice = quantity * price;

    const getAvailable = async () => {
        try {
            setIsLoading(true);

            // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
            const apiUrl = 'http://localhost:2000';
            const res = await fetch(`${apiUrl}/api/inventory/${_id}`);

            if (!res.ok) {
                throw new Error(`Failed to fetch inventory: ${res.status}`)
            }

            const result = await res.json();
            
            const available = result.data.available;
            const amountRemaining = available - quantity;
            
            setAvailable(amountRemaining);
        } catch (error) {
            console.log('Error fetching inventory:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
      getAvailable();
    },[_id])

    useEffect(() => {
        onTotalChange(_id, totalPrice);
        onQuantityChange(_id, quantity);
    }, [totalPrice, _id, onTotalChange]);
     
    

    const handleIncrease = () => {
        if (quantity < available) setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) setQuantity(quantity - 1);
    };

    const handleChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 0 && value <= available) {
            setQuantity(value);
        }
    }

    const handleProductDaysChange = (e) => {
        setSelectedDays(Number(e.target.value));
    }
    
    
    return(
        <div className='product-row-container'>
            <div className='product-row'>
                <div className='product-row-description'>
                    <div className='product-row-image'></div>
                    <div className="product-row-name">{name}</div> 
                </div>

                <div className='product-row-settings'>

                    <div className='product-row-available'>
                        { isLoading ? 'Loading...' : `${available} left`}
                    </div>

                    <div className='product-row-quantity'>
                    {/* add an onchange to update quantity */}
                    <input type="number" value={quantity} onChange={handleChange} />
                    <div className='product-row-quantity-buttons'>
                        <button onClick={handleIncrease} disabled={quantity >= available}>+</button>
                        <button onClick={handleDecrease} disabled={quantity === 0}>-</button>
                    </div>
                    </div>

                    <div className="product-row-days">
                    <select value={selectedDays} onChange={(e) => handleProductDaysChange(e)}>
                        <option value="1">1 day</option>
                        <option value="2">2 days</option>
                        <option value="3">3 days</option>
                        <option value="4">4 days</option>
                        <option value="5">5 days</option>
                        <option value="6">6 days</option>
                        <option value="7">7 days</option>
                    </select>
                    <span className='product-row-price-per-day'>${price.toFixed(2)}</span>
                    </div>

                    <div className="product-row-total-price">${totalPrice.toFixed(2)}</div>

                </div>
                <button className="product-row-remove" onClick={() => onClear(_id)}>×</button> 

            </div>

        </div>
    )
}

export default ProductRow

