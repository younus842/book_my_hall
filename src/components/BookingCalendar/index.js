import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./index.css"; // Your custom external CSS
import Image from "../../assets/calendar2.png";

function BookingCalendar({ bookedDates, setDate }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [hasClicked, setHasClicked] = useState(false);
    console.log('Booked Dates:', bookedDates);
    const formatDate = (date) => {
        return date.toLocaleDateString('en-CA');
    };

    const tileDisabled = ({ date, view }) => {
        if (view !== "month") return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today || bookedDates.includes(formatDate(date));
    };

const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formattedDate = formatDate(date);

    // 1. Check if the date is in the past
    if (date < today) {
        return "past-date";
    }

    // 2. Check if the date is booked
    if (bookedDates.includes(formattedDate)) {
        return "booked-date";
    }

    // 3. Otherwise, it's a valid un-booked date
    return "un-booked-date";
};

const handleDateChange = (date) => {
    const formatted = formatDate(date);

    // If the date clicked is already the selected date, deselect it
    if (selectedDate && formatDate(selectedDate) === formatted) {
        setSelectedDate(null);
        setDate("Please select a date"); // Send the string back to trigger your Modal's warning state
        return;
    }

    // Otherwise, if it's not booked, select it
    if (!bookedDates.includes(formatted)) {
        setSelectedDate(date);
        setDate(date);
    }
};

    return (
        // Container using Bootstrap classes
        <div className="card border-0 shadow-lg rounded-4 mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body p-4">
                <h5 className="fw-bold text-dark mb-1">Check Availability</h5>
                <p className="text-muted small mb-4">Select a date to check if the hall is available</p>




                <div className="fade-zoom-in mt-5">

                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        minDate={new Date()}
                        maxDate={new Date(new Date().setMonth(new Date().getMonth() + 6))}
                        tileDisabled={tileDisabled}
                        tileClassName={tileClassName}
                    />

                    {/* Legend Section */}
                    <div className="mt-4 d-flex gap-3 small">
                        <div className="d-flex align-items-center gap-2">
                            <span className="rounded" style={{ width: '16px', height: '16px', background: '#e8f5e9', border: '1px solid #c8e6c9' }}></span>
                            <span className="text-secondary">Available</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <span className="rounded" style={{ width: '16px', height: '16px', background: '#f8d7da', border: '1px solid #f5c2c7' }}></span>
                            <span className="text-secondary">Booked</span>
                        </div>
                    </div>
                </div>


                {/* Success Alert */}
                {selectedDate && (
                    <div className="mt-4 p-3 bg-success-subtle border border-success rounded-3 text-success fw-medium small d-flex align-items-center gap-2">
                        <i className="bi bi-check-circle-fill"></i>
                        ✓ Available on {selectedDate.toLocaleDateString('en-US', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookingCalendar;