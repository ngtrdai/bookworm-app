<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\BookRepository;

/**
 * @OA\Get(
 *      path="/api/products/onsale",
 *      operationId="getOnSale",
 *      tags={"Products"},
 *      summary="Get list of books on sale",
 *      description="Returns list of books on sale",
 *      @OA\Response(
 *          response=200,
 *          description="Successful operation"
 *       )
 *)
 * @OA\Get(
 *      path="/api/products/features/popular",
 *      operationId="getProductPopular",
 *      tags={"Products"},
 *      summary="Get list of popular products",
 *      description="Returns list of popular products",
 *      @OA\Response(
 *          response=200,
 *          description="Successful operation"
 *       )
 *    )
 */

class ProductController extends Controller
{
    private BookRepository $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function getOnSale(){
        $books = $this->bookRepository->getOnSale();
        return response()->json($books);
    }

    public function getPopular(){
        $books = $this->bookRepository->getPopular();
        return response()->json($books);
    }

    public function getRecommended(){
        $books = $this->bookRepository->getRecommended();
        return response()->json($books);
    }
}
