import './index.css'
import FunctionHall from '../FunctionHall'
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import NoVenue from '../NoVenue';
import { useState, useEffect } from 'react';
import CityPicker from '../CityPicker';
import Hall from '../../assets/hall.jpg'
import Navbar2 from '../Navbar2';



const Home = (props) => {
    // 1. Destructure userCity and setUserCity from props (sent from App.jsx)
    const {
        updatedDates,
        filteredHalls,
        setSearchQuery,
        searchQuery,
        userCity,
        setUserCity,
        showLocationModal,
        setShowLocationModal,
    } = props

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (filteredHalls.length > 0) {
            setLoader(false);
        }
    }, [filteredHalls]);


    return (
        <>
            <Navbar2 boolean={true} userCity={userCity} handleSearch2={handleSearch} searchQuery={searchQuery} setShowLocationModal={setShowLocationModal} />


            <div className='homes' >


                {/* Content Area - Added padding-top to avoid fixed-header overlap */}
                <div className="container-3">

                    {/* 2. The Location Modal */}
                    {/* <LocationModal onLocationFound={(city) => setUserCity(city)} /> */}

                    {/* 3. Location Status & Clear Button */}


                    <CityPicker
                        show={showLocationModal}
                        userCity={userCity} // Pass this so the modal knows if a city is active
                        onHide={() => setShowLocationModal(false)}
                        onSelectCity={(city) => {
                            setUserCity(city);
                            setShowLocationModal(false);
                        }}
                    />



                    {loader ? <div className='top-loader'> <div className='loader'></div> </div> : <div className='home-bottom-containers'>
                        {filteredHalls.length > 0 ? (
                            <div className="row g-4">
                                {filteredHalls.map(hall => (
                                    <FunctionHall
                                        key={hall.id}
                                        object={hall}
                                        updatedDates={updatedDates}
                                    />
                                ))}
                            </div>
                        ) : (
                            <NoVenue onReset={() => {
                                setSearchQuery('');
                                setUserCity(null);
                            }} />
                        )}
                    </div>}
                </div>
            </div></>
    )
}

export default Home;