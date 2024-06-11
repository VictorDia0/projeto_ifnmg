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
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|unique:users,cpf',
            'phone_number' => 'required|string',
            'email' => 'required|string|email|max:191|unique:users,email',
            'user' => 'required|string|unique:users,user',
            'password' => 'required|string|min:6',
            'role' => 'required|in:ADM,ALN,NTC,ASS,EMP',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'cpf' => $request->cpf,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'user' => $request->user,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            'course' => $request->course,
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
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
            'course' => 'sometimes|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user->fill($request->all());

        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
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

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
