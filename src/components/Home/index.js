import Navbar from '../Navbar'
import './index.css'
import FunctionHall from '../FunctionHall'
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import NoVenue from '../NoVenue';




const Home = (props) => {
    const { halls, updatedDates, filteredHalls, setSearchQuery, searchQuery } = props

    const handleSearch = (e) => {
        // Implement search functionality here
        console.log("Search query:", e.target.value);
        setSearchQuery(e.target.value);
    }

    return (
        <div className='homes'>
            <div className='home-top-container fixed-top'>
                <Navbar />
                <div className="search-wrapper container mt-2">
                    <div className="search-container shadow-sm border rounded-pill bg-white p-2 d-flex align-items-center">

                        {/* 1. Left Icon/Filter (Hidden on tiny screens or kept as a button) */}
                        <button className="btn btn-link text-muted p-2 d-none d-md-block">
                            <MapPin size={20} />
                        </button>

                        <div className="vr d-none d-md-block mx-2 my-2" style={{ height: '24px' }}></div>

                        {/* 2. Main Search Input */}
                        <div className="flex-grow-1 position-relative px-2 d-flex align-items-center">
                            <Search className="search-icon-inside text-muted" size={18} />
                            <input
                                onChange={handleSearch}
                                value={searchQuery}
                                type="text"
                                className="form-control border-0 shadow-none ps-5"
                                placeholder="Search for function halls, venues..."
                            />
                        </div>

                        <div className="vr mx-2 my-2" style={{ height: '24px' }}></div>

                        {/* 3. Right Filter Toggle */}
                        <div className="filter-group d-flex align-items-center gap-2">
                            <select className="form-select border-0 shadow-none d-none d-lg-block bg-transparent text-muted fw-medium" style={{ width: 'auto' }}>
                                <option>Price Range</option>
                                <option>Under ₹50k</option>
                                <option>₹50k - ₹1L</option>
                            </select>

                            <button className="btn btn-primary rounded-circle p-2 d-flex align-items-center justify-content-center filter-btn">
                                <SlidersHorizontal size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='home-bottom-containers'>
                {filteredHalls.length > 0 ? (
                    <div className="row g-4">
                        {filteredHalls.map(hall => (
                            <FunctionHall key={hall.id} object={hall} updatedDates={updatedDates} />
                        ))}
                    </div>
                ) : (
                    <NoVenue onReset={() => setSearchQuery('')} />
                )}
            </div>


        </div>
    )
}

export default Home