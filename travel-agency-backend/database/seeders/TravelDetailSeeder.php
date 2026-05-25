<?php

namespace Database\Seeders;

use App\Models\TravelDetail;
use Illuminate\Database\Seeder;

class TravelDetailSeeder extends Seeder
{
    public function run()
    {
        TravelDetail::create([
            'title' => 'Paris Getaway',
            'description' => 'Experience the romance of Paris with this amazing travel package. Visit the Eiffel Tower, Louvre Museum, and enjoy French cuisine.',
            'destination' => 'Paris, France',
            'price' => 1299.99,
            'duration' => 5,
            'image_url' => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
            'available_seats' => 20,
            'start_date' => '2024-06-01',
            'end_date' => '2024-06-06'
        ]);

        TravelDetail::create([
            'title' => 'Tokyo Adventure',
            'description' => 'Discover the vibrant culture of Tokyo. Visit Shibuya, ancient temples, and experience authentic Japanese culture.',
            'destination' => 'Tokyo, Japan',
            'price' => 1899.99,
            'duration' => 7,
            'image_url' => 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
            'available_seats' => 15,
            'start_date' => '2024-07-10',
            'end_date' => '2024-07-17'
        ]);

        TravelDetail::create([
            'title' => 'New York Explorer',
            'description' => 'Explore the city that never sleeps. Visit Times Square, Central Park, and see Broadway shows.',
            'destination' => 'New York, USA',
            'price' => 999.99,
            'duration' => 4,
            'image_url' => 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
            'available_seats' => 25,
            'start_date' => '2024-08-05',
            'end_date' => '2024-08-09'
        ]);

        TravelDetail::create([
            'title' => 'Bali Paradise',
            'description' => 'Relax on beautiful beaches, visit rice terraces, and experience Balinese culture.',
            'destination' => 'Bali, Indonesia',
            'price' => 799.99,
            'duration' => 6,
            'image_url' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
            'available_seats' => 30,
            'start_date' => '2024-09-15',
            'end_date' => '2024-09-21'
        ]);
    }
}