import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
    MapPin, Search, SlidersHorizontal, Calendar,
    DollarSign, Home, Briefcase, Menu, MoreVertical,
    LogOut, Info, Settings
} from "lucide-react";
import "./index.css";

const Navbar2 = (props) => {
    const navigate = useNavigate();



    const {boolean, searchQuery, handleSearch2, setShowLocationModal, userCity } = props;
    const [showFilters, setShowFilters] = useState(false);
    const [priceFilter, setPriceFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    // States for the new menus
    const [showDesktopMenu, setShowDesktopMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const onClickLogout = () => {
        Cookies.remove("jwt_token");
        navigate("/login", { replace: true });
    };

    const handleSearch = (e) => {
        handleSearch2(e);
    };


    return (
        <>
            <nav className={`nav-header sticky-top bg-white shadow-sm py-2 d-flex justify-content-center flex-column ${boolean ? 'animate__animated animate__fadeInDown' : ''}`}>
                <div className="container-fluid d-flex align-items-center justify-content-between px-md-5">

                    {/* 1. Logo - Left Most */}
                    <Link className="link header-logo-container" to="/">
                        <p className="swigato-2 home-logo mb-0">Book My Hall</p>
                    </Link>

                    {/* 2. Search Wrapper - Middle (Visible on Desktop) */}
                    {boolean && <div className="search-wrapper d-none d-lg-block flex-grow-1 mx-4" style={{ maxWidth: '600px' }}>
                        <div className="search-container shadow-sm border rounded-pill bg-white p-2 d-flex align-items-center">
                            <button
                                className="btn btn-link text-decoration-none d-flex align-items-center px-3 d-none d-md-flex text-primary fw-bold border-end"
                                style={{ height: '40px' }}
                                onClick={() => setShowLocationModal(true)}
                            >
                                <MapPin size={18} className="me-1" />
                                <span className="small text-truncate" style={{ maxWidth: '100px' }}>
                                    {userCity || "Select City"}
                                </span>
                            </button>

                            <div className="flex-grow-1 px-2 d-flex align-items-center">
                                <Search className="text-muted me-2" size={18} />
                                <input
                                    onChange={handleSearch}
                                    value={searchQuery}
                                    type="text"
                                    className="form-control border-0 shadow-none p-0"
                                    placeholder="Search for function halls..."
                                />
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`btn ${showFilters ? 'btn-primary' : 'btn-outline-primary'} rounded-circle p-2 d-flex align-items-center justify-content-center border-0`}
                            >
                                <SlidersHorizontal size={18} />
                            </button>
                        </div>
                    </div>}

                    {/* 3. Icons & Menu - Right Most (Desktop) */}
                    <div className="d-none d-md-flex align-items-center gap-3">
                        <Link to="/" className="nav-link text-center text-dark">

                            <div style={{ fontSize: '11px' }}>Home</div>
                        </Link>
                        <Link to="/bookings" className="nav-link text-center text-dark">

                            <div style={{ fontSize: '11px' }}>Bookings</div>
                        </Link>
                        <Link to="/admin" className="nav-link text-center text-dark">

                            <div style={{ fontSize: '11px' }}>Admin</div>
                        </Link>

                        {/* Desktop Three-Line Menu */}
                        <div className="position-relative">
                            <button className="btn p-0 border-0" onClick={() => setShowDesktopMenu(!showDesktopMenu)}>
                                <Menu size={24} />
                            </button>
                            {showDesktopMenu && (
                                <div className="position-absolute end-0 mt-2 bg-white shadow border rounded py-2" style={{ width: '160px', zIndex: 1000 }}>
                                    <Link className="dropdown-item" to="/services">Services</Link>
                                    <Link className="dropdown-item" to="/about">About Us</Link>
                                    <Link className="dropdown-item" to="/contact">Contact</Link>
                                    <hr className="my-1" />
                                    <button className="dropdown-item text-danger" onClick={onClickLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 4. Mobile Right Side (Three Dots) */}
                    <div className="d-flex d-md-none align-items-center position-relative">
                        <button className="btn p-0 border-0" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                            <MoreVertical size={24} />
                        </button>
                        {showMobileMenu && (
                            <div className="position-absolute end-0 mt-2 bg-white shadow-lg border rounded py-2" style={{ width: '180px', top: '30px', zIndex: 1000 }}>
                                <Link className="dropdown-item py-2" to="/services">Services</Link>
                                <Link className="dropdown-item py-2" to="/about">About Us</Link>
                                <Link className="dropdown-item py-2" to="/contact">Contact</Link>
                                
                                <hr className="my-1" />
                                <button className="dropdown-item py-2 text-danger" onClick={onClickLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>

                {boolean && <div className="search-wrapper mx-md-5 mt-3 d-block d-lg-none flex-grow-1 mx-2" style={{ maxWidth: '600px' }}>
                    <div className="search-container shadow-sm border rounded-pill bg-white p-2 d-flex align-items-center">
                            <button
                                className="btn btn-link text-decoration-none d-flex align-items-center px-3 d-none d-md-flex text-primary fw-bold border-end"
                                style={{ height: '40px' }}
                                onClick={() => setShowLocationModal(true)}
                            >
                                <MapPin size={18} className="me-1" />
                                <span className="small text-truncate" style={{ maxWidth: '100px' }}>
                                    {userCity || "Select City"}
                                </span>
                            </button>

                        <div className="flex-grow-1 px-2 d-flex  align-items-center">
                            <Search className="text-muted me-2" size={18} />
                            <input
                                onChange={handleSearch}
                                value={searchQuery}
                                type="text"
                                className="form-control border-0 shadow-none p-0"
                                placeholder="Search for function halls..."
                            />
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`btn ${showFilters ? 'btn-primary' : 'btn-outline-primary'} rounded-circle p-2 d-flex align-items-center justify-content-center border-0`}
                        >
                            <SlidersHorizontal size={18} />
                        </button>
                    </div>
                </div>}

                {/* Filters Dropdown (Logic Unchanged) */}
                {showFilters && (
                    <div className="container mt-3 pt-3 pb-2 animate__animated animate__fadeInDown col-12 col-md-12 col-lg-10">
                        <div className="row g-3 bg-light p-3 rounded shadow-sm mx-0">
                            <div className="col-6 col-md-6">
                                <label className="form-label small fw-bold text-muted"><DollarSign size={14} /> Pricing</label>
                                <select className="form-select rounded-pill" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                                    <option value="">All Prices</option>
                                    <option value="budget">Budget (Under ₹50k)</option>
                                    <option value="luxury">Luxury (Above ₹2L)</option>
                                </select>
                            </div>
                            <div className="col-6 col-md-6">
                                <label className="form-label small fw-bold text-muted"><Calendar size={14} /> Date</label>
                                <input type="date" className="form-control rounded-pill" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Mobile Bottom Navigation */}
            <div className="nav-menu-mobile d-md-none fixed-bottom bg-white border-top py-2 shadow-lg">
                <ul className="nav-menu-list-mobile d-flex justify-content-around list-unstyled m-0">
                    <li>
                        <Link to="/" className="nav-link text-center text-dark p-0 d-flex flex-column align-items-center">
                            <Home size={24} />
                            <div style={{ fontSize: '10px' }}>Home</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/bookings" className="nav-link text-center text-dark p-0 d-flex flex-column align-items-center">
                            <Briefcase size={24} />
                            <div style={{ fontSize: '10px' }}>Bookings</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar2;