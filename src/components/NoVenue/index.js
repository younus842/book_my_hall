import React from 'react';
import { SearchX, RefreshCcw } from 'lucide-react';

const NoVenuesFound = ({ onReset }) => {
    const imageUrl = "https://images.unsplash.com/photo-1675808414213-2b7c7daabf51?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdlZGRpbmclMjBoYWxsfGVufDB8fDB8fHww";

    return (
        <div className="container my-5">
            <div 
                className="no-venues-hero-card rounded-4 shadow-lg overflow-hidden border p-5 object-fit-cover position-relative d-flex flex-column align-items-center justify-content-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                {/* 1. Dark Overlay (Crucial for readability) */}
                <div className="hero-overlay"></div>

                {/* 2. Absolute Centered Content */}
                <div className="hero-content-wrapper text-center animate-fade-in-up">
                    <div className="icon-badge-on-image mb-4">
                        <SearchX size={40} className="text-white" />
                    </div>
                    
                    <h1 className="display-5 fw-bold text-white mb-2">No Venues Found</h1>
                    <p className="text-white mt-5 mb-4 px-lg-5 fs-6 mx-auto" style={{ maxWidth: '600px' }}>
                        We couldn't find any function halls matching your search criteria. Try removing filters or searching for something else.
                    </p>

                    <button 
                        onClick={onReset} 
                        id='button-reset'
                        className="btn btn-primary fs-6 btn-lg rounded-pill px-5 shadow d-flex align-items-center gap-2 mx-auto"
                    >
                        <RefreshCcw size={18} />
                        View All Available Venues
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoVenuesFound;