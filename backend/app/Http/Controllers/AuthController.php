<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User; 

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('user', 'email', 'password');

        if (
            Auth::attempt(['user' => $credentials['user'] ?? $credentials['email'], 'password' => $credentials['password']]) ||
            Auth::attempt(['email' => $credentials['email'] ?? $credentials['user'], 'password' => $credentials['password']])
        ) {
            $user = Auth::user();

            return response()->json(['message' => 'Login sucessful', 'user' => $user, 'role' => $user->role], 200);
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logout successful'], 200);
    }
}
