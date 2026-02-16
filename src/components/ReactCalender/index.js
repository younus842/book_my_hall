import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./index.css";

function HallCalendar() {
  const [bookedDates, setBookedDates] = useState([]);

  // Local safe date formatter (NO timezone bug)
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleDateClick = (date) => {
    const formatted = formatDate(date);

    if (bookedDates.includes(formatted)) {
      alert("Already booked!");
      return;
    }

    // Add selected date as booked
    setBookedDates((prev) => [...prev, formatted]);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <Calendar
        onClickDay={handleDateClick}
        minDate={new Date()}
        tileDisabled={({ date }) =>
          bookedDates.includes(formatDate(date))
        }
        tileClassName={({ date }) =>
          bookedDates.includes(formatDate(date))
            ? "booked-date"
            : null
        }
      />

      <h5 style={{ marginTop: "20px" }}>Booked Dates:</h5>
      <ul>
        {bookedDates.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  );
}

export default HallCalendar;
