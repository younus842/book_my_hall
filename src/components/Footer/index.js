import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoHome, IoMail, IoCall } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-primary">
              bookHall
            </h5>
            <p className="small text-secondary">
              The premier platform for booking event halls, banquet spaces, and
              meeting rooms with ease and transparency.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Explore</h5>
            <p>
              <a
                href="/"
                className="text-white text-decoration-none small hover-link"
              >
                Home
              </a>
            </p>
            <p>
              <a
                href="/about"
                className="text-white text-decoration-none small hover-link"
              >
                About Us
              </a>
            </p>
            <p>
              <a
                href="/contact"
                className="text-white text-decoration-none small hover-link"
              >
                Contact
              </a>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mt-3 text-white text-center text-md-start">
            <div className="d-inline-block text-start">
              <h5 className="text-uppercase mb-4 fw-bold text-center text-md-start">
                Address
              </h5>

              <div className="d-flex align-items-start mb-3">
                <IoHome
                  className="me-3 text-primary mt-1 flex-shrink-0"
                  size={20}
                />
                <p className="small mb-0">
                  Tech City, HITEC City, <br />
                  Hyderabad, TS 500081, India
                </p>
              </div>

              <div className="d-flex align-items-center mb-3">
                <IoMail className="me-3 text-primary flex-shrink-0" size={20} />
                <p className="small mb-0 text-break">
                  foorTestingappBookHall@bookhall.com
                </p>
              </div>

              <div className="d-flex align-items-center mb-3">
                <IoCall className="me-3 text-primary flex-shrink-0" size={20} />
                <p className="small mb-0">+91 40 1234 5678</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-white">
              Follow Us
            </h5>

            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <div className="social-icon-wrapper">
                <a
                  href="https://facebook.com"
                  className="text-white fs-4 hover-opacity"
                >
                  <FaFacebookF />
                </a>
              </div>

              <div className="social-icon-wrapper">
                <a
                  href="https://twitter.com"
                  className="text-white fs-4 hover-opacity"
                >
                  <FaXTwitter />
                </a>
              </div>

              <div className="social-icon-wrapper">
                <a
                  href="https://instagram.com"
                  className="text-white fs-4 hover-opacity"
                >
                  <FaInstagram />
                </a>
              </div>

              <div className="social-icon-wrapper">
                <a
                  href="https://linkedin.com"
                  className="text-white fs-4 hover-opacity"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="mb-4 mt-5" />

        <div className="row align-items-center">
          <div className="col-12 text-center">
            <p className="small mb-0">
              © 2026 Copyright: <strong>bookHall</strong>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;