import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function TravelDetails() {
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTravels();
    }, []);

    const fetchTravels = async () => {
        try {
            const response = await axios.get('/travels');
            setTravels(response.data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load travels');
            setLoading(false);
        }
    };

    const addToCart = async (travel) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }

        try {
            await axios.post('/cart', {
                item_type: 'travel',
                item_id: travel.id,
                quantity: 1
            });
            toast.success(`${travel.title} added to cart!`);
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
    }

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
            <h1 style={{ marginBottom: '30px', color: '#8B5A2B' }}>Travel Destinations</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                {travels.map(travel => (
                    <div key={travel.id} className="clay-card fade-in" style={{ padding: '20px' }}>
                        <img
                            src={travel.image_url || 'https://via.placeholder.com/350x200'}
                            alt={travel.title}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginBottom: '15px' }}
                        />
                        <h3>{travel.title}</h3>
                        <p style={{ color: '#666', marginBottom: '10px' }}>{travel.destination}</p>
                        <p>{travel.description.substring(0, 100)}...</p>
                        <p style={{ fontSize: '1.5rem', color: '#D2691E', fontWeight: 'bold', margin: '15px 0' }}>
                            ${travel.price}
                        </p>
                        <p>Duration: {travel.duration} days</p>
                        <p>Available Seats: {travel.available_seats}</p>
                        <button
                            className="clay-button"
                            style={{ width: '100%', marginTop: '15px' }}
                            onClick={() => addToCart(travel)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TravelDetails;