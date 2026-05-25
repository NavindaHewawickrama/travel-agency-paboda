<?php

namespace Database\Seeders;

use App\Models\PackageDeal;
use Illuminate\Database\Seeder;

class PackageDealSeeder extends Seeder
{
    public function run()
    {
        PackageDeal::create([
            'name' => 'European Explorer Package',
            'description' => 'Visit 5 European countries in 14 days. Includes flights, hotels, and guided tours.',
            'destinations' => 'France, Italy, Switzerland, Germany, Netherlands',
            'price' => 3499.99,
            'duration' => 14,
            'image_url' => 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b',
            'max_people' => 40,
            'includes' => 'Flights, Hotels, Breakfast, Guided Tours, Transportation'
        ]);

        PackageDeal::create([
            'name' => 'Southeast Asia Adventure',
            'description' => 'Explore the best of Southeast Asia. Perfect for adventure seekers and culture lovers.',
            'destinations' => 'Thailand, Vietnam, Cambodia, Singapore',
            'price' => 2499.99,
            'duration' => 12,
            'image_url' => 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
            'max_people' => 25,
            'includes' => 'Flights, Accommodation, Some Meals, Local Tours'
        ]);

        PackageDeal::create([
            'name' => 'USA National Parks Tour',
            'description' => 'Visit the most beautiful national parks in the western United States.',
            'destinations' => 'Yellowstone, Grand Canyon, Zion, Bryce Canyon',
            'price' => 1999.99,
            'duration' => 10,
            'image_url' => 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
            'max_people' => 20,
            'includes' => 'RV Accommodation, Park Fees, Camping Gear, Meals'
        ]);
    }
}