<?php
namespace App\Repositories;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use App\Repositories\BaseRepository;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use Illuminate\Support\Facades\DB;

class BookRepository implements BaseRepository
{
    public function getAll(){
        return new BookCollection(Book::all());
    }

    public function getById($id){
        return Book::find($id);
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

    public function getPopular(){
        /*
        select
            b.*,
            count(r.id) as total_review,
            case
                when now() >= d.discount_start_date
                and (now() <= d.discount_end_date
                or d.discount_end_date is null) then d.discount_price
                else b.book_price
            end as final_price
        from
            book as b
        left join review as r on
            b.id = r.book_id
        left join discount as d on
            b.id = d.book_id 
        group by
            b.id, d.discount_start_date , d.discount_end_date , d.discount_price 
        order by
            "total_review" desc, "final_price" asc
        limit 8
        */
        $listBooks = Book::select(
                        'book.*', 
                        DB::raw('count(review.id) as total_review'), 
                        DB::raw('case
                                    when now() >= discount.discount_start_date 
                                    and (now() <= discount.discount_end_date or discount.discount_end_date is null) 
                                    then discount.discount_price
                                    else book.book_price
                                end as final_price'))
            -> leftjoin('review', 'book.id', '=', 'review.book_id')
            -> leftjoin('discount', 'book.id', '=', 'discount.book_id')
            -> groupBy('book.id', 'discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price')
            -> orderBy('total_review', 'desc')
            -> orderBy('final_price', 'asc')
            -> limit(8)
            -> get();
        return new BookCollection($listBooks);
    }

    public function getRecommended(){
        $listBooks = Book::select(
                        'book.*', 
                        DB::raw('case when avg(review.rating_start) is null then 0 else avg(review.rating_start) end as avg_rating_star'), 
                        DB::raw('case
                                    when now() >= discount.discount_start_date and (now() <=discount.discount_end_date or discount.discount_end_date is null) then discount.discount_price
                                    else book.book_price
                                end as final_price'))
            -> leftjoin('review', 'book.id', '=', 'review.book_id')
            -> leftjoin('discount', 'book.id', '=', 'discount.book_id')
            -> groupBy('book.id', 'discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price')
            -> orderBy('avg_rating_star', 'desc')
            -> orderBy('final_price', 'asc')
            -> limit(8)
            -> get();
        return new BookCollection($listBooks);
    }
}