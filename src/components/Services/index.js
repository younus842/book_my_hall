import React from "react";
import "./index.css";
import Footer from "../Footer";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar2 from "../Navbar2";

const ServicePage = () => {
  const navigate = useNavigate()
  const goToHome = () => {
   navigate("/")
  };

  const services = [
    {
      id: 1,
      title: "Luxury Banquet Halls",
      description:
        "From grand weddings to corporate galas, our curated list of premium halls offers high-end amenities and stunning decor.",
      image:
        "https://images.unsplash.com/photo-1542665952-14513db15293?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VkZGluZyUyMGhhbGx8ZW58MHx8MHx8fDA%3D",
      status: "active",
    },
    {
      id: 2,
      title: "Water Parks",
      description:
        "Get ready to splash! We are partnering with the city's top aquatic centers to bring you exclusive group booking rates.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIpKkd5ICw8e1D2m-uXS7xSMcZRMnKKzi6oA&s",
      status: "coming_soon",
    },
    {
      id: 3,
      title: "Box Cricket Arenas",
      description:
        "Bringing the stadium vibe to your neighborhood. Book high-quality turf pitches with pro floodlights soon.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT85UU_roO7YaR9ehS7QtxM80g5pEugRqJzYw&s",
      status: "coming_soon",
    },
  ];

  return (
    <div>
      <Navbar2 boolean={false} />
      <div className="container py-5 service-wrapper">
        <header className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-2">Our Services</h1>
          <p className="text-muted fw-light">
            Discover the perfect space for every occasion.
          </p>
        </header>

        <div className="row g-4">
          {services.map((service) => (
            <div className="col-md-6 col-lg-4" key={service.id}>
              <div className="card h-100 border-0 shadow-sm custom-card2">
                <div className="position-relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="card-img-top"
                  />
                  {service.status === "coming_soon" && (
                    <div className="coming-soon-badge-red">Coming Soon</div>
                  )}
                </div>

                <div className="card-body d-flex flex-column p-4">
                  <h3 className="h5 fw-semibold mb-3">{service.title}</h3>
                  <p className="card-text text-muted small mb-4 fw-light">
                    {service.description}
                  </p>

                  <div className="mt-auto d-grid gap-2">
                    <button
                      onClick={goToHome}
                      className={`btn py-2 fw-medium transition-btn ${
                        service.status === "active" 
                        ? "btn-dark" 
                        : "btn-primary btn-stay-tuned"
                      }`}
                    >
                      {service.status === "active" ? "Book Now" : "Stay Tuned"}
                    </button>
                    <button
                      onClick={goToHome}
                      className="btn btn-back-home btn-sm border-0 text-muted py-2"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-5 pt-5 text-center">
          <div className="bg-light p-5 rounded-4 border">
            <p className="h5 fw-normal mb-1">Thank you for using <strong>BookMyHall</strong></p>
            <small className="text-muted">We are constantly expanding to serve you better.</small>
          </div>
        </footer>
      </div>
      <Footer />
    </div>
  );
};

export default ServicePage;