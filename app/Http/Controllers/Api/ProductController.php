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

    public function show($id)
    {
        $validate = $this->productRepository->validateIDBook($id);
        if($validate){
            $bookDetail = $this->productRepository->getProductById($id);
        }
        return new DetailResource($bookDetail);
    }
}
