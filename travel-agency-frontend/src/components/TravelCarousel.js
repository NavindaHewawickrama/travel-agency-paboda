import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function TravelCarousel({ items, title, type }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const addToCart = async (item) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }

        try {
            await axios.post('/cart', {
                item_type: type === 'travel' ? 'travel' : 'package',
                item_id: item.id,
                quantity: 1
            });
            toast.success('Added to cart!');
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    if (!items.length) return null;

    const currentItem = items[currentIndex];

    return (
        <div className="clay-card" style={{ padding: '30px', margin: '40px 0' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#8B5A2B' }}>{title}</h2>
            <div className="carousel-container">
                <button
                    onClick={prevSlide}
                    style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        background: '#F5E6D3',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        boxShadow: '4px 4px 8px rgba(107,70,45,0.2)'
                    }}
                >
                    ←
                </button>

                <div className="carousel-item">
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <img
                            src={currentItem.image_url || 'https://via.placeholder.com/400x300'}
                            alt={currentItem.title || currentItem.name}
                            style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '16px' }}
                        />
                        <div style={{ flex: 1 }}>
                            <h3>{currentItem.title || currentItem.name}</h3>
                            <p>{currentItem.description?.substring(0, 150)}...</p>
                            <p style={{ fontSize: '1.5rem', color: '#D2691E', fontWeight: 'bold', margin: '15px 0' }}>
                                ${currentItem.price}
                            </p>
                            <button
                                className="clay-button"
                                onClick={() => addToCart(currentItem)}
                                style={{ marginRight: '10px' }}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="clay-button"
                                onClick={() => navigate(`/${type === 'travel' ? 'travels' : 'packages'}/${currentItem.id}`)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={nextSlide}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        background: '#F5E6D3',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        boxShadow: '4px 4px 8px rgba(107,70,45,0.2)'
                    }}
                >
                    →
                </button>
            </div>
        </div>
    );
}

export default TravelCarousel;