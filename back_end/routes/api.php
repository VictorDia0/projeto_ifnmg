<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'users'], function(){
    Route::get('/', [UserController::class,'index']);
    Route::post('/', [UserController::class,'store']);
    Route::get('/{id}', [UserController::class,'show']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
});
