import React from "react";
import Footer from "../Footer";
import Navbar2 from "../Navbar2";
const About = () => {
  return (
    <div>
      <Navbar2 boolean={false} />
      <div className="bookmyhall-home">
        {/* 1. About Us Section */}
        <section className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80"
                alt="About bookmyhall"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2 className="mb-4">About Us</h2>
              <p className="lead text-muted">
                Our Mission: Making Space for Memories.
              </p>
              <p>
                At BookMyHall, we believe that the process of planning an event
                should be as joyful as the event itself. For too long, finding a
                venue meant dealing with hidden prices, outdated photos, and
                endless "call for availability" buttons. We decided to change
                that. Born at the intersection of hospitality and technology,
                BookMyHall was created to empower hosts. We provide a
                transparent, digital marketplace where the perfect space—whether
                it’s a cozy community hall or a sprawling luxury estate—is just
                a click away. We know that behind every booking is a milestone—a
                wedding, a first birthday, a corporate breakthrough, or a family
                reunion. That’s why we vet every venue on our platform, ensuring
                that what you see is exactly what you get. We handle the
                logistics so you can focus on the guest list
              </p>
            </div>
          </div>
        </section>

        {/* 2. Why Choose book_my_hall Section */}
        <section className="bg-light py-5">
          <div className="container">
            <h2 className="text-center mb-5">Why Choose book_my_hall?</h2>
            <div className="row g-4">
              <div className="col-md-4 text-center">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <h4 className="mt-3">Verified Venues</h4>
                  <p className="text-muted">
                    Every hall on our platform is physically verified for
                    quality, safety, and amenities.
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <h4 className="mt-3">Best Price Guarantee</h4>
                  <p className="text-muted">
                    We negotiate the best rates so you can book your dream venue
                    without breaking the bank.
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <h4 className="mt-3">Instant Booking</h4>
                  <p className="text-muted">
                    Check real-time availability and secure your booking
                    instantly with zero hassle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Cities Carousel Section */}

        {/* 4. Reviews Section */}
        <section className="bg-light py-5 mb-5">
          <div className="container">
            <h2 className="text-center mb-5">What Our Customers Say</h2>
            <div className="row g-4">
              {/* Review 1 */}
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="text-warning mb-2">★★★★★</div>
                    <p className="card-text">
                      "Booking a hall for my sister's wedding was so stressful
                      until I found book_my_hall. The interface is smooth, and
                      we got a great deal on a premium venue."
                    </p>
                    <h6 className="card-subtitle mt-3 text-muted">
                      - Rahul S.
                    </h6>
                  </div>
                </div>
              </div>
              {/* Review 2 */}
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="text-warning mb-2">★★★★☆</div>
                    <p className="card-text">
                      "Great selection of venues in the city. The photos were
                      accurate, and the instant booking feature saved me a lot
                      of time calling different managers."
                    </p>
                    <h6 className="card-subtitle mt-3 text-muted">
                      - Priya M.
                    </h6>
                  </div>
                </div>
              </div>
              {/* Review 3 */}
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="text-warning mb-2">★★★★★</div>
                    <p className="card-text">
                      "Highly recommend! Customer support was very helpful when
                      I had to make a last-minute change to my event date.
                      Flawless experience."
                    </p>
                    <h6 className="card-subtitle mt-3 text-muted">- Amit K.</h6>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="text-warning mb-2">★★★★★</div>
                    <p className="card-text">
                      "I was overwhelmed trying to find a wedding venue until I
                      downloaded BookMyHall. The virtual tours saved me weeks of
                      driving around, and I locked in my dream date in under
                      five minutes. Truly a lifesaver for anyone planning a big
                      event!"
                    </p>
                    <h6 className="card-subtitle mt-3 text-muted">
                      - Sudheer S.
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="text-warning mb-2">★★★★★</div>
                    <p className="card-text">
                      "Booking seminar spaces used to be a nightmare of
                      back-and-forth emails. With this app, I compared three
                      venues side-by-side and got an instant receipt for my
                      company's accounts. It's the most professional booking
                      tool I’ve used yet."
                    </p>
                    <h6 className="card-subtitle mt-3 text-muted">
                      - Younus S.
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="text-warning mb-2">★★★★★</div>
                    <p className="card-text">
                      "I found a beautiful rooftop garden for my sister’s
                      birthday that I never would have known existed otherwise.
                      The filters helped me find a place within my budget that
                      was also pet-friendly. Highly recommend for unique party
                      spots!"
                    </p>
                    <h6 className="card-subtitle mt-3 text-muted">
                      - Ranveer K.
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;