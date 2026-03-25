<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        $products = [
            [
                'name' => 'Intel Core i9-14900K',
                'description' => '24-Core desktop processor for extreme gaming and productivity.',
                'price' => 589.99,
                'stock' => 15,
                'category_name' => 'Processors',
                'image_url' => 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500',
            ],
            [
                'name' => 'AMD Ryzen 7 7800X3D',
                'description' => 'The ultimate gaming processor with 3D V-Cache technology.',
                'price' => 449.00,
                'stock' => 20,
                'category_name' => 'Processors',
                'image_url' => 'https://images.unsplash.com/photo-1591405351990-4726e331f141?w=500',
            ],
            [
                'name' => 'NVIDIA GeForce RTX 4090',
                'description' => 'The fastest GPU for gamers and creators.',
                'price' => 1599.99,
                'stock' => 5,
                'category_name' => 'Graphics Cards',
                'image_url' => 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500',
            ],
            [
                'name' => 'ASUS ROG Strix Z790-E',
                'description' => 'Premium Intel Z790 motherboard with WiFi 6E support.',
                'price' => 499.00,
                'stock' => 10,
                'category_name' => 'Motherboards',
                'image_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500',
            ],
            [
                'name' => 'Corsair Vengeance RGB 32GB DDR5',
                'description' => 'High-performance 6000MHz memory with dynamic RGB lighting.',
                'price' => 129.99,
                'stock' => 40,
                'category_name' => 'Memory',
                'image_url' => 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=500',
            ],
            [
                'name' => 'Samsung 990 Pro 2TB',
                'description' => 'Gen4 NVMe SSD with extreme read/write speeds.',
                'price' => 189.99,
                'stock' => 25,
                'category_name' => 'Storage',
                'image_url' => 'https://images.unsplash.com/photo-1597872200370-493dea239390?w=500',
            ],
            [
                'name' => 'Lian Li PC-O11 Dynamic',
                'description' => 'Iconic dual-chamber chassis for stunning builds.',
                'price' => 149.99,
                'stock' => 12,
                'category_name' => 'Cases',
                'image_url' => 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500',
            ],
        ];

        foreach ($products as $p) {
            $cat = $categories->where('name', $p['category_name'])->first();
            if ($cat) {
                Product::create([
                    'name' => $p['name'],
                    'description' => $p['description'],
                    'price' => $p['price'],
                    'stock' => $p['stock'],
                    'category_id' => $cat->id,
                    'image_url' => $p['image_url'],
                ]);
            }
        }
    }
}
