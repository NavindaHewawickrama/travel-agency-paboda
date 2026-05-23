import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            });

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            const errors = error.response?.data?.errors;
            if (errors) {
                Object.values(errors).forEach(err => toast.error(err[0]));
            } else {
                toast.error('Registration failed');
            }
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', margin: '80px auto', padding: '0 20px' }}>
            <div className="clay-card fade-in" style={{ padding: '40px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#8B5A2B' }}>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Name</label>
                        <input
                            type="text"
                            className="clay-input"
                            style={{ width: '100%' }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

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

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px' }}>Confirm Password</label>
                        <input
                            type="password"
                            className="clay-input"
                            style={{ width: '100%' }}
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="clay-button" style={{ width: '100%', marginBottom: '20px' }}>
                        Register
                    </button>

                    <p style={{ textAlign: 'center' }}>
                        Already have an account? <Link to="/login" style={{ color: '#D2691E' }}>Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;