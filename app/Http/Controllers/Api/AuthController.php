<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function syncUser(Request $request)
    {
        $request->validate([
            'firebase_uid' => 'required|string',
            'email' => 'required|email',
            'name' => 'nullable|string',
        ]);

        $user = User::updateOrCreate(
            ['firebase_uid' => $request->firebase_uid],
            [
                'email' => $request->email,
                'name' => $request->name ?? explode('@', $request->email)[0],
                // We don't need a password for Firebase users, but Laravel User model usually requires it.
                // We'll set a random one if it's a new user.
                'password' => Hash::make(Str::random(24)),
                'role' => 'customer',
            ]
        );

        return response()->json([
            'message' => 'User synced successfully',
            'user' => $user
        ], 200);
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'firebase_uid' => 'required|string',
            'avatar' => 'required|image|max:5120',
        ]);

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $filename = $request->firebase_uid . '_' . time() . '.' . $file->getClientOriginalExtension();
            // Store the file in storage/app/public/avatars
            $path = $file->storeAs('avatars', $filename, 'public');

            return response()->json([
                'message' => 'Avatar uploaded successfully',
                'url' => '/storage/' . $path,
            ], 200);
        }

        return response()->json(['message' => 'No image provided'], 400);
    }
}
