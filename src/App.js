import React from "react";
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
        hall_package: 59999
    },
    {
        id: 2,
        name: 'NN Palace',
        address: 'Bodhan Road, near knowledge park',
        image_url: 'https://content3.jdmagicbox.com/comp/nizamabad/h9/9999p8462.8462.171201174649.z8h9/catalogue/n-n-palace-function-hall-bodhan-nizamabad-banquet-halls-2e9vk9pi5u.jpg',
        hall_package: 66999
    },
    {
        id: 3,
        name: 'Imperial Convention',
        address: 'Bodhan Road, near Taj Dhaba',
        image_url: 'https://content3.jdmagicbox.com/comp/nizamabad/q5/9999p8462.8462.221231224415.z8q5/catalogue/imperial-convention-nizamabad-convention-halls-vrsesnjl2j.jpg',
        hall_package: 39999
    },
    {
        id: 4,
        name: 'ARR function hall',
        address: 'Bodhan Road, near knowledge park',
        image_url: 'https://files.yappe.in/place/full/arr-function-hall-10511956.webp',
        hall_package: 54999
    },
    {
        id: 5,
        name: 'AN Garden',
        address: 'Bodhan Road, near indo rose nursery',
        image_url: 'https://img.weddingbazaar.com/photos/pictures/008/688/027/new_large/Screenshot_2024-09-06_123750.png',
        hall_package: 69999
    },
]


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home halls={function_halls}/>} />
        <Route path="/about" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
