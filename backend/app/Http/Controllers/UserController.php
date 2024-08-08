<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         // Converter o valor de bolsista para um booleano
        $request->merge([
            'bolsista' => filter_var($request->input('bolsista'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE)
        ]);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'user' => 'required|string|unique:users,user',
            'password' => 'required|string|min:6',
            'role' => 'required|in:ADM,ALN,NTC,ASS,EMP',
            'cpf' => 'nullable|string|unique:users,cpf',
            'phone_number' => 'nullable|string',
            'email' => 'nullable|string|email|max:191|unique:users,email',
            'bolsista' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'user' => $request->user,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'cpf' => $request->cpf,
                'phone_number' => $request->phone_number,
                'email' => $request->email,
                'bolsista' => $request->bolsista ?? false,
            ]);

            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create user'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
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
            'name' => 'sometimes|string|max:255',
            'cpf' => 'sometimes|string|unique:users,cpf,' . $user->id,
            'phone_number' => 'sometimes|string',
            'email' => 'sometimes|string|email|max:191|unique:users,email,' . $user->id,
            'user' => 'sometimes|string|unique:users,user,' . $user->id,
            'password' => 'sometimes|string|min:6',
            'role' => 'sometimes|in:ADM,ALN,NTC,ASS,EMP',
            'bolsista' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $user->fill($request->all());

            if ($request->has('password')) {
                $user->password = Hash::make($request->password);
            }

            $user->save();

            return response()->json(['message' => 'User updated successfully', 'user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update user'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        try {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete user'], 500);
        }
    }
}
