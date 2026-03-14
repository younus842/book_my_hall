import React from 'react';
import { Calendar, AlertCircle } from "lucide-react";
import BookingDates from '../Context';// Optional icons for better UI
import { useNavigate } from 'react-router-dom';

export default function BookingModal({ show, onClose, hall, selectedDate }) {
    const navigate = useNavigate(); // Must be at the top level
    if (!show) return null;


    // Check if selectedDate is actually a valid Date object
    const isDateValid = selectedDate instanceof Date && !isNaN(selectedDate);

    return (
        <BookingDates.Consumer>{(value) => {
            const { halls, updatedDates, setBookedHalls } = value;

            const ourHall = halls.find(h => h.id === hall.id);

            const handleConfirm = () => {
                updatedDates(hall.id, selectedDate.toLocaleDateString('en-CA')); // Update the booked dates in context
                setBookedHalls(prev => [...prev, { ...ourHall, selectedDate: selectedDate.toLocaleDateString('en-CA'), advance_payment: Math.round(ourHall.hall_package * 0.1) }]);
                navigate('/bookings');// Add to booked halls for display in Bookings
                onClose();
            }

            return (<>
                <div className="modal-backdrop fade show"></div>
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg px-3">
                        <div className="modal-content border-0 shadow-xl rounded-4 overflow-hidden animate-modal-up">

                            <div className="modal-header border-0 bg-light p-4">
                                <h4 className="modal-title fw-bold text-dark mb-1">
                                    {isDateValid ? "Confirm Your Booking" : "Date Required"}
                                </h4>
                                <button type="button" className="btn-close shadow-none" onClick={onClose}></button>
                            </div>

                            <div className="modal-body p-4">
                                {!isDateValid ? (
                                    /* --- ERROR STATE: Date not selected --- */
                                    <div className="text-center py-5">
                                        <div className="bg-warning-subtle text-warning d-inline-flex p-4 rounded-circle mb-4">
                                            <AlertCircle size={48} />
                                        </div>
                                        <h5 className="fw-bold text-dark">Please Select a Date First</h5>
                                        <p className="text-muted mx-auto" style={{ maxWidth: '300px' }}>
                                            We need to know when your event is happening to check for availability and calculate the final price.
                                        </p>
                                        <button
                                            className="btn btn-warning fw-bold px-4 py-2 mt-2 rounded-3"
                                            onClick={onClose}
                                        >
                                            Go Back to Calendar
                                        </button>
                                    </div>
                                ) : (
                                    /* --- SUCCESS STATE: Show Details --- */
                                    <>
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <div className="p-3 rounded-4 bg-primary-subtle border border-primary border-opacity-10 h-100">
                                                    <h6 className="fw-bold text-primary mb-3">Venue Details</h6>
                                                    <p className="mb-2 fw-medium">{hall?.name}</p>
                                                    <p className="small text-secondary mb-0 d-flex align-items-center">
                                                        <Calendar size={14} className="me-2" />
                                                        {selectedDate.toLocaleDateString('en-US', {
                                                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="p-3 rounded-4 bg-light border h-100">
                                                    <h6 className="fw-bold text-dark mb-3">Payment Breakdown</h6>
                                                    <div className="d-flex justify-content-between mb-2">
                                                        <span className="small text-secondary">Total Price</span>
                                                        <span className="fw-bold">₹{hall?.price.toLocaleString()}</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between text-success">
                                                        <span className="small">Advance to Pay (10%)</span>
                                                        <span className="fw-bold">₹{(hall?.price * 0.1).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 form-check small">
                                            <input className="form-check-input" type="checkbox" id="terms" required />
                                            <label className="form-check-label text-secondary" htmlFor="terms">
                                                I agree to the cancellation policy and terms of service.
                                            </label>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Only show footer actions if the date is valid */}
                            {isDateValid && (
                                <div className="modal-footer border-0 p-4 pt-0">
                                    <button
                                        type="button"
                                        className="btn btn-light px-4 py-2 rounded-3 fw-bold border"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        type="button"
                                        className="btn btn-primary px-5 py-2 rounded-3 fw-bold shadow-sm"
                                    >
                                        Confirm & Pay
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>)
        }}</BookingDates.Consumer>
    );
}