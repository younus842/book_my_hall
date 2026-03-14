import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import {
    Plus,  Edit, Eye, Trash2, LayoutDashboard, Calendar as CalendarIcon, Users,
    Settings, Save, ArrowLeft, CheckCircle2, Package, Image as ImageIcon, MapPin, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import Navbar2 from '../Navbar2';

export default function AdminPanel() {
    return (
        <div>
            <Navbar2 boolean={false} />
            <div className="container py-5">

                <div className="row g-4">
                    {/* Sidebar */}
                    <aside className="col-lg-3">
                        <div className="list-group list-group-flush rounded-4 shadow-sm border overflow-hidden">
                            <Link to="/admin" className="list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 border-0">
                                <LayoutDashboard size={18} className="text-maroon" />
                                <span className="fw-bold">Dashboard</span>
                            </Link>
                            <Link to="/admin/halls" className="list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 border-0">
                                <Package size={18} className="text-muted" />
                                <span>My Halls</span>
                            </Link>
                            <Link to="/admin/bookings" className="list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 border-0">
                                <Users size={18} className="text-muted" />
                                <span>Bookings</span>
                            </Link>
                            <Link to="/admin/calendar" className="list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 border-0">
                                <CalendarIcon size={18} className="text-muted" />
                                <span>Calendar</span>
                            </Link>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="col-lg-9">
                        <Routes>
                            <Route path="/" element={<AdminDashboard />} />
                            <Route path="/halls" element={<AdminHallsList />} />
                            <Route path="/halls/new" element={<HallForm />} />
                            <Route path="/halls/edit/:id" element={<HallForm />} />
                            <Route path="/bookings" element={<AdminBookingsList />} />
                            <Route path="/calendar" element={<AdminCalendarView />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </div>
    );
}

function AdminDashboard() {
    const [stats, setStats] = useState({ halls: 0, bookings: 0, revenue: 0 });
    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const resHalls = await fetch('/api/halls');
        const halls = await resHalls.json();
        const resBookings = await fetch('/api/admin/bookings');
        const bookings = await resBookings.json();

        setStats({
            halls: halls.length,
            bookings: bookings.length,
            revenue: bookings.reduce((acc, b) => acc + b.paid_amount, 0)
        });
        setRecentBookings(bookings.slice(0, 5));
    };

    return (
        <div className="row g-4">
            <div className="col-md-4">
                <div className="card border-0 rounded-4 shadow-sm p-4 h-100">
                    <div className="bg-maroon-subtle rounded-3 d-inline-flex p-3 mb-3" style={{ width: 'fit-content' }}>
                        <Package className="text-maroon" size={24} />
                    </div>
                    <p className="text-muted small fw-bold text-uppercase mb-1">Total Halls</p>
                    <h3 className="fw-black mb-0">{stats.halls}</h3>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-0 rounded-4 shadow-sm p-4 h-100">
                    <div className="bg-primary-subtle rounded-3 d-inline-flex p-3 mb-3" style={{ width: 'fit-content' }}>
                        <CalendarIcon className="text-primary" size={24} />
                    </div>
                    <p className="text-muted small fw-bold text-uppercase mb-1">Total Bookings</p>
                    <h3 className="fw-black mb-0">{stats.bookings}</h3>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-0 rounded-4 shadow-sm p-4 h-100">
                    <div className="bg-gold-subtle rounded-3 d-inline-flex p-3 mb-3" style={{ width: 'fit-content' }}>
                        <CheckCircle2 className="text-gold" size={24} />
                    </div>
                    <p className="text-muted small fw-bold text-uppercase mb-1">Revenue (10%)</p>
                    <h3 className="fw-black mb-0">${stats.revenue.toLocaleString()}</h3>
                </div>
            </div>

            <div className="col-12">
                <div className="card border-0 rounded-4 shadow-sm overflow-hidden">
                    <div className="card-header bg-white p-4 border-0 d-flex justify-content-between align-items-center">
                        <h3 className="h5 fw-bold mb-0">Recent Bookings</h3>
                        <Link to="/admin/bookings" className="text-maroon small fw-bold text-decoration-none">View All</Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="bg-light small fw-bold text-muted text-uppercase">
                                <tr>
                                    <th className="px-4 py-3 border-0">Customer</th>
                                    <th className="px-4 py-3 border-0">Hall</th>
                                    <th className="px-4 py-3 border-0">Date</th>
                                    <th className="px-4 py-3 border-0">Amount</th>
                                    <th className="px-4 py-3 border-0">Status</th>
                                </tr>
                            </thead>
                            <tbody className="border-0">
                                {recentBookings.map(b => (
                                    <tr key={b.id}>
                                        <td className="px-4 py-3 border-0">
                                            <div className="fw-bold">{b.customer_name}</div>
                                            <div className="small text-muted">{b.customer_email}</div>
                                        </td>
                                        <td className="px-4 py-3 border-0 small">{b.hall_name}</td>
                                        <td className="px-4 py-3 border-0 small">{format(new Date(b.booking_date), 'MMM dd, yyyy')}</td>
                                        <td className="px-4 py-3 border-0 fw-bold text-maroon">${b.paid_amount.toLocaleString()}</td>
                                        <td className="px-4 py-3 border-0">
                                            <span className="badge bg-maroon-subtle text-maroon rounded-pill px-2 py-1 small fw-bold text-uppercase">
                                                {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}


function AdminHallsList() {
    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHalls();
    }, []);

    const fetchHalls = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/halls');
            const data = await res.json();
            // Ensure data is an array before setting state
            setHalls(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch halls:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this hall? This cannot be undone.")) {
            try {
                const res = await fetch(`/api/admin/halls/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    setHalls(halls.filter(hall => hall.id !== id));
                }
            } catch (err) {
                console.error("Delete error:", err);
            }
        }
    };

    if (loading) return <div className="text-center p-5 mt-5"><div className="spinner-border text-maroon"></div></div>;

    return (
        <div className="row g-4">
            <div className="col-12 d-flex justify-content-between align-items-center mb-2">
                <div>
                    <h2 className="fw-bold mb-0">My Function Halls</h2>
                    <p className="text-muted small">Manage your venues in Nizamabad</p>
                </div>
                <Link to="/admin/halls/new" className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm text-white">
                    <Plus size={18} />
                    <span>Add New Hall</span>
                </Link>
            </div>

            {halls.length === 0 ? (
                <div className="col-12 text-center py-5">
                    <div className="card border-0 shadow-sm p-5 rounded-4">
                        <p className="text-muted">No halls found. Start by adding your first venue!</p>
                    </div>
                </div>
            ) : (
                halls.map(hall => (
                    <div key={hall.id} className="col-lg-6">
                        <div className="card border-0 rounded-4 shadow-sm overflow-hidden h-100 admin-hall-card">
                            <div className="row g-0 h-100">
                                <div className="col-4 position-relative">
                                    <img 
                                        src={hall.images && hall.images.length > 0 ? hall.images[0] : 'https://via.placeholder.com/400x300?text=No+Image'} 
                                        className="w-100 h-100 object-fit-cover" 
                                        alt={hall.name}
                                        referrerPolicy="no-referrer" 
                                    />
                                    <div className="position-absolute top-0 start-0 m-2">
                                        <span className="badge bg-maroon shadow-sm">₹{hall.price}</span>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="card-body p-3 p-md-4">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <h3 className="h5 fw-bold mb-1 text-truncate" style={{maxWidth: '80%'}}>{hall.name}</h3>
                                            <button 
                                                onClick={() => handleDelete(hall.id)} 
                                                className="btn btn-link text-danger p-0 border-0"
                                                title="Delete Hall"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <p className="text-muted small mb-4 d-flex align-items-center">
                                            <MapPin size={12} className="me-1 text-maroon" />
                                            {hall.city}
                                        </p>
                                        <div className="d-flex gap-2">
                                            <Link to={`/admin/halls/edit/${hall.id}`} className="btn btn-light btn-sm flex-grow-1 fw-bold rounded-2 d-flex align-items-center justify-content-center gap-1">
                                                <Edit size={14} /> Edit
                                            </Link>
                                            <Link to={`/hall/${hall.id}`} className="btn btn-primary btn-sm flex-grow-1 fw-bold text-maroon rounded-2 d-flex align-items-center justify-content-center gap-1">
                                                <Eye size={14} /> View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}






function HallForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: 'Nizamabad',
        price: 50000,
        description: '',
        images: [],
        package_details: {
            labor: 0,
            waiter: 0,
            bride_stage: 0,
            groom_stage: 0,
            decoration: 0
        },
        location_lat: 18.6725,
        location_lng: 78.0941
    });

    useEffect(() => {
        if (id) {
            // Using a relative path works because of the "proxy" in package.json
            fetch(`http://localhost:5000/api/halls/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Hall not found');
                    return res.json();
                })
                .then(data => {
                    // Ensure we handle the package_details if it comes as a string or object
                    const formattedData = {
                        ...data,
                        package_details: typeof data.package_details === 'string' 
                            ? JSON.parse(data.package_details) 
                            : data.package_details || formData.package_details
                    };
                    setFormData(formattedData);
                })
                .catch(err => console.error("Error fetching hall:", err));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clean up the data before sending (Postgres likes specific types)
        const submitData = {
            ...formData,
            // Ensure numbers are actually numbers
            price: Number(formData.price),
            location_lat: Number(formData.location_lat),
            location_lng: Number(formData.location_lng)
        };

        const url = id ? `http://localhost:5000/api/admin/halls/${id}` : 'http://localhost:5000/api/admin/halls';
        const method = id ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            });

            if (res.ok) {
                navigate('/admin/halls');
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.error || 'Failed to save venue'}`);
            }
        } catch (err) {
            console.error("Submission Error:", err);
            alert("Could not connect to the server. Check if backend is running.");
        }
    };

    return (
        <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5">
            <div className="d-flex align-items-center gap-3 mb-5">
                <button onClick={() => navigate('/admin/halls')} className="btn btn-light rounded-circle p-2">
                    <ArrowLeft size={20} className="text-muted" />
                </button>
                <h2 className="fw-bold mb-0">{id ? 'Edit Hall' : 'Add New Function Hall'}</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row g-4 mb-5">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label small fw-bold text-muted">Hall Name</label>
                            <input
                                type="text"
                                className="form-control form-control-custom"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold text-muted">City</label>
                            <input
                                type="text"
                                className="form-control form-control-custom"
                                value={formData.city}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold text-muted">Full Address</label>
                            <textarea
                                className="form-control form-control-custom"
                                rows="3"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label small fw-bold text-muted">Base Package Price (₹)</label>
                            <input
                                type="number"
                                className="form-control form-control-custom"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="row g-3 mb-3">
                            <div className="col-6">
                                <label className="form-label small fw-bold text-muted">Latitude</label>
                                <input
                                    type="number" step="any"
                                    className="form-control form-control-custom"
                                    value={formData.location_lat}
                                    onChange={e => setFormData({ ...formData, location_lat: e.target.value })}
                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label small fw-bold text-muted">Longitude</label>
                                <input
                                    type="number" step="any"
                                    className="form-control form-control-custom"
                                    value={formData.location_lng}
                                    onChange={e => setFormData({ ...formData, location_lng: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold text-muted">Description</label>
                            <textarea
                                className="form-control form-control-custom"
                                rows="3"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="border-top pt-5 mb-5">
                    <h3 className="h5 fw-bold mb-4 d-flex align-items-center">
                        <ImageIcon className="text-maroon me-2" size={20} />
                        Media & Assets
                    </h3>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted">Image URLs (comma separated)</label>
                        <input
                            type="text"
                            className="form-control form-control-custom"
                            placeholder="https://image1.jpg, https://image2.jpg"
                            value={formData.images?.join(', ')}
                            onChange={e => setFormData({ 
                                ...formData, 
                                images: e.target.value.split(',').map(s => s.trim()).filter(s => s !== "") 
                            })}
                        />
                    </div>
                </div>

                <div className="border-top pt-5 mb-5">
                    <h3 className="h5 fw-bold mb-4 d-flex align-items-center">
                        <Package className="text-maroon me-2" size={20} />
                        Package Details Cost (₹)
                    </h3>
                    <div className="row g-4">
                        {Object.keys(formData.package_details).map(key => (
                            <div key={key} className="col-md-4">
                                <label className="form-label small fw-bold text-muted text-capitalize">
                                    {key.replace('_', ' ')} Cost
                                </label>
                                <input
                                    type="number"
                                    className="form-control form-control-custom"
                                    value={formData.package_details[key]}
                                    onChange={e => setFormData({
                                        ...formData,
                                        package_details: { 
                                            ...formData.package_details, 
                                            [key]: Number(e.target.value) 
                                        }
                                    })}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-3 mt-5">
                    <button type="button" onClick={() => navigate('/admin/halls')} className="btn btn-light px-5 py-3 rounded-4 fw-bold">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary px-5 py-3 rounded-4 shadow-sm text-white">
                        <Save size={18} className="me-2" />
                        {id ? 'Update Venue' : 'Create Venue'}
                    </button>
                </div>
            </form>
        </div>
    );
}



function AdminCalendarView() {
    const [bookings, setBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [halls, setHalls] = useState([]);
    const [selectedHallId, setSelectedHallId] = useState(null);

    useEffect(() => {
        fetchBookings();
        fetchHalls();
    }, []);

    const fetchBookings = async () => {
        const res = await fetch('/api/admin/bookings');
        const data = await res.json();
        setBookings(data);
    };

    const fetchHalls = async () => {
        const res = await fetch('/api/halls');
        const data = await res.json();
        setHalls(data);
    };

    const isDateBooked = (date) => {
        return bookings.some(b =>
            isSameDay(new Date(b.booking_date), date) &&
            (!selectedHallId || b.hall_id === selectedHallId)
        );
    };

    const getBookingsForDate = (date) => {
        return bookings.filter(b =>
            isSameDay(new Date(b.booking_date), date) &&
            (!selectedHallId || b.hall_id === selectedHallId)
        );
    };

    return (
        <div className="row g-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
                <h2 className="fw-bold mb-0">Booking Calendar</h2>
                <select
                    className="form-select form-select-custom w-auto"
                    onChange={(e) => setSelectedHallId(e.target.value ? Number(e.target.value) : null)}
                >
                    <option value="">All Halls</option>
                    {halls.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                </select>
            </div>

            <div className="col-lg-8">
                <div className="card border-0 rounded-4 shadow-sm p-4 h-100">
                    <Calendar
                        onChange={(val) => setSelectedDate(val)}
                        value={selectedDate}
                        tileClassName={({ date }) =>
                            isDateBooked(date) ? 'bg-maroon-subtle text-maroon fw-bold rounded-3' : ''
                        }
                        className="w-100 border-0"
                    />
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card bg-dark text-white border-0 rounded-4 shadow-lg p-4 mb-4">
                    <p className="text-muted small fw-bold text-uppercase mb-1">Selected Date</p>
                    <h3 className="fw-black mb-0">{format(selectedDate, 'MMMM dd, yyyy')}</h3>
                </div>

                <div className="space-y-3">
                    <h4 className="small fw-bold text-muted text-uppercase mb-3 px-2">Bookings on this day</h4>
                    {getBookingsForDate(selectedDate).length === 0 ? (
                        <div className="card border-0 rounded-4 bg-light p-5 text-center text-muted small">
                            No bookings for this date.
                        </div>
                    ) : (
                        getBookingsForDate(selectedDate).map(b => (
                            <div key={b.id} className="card border-0 rounded-4 shadow-sm p-3 mb-3">
                                <p className="small fw-bold text-maroon text-uppercase mb-1" style={{ fontSize: '10px' }}>{b.hall_name}</p>
                                <p className="fw-bold mb-1">{b.customer_name}</p>
                                <p className="small text-muted mb-0">{b.customer_phone}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function AdminBookingsList() {
    const [bookings, setBookings] = useState([]);
    const [selectedHallId, setSelectedHallId] = useState(null);
    const [halls, setHalls] = useState([]);

    useEffect(() => {
        fetchBookings();
        fetchHalls();
    }, []);

    const fetchBookings = async () => {
        const res = await fetch('/api/admin/bookings');
        const data = await res.json();
        setBookings(data);
    };

    const fetchHalls = async () => {
        const res = await fetch('/api/halls');
        const data = await res.json();
        setHalls(data);
    };

    const filteredBookings = selectedHallId
        ? bookings.filter(b => b.hall_id === selectedHallId)
        : bookings;

    return (
        <div className="row g-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
                <h2 className="fw-bold mb-0">All Bookings</h2>
                <select
                    className="form-select form-select-custom w-auto"
                    onChange={(e) => setSelectedHallId(e.target.value ? Number(e.target.value) : null)}
                >
                    <option value="">All Halls</option>
                    {halls.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                </select>
            </div>

            <div className="col-12">
                <div className="card border-0 rounded-4 shadow-sm overflow-hidden">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="bg-light small fw-bold text-muted text-uppercase">
                                <tr>
                                    <th className="px-4 py-3 border-0">Customer</th>
                                    <th className="px-4 py-3 border-0">Venue</th>
                                    <th className="px-4 py-3 border-0">Event Date</th>
                                    <th className="px-4 py-3 border-0">Payment</th>
                                    <th className="px-4 py-3 border-0"></th>
                                </tr>
                            </thead>
                            <tbody className="border-0">
                                {filteredBookings.map(b => (
                                    <tr key={b.id}>
                                        <td className="px-4 py-3 border-0">
                                            <div className="fw-bold">{b.customer_name}</div>
                                            <div className="small text-muted">{b.customer_email}</div>
                                        </td>
                                        <td className="px-4 py-3 border-0 small">{b.hall_name}</td>
                                        <td className="px-4 py-3 border-0 small fw-bold">{format(new Date(b.booking_date), 'MMM dd, yyyy')}</td>
                                        <td className="px-4 py-3 border-0">
                                            <div className="fw-bold text-maroon">${b.paid_amount.toLocaleString()}</div>
                                            <div className="small text-muted" style={{ fontSize: '10px' }}>Total: ${b.total_amount.toLocaleString()}</div>
                                        </td>
                                        <td className="px-4 py-3 border-0 text-end">
                                            <button className="btn btn-light btn-sm rounded-3">
                                                <ChevronRight size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredBookings.length === 0 && (
                        <div className="p-5 text-center text-muted">No bookings found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
