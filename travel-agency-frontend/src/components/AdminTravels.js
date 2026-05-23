import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminTravels() {
    const [travels, setTravels] = useState([]);
    const [editingTravel, setEditingTravel] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        destination: '',
        price: '',
        duration: '',
        image_url: '',
        available_seats: '',
        start_date: '',
        end_date: ''
    });

    useEffect(() => {
        fetchTravels();
    }, []);

    const fetchTravels = async () => {
        try {
            const response = await axios.get('/travels');
            setTravels(response.data);
        } catch (error) {
            toast.error('Failed to fetch travels');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTravel) {
                await axios.put(`/travels/${editingTravel.id}`, formData);
                toast.success('Travel updated successfully');
            } else {
                await axios.post('/travels', formData);
                toast.success('Travel created successfully');
            }
            resetForm();
            fetchTravels();
        } catch (error) {
            toast.error(error.response?.data?.errors || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`/travels/${id}`);
                toast.success('Travel deleted');
                fetchTravels();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const handleEdit = (travel) => {
        setEditingTravel(travel);
        setFormData(travel);
    };

    const resetForm = () => {
        setEditingTravel(null);
        setFormData({
            title: '',
            description: '',
            destination: '',
            price: '',
            duration: '',
            image_url: '',
            available_seats: '',
            start_date: '',
            end_date: ''
        });
    };

    return (
        <div>
            <h2>{editingTravel ? 'Edit Travel' : 'Add New Travel'}</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <input
                        className="clay-input"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <input
                        className="clay-input"
                        placeholder="Destination"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        required
                    />
                    <input
                        className="clay-input"
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                    />
                    <input
                        className="clay-input"
                        type="number"
                        placeholder="Duration (days)"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        required
                    />
                    <textarea
                        className="clay-input"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="3"
                        style={{ gridColumn: 'span 2' }}
                        required
                    />
                    <input
                        className="clay-input"
                        placeholder="Image URL"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                    <input
                        className="clay-input"
                        type="number"
                        placeholder="Available Seats"
                        value={formData.available_seats}
                        onChange={(e) => setFormData({ ...formData, available_seats: e.target.value })}
                        required
                    />
                    <input
                        className="clay-input"
                        type="date"
                        placeholder="Start Date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        required
                    />
                    <input
                        className="clay-input"
                        type="date"
                        placeholder="End Date"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                        required
                    />
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button type="submit" className="clay-button">
                        {editingTravel ? 'Update' : 'Create'}
                    </button>
                    {editingTravel && (
                        <button type="button" className="clay-button" onClick={resetForm}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div>
                <h3>Existing Travels</h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                    {travels.map(travel => (
                        <div key={travel.id} className="clay-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4>{travel.title}</h4>
                                <p>{travel.destination} - ${travel.price}</p>
                            </div>
                            <div>
                                <button className="clay-button" onClick={() => handleEdit(travel)} style={{ marginRight: '10px' }}>
                                    Edit
                                </button>
                                <button className="clay-button" onClick={() => handleDelete(travel.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminTravels;