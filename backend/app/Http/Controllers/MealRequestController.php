<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MealRequest;
use App\Models\User;
use App\Models\Meal;
use Illuminate\Support\Facades\Validator;

class MealRequestController extends Controller
{
    /**
     * Display a listing of the meal requests.
     */
    public function index()
    {
        $mealRequests = MealRequest::with(['user', 'meal'])->get();
        return response()->json($mealRequests);
    }

    /**
     * Store a newly created meal request in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'meal_id' => 'required|exists:meals,id',
            'request_date' => 'required|date',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $mealRequest = MealRequest::create($request->all());

        return response()->json($mealRequest, 201);
    }

    /**
     * Display the specified meal request.
     */
    public function show($id)
    {
        $mealRequest = MealRequest::with(['user', 'meal'])->find($id);

        if (is_null($mealRequest)) {
            return response()->json(['message' => 'Meal request not found'], 404);
        }

        return response()->json($mealRequest);
    }

    /**
     * Update the specified meal request in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,approved,rejected',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $mealRequest = MealRequest::find($id);

        if (is_null($mealRequest)) {
            return response()->json(['message' => 'Meal request not found'], 404);
        }

        $mealRequest->update($request->all());

        return response()->json($mealRequest);
    }

    /**
     * Remove the specified meal request from storage.
     */
    public function destroy($id)
    {
        $mealRequest = MealRequest::find($id);

        if (is_null($mealRequest)) {
            return response()->json(['message' => 'Meal request not found'], 404);
        }

        $mealRequest->delete();

        return response()->json(['message' => 'Meal request deleted successfully']);
    }
}
