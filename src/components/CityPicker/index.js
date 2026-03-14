import React, { useState } from 'react';
import { Search, Navigation, X, MapPinOff } from 'lucide-react';

const allCities = [
    { name: 'Mumbai', img: 'https://cdn-icons-png.flaticon.com/512/5351/5351056.png' },
    { name: 'Hyderabad', img: 'https://cdn-icons-png.flaticon.com/512/5351/5351051.png' },
    { name: 'Bengaluru', img: 'https://cdn-icons-png.flaticon.com/512/5351/5351053.png' },
    { name: 'Delhi', img: 'https://cdn-icons-png.flaticon.com/512/5351/5351055.png' },
];

const CityPicker = ({ show, onHide, onSelectCity, userCity }) => {
    const [isDetecting, setIsDetecting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    if (!show) return null;


    const filteredCities = allCities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCityFromCoords = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
            );
            const data = await response.json();
            return data.address.city || data.address.town || data.address.village;
        } catch (error) {
            return null;
        }
    };

    const handleDetectClick = () => {
        if (!navigator.geolocation) return;
        setIsDetecting(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            const cityName = await getCityFromCoords(position.coords.latitude, position.coords.longitude);
            if (cityName) onSelectCity(cityName);
            setIsDetecting(false);
        }, () => setIsDetecting(false));
    };

    const onHide2 = () => {
        setSearchTerm('');
        onHide();
    }

    // New function to clear the location
    const handleClearLocation = () => {
        onSelectCity(null); // This sets userCity to null in App.jsx
        setSearchTerm('');
        onHide();
    };

    return (
        <>
            <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
            <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1060 }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden animate-modal-up position-relative">

                        <div className='text-end mr-3'>
                            <button
                                type="button"
                                className="btn-close cursor-pointer m-3 shadow-none"
                                onClick={onHide2}
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body p-4 pt-0">
                            {/* Search Bar */}
                            <div className="input-group border rounded-pill px-3 py-1 bg-light w-100 shadow-sm mb-4">
                                <span className="input-group-text bg-transparent border-0 pe-2">
                                    <Search size={18} className="text-muted" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-0 bg-transparent shadow-none"
                                    placeholder="Search for your city"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                                {searchTerm && (
                                    <button
                                        className="btn btn-link text-muted p-0 me-2"
                                        onClick={() => setSearchTerm('')}
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            <div className="d-flex align-items-center justify-content-between mb-4">
                                {/* Detect Location Button */}
                                {!searchTerm && (
                                    <button
                                        className={`btn text-danger d-flex align-items-center gap-2 p-0 fw-medium border-0 bg-transparent shadow-none ${isDetecting ? 'opacity-50' : ''}`}
                                        onClick={handleDetectClick}
                                        disabled={isDetecting}
                                    >
                                        <Navigation size={18} className={isDetecting ? "animate-spin" : ""} />
                                        <span>{isDetecting ? "Detecting..." : "Detect my location"}</span>
                                    </button>
                                )}

                                {/* NEW: Remove Location Button (Only shows if a city is selected) */}
                                {userCity && !searchTerm && (
                                    <button
                                        className="btn btn-sm btn-outline-secondary rounded-pill px-3 d-flex align-items-center gap-1"
                                        onClick={handleClearLocation}
                                    >
                                        <MapPinOff size={14} />
                                        Clear: {userCity}
                                    </button>
                                )}
                            </div>

                            <div className="text-center mb-4">
                                <hr className="text-muted opacity-25" />
                                <span className="bg-white px-3 mt-n4 d-inline-block small fw-bold text-muted text-uppercase">
                                    {searchTerm ? 'Search Results' : 'Popular Cities'}
                                </span>
                            </div>

                            <div className="row g-4 text-center">
                                {filteredCities.length > 0 ? (
                                    filteredCities.map(city => (
                                        <div key={city.name} className="col-4 col-md-3" role="button" onClick={() => onSelectCity(city.name)}>
                                            <div className="city-circle shadow-sm mb-2 mx-auto d-flex align-items-center justify-content-center rounded-circle border" style={{ width: '60px', height: '60px', backgroundColor: '#f8f9fa' }}>
                                                <img src={city.img} alt={city.name} style={{ width: '40px' }} />
                                            </div>
                                            <div className="small fw-medium text-dark">{city.name}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12 py-5 text-muted">
                                        <p>No cities match "{searchTerm}"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CityPicker;