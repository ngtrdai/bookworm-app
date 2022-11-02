<?php
namespace App\Repositories;

use App\Http\Requests\FilterRequest;
use App\Models\Book;

class ShopRepository
{
    public function filterQueryParams(FilterRequest $request){
        $category = $request->category;
        $author = $request->author;
        $rating = $request->rating;
        $noItems = $request->no_items !== null ? $request->no_items : env('DEFAULT_NO_OF_ITEMS');
        $sortBy = $request->sort_by !== null ? $request->sort_by : env('DEFAUT_SORT_BY');
        return [$category, $author, $rating, $sortBy, $noItems];
    }

    public function filterProducts($category, $author, $rating , $sortBy, $noItems){
        // Filtering
        $books = Book::leftjoin('review', 'book.id', '=', 'review.book_id')
                    -> leftjoin('discount', 'book.id', '=', 'discount.book_id')
                    -> select('book.*')
                    -> selectRaw('count(review.id) as no_of_reviews')
                    -> selectRaw('avg(review.rating_start) as avg_rating')
                    -> selectRaw('case
                                    when now() >= discount.discount_start_date
                                    and (now() <= discount.discount_end_date
                                    or discount.discount_end_date is null) then book.book_price - discount.discount_price 
                                    else 0
                                end as sub_price')
                    -> selectRaw('case
                                    when now() >= discount.discount_start_date
                                    and (now() <= discount.discount_end_date
                                    or discount.discount_end_date is null) then discount.discount_price 
                                    else book.book_price
                                end as final_price')
                    -> groupBy('book.id', 'discount.discount_price', 'discount.discount_start_date', 'discount.discount_end_date')
                    -> when($category !== null, function($query) use ($category){
                        return $query->where('book.category_id', $category);
                    })
                    -> when($author !== null, function($query) use ($author){
                        return $query->where('book.author_id', $author);
                    })
                    -> when($rating !== null, function($query) use ($rating){
                        return $query->havingRaw('avg(review.rating_start) >= ?', [$rating]);
                    });
        // Sorting and Pagination
        $books = $this -> sortBy($books, $sortBy) -> paginate($noItems);
        return $books;
    }

    private const SORT_BY_SALE = 'sale';
    private const SORT_BY_POPULAR = 'popular';
    private const SORT_BY_PRICE_ASC = 'price-asc';
    private const SORT_BY_PRICE_DESC = 'price-desc';
    public function sortBy($bookTable, $sortBy){
        switch($sortBy){
            case Self::SORT_BY_SALE:
                $bookTable = $bookTable -> orderBy('sub_price', 'desc')
                                        -> orderBy('final_price', 'asc');
                break;
            case Self::SORT_BY_POPULAR:
                $bookTable = $bookTable -> orderBy('no_of_reviews', 'desc')
                                        -> orderBy('final_price', 'asc');
                break;
            case Self::SORT_BY_PRICE_ASC:
                $bookTable = $bookTable -> orderBy('final_price', 'asc');
                break;
            case Self::SORT_BY_PRICE_DESC:
                $bookTable = $bookTable -> orderBy('final_price', 'desc');
                break;
            default:
                break;
        }
        return $bookTable;
    }
}