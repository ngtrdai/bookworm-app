<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ProductRepository;
use App\Http\Resources\DetailResource;

class ProductController extends Controller
{

    private ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function show(Request $request)
    {
        $validate = $this->productRepository->validateIDBook($request -> id);
        if($validate){
            $bookDetail = $this->productRepository->getProductById($request -> id);
        }
        return response()->json(new DetailResource($bookDetail), 200);
    }
}
