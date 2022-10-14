<?php
namespace App\Repositories;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use App\Repositories\BaseRepository;
use App\Http\Resources\BookCollection;


class BookRepository implements BaseRepository
{
    public function getAll(){
        return new BookCollection(Book::all());
    }
}