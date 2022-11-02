<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
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

    public function show(ProductRequest $request)
    {
        $bookDetail = $this->productRepository->getProductById($request -> id);
        return new DetailResource($bookDetail);
    }
}
