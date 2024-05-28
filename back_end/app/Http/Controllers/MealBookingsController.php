<?php

namespace App\Http\Controllers;

use App\Models\MealBookings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MealBookingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $meal_bookings = MealBookings::all();
        return response()->json($meal_bookings);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'meal_id' => 'required|exists:meals,id',
            'meal_date' =>  'required|date'
        ]);

        if($validator -> fails()){
            return response()->json($validator->errors(), 422);
        }

        $meal_bookings = MealBookings::create([
            'user_id' => $request->user_id,
            'meal_id' => $request->meal_id,
            'meal_date' => $request->meal_date,
        ]);

        return response()->json(['message' => 'Meal Bookings created successfully', 'meal_bookings' => $meal_bookings], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $meal_bookings = MealBookings::find($id);

        if(!$meal_bookings){
            return response()->json(['message' => 'Meal bookings not found'], 404);
        }
        return response()->json($meal_bookings);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
