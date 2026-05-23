import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AdminTravels from '../components/AdminTravels';
import AdminPackages from '../components/AdminPackages';

function AdminDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.role !== 'admin') {
            navigate('/');
        }
    }, []);

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
            <div className="clay-card" style={{ padding: '30px' }}>
                <h1 style={{ marginBottom: '30px', color: '#8B5A2B' }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                    <Link to="/admin/travels" className="clay-button" style={{ textDecoration: 'none' }}>
                        Manage Travels
                    </Link>
                    <Link to="/admin/packages" className="clay-button" style={{ textDecoration: 'none' }}>
                        Manage Packages
                    </Link>
                </div>

                <Routes>
                    <Route path="/travels" element={<AdminTravels />} />
                    <Route path="/packages" element={<AdminPackages />} />
                    <Route path="/" element={<AdminTravels />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminDashboard;