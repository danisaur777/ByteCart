<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $products = $query->latest()->get();
        return response()->json($products);
    }

    public function show($id)
    {
        // Eager load the category and reviews with their associated user.
        // We order reviews by latest first.
        $product = Product::with(['category', 'reviews' => function($q) {
            $q->latest()->with('user:id,name,email,firebase_uid');
        }])->findOrFail($id);
        
        return response()->json($product);
    }

    public function storeReview(Request $request, $id)
    {
        $request->validate([
            'firebase_uid' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $product = Product::findOrFail($id);
        $user = User::where('firebase_uid', $request->firebase_uid)->firstOrFail();

        // Check if user already reviewed (optional based on logic, but let's allow updating or just add for now)
        $review = $product->reviews()->updateOrCreate(
            ['user_id' => $user->id], // Only one review per user per product
            [
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]
        );

        // Load the user relationship so the frontend can immediately display the reviewer name
        $review->load('user:id,name,email,firebase_uid');

        return response()->json([
            'message' => 'Review submitted successfully',
            'review' => $review
        ], 201);
    }
}
