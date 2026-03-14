import { useContext, useState } from "react";
import BookingDates from "../Context"; // Assuming bookedHalls is in your Context
import { MapPin, Calendar as CalIcon, CreditCard, Smile, Clock, Info } from "lucide-react";
import Navbar2 from "../Navbar2";

function Bookings() {
  // Pulling only the bookedHalls array from your context
  const { bookedHalls = [] } = useContext(BookingDates);
  const [showModal, setShowModal] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState(null);

  const getPaymentInfo = (hallId, date) => {
    return localStorage.getItem(`paid_${hallId}_${date}`);
  };

  const handleConfirm = (method) => {
    if (activeOrderId) {
      localStorage.setItem(`paid_${activeOrderId.id}_${activeOrderId.date}`, method);
      setShowModal(false);
    }
  };

  console.log("Booked Halls in Bookings Component:", bookedHalls); // Debugging line

  return (
    <div className="min-vh-100 bg-light pb-5">
      <Navbar2 boolean={false} />
      
      <div className="container py-5">
        <div className="d-flex align-items-center mb-4">
          <h2 className="fw-bold m-0">Your Bookings</h2>
          <span className="badge bg-primary ms-3 rounded-pill">{bookedHalls.length} Events</span>
        </div>

        <div className="row g-4">
          {bookedHalls.length === 0 ? (
            /* Empty State */
            <div className="col-12 text-center py-5">
               <div className="bg-white p-5 rounded-4 shadow-sm">
                  <Info size={48} className="text-muted mb-3" />
                  <h4 className="text-secondary">No bookings found</h4>
                  <p className="text-muted">Once you book a hall, it will appear here.</p>
                  <a href="/" className="btn btn-primary rounded-pill px-4">Browse Venues</a>
               </div>
            </div>
          ) : (
            /* Mapping through the specific bookedHalls array */
            bookedHalls.map((hall) => {
              // Financial Logic based on your specific object properties
              const totalAmount = hall.hall_package;
              const advancePaid = hall.advance_amount || Math.round(totalAmount * 0.1); 
              const remainingBalance = totalAmount - advancePaid;
              const eventDate = hall.selectedDate; // Assuming you store the date in the object

              const paymentMethod = getPaymentInfo(hall.id, eventDate);

              return (
                <div key={`${hall.id}-${eventDate}`} className="col-12 col-lg-10 mx-auto">
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-3">
                    <div className="row g-0">
                      
                      {/* 1. Hall Image */}
                      <div className="col-md-4">
                        <img 
                          src={hall.image_url} 
                          className="img-fluid h-100 object-fit-cover" 
                          style={{ minHeight: '200px', width: '100%' }} 
                          alt={hall.name} 
                        />
                      </div>

                      {/* 2. Hall Info & Financials */}
                      <div className="col-md-8 p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <h4 className="fw-bold mb-1 text-primary">{hall.name}</h4>
                            <p className="text-muted small mb-0">
                              <MapPin size={14} className="text-danger me-1"/> {hall.address}
                            </p>
                          </div>
                          <div className="text-end">
                             <div className="bg-primary-subtle text-primary px-3 py-1 rounded-pill small fw-bold">
                               <CalIcon size={14} className="me-1"/> {eventDate}
                             </div>
                          </div>
                        </div>

                        {/* Payment Status Bar */}
                        <div className="row g-3 bg-light rounded-3 p-3 mx-0 mb-3">
                          <div className="col-4 border-end">
                            <p className="text-muted mb-0 small uppercase fw-bold" style={{fontSize: '10px'}}>Total</p>
                            <span className="fw-bold">₹{totalAmount.toLocaleString()}</span>
                          </div>
                          <div className="col-4 border-end">
                            <p className="text-muted mb-0 small uppercase fw-bold" style={{fontSize: '10px'}}>Paid Advance</p>
                            <span className="fw-bold text-success">₹{advancePaid.toLocaleString()}</span>
                          </div>
                          <div className="col-4">
                            <p className="text-muted mb-0 small uppercase fw-bold" style={{fontSize: '10px'}}>Balance</p>
                            <span className="fw-bold text-danger">₹{remainingBalance.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="d-flex justify-content-between align-items-center">
                           <div className="d-flex align-items-center">
                              {paymentMethod ? (
                                <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill">
                                  <Smile size={14} className="me-1"/> Secured via {paymentMethod}
                                </span>
                              ) : (
                                <span className="badge bg-warning-subtle text-warning border border-warning-subtle px-3 py-2 rounded-pill">
                                  <Clock size={14} className="me-1"/> Balance Pending
                                </span>
                              )}
                           </div>

                           {!paymentMethod && (
                             <button 
                               onClick={() => { setActiveOrderId({id: hall.id, date: eventDate}); setShowModal(true); }}
                               className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
                             >
                               Pay Balance
                             </button>
                           )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Payment Modal remains the same */}
      {showModal && (
        <div className="modal d-block" style={{background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 p-4 text-center">
              <h5 className="fw-bold mb-4">Finalize Booking</h5>
              <div className="d-grid gap-2">
                <button onClick={() => handleConfirm('online')} className="btn btn-primary py-3 fw-bold rounded-3">Online Payment</button>
                <button onClick={() => handleConfirm('cash')} className="btn btn-outline-dark py-3 fw-bold rounded-3">Pay Cash at Venue</button>
              </div>
              <button onClick={() => setShowModal(false)} className="btn btn-link text-muted mt-3 text-decoration-none">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;