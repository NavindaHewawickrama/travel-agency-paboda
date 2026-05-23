import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get('/cart');
            setCartItems(response.data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load cart');
            setLoading(false);
        }
    };

    const updateQuantity = async (id, quantity) => {
        try {
            await axios.put(`/cart/${id}`, { quantity });
            fetchCart();
            toast.success('Cart updated');
        } catch (error) {
            toast.error('Update failed');
        }
    };

    const removeItem = async (id) => {
        try {
            await axios.delete(`/cart/${id}`);
            fetchCart();
            toast.success('Item removed');
        } catch (error) {
            toast.error('Remove failed');
        }
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{ maxWidth: '1200px', margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
                <div className="clay-card" style={{ padding: '60px' }}>
                    <h2>Your cart is empty</h2>
                    <button className="clay-button" onClick={() => navigate('/travels')} style={{ marginTop: '20px' }}>
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
            <h1 style={{ marginBottom: '30px', color: '#8B5A2B' }}>Your Cart</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div>
                    {cartItems.map(item => (
                        <div key={item.id} className="clay-card" style={{ padding: '20px', marginBottom: '20px', display: 'flex', gap: '20px' }}>
                            <img
                                src={item.image_url || 'https://via.placeholder.com/100x100'}
                                alt={item.name}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px' }}
                            />
                            <div style={{ flex: 1 }}>
                                <h3>{item.name}</h3>
                                <p>${item.price}</p>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <button
                                        className="clay-button"
                                        onClick={() => updateQuantity(item.cart_id, Math.max(1, item.quantity - 1))}
                                        style={{ padding: '5px 15px' }}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="clay-button"
                                        onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                                        style={{ padding: '5px 15px' }}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="clay-button"
                                        onClick={() => removeItem(item.cart_id)}
                                        style={{ padding: '5px 15px', background: '#ff6b6b', color: 'white' }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="clay-card" style={{ padding: '20px', height: 'fit-content', position: 'sticky', top: '20px' }}>
                    <h3>Order Summary</h3>
                    <div style={{ margin: '20px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Subtotal:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Tax (10%):</span>
                            <span>${(totalPrice * 0.1).toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
                            <span>Total:</span>
                            <span>${(totalPrice * 1.1).toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="clay-button" onClick={() => navigate('/checkout')} style={{ width: '100%' }}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;