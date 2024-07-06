<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UserDetailsController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'cpf' => 'sometimes|string|unique:users,cpf,',
            'phone_number' => 'required|string',
            'email' => 'sometimes|string|email|max:191|unique:users,email,',
            'password' => 'sometimes|string|min:6',
        ]);
    }
}
