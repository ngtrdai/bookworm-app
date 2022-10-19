<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Include Controller
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ShopController;
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
    // Route for API get list books
    Route::get('/', [BookController::class, 'getListBooks']) -> name('getListBooks');
    // Route for API get book by id
    Route::get('/{id}', [BookController::class, 'getBook']) -> name('getBook');
    // Route for API get list products on sale
    Route::get('onsale', [BookController::class, 'getOnSale']) -> name('getOnSale');
    // Route for API get list featured of products
    Route::prefix('featured') -> name('featured.') -> group(function(){
        // Route for API get list popular products
        Route::get('popular', [BookController::class, 'getPopular']) -> name('getPopular');
        // Route for API get list recommended products
        Route::get('recommended', [BookController::class, 'getRecommended']) -> name('getRecommended');
    });
});



// // Routes for shop
// Route::prefix('shop') -> name('shop.') -> group(function(){
//     // Route for API get list products
//     Route::get('{category?}{author?}{rating?}{sort_by?}{no_items?}', [ShopController::class, 'getListProducts']) -> name('getListProducts');
//     // Routes for products
//     Route::prefix('products') -> name('products') -> group(function(){
        
//     });
// });

Route::apiResource('shop', ShopController::class);