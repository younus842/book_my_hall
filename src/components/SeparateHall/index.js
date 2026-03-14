import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowLeft, MapPin, Users, IndianRupee, Check } from "lucide-react";
import { functionHalls } from "../data/functionHalls";
import './index.css'
import BookingCalendar from "../BookingCalendar";
import BookingDates from "../Context";
import BookingModal from "../BookingModal";
import BookButton from "../BookButton";
import Navbar2 from "../Navbar2";

const SeparateHall = (props) => {

    useLayoutEffect(() => {
        // 1. Force instant jump to top
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' // This is the key to "starting from the first"
        });
    }, []);



    const { id } = useParams();
    console.log(props);
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [showModal, setShowModal] = useState(false);

    const hall = functionHalls.find((h) => h.id === parseInt(id));



    function NextArrow(props) {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
                   bg-black/30 hover:bg-white/30 text-white 
                   p-3 rounded-full cursor-pointer 
                   transition duration-300"
            >
                <ChevronRight size={20} />
            </div>
        );
    }

    function PrevArrow(props) {
        const { onClick } = props;
        return (
            <div
                onClick={onClick}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
                   bg-black/30 hover:bg-white/30 text-white 
                   p-3 rounded-full cursor-pointer 
                   transition duration-300"
            >
                <ChevronLeft size={20} />
            </div>
        );
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Shows 3 images side by side
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true, // Focuses the middle image
        centerPadding: "0px",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerMode: false
                }
            }
        ]
    };

    if (!hall) {
        return (
            <div className="vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <h2>Function Hall Not Found</h2>
                    <button
                        onClick={() => navigate("/")}
                        className="btn btn-primary mt-3"
                    >
                        Go Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const advancePayment = Math.round(hall.price * 0.1);
    const remainingPayment = hall.price - advancePayment;

    const isDateUnavailable = (date) =>
        hall.unavailableDates.some(
            (d) =>
                d.getDate() === date.getDate() &&
                d.getMonth() === date.getMonth() &&
                d.getFullYear() === date.getFullYear()
        );


    const handleBookNow = () => {
        // alert(
        //     `Hall: ${hall.name}\nAdvance: ₹${advancePayment}\nRemaining: ₹${remainingPayment}`
        // );
        setShowModal(true);
    };




    return (
        <BookingDates.Consumer>
            {(value) => {
                const { halls } = value;
                const currentHall = halls.find(h => h.id === parseInt(id));
                const bookedDates_new = currentHall ? currentHall.booked_dates : [];
                console.log('Current Hall Booked Dates:', currentHall ? currentHall.booked_dates : 'No hall found');
                return (

                    <div className="individual-page">
                        <Navbar2 boolean={false}  />
                        <div className="top-container-separate-page">
                            <div className="carousel-container px-4">
                                <Slider {...settings}>
                                    {hall.images.map((img, index) => (
                                        <div key={index} className="px-2"> {/* Added padding for spacing */}
                                            <div className="carousel-card mt-3 shadow-sm rounded-4 overflow-hidden">
                                                <img
                                                    src={img}
                                                    alt={`slide-${index}`}
                                                    className="carousel-img-multi"
                                                    style={{
                                                        width: "100%",
                                                        height: "350px",
                                                        objectFit: "cover",
                                                        borderRadius: "10px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>


                        {showModal && (
                            <BookingModal
                                show={showModal}
                                onClose={() => setShowModal(false)}
                                hall={hall}
                                selectedDate={selectedDate}
                                setDate={setSelectedDate}
                            />
                        )}
                        <div className="bottom-container-details">


                            <div className="hall-container">

                                {/* Hall Info Card */}
                                {/* <div className="card">
                                    <h2 className="hall-title">{hall.name}</h2>

                                    <div className="info-row">
                                        <MapPin size={18} />
                                        <div>
                                            <strong>Address</strong>
                                            <p className="muted">{hall.address}</p>
                                        </div>
                                    </div>

                                    <div className="info-row">
                                        <Users size={18} />
                                        <div>
                                            <strong>Capacity</strong>
                                            <p className="muted">{hall.capacity} Guests</p>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                                    <div className="d-md-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                                        <div>
                                            <h1 className="h3 premium-gradient-text mb-1">{hall.name}</h1>
                                            <div className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-10 px-2 py-1 rounded-pill">
                                                {/* <Sparkles size={12} className="me-1" />  */}
                                                Verified Premium
                                                Venue
                                            </div>
                                        </div>
                                        <button className="btn btn-outline-primary btn-sm rounded-pill px-3 mt-2 mt-md-0">
                                            Select Date
                                        </button>
                                    </div>

                                    <div className="row g-3">
                                        {/* Address Card */}
                                        <div className="col-12 col-md-4">
                                            <div className="info-card">
                                                <div className="icon-circle bg-blue-soft">
                                                    <MapPin size={22} />
                                                </div>
                                                <h6 className="fw-bold mb-1">Location</h6>
                                                <p className="address-text mb-0">{hall.address}</p>
                                            </div>
                                        </div>

                                        {/* Capacity Card */}
                                        <div className="col-6 col-md-4">
                                            <div className="info-card text-center text-md-start">
                                                <div className="icon-circle bg-purple-soft mx-auto mx-md-0">
                                                    <Users size={22} />
                                                </div>
                                                <h6 className="fw-bold mb-1">Capacity</h6>
                                                <p className="text-muted mb-0">{hall.capacity} Guests</p>
                                            </div>
                                        </div>

                                        {/* Pricing Card */}
                                        <div className="col-6 col-md-4">
                                            <div className="info-card text-center text-md-start">
                                                <div className="icon-circle bg-green-soft mx-auto mx-md-0">
                                                    <IndianRupee size={22} />
                                                </div>
                                                <h6 className="fw-bold mb-1">Starting Price</h6>
                                                <p className="text-success fw-bold mb-0">
                                                    ₹{hall.price.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 3. Package Content */}
                                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                                    <h5 className="fw-bold mb-3">What this venue offers</h5>
                                    <div className="row g-2">
                                        {hall.packageIncludes.map((item, index) => (
                                            <div key={index} className="col-md-6">
                                                <div className="d-flex align-items-center py-1">
                                                    <div className="text-success me-2">
                                                        <Check size={18} />
                                                    </div>
                                                    <span className="text-secondary">{item}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Package Card */}
                                <div className="card">
                                    <div className="package-header">
                                        <IndianRupee size={20} />
                                        <h4>Package Details</h4>
                                    </div>

                                    <h3 className="price">
                                        ₹{hall.price.toLocaleString()}
                                    </h3>

                                    <hr />

                                    <strong>Package Includes:</strong>
                                    <ul className="package-list">
                                        {hall.packageIncludes.map((item, index) => (
                                            <li key={index}>
                                                <Check size={16} className="check-icon" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="payment-info">
                                        Pay ₹{advancePayment.toLocaleString()} advance.
                                        Remaining ₹{remainingPayment.toLocaleString()} offline.
                                    </div>

                                    {/* rtyurturtujrjryuj */}<BookButton advancePayment={advancePayment} handleBookNow={handleBookNow} />
                                </div>

                                <div className="card shadow p-4 mb-4">
                                    <h4 className="fw-bold">Location</h4>
                                    <div className="map-container mt-3">
                                        <iframe
                                            title="map"
                                            src={`https://www.google.com/maps?q=${hall.latitude},${hall.longitude}&z=15&output=embed`}
                                            allowFullScreen
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="right-container">
                                {bookedDates_new.length === 0 ? (
                                    <BookingCalendar setDate={setSelectedDate} bookedDates={bookedDates_new} />
                                ) : "Loading..."}
                            </div>



                        </div>
                    </div>
                );
            }}
        </BookingDates.Consumer>
    )
}

export default SeparateHall
