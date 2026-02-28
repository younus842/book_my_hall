import React from "react";
import { useState, useEffect } from "react";

function PaymentButton({ selectedDate, hallId }) {

    const [payNow, setPayNow] = useState(false)

    useEffect(() => {
        const intervalId = setInterval(() => { setPayNow(!payNow); }, 1500);
        return () => { clearInterval(intervalId); };
    }, [payNow]);


    const handlePayment = async () => {

        const amount = 1; // advance amount

        // STEP 1 - Create Order
        const response = await fetch("http://localhost:5000/create-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                date: selectedDate,
                hallId,
            }),
        });

        const order = await response.json();

        // STEP 2 - Open Checkout
        const options = {
            key: "rzp_live_SLKsipeYfv1AJH",
            amount: order.amount,
            currency: "INR",
            name: "Hall Booking",
            description: "Advance Payment",
            order_id: order.id,

            handler: async function (response) {

                // STEP 4 - Send data to backend
                const verifyRes = await fetch(
                    "http://localhost:5000/verify-payment",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(response),
                    }
                );

                const result = await verifyRes.json();

                if (result.success) {
                    alert("Booking Confirmed 🎉");
                } else {
                    alert("Payment verification failed");
                }
            },

            theme: {
                color: "#2B547E",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <button onClick={handlePayment} className="button-book">{payNow ? "Book Now!" : <p className="card-text">Pay <span className='rupees'>₹5.00</span> Only</p>}</button>
    );
}

export default PaymentButton;
