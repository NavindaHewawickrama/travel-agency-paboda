import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{
            background: '#4A3728',
            color: '#F5E6D3',
            padding: '40px 20px 20px',
            marginTop: '60px',
            borderRadius: '30px 30px 0 0'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px'
            }}>
                <div>
                    <h3 style={{ marginBottom: '15px' }}>Travel Agency</h3>
                    <p>Explore the world with our amazing travel packages and personalized experiences.</p>
                </div>

                <div>
                    <h3 style={{ marginBottom: '15px' }}>Quick Links</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><Link to="/travels" style={{ color: '#F5E6D3', textDecoration: 'none' }}>Travels</Link></li>
                        <li><Link to="/packages" style={{ color: '#F5E6D3', textDecoration: 'none' }}>Packages</Link></li>
                        <li><Link to="/contact" style={{ color: '#F5E6D3', textDecoration: 'none' }}>Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 style={{ marginBottom: '15px' }}>Contact Info</h3>
                    <p>📞 +1 234 567 890</p>
                    <p>✉️ info@travelagency.com</p>
                    <p>📍 123 Travel Street, Adventure City</p>
                </div>

                <div>
                    <h3 style={{ marginBottom: '15px' }}>Follow Us</h3>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <span>📘 Facebook</span>
                        <span>📸 Instagram</span>
                        <span>🐦 Twitter</span>
                    </div>
                </div>
            </div>

            <div style={{
                textAlign: 'center',
                marginTop: '30px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(245, 230, 211, 0.3)'
            }}>
                <p>&copy; 2024 Travel Agency. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;