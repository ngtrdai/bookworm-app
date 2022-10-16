<?php
namespace App\Repositories;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use App\Repositories\BaseRepository;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;


class BookRepository implements BaseRepository
{
    public function getAll(){
        return new BookCollection(Book::all());
    }

    public function getById(BookRequest $request){
        return new BookResource(Book::find($request -> id));
    }

    public function getOnSale(){
        $listBooks = Book::select('book.*')
            -> leftjoin('discount as d', 'book.id', '=', 'd.book_id')
            -> where('d.discount_start_date', '<=', now())
            -> where(function($query){
                $query -> where('d.discount_end_date', '>=', now())
                    -> orWhereNull('d.discount_end_date');
            })
            -> get();
        return new BookCollection($listBooks);
    }
}