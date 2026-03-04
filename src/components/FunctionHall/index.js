import BookingCalendar from "../BookingCalendar";
import PaymentButton from "../PaymentButton";
import { Link } from "react-router-dom";
import "./index.css";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';


const days = [
    { day: 'MON', date: 30, current: false },
    { day: 'TUE', date: 31, current: false },
    { day: 'WED', date: 1, current: true },
    { day: 'THU', date: 2, current: true },
    { day: 'FRI', date: 3, current: true },
    { day: 'SAT', date: 4, current: true, weekend: true },
    { day: 'SUN', date: 5, current: true, weekend: true },
];

const FunctionHall = (props) => {
    const { object, updatedDates } = props;
    const { image_url, name, address, hall_package, bookedDates, id } = object;
    const [payNow, setPayNow] = useState(false)
    // const [selectDate, setVal] = useState("")
    // const [dateList, setDate] = useState([])

    useEffect(() => {
        // Set up the interval
        const interval = setInterval(() => {
            setPayNow((prev) => !prev);
        }, 1000);

        // IMPORTANT: Clean up the interval when the component is removed
        return () => clearInterval(interval);
    }, []);

    // const onSelectDate = (e) => {
    //     setVal(e.target.value)
    //     let dateSeleccted = e.target.value
    //     const is_it_booked = dateList.includes(dateSeleccted)
    //     if (!is_it_booked) {
    //         setDate([...dateList, dateSeleccted])
    //     }
    // }
    return (
        <Link to={`/hall/${id}`} className="text-decoration-none py-4">
            <div className="container d-flex flex-column align-items-center justify-content-center">
                <div
                    className="card col-md-10 shadow-lg border-0 custom-card function-hall-new"
                    style={{ borderRadius: "20px" }}
                >
                    <div className="row g-0">
                        <div className="col-12 col-md-5 position-relative image-wrapper">
                            <img
                                src={image_url}
                                alt={name}
                                className="img-fluid w-100 hall-image"
                                style={{
                                    objectFit: "cover",
                                    height: "100%",
                                    maxHeight: "350px",
                                }}
                            />

                            {/* Rating Badge */}
                            <div className="position-absolute top-0 end-0 m-3 px-3 py-1 bg-white rounded-pill shadow-sm d-flex align-items-center">
                                <FaStar className="text-warning me-1" />
                                <span className="fw-semibold">4.8</span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="col-12 col-md-7 p-4">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div>
                                    <h2 className="fw-bold mb-1">{name}</h2>
                                    <p className="text-muted small mb-0 d-flex align-items-center pt-3">
                                        <MapPin size={16} className="text-danger me-1" /> {address}
                                    </p>
                                </div>
                                <div className="availability-mini-box d-none d-lg-block">
                                    <div className="small fw-bold text-primary mb-2 d-flex align-items-center gap-1">
                                        <div className="dot-indicator"></div> Check Availability
                                    </div>
                                    <div className="calendar-bar shadow-sm border rounded-3 p-2 d-flex gap-2">
                                        {days.map((item, idx) => (
                                            <div key={idx} className="text-center calendar-item">
                                                <div className={`day-label small-font-day ${item.weekend ? 'text-danger' : 'text-muted'}`}>{item.day}</div>
                                                <div className={`date-circle ${item.current ? 'active' : 'disabled'}`}>
                                                    {item.date}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <hr />

                            {/* Features */}
                            <div className="d-flex flex-wrap gap-3 my-4">
                                <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                                    Air Conditioned
                                </span>

                                <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                                    Parking Available
                                </span>

                                <span className="badge bg-secondary-subtle text-purple px-3 py-2 rounded-pill">
                                    Catering Service
                                </span>
                            </div>

                            {/* Price + Button */}
                            <div className="row align-items-center mt-4">
                                {/* Price */}
                                <div className="col-12 col-md-7 mb-3 mb-md-0">
                                    <div className="text-muted">Starting from</div>
                                    <div className="fw-bold" style={{ fontSize: "28px" }}>
                                        <span>₹ {hall_package}</span>
                                        <span className="fs-6 text-muted"> /day</span>
                                    </div>
                                </div>

                                {/* Calendar */}
                                {/* <div className="col-12 col-md-4 mb-3 mb-md-0">
                                <div className="text-muted">Check Availability</div>
                                <div className="fw-bold" style={{ fontSize: "32px" }}>
                                    <Link to={`/hall/${id}`} className="text-decoration-none">
                                        <button className="btn btn-secondary w-100 w-md-auto px-4 py-2 ">
                                            Select Date
                                        </button>
                                    </Link>
                                </div>
                            </div> */}

                                {/* Button */}
                                <div className="col-12 col-md-5 mb-3 mb-md-0">
                                    <div className="text-muted">Book!</div>
                                    <div className="fw-bold" style={{ fontSize: "32px" }}>

                                        <button className="btn btn-primary  w-100 w-md-auto px-4 py-2 ">
                                            {payNow ? "Book Now!" : `Pay ₹${(hall_package * 0.1).toLocaleString()} Advance`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></Link >
    );
};

export default FunctionHall;