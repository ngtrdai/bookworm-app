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
        return BookCollection::where('sale_price', '>', 0)->get();
    }

    public function getFinalPrice(BookRequest $request){
        $book = Book::find($request -> id);
        if($book -> sale_price > 0){
            return $book -> sale_price;
        }
        return $book -> price;
    }
}