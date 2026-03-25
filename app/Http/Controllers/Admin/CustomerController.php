<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::where('role', 'customer')
            ->withCount('orders')
            ->latest()
            ->paginate(10);
            
        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers
        ]);
    }

    public function show($id)
    {
        $customer = User::with(['orders' => function($query) {
            $query->latest()->take(5);
        }])->findOrFail($id);
        
        return Inertia::render('Admin/Customers/Show', [
            'customer' => $customer
        ]);
    }

    public function destroy($id)
    {
        $customer = User::findOrFail($id);
        
        // Prevent deleting admin intentionally
        if ($customer->role === 'admin') {
            return redirect()->back()->with('error', 'Cannot delete admin users.');
        }

        $customer->delete();
        
        return redirect()->route('admin.customers.index')->with('success', 'Customer deleted successfully.');
    }
}
