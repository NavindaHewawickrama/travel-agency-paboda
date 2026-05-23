import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Navbar({ user, logout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/');
    };

    return (
        <nav style={{
            background: '#F5E6D3',
            padding: '20px 40px',
            boxShadow: '8px 8px 16px rgba(107, 70, 45, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.6)',
            marginBottom: '20px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: '#8B5A2B',
                    textDecoration: 'none'
                }}>
                    ✈️ TravelAgency
                </Link>

                <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                    <Link to="/travels" style={{ color: '#4A3728', textDecoration: 'none' }}>Travels</Link>
                    <Link to="/packages" style={{ color: '#4A3728', textDecoration: 'none' }}>Packages</Link>
                    <Link to="/contact" style={{ color: '#4A3728', textDecoration: 'none' }}>Contact</Link>

                    {user ? (
                        <>
                            <Link to="/cart" style={{ color: '#4A3728', textDecoration: 'none' }}>🛒 Cart</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" style={{ color: '#D2691E', textDecoration: 'none', fontWeight: 'bold' }}>Admin Panel</Link>
                            )}
                            <span style={{ color: '#8B5A2B' }}>Welcome, {user.name}</span>
                            <button onClick={handleLogout} className="clay-button" style={{ padding: '8px 20px' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="clay-button" style={{ textDecoration: 'none', padding: '8px 20px' }}>
                                Login
                            </Link>
                            <Link to="/register" className="clay-button" style={{ textDecoration: 'none', padding: '8px 20px' }}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;