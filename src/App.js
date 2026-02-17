import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from "./components/Home";
import Login from "./components/Login";

const function_halls = [
  {
    id: 1,
    name: 'Nizam Palace',
    address: 'Bodhan Road, near knowledge park',
    image_url: 'https://img.weddingbazaar.com/photos/pictures/008/687/818/original/Screenshot_2024-09-06_113327.png?1725602696',
    hall_package: 59999,
    bookedDates: ["2026-02-19", "2026-02-21", "2026-02-12"]
  },
  {
    id: 2,
    name: 'NN Palace',
    address: 'Bodhan Road, near knowledge park',
    image_url: 'https://content3.jdmagicbox.com/comp/nizamabad/h9/9999p8462.8462.171201174649.z8h9/catalogue/n-n-palace-function-hall-bodhan-nizamabad-banquet-halls-2e9vk9pi5u.jpg',
    hall_package: 66999,
    bookedDates: ["2026-02-19", "2026-02-21", "2026-02-12"]
  },
  {
    id: 3,
    name: 'Imperial Convention',
    address: 'Bodhan Road, near Taj Dhaba',
    image_url: 'https://content3.jdmagicbox.com/comp/nizamabad/q5/9999p8462.8462.221231224415.z8q5/catalogue/imperial-convention-nizamabad-convention-halls-vrsesnjl2j.jpg',
    hall_package: 39999,
    bookedDates: ["2026-02-21"]
  },
  {
    id: 4,
    name: 'ARR function hall',
    address: 'Bodhan Road, near knowledge park',
    image_url: 'https://files.yappe.in/place/full/arr-function-hall-10511956.webp',
    hall_package: 54999,
    bookedDates: ["2026-02-19"]
  },
  {
    id: 5,
    name: 'AN Garden',
    address: 'Bodhan Road, near indo rose nursery',
    image_url: 'https://img.weddingbazaar.com/photos/pictures/008/688/027/new_large/Screenshot_2024-09-06_123750.png',
    hall_package: 69999,
    bookedDates: []
  },
]




function App() {
  const [halls, setHalls] = useState(function_halls)

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home halls={halls} updatedDates={updatedDates} />} />
        <Route path="/about" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
