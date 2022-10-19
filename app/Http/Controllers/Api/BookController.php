<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\BookRepository;

/**
 * @OA\Info(
 *     title="Bookworm API Documentation",
 *     version="1.0",
 *      @OA\Contact(
 *          email="ngtrdai@hotmail.com"
 *      ),
 * )
 * @OA\Get(
 *      path="/api/books",
 *      operationId="getBooksList",
 *      tags={"Books"},
 *      summary="Get list of books",
 *      description="Returns list of books",
 *      @OA\Response(
 *          response=200,
 *          description="Successful operation"
 *       )
 *)
 * @OA\Get(
 *      path="/api/books/{id}",
 *      operationId="getBookById",
 *      tags={"Books"},
 *      summary="Get info book by id",
 *      description="Returns info book by id",
 *      @OA\Parameter(
 *         in="path",
 *         name="id",
 *         description="Book id",
 *         required=true,
 *         @OA\Schema(
 *           type="integer"
 *         )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Successful operation"
 *       )
 *    )
  * @OA\Get(
 *      path="/api/books/onsale",
 *      operationId="getOnSale",
 *      tags={"Books"},
 *      summary="Get list of books on sale",
 *      description="Returns list of books on sale",
 *      @OA\Response(
 *          response=200,
 *          description="Successful operation"
 *       )
 *)
 * @OA\Get(
 *      path="/api/books/featured/popular",
 *      operationId="getProductPopular",
 *      tags={"Books"},
 *      summary="Get list of popular books",
 *      description="Returns list of popular books",
 *      @OA\Response(
 *          response=200,
 *          description="Successful operation"
 *       )
 *    )
 * @OA\Get(
 *      path="/api/books/featured/recommended",
 *      operationId="getProductRecommended",
 *      tags={"Books"},
 *      summary="Get list of recommended books",
 *      description="Returns list of recommended books",
 *      @OA\Response(
 *          response=200,
 *          description="Successful operation"
 *       )
 *    )
 */

class BookController extends Controller
{
    private BookRepository $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function getListBooks()
    {
        $books = $this->bookRepository->getAll();
        return response()->json($books);
    }

    public function getBook(Request $request)
    {
        $book = $this->bookRepository->getById($request->id);
        return response()->json($book);
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
