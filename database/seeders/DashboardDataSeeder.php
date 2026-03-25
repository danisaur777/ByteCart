<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class DashboardDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Clear existing non-admin users
        User::where('role', 'customer')->delete();

        // 2. Create Specific Customers from Firebase Screenshot with UIDs
        $specificUsers = [
            ['name' => 'Sheridan', 'email' => 'sheridan@gmail.com', 'uid' => 'V5wrHLiJErXyq57q7OS7UBsW6e42', 'date' => '2026-03-20'],
            ['name' => 'Dan', 'email' => 'dan@gmail.com', 'uid' => '8btXWK5wYOh0K3mKEtncwg9N2s42', 'date' => '2026-03-20'],
            ['name' => 'Igme', 'email' => 'igme@gmail.com', 'uid' => 'xIFCJX1I3IRla83yOZ4O7b54ciC2', 'date' => '2026-03-19'],
            ['name' => 'Dani', 'email' => 'dani@gmail.com', 'uid' => '3zpxVRTDIXTvc4qagAg2gInds02', 'date' => '2026-03-19'],
            ['name' => 'Kevin', 'email' => 'kevin@gmail.com', 'uid' => 'hNXPNzEcRJfhkTUnBEW9BRm59s2', 'date' => '2026-03-17'],
            ['name' => 'Shiella Perlas', 'email' => 'shiellaperlas@gmail.com', 'uid' => 'NrQVs1eWhTeP03QAXAjm4SlRk2', 'date' => '2026-03-17'],
        ];

        $customers = [];
        foreach ($specificUsers as $u) {
            $customers[] = User::create([
                'name' => $u['name'],
                'email' => $u['email'],
                'firebase_uid' => $u['uid'],
                'password' => Hash::make('password'),
                'role' => 'customer',
                'created_at' => Carbon::parse($u['date']),
                'updated_at' => Carbon::parse($u['date']),
            ]);
        }

        // 3. Get All Products
        $products = Product::all();
        if ($products->isEmpty()) {
            return;
        }

        // 4. Status Options
        $statuses = ['pending', 'processing', 'shipped', 'delivered'];

        // 5. Generate Chronological Orders for each user
        foreach ($customers as $user) {
            $userCreated = Carbon::parse($user->created_at);
            
            // Generate 2-4 orders per user to make the "order of them" look real
            $numOrders = rand(2, 4);
            for ($i = 0; $i < $numOrders; $i++) {
                // Order date is between user creation and now, sorted chronologically for each user
                $orderDate = $userCreated->copy()->addHours(rand(1, 48 * ($i + 1)));
                if ($orderDate->isFuture()) $orderDate = Carbon::now();

                $order = Order::create([
                    'user_id' => $user->id,
                    'status' => $statuses[array_rand($statuses)],
                    'payment_status' => 'paid',
                    'total_amount' => 0, 
                    'created_at' => $orderDate,
                    'updated_at' => $orderDate,
                ]);

                $totalAmount = 0;
                $itemCount = rand(1, 2);
                $selectedProducts = $products->random($itemCount);

                foreach ($selectedProducts as $product) {
                    $qty = rand(1, 1);
                    $price = $product->price;
                    $subtotal = $price * $qty;
                    
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $qty,
                        'price' => $price,
                        'created_at' => $orderDate,
                        'updated_at' => $orderDate,
                    ]);

                    $totalAmount += $subtotal;
                }

                $order->update(['total_amount' => $totalAmount]);
            }
        }

        $this->command->info('Actual Data Restored with Specific Firebase UIDs! 🚀');
    }
}
