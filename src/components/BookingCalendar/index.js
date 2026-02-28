import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './index.css'
import Image from '../../assets/calendar2.png'

function BookingCalendar(props) {
    const [selectedDate, setSelectedDate] = useState(null);
    const { bookedDates, updatedDates, id } = props
    console.log(bookedDates)

    const [hasClicked, setHasClicked] = useState(false);


    // Format date to YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    // Disable past dates + booked dates
    const tileDisabled = ({ date, view }) => {
        if (view !== "month") return false;

        const activeMonth = selectedDate
            ? selectedDate.getMonth()
            : new Date().getMonth();

        if (date.getMonth() !== activeMonth) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const formatted = formatDate(date);

        return (
            date < today ||
            bookedDates.includes(formatted)
        );
    };




    // Add custom styling for booked dates
    const tileClassName = ({ date, view }) => {
        if (view !== "month") return null;

        // const activeMonth = selectedDate
        //     ? selectedDate.getMonth()
        //     : new Date().getMonth();

        // if (date.getMonth() !== activeMonth) return null;

        const formatted = formatDate(date);

        if (bookedDates.includes(formatted)) {
            return "booked-date";
        }

        return null;
    };



    // Handle booking
    const handleDateChange = (date) => {
        const formatted = formatDate(date);
        console.log(formatted)
        if (bookedDates.includes(formatted)) {
            alert("This date is already booked!");
            console.log('this date is already booked')
        } else {
            setSelectedDate(date);
            alert(`You selected ${formatted}`);
            updatedDates(id, formatted)
        }
    };

    // Limit to next 3 months
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);

    return (
        <div>
            <h5 className="mb-2 heading-calendar-main">Check Availability</h5>
            {!hasClicked ? <img onClick={() => setHasClicked(true)} src={Image} alt="Calendar" className="calendar-image" />
                : <div className="calendar-container">
                    <div className="top-calendar-container">
                        <h5 className=" select-date">Select a Date</h5>
                        <button className="close-button" onClick={() => setHasClicked(false)}>X</button>
                    </div>

                    <Calendar className={"react-calendar"}
                        onChange={handleDateChange}
                        value={selectedDate}
                        minDate={new Date()}
                        maxDate={maxDate}
                        tileDisabled={tileDisabled}
                        tileClassName={tileClassName}
                    /></div>}

            {selectedDate && (
                <p style={{ marginTop: "20px" }}>
                    Selected Date: <strong>{formatDate(selectedDate)}</strong>
                </p>
            )}
        </div>
    );
}

export default BookingCalendar;
