import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Login({ setToken, setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            const { token, user, role } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setToken(token);
            setUser(user);

            toast.success(`Welcome back, ${user.name}!`);

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', margin: '80px auto', padding: '0 20px' }}>
            <div className="clay-card fade-in" style={{ padding: '40px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#8B5A2B' }}>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                        <input
                            type="email"
                            className="clay-input"
                            style={{ width: '100%' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                        <input
                            type="password"
                            className="clay-input"
                            style={{ width: '100%' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="clay-button" style={{ width: '100%', marginBottom: '20px' }}>
                        Login
                    </button>

                    <p style={{ textAlign: 'center' }}>
                        Don't have an account? <Link to="/register" style={{ color: '#D2691E' }}>Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;