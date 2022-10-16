<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\BookRepository;

class ProductController extends Controller
{
    public function getOnSale(){
        $products = BookRepository::getOnSale();
        return response()->json($products);
    }
}
