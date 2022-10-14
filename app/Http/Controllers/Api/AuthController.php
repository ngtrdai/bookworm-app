<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\AuthRequest;

class AuthController extends Controller
{
    public function signup(AuthRequest $request)
    {
        return $request -> all();
    }

    public function signin(AuthRequest $request)
    {
        return $request -> all();
    }
}
