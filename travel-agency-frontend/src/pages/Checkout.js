import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await axios.post('/checkout', { payment_method: paymentMethod });
            toast.success('Order placed successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Checkout failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
            <div className="clay-card fade-in" style={{ padding: '40px' }}>
                <h1 style={{ marginBottom: '30px', color: '#8B5A2B' }}>Checkout</h1>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '30px' }}>
                        <h3>Payment Method</h3>
                        <div style={{ marginTop: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '10px' }}>
                                <input
                                    type="radio"
                                    value="credit_card"
                                    checked={paymentMethod === 'credit_card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ marginRight: '10px' }}
                                />
                                Credit Card (Demo)
                            </label>

                            <label style={{ display: 'block', marginBottom: '10px' }}>
                                <input
                                    type="radio"
                                    value="paypal"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ marginRight: '10px' }}
                                />
                                PayPal (Demo)
                            </label>

                            <label style={{ display: 'block' }}>
                                <input
                                    type="radio"
                                    value="bank_transfer"
                                    checked={paymentMethod === 'bank_transfer'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ marginRight: '10px' }}
                                />
                                Bank Transfer (Demo)
                            </label>
                        </div>
                    </div>

                    {paymentMethod === 'credit_card' && (
                        <div style={{ marginBottom: '30px' }}>
                            <h3>Card Details (Demo)</h3>
                            <div style={{ marginTop: '15px' }}>
                                <input
                                    className="clay-input"
                                    placeholder="Card Number"
                                    style={{ width: '100%', marginBottom: '10px' }}
                                    defaultValue="4242 4242 4242 4242"
                                />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <input className="clay-input" placeholder="MM/YY" defaultValue="12/25" />
                                    <input className="clay-input" placeholder="CVV" defaultValue="123" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={{ marginBottom: '30px' }}>
                        <h3>Order Summary</h3>
                        <p style={{ color: '#666' }}>This is a demo payment gateway. No real charges will be made.</p>
                    </div>

                    <button
                        type="submit"
                        className="clay-button"
                        style={{ width: '100%' }}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Place Order (Demo)'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Checkout;