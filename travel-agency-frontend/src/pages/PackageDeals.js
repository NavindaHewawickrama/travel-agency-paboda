import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function PackageDeals() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await axios.get('/packages');
            setPackages(response.data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load packages');
            setLoading(false);
        }
    };

    const addToCart = async (pkg) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }

        try {
            await axios.post('/cart', {
                item_type: 'package',
                item_id: pkg.id,
                quantity: 1
            });
            toast.success(`${pkg.name} added to cart!`);
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
    }

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
            <h1 style={{ marginBottom: '30px', color: '#8B5A2B' }}>Package Deals</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                {packages.map(pkg => (
                    <div key={pkg.id} className="clay-card fade-in" style={{ padding: '20px' }}>
                        <img
                            src={pkg.image_url || 'https://via.placeholder.com/350x200'}
                            alt={pkg.name}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginBottom: '15px' }}
                        />
                        <h3>{pkg.name}</h3>
                        <p>{pkg.description.substring(0, 100)}...</p>
                        <p style={{ fontSize: '1.5rem', color: '#D2691E', fontWeight: 'bold', margin: '15px 0' }}>
                            ${pkg.price}
                        </p>
                        <p>Duration: {pkg.duration} days</p>
                        <p>Max People: {pkg.max_people}</p>
                        <button
                            className="clay-button"
                            style={{ width: '100%', marginTop: '15px' }}
                            onClick={() => addToCart(pkg)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PackageDeals;