import BookingCalendar from '../BookingCalendar'
import PaymentButton from '../PaymentButton';
import './index.css'
import { useState, useEffect } from 'react'

const FunctionHall = (props) => {
    const { object, updatedDates } = props;
    const { image_url, name, address, hall_package, bookedDates, id } = object;
    // const [selectDate, setVal] = useState("")
    // const [dateList, setDate] = useState([])


    // useEffect(() => {
    //     setInterval(() => {
    //         if (!payNow) {
    //             setPayNow(true)
    //         } else {
    //             setPayNow(false)
    //         }
    //     }, 1500)
    // }, [])




    // const onSelectDate = (e) => {
    //     setVal(e.target.value)
    //     let dateSeleccted = e.target.value
    //     const is_it_booked = dateList.includes(dateSeleccted)
    //     if (!is_it_booked) {
    //         setDate([...dateList, dateSeleccted])
    //     }
    // }
    return (
        <div className="function-hall">
            <img src={image_url} className="hall-image" alt={name} />


            <div className="card-body">
                <strong className="card-title">{name}</strong>
                <p className="card-text">{address}</p>
                <p className="card-text">Price : {hall_package}</p>
                <BookingCalendar id={id} bookedDates={bookedDates} updatedDates={updatedDates} />

                <PaymentButton />
            </div>
        </div>
    );
};


export default FunctionHall