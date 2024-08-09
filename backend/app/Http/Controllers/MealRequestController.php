<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MealRequest;
use App\Models\User;
use App\Models\Meal;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

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
     * Confirm the meal request by the user.
     */
    public function confirm($id)
    {
        $mealRequest = MealRequest::find($id);

        if (is_null($mealRequest)) {
            return response()->json(['message' => 'Meal request not found'], 404);
        }

        $confirmationDeadline = Carbon::now()->subDay()->hour(11)->minute(0)->second(0);
        $currentTime = Carbon::now();

        if ($currentTime->lte($confirmationDeadline)) {
            $mealRequest->status = 'confirmed';
            $mealRequest->save();

            return response()->json(['message' => 'Meal request confirmed successfully']);
        } else {
            return response()->json(['message' => 'Confirmation deadline has passed'], 400);
        }
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

    /**
     * Schedule meals for all scholarship students.
     */
    public function schedule(){
    // {
    //     \Log::info('Request received for scheduling meals', $request->all());

    //     $validator = Validator::make($request->all(), [
    //         'meal_id' => 'required|exists:meals,id',
    //         'request_date' => 'required|date',
    //         'quantity' => 'required|integer|min:1',
    //     ]);

    //     if ($validator->fails()) {
    //         \Log::error('Validation errors', $validator->errors()->toArray());
    //         return response()->json($validator->errors(), 400);
    //     }

    //     $bolsistas = User::where('bolsista', true)
    //         ->where('role', 'ALN')
    //         ->get();

    //     \Log::info('Bolsistas found', $bolsistas->toArray());

    //     foreach ($bolsistas as $bolsista) {
    //         $existingRequest = MealRequest::where('user_id', $bolsista->id)
    //             ->where('meal_id', $request->meal_id)
    //             ->where('request_date', $request->request_date)
    //             ->first();

    //         if (!$existingRequest) {
    //             \Log::info('Creating request for User ID: ' . $bolsista->id);
    //             MealRequest::create([
    //                 'user_id' => $bolsista->id,
    //                 'meal_id' => $request->meal_id,
    //                 'request_date' => $request->request_date,
    //                 'quantity' => $request->quantity,
    //             ]);
    //         }
    //     }

        return response()->json(['message' => 'Funcionando'], 201);
    }
}
