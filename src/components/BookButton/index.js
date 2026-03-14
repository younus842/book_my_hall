import React, { useState, useEffect } from 'react';

const BookButton = ({  advancePayment, handleBookNow }) => {
    const [payNow, setPayNow] = useState(false);
    const handleBookNow2 = () => {
        setPayNow(true); 
        handleBookNow();   
    }

    useEffect(() => {
        // Set up the interval
        const interval = setInterval(() => {
            setPayNow((prev) => !prev);
        }, 1000);

        // IMPORTANT: Clean up the interval when the component is removed
        return () => clearInterval(interval);
    }, []);
    return (
        <button onClick={handleBookNow2} className="book-btn">
            {payNow ? "Book Now!" : <p className="card-text">Pay <span className='rupees'>₹{advancePayment.toLocaleString()}</span> Only</p>}
        </button>
    );
}

export default BookButton