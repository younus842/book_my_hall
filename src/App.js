import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./components/Home";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Bookings from "./components/Bookings";
import BookingDates from "./components/Context";
import About from "./components/About";
import SeparateHall from "./components/SeparateHall";
import ServicePage from "./components/Services";
import Contact from "./components/Contact";
import AdminPanel from "./components/Admin";








const function_halls = [
  {
    id: 1,
    name: 'Nizam Palace',
    address: 'Bodhan Road, near knowledge park',
    image_url: 'https://img.weddingbazaar.com/photos/pictures/008/687/818/original/Screenshot_2024-09-06_113327.png?1725602696',
    hall_package: 59999,
    bookedDates: ["2026-03-19", "2026-03-21", "2026-03-12"]
  },
  {
    id: 2,
    name: 'NN Palace',
    address: 'Bodhan Road, near knowledge park',
    image_url: 'https://content3.jdmagicbox.com/comp/nizamabad/h9/9999p8462.8462.171201174649.z8h9/catalogue/n-n-palace-function-hall-bodhan-nizamabad-banquet-halls-2e9vk9pi5u.jpg',
    hall_package: 66999,
    bookedDates: ["2026-03-19", "2026-03-21", "2026-03-12"]
  }
]






function App() {
  const [halls, setHalls] = useState([])
  const [bookedHalls, setBookedHalls] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);

  const [userCity, setUserCity] = useState(null);



  useEffect(() => {
    const url = "http://localhost:5000/api/halls"; // Replace with your actual API endpoint
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched halls data:", data); // Log the fetched data
        setHalls(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching halls data:", error);
      });
  }, []); // Empty dependency array to run only once on mount


  const updatedDates = (id, value) => {
    console.log(id, value)
    setHalls(() => {
      console.log(halls)
      const hallsUpdated = halls.map((each) => {
        if (each.id === id) {
          const hall_object = each
          const hall_booked_dates = hall_object.bookedDates
          const new_booked_dates = [...hall_booked_dates, value]
          const new_obj = {
            id: each.id,
            name: each.name,
            address: each.address,
            image_url: each.image_url,
            hall_package: each.hall_package,
            bookedDates: new_booked_dates
          }
          return new_obj
        } else {
          return each
        }
      })

      return hallsUpdated
    })


  }

  const filteredHalls = halls.filter((hall) => {
    const matchesSearch =
      hall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hall.address.toLowerCase().includes(searchQuery.toLowerCase());

    // If userCity exists, the hall address must also contain the city name
    const matchesCity = userCity
      ? hall.address.toLowerCase().includes(userCity.toLowerCase())
      : true;

    return matchesSearch && matchesCity;
  });





  const takeobject = (object) => {
    const { image_url, name, address, hall_package, bookedDates, id } = object;
    setBookedHalls(prev => [...prev, object])
    console.log(bookedHalls)
  }

  return (
    <BookingDates.Provider value={{ setBookedHalls, bookedHalls, halls, updatedDates, filteredHalls }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home showLocationModal={showLocationModal} setShowLocationModal={setShowLocationModal} userCity={userCity} setUserCity={setUserCity} halls={halls} searchQuery={searchQuery} updatedDates={updatedDates} filteredHalls={filteredHalls} setSearchQuery={setSearchQuery} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/hall/:id" element={<SeparateHall />} />
        </Routes>
      </BrowserRouter>
    </BookingDates.Provider>
  );
}

export default App;
