<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Include Controller
use App\Http\Controllers\Api\AuthController;

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
    Route::post('signup', [AuthController::class, 'signup']) -> name('signup');         // API Handle Signup
    Route::post('signin', [AuthController::class, 'signin']) -> name('signin');         // API Handle Signin
    Route::post('signout', [AuthController::class, 'signout']) -> name('signout')->middleware('auth:sanctum');      // API Handle Signout
});
