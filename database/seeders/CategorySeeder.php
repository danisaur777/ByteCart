<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Processors', 'description' => 'CPU units from Intel and AMD'],
            ['name' => 'Graphics Cards', 'description' => 'NVIDIA GeForce and AMD Radeon GPUs'],
            ['name' => 'Motherboards', 'description' => 'Main circuit boards for your PC'],
            ['name' => 'Memory', 'description' => 'High-speed RAM modules'],
            ['name' => 'Storage', 'description' => 'SSDs and HDDs for your data'],
            ['name' => 'Power Supplies', 'description' => 'Reliable PSU units'],
            ['name' => 'Cases', 'description' => 'Premium PC chassis and enclosures'],
            ['name' => 'Cooling', 'description' => 'Air and Liquid cooling solutions'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
