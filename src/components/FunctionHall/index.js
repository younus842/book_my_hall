import BookingCalendar from "../BookingCalendar";
import PaymentButton from "../PaymentButton";
import { Link } from "react-router-dom";
import "./index.css";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";

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
    <div className="container py-5">
      <div
        className="card shadow-lg border-0 custom-card"
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
            <h2 className="fw-bold mb-3">{name}</h2>

            {/* Location */}
            <div className="d-flex align-items-center  mb-3 location-box">
              <FaMapMarkerAlt className="me-2 fs-5 location-icon" />
              <span>{address}</span>
            </div>

            {/* Capacity */}
            <div className="d-flex align-items-center mb-4 location-box">
              <FaUsers className="me-2 fs-5 capacity-icon" />
              <span className="fw-semibold">Capacity: 500 guests</span>
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
              <div className="col-12 col-md-4 mb-3 mb-md-0">
                <div className="text-muted">Starting from</div>
                <div className="fw-bold" style={{ fontSize: "32px" }}>
                  <span>₹ {hall_package}</span>
                  <span className="fs-6 text-muted"> /day</span>
                </div>
              </div>

              {/* Calendar */}
              <div className="col-12 col-md-4 mb-3 mb-md-0">
                <div className="text-muted">Check Availability</div>
                <div className="fw-bold" style={{ fontSize: "32px" }}>
                  <Link to={`/hall/${id}`} className="text-decoration-none">
                    <button className="btn btn-secondary w-100 w-md-auto px-4 py-2 ">
                      Select Date
                    </button>
                  </Link>
                </div>
              </div>

              {/* Button */}
              <div className="col-12 col-md-4 mb-3 mb-md-0">
                <div className="text-muted">Book!</div>
                <div className="fw-bold" style={{ fontSize: "32px" }}>
                  <Link to={`/hall/${id}`} className="text-decoration-none">
                    <button className="btn btn-primary w-100 w-md-auto px-4 py-2 ">
                      Know More!
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionHall;