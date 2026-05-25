<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TravelDetailController;
use App\Http\Controllers\PackageDealController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public viewing routes
Route::get('/travels', [TravelDetailController::class, 'index']);
Route::get('/travels/{id}', [TravelDetailController::class, 'show']);
Route::get('/packages', [PackageDealController::class, 'index']);
Route::get('/packages/{id}', [PackageDealController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Admin only routes (you can add middleware if needed)
    Route::apiResource('travels', TravelDetailController::class)->except(['index', 'show']);
    Route::apiResource('packages', PackageDealController::class)->except(['index', 'show']);

    // Cart routes
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'addToCart']);
    Route::put('/cart/{id}', [CartController::class, 'updateQuantity']);
    Route::delete('/cart/{id}', [CartController::class, 'removeFromCart']);
    Route::delete('/cart', [CartController::class, 'clearCart']);

    // Order routes
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});