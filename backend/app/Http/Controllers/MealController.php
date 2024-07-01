<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class MealController extends Controller
{
    public function index()
    {
        $meal = Meal::all();
        return response()->json($meal);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'ingredients' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $meal = Meal::create([
            'name' => $request->name,
            'ingredients' => $request->ingredients
        ]);

        return response()->json(['message' => 'Meal created successfully', 'meal' => $meal], 201);
    }

    public function show(string $id)
    {
        $meal = Meal::find($id);

        if (!$meal) {
            return response()->json(['message' => 'Meal not found'], 404);
        }

        return response()->json($meal);
    }

    public function update(Request $request, string $id)
    {
        $meal = Meal::find($id);

        if (!$meal) {
            return response()->json(['message' => 'Meal not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'ingredients' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $meal->fill($request->all());
        $meal->save();

        return response()->json(['message' => 'Meal updated successfully', 'meal' => $meal]);
    }

    public function destroy(string $id)
    {
        $meal = Meal::find($id);

        if (!$meal) {
            return response()->json(['message' => 'Meal not found'], 404);
        }

        $meal->delete();
        return response()->json(['message' => 'Meal deleted successfully']);
    }

    // New methods for getting today's and tomorrow's meals
    public function getTodayMeal()
    {
        $today = Carbon::today()->toDateString();
        $meal = Meal::whereDate('created_at', $today)->first();

        if (!$meal) {
            return response()->json(['message' => 'No meal found for today'], 404);
        }

        return response()->json($meal);
    }

    public function getTomorrowMeal()
    {
        $tomorrow = Carbon::tomorrow()->toDateString();
        $meal = Meal::whereDate('created_at', $tomorrow)->first();

        if (!$meal) {
            return response()->json(['message' => 'No meal found for tomorrow'], 404);
        }

        return response()->json($meal);
    }
}
