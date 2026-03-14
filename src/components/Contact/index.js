import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer";
import Navbar2 from "../Navbar2";
// Ensure you have this for accordion transitions:
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false); // New state for UI switch
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    altMobile: "",
    email: "",
    altEmail: "",
    query: "",
    agree: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Replace alert with state change
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      <Navbar2 boolean={false} />
      <div className="container my-5">
        <div className="row g-5">
          {/* Left Side: FAQ / Random Questions */}
          <div className="col-lg-5">
            <h2 className="mb-4">Common Questions</h2>
            <div className="accordion shadow-sm" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q1"
                  >
                    How long does it take to get a response?
                  </button>
                </h2>
                <div
                  id="q1"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-muted">
                    Our team typically responds within 24-48 business hours.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q2"
                  >
                    Can I change my query after submitting?
                  </button>
                </h2>
                <div
                  id="q2"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-muted">
                    Currently, you cannot edit a submission, but you can send a
                    follow-up email with your reference ID.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q4"
                  >
                    Is my personal information secure?
                  </button>
                </h2>
                <div
                  id="q4"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-muted">
                    Absolutely. We use industry-standard  encryption
                    to ensure that your data is transmitted and stored securely.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q5"
                  >
                    Do I need an account to submit a query?
                  </button>
                </h2>
                <div
                  id="q5"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-muted">
                    Yes, you cannot submit a query as a guest. 
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q6"
                  >
                    What are your support operating hours?
                  </button>
                </h2>
                <div
                  id="q6"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-muted">
                    Our support team is available Monday through Friday, from
                    9:00 AM to 6:00 PM EST. Queries sent during the weekend will
                    be addressed on Monday morning.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q7"
                  >
                    Can I attach files or screenshots to my query?
                  </button>
                </h2>
                <div
                  id="q7"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-muted">
                    Once you receive our initial confirmation email, you can
                    reply directly to that email with any relevant attachments
                    or screenshots.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#q8"
                  >
                    Where is your office located?
                  </button>
                </h2>
                <div
                  id="q8"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-muted">
                    Our headquarters are located in Tech City, Hyderabad.
                    However, our support team operates remotely to provide
                    global coverage.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form Card */}
          <div className="col-lg-7">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                {submitted ? (
                  /* SUCCESS MESSAGE BLOCK */
                  <div className="text-center py-4">
                    <div className="mb-3">
                      <i
                        className="bi bi-check-circle-fill text-success"
                        style={{ fontSize: "3rem" }}
                      ></i>
                    </div>
                    <h3 className="fw-bold text-success">
                      Form Submitted Successfully!
                    </h3>
                    <p className="mt-3 text-secondary">
                      Thank you, <strong>{formData.firstName}</strong>. We have
                      received your query regarding
                      <em> "{formData.query.substring(0, 20)}..."</em>. A
                      confirmation has been sent to{" "}
                      <strong>{formData.email}</strong>.
                    </p>
                    <button
                      className="btn btn-outline-primary btn-sm mt-3"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit another response
                    </button>
                  </div>
                ) : (
                  /* FORM BLOCK */
                  <>
                    <h3 className="card-title mb-4 fw-bold">
                      Send us a Message
                    </h3>
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">
                            First Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            Mobile Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="tel"
                            name="mobile"
                            className="form-control"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Alternate Mobile</label>
                          <input
                            type="tel"
                            name="altMobile"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            required
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Alternate Email</label>
                          <input
                            type="email"
                            name="altEmail"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-12">
                          <label className="form-label">Your Query</label>
                          <textarea
                            name="query"
                            className="form-control"
                            rows="4"
                            placeholder="How can we help?"
                            onChange={handleChange}
                          ></textarea>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="agree"
                              id="agreeCheck"
                              required
                              onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="agreeCheck"
                            >
                              I agree to the terms and conditions
                            </label>
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-primary w-100 py-2"
                          >
                            Submit Request
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;