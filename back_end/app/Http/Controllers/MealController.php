<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
            'ingredients' =>  'required|string'
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
            return response()->json(['message' => 'Meal not found']);
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
            'ingredients' =>  'required|string'
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
}
