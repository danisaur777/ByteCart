<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Basic Metrics
        $totalSales = Order::sum('total_amount');
        $totalOrders = Order::count();
        $totalCustomers = User::where('role', 'customer')->count();
        $lowStockCount = Product::where('stock', '<=', 10)->count();
        
        $currentMonthSales = Order::whereMonth('created_at', Carbon::now()->month)
                                  ->whereYear('created_at', Carbon::now()->year)
                                  ->sum('total_amount');

        $salesPerMonth = Order::select(
            DB::raw('sum(total_amount) as total'),
            DB::raw("DATE_FORMAT(created_at, '%b') as month"),
            DB::raw("MIN(created_at) as min_date")
        )
        ->where('created_at', '>=', Carbon::now()->subMonths(5)->startOfMonth())
        ->groupBy('month')
        ->orderBy('min_date')
        ->get();

        // 3. Charts Data: Orders by Status
        $ordersByStatus = Order::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        // 4. Charts Data: Most Sold Products (Top 5)
        // We join order_items to sum quantities
        $topProducts = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->select('products.name', DB::raw('SUM(order_items.quantity) as total_sold'))
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'metrics' => [
                'totalSales' => number_format($totalSales, 2),
                'totalOrders' => $totalOrders,
                'totalCustomers' => number_format($totalCustomers),
                'lowStockCount' => $lowStockCount,
                'revenueThisMonth' => number_format($currentMonthSales, 2),
            ],
            'charts' => [
                'salesPerMonth' => $salesPerMonth,
                'ordersByStatus' => $ordersByStatus,
                'topProducts' => $topProducts,
            ]
        ]);
    }
}
