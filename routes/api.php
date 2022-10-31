<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Include Controller
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\ShopController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\OrderController;

use App\Http\Requests\ProductRequest;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// Routes for signin and signup
Route::prefix('auth') -> name('auth.') -> group(function(){
    // Route for API signup
    Route::post('signup', [AuthController::class, 'signup']) -> name('signup');
    // Route for API signin
    Route::post('signin', [AuthController::class, 'signin']) -> name('signin');
    // Route for API signout
    Route::post('signout', [AuthController::class, 'signout']) -> name('signout')->middleware('auth:sanctum');
});


// Routes for books
Route::prefix('books') -> name('books.') -> group(function(){
    // Route for API get list products on sale
    Route::get('/onsale', [BookController::class, 'getOnSale']) -> name('getOnSale');
    // Route for API get list featured of products
    Route::prefix('/featured') -> name('featured.') -> group(function(){
        // Route for API get list popular products
        Route::get('/popular', [BookController::class, 'getPopular']) -> name('getPopular');
        // Route for API get list recommended products
        Route::get('/recommended', [BookController::class, 'getRecommended']) -> name('getRecommended');
        // Route for get list featured
        Route::get('/', [BookController::class, 'getFeatured']) -> name('getFeatured');
    });
    // Route for API get list books
    Route::get('/', [BookController::class, 'getListBooks']) -> name('getListBooks');
});


Route::prefix('shop') -> name('shop.') -> group(function(){
    // Route for API get list products (Filtering, Sorting, Pagination)
    Route::apiResource('/', ShopController::class)->only(['index'])
        -> missing(function (Request $request) {
            return response()->json(['message' => 'Not Found!'], 404);
    });
    // Route for API get list filtering
    Route::get('/filtering', [ShopController::class, 'getListFiltering']) -> name('getFiltering');
    // Route for API get detail product and load review of product
    Route::prefix('product') -> name('product.') -> group(function(){
        // Route for API get list review of product
        Route::apiResource('/review', ReviewController::class)->only(['index', 'store']);
        Route::get('/review/rating', [ReviewController::class, 'getRating']) -> name('getRating');
        // Route for API get detail product
        Route::get('/', [ProductController::class, 'show']);
    });
    // Route for API for order products
    Route::middleware('auth:sanctum')->apiResource('/order', OrderController::class)->only(['index', 'store']);
});