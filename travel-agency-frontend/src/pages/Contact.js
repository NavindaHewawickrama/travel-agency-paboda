import React, { useState } from 'react';
import toast from 'react-hot-toast';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
            <h1 style={{ marginBottom: '30px', color: '#8B5A2B', textAlign: 'center' }}>Contact Us</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div className="clay-card fade-in" style={{ padding: '30px' }}>
                    <h3>Get in Touch</h3>
                    <p>Have questions? We'd love to hear from you!</p>

                    <div style={{ marginTop: '30px' }}>
                        <h4>📍 Address</h4>
                        <p>123 Travel Street, Adventure City, AC 12345</p>

                        <h4 style={{ marginTop: '20px' }}>📞 Phone</h4>
                        <p>+1 (555) 123-4567</p>

                        <h4 style={{ marginTop: '20px' }}>✉️ Email</h4>
                        <p>info@travelagency.com</p>

                        <h4 style={{ marginTop: '20px' }}>🕒 Business Hours</h4>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>

                <div className="clay-card fade-in" style={{ padding: '30px' }}>
                    <h3>Send us a Message</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <label>Name</label>
                            <input
                                type="text"
                                className="clay-input"
                                style={{ width: '100%', marginTop: '5px' }}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label>Email</label>
                            <input
                                type="email"
                                className="clay-input"
                                style={{ width: '100%', marginTop: '5px' }}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label>Subject</label>
                            <input
                                type="text"
                                className="clay-input"
                                style={{ width: '100%', marginTop: '5px' }}
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label>Message</label>
                            <textarea
                                className="clay-input"
                                style={{ width: '100%', marginTop: '5px', minHeight: '150px' }}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="clay-button" style={{ width: '100%' }}>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;