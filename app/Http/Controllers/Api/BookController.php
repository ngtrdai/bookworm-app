<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookRequest;
use Illuminate\Http\Request;

use App\Repositories\BookRepository;

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

    public function getBook(Request $request, $id)
    {
        return $request -> all();
        // $book = $this->bookRepository->getById($request);
        // return response()->json($book);
    }
}
