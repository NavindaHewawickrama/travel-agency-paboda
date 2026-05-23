import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import TravelCarousel from '../components/TravelCarousel';
import Footer from '../components/Footer';

function Home() {
    const [featuredTravels, setFeaturedTravels] = useState([]);
    const [featuredPackages, setFeaturedPackages] = useState([]);

    useEffect(() => {
        fetchFeaturedItems();
    }, []);

    const fetchFeaturedItems = async () => {
        try {
            const [travelsRes, packagesRes] = await Promise.all([
                axios.get('/travels'),
                axios.get('/packages')
            ]);
            setFeaturedTravels(travelsRes.data.slice(0, 5));
            setFeaturedPackages(packagesRes.data.slice(0, 5));
        } catch (error) {
            console.error('Error fetching featured items:', error);
        }
    };

    return (
        <div>
            <Hero />
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <TravelCarousel items={featuredTravels} title="Featured Travel Destinations" type="travel" />
                <TravelCarousel items={featuredPackages} title="Popular Package Deals" type="package" />
            </div>
            <Footer />
        </div>
    );
}

export default Home;