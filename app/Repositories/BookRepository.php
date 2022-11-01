<?php
namespace App\Repositories;

use App\Models\Book;

class BookRepository
{

    /**
     * Get all books
     */
    public function getAll(){
        return Book::all();
    }

    /* 
     * Get top env('LIMIT_NO_OF_ITEMS_ON_SALE') books with the most discount which is calculating by this formula:
     * final_price = book_price@books table – discount_price@discounts table
     */
    public function getOnSale(){
        $books = Book::select('book.*', 'discount.discount_price')
                    -> groupBy('book.id')
                    -> orderBy('sub_price', 'desc')
                    -> limit(env('LIMIT_NO_OF_ITEMS_ON_SALE'));
        $books = $this -> getSubPrice($books)-> get();
        return $books;
    }

    /*
     * Get top env('LIMIT_NO_OF_ITEMS_POPULAR') books with most reviews - total number review of a book and lowest final price
     */
    public function getPopular(){
        $books = Book::leftjoin('review', 'book.id', '=', 'review.book_id')
                    -> select('book.*')
                    -> selectRaw('count(review.id) as total_review')
                    -> groupBy('book.id')
                    -> orderBy('total_review', 'desc')
                    -> orderBy('final_price', 'asc')
                    -> limit(env('LIMIT_NO_OF_ITEMS_POPULAR'));
        $books = $this -> getFinalPrice($books) -> get();
        return $books;
    }
    
    /*
     * Get top 8 books with most rating stars – check the average number of rating star and lowest final price.
     */
    public function getRecommended(){
        $books = Book::leftjoin('review', 'book.id', '=', 'review.book_id')
                    -> select('book.*')
                    -> selectRaw('coalesce(avg(review.rating_start), 0.0) as avg_rating_star')
                    -> groupBy('book.id')
                    -> orderBy('avg_rating_star', 'desc')
                    -> orderBy('final_price', 'asc')
                    -> limit(env('LIMIT_NO_OF_ITEMS_RECOMMENDED'));
        $books = $this -> getFinalPrice($books) -> get();
        return $books;
    }

    /*
    *   Get final price of books.
    *   If book is on sale, final price = discount price
    *   If book is not on sale, final price = book price
    */
    public function getFinalPrice($query){
        return $query -> leftjoin('discount', 'book.id', '=', 'discount.book_id')
                      -> selectRaw('case
                                    when now() >= discount.discount_start_date 
                                    and (now() <= discount.discount_end_date or discount.discount_end_date is null) 
                                    then discount.discount_price
                                    else book.book_price
                                end as final_price')
                      -> groupBy('discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price');
    }

    public function getSubPrice($query){
        return $query -> leftjoin('discount', 'book.id', '=', 'discount.book_id')
                      -> selectRaw('case
                                    when now() >= discount.discount_start_date 
                                    and (now() <= discount.discount_end_date or discount.discount_end_date is null) 
                                    then book.book_price - discount.discount_price
                                    else 0
                                end as sub_price')
                      -> groupBy('discount.discount_start_date', 'discount.discount_end_date', 'discount.discount_price');
    }
}