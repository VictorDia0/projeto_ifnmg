<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MealBookingsController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MealRequestController;

Route::group(['prefix' => 'users'], function(){
    Route::get('/', [UserController::class,'index']);
    Route::post('/', [UserController::class,'store']);
    Route::get('/{id}', [UserController::class,'show']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
});

Route::group(['prefix' => 'mealbookings'], function(){
    Route::get('/', [MealBookingsController::class,'index']);
    Route::post('/', [MealBookingsController::class,'store']);
    Route::get('/{id}', [MealBookingsController::class,'show']);
    Route::put('/{id}', [MealBookingsController::class, 'update']);
    Route::delete('/{id}', [MealBookingsController::class, 'destroy']);
});

Route::group(['prefix' => 'meal'], function(){
    Route::get('/', [MealController::class,'index']);
    Route::post('/', [MealController::class,'store']);
    Route::get('/{id}', [MealController::class,'show']);
    Route::put('/{id}', [MealController::class, 'update']);
    Route::delete('/{id}', [MealController::class, 'destroy']);
});

Route::group(['prefix' => 'mealrequests'], function(){
    Route::get('/', [MealRequestController::class, 'index']);
    Route::post('/', [MealRequestController::class, 'store']);
    Route::get('/{id}', [MealRequestController::class, 'show']);
    Route::put('/{id}', [MealRequestController::class, 'update']);
    Route::delete('/{id}', [MealRequestController::class, 'destroy']);
});


Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
