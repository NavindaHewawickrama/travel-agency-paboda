import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <div style={{
      background: 'linear-gradient(135deg, #8B5A2B 0%, #D2691E 100%)',
      borderRadius: '0 0 60px 60px',
      padding: '80px 20px',
      marginBottom: '40px',
      textAlign: 'center',
      color: 'white'
    }}>
      <div className="fade-in">
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: '700' }}>
          Explore the World with Us
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.95 }}>
          Discover amazing destinations and unforgettable experiences
        </p>
        <button 
          className="clay-button"
          onClick={() => navigate('/travels')}
          style={{ 
            backgroundColor: 'white', 
            color: '#8B5A2B',
            fontSize: '1.1rem',
            padding: '15px 35px'
          }}
        >
          Start Your Journey
        </button>
      </div>
    </div>
  );
}

export default Hero;