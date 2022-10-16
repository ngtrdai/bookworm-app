<?php
namespace App\Repositories;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use App\Repositories\BaseRepository;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;


class ProductRepository implements BaseRepository
{
    public function getOnSale(){
        return BookCollection::where('sale_price', '>', 0)->get();
    }

    public function getAll(){
        //
    }
}