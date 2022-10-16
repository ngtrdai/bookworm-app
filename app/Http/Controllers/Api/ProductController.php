<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\BookRepository;

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
