import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminPackages() {
    const [packages, setPackages] = useState([]);
    const [editingPackage, setEditingPackage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
        image_url: '',
        max_people: '',
        destinations: '',
        includes: ''
    });

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await axios.get('/packages');
            setPackages(response.data);
        } catch (error) {
            toast.error('Failed to fetch packages');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPackage) {
                await axios.put(`/packages/${editingPackage.id}`, formData);
                toast.success('Package updated successfully');
            } else {
                await axios.post('/packages', formData);
                toast.success('Package created successfully');
            }
            resetForm();
            fetchPackages();
        } catch (error) {
            toast.error(error.response?.data?.errors || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`/packages/${id}`);
                toast.success('Package deleted');
                fetchPackages();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const handleEdit = (pkg) => {
        setEditingPackage(pkg);
        setFormData(pkg);
    };

    const resetForm = () => {
        setEditingPackage(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            duration: '',
            image_url: '',
            max_people: '',
            destinations: '',
            includes: ''
        });
    };

    return (
        <div>
            <h2>{editingPackage ? 'Edit Package' : 'Add New Package'}</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <input
                        className="clay-input"
                        placeholder="Package Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <input
                        className="clay-input"
                        type="number"
                        placeholder="Max People"
                        value={formData.max_people}
                        onChange={(e) => setFormData({ ...formData, max_people: e.target.value })}
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
                        placeholder="Destinations (comma separated)"
                        value={formData.destinations}
                        onChange={(e) => setFormData({ ...formData, destinations: e.target.value })}
                    />
                    <input
                        className="clay-input"
                        placeholder="What's Included (comma separated)"
                        value={formData.includes}
                        onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                    />
                    <input
                        className="clay-input"
                        placeholder="Image URL"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button type="submit" className="clay-button">
                        {editingPackage ? 'Update' : 'Create'}
                    </button>
                    {editingPackage && (
                        <button type="button" className="clay-button" onClick={resetForm}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div>
                <h3>Existing Packages</h3>
                <div style={{ display: 'grid', gap: '15px' }}>
                    {packages.map(pkg => (
                        <div key={pkg.id} className="clay-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4>{pkg.name}</h4>
                                <p>${pkg.price} - {pkg.duration} days</p>
                            </div>
                            <div>
                                <button className="clay-button" onClick={() => handleEdit(pkg)} style={{ marginRight: '10px' }}>
                                    Edit
                                </button>
                                <button className="clay-button" onClick={() => handleDelete(pkg.id)}>
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

export default AdminPackages;