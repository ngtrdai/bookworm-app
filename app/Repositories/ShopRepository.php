<?php
namespace App\Repositories;

use App\Repositories\BaseRepository;
use App\Http\Requests\FilterRequest;
use App\Http\Resources\BookCollection;
use App\Models\Book;

class ShopRepository implements BaseRepository
{
    public function getAll(){
        
    }

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
        $books = Book::with('category', 'author')
            ->when($category !== null, function($query) use ($category){
                return $query->where('category_id', $category);
            })
            ->when($author !== null, function($query) use ($author){
                return $query->where('author_id', $author);
            })
            ->when($rating !== null, function($query) use ($rating){
                return $query->join('review', 'book.id', '=', 'review.book_id')
                    ->selectRaw('book.*, AVG(review.rating_start) as avg_rating')
                    ->groupBy('book.id')
                    ->havingRaw('AVG(review.rating_start) >= ?', [$rating]);
            });
        // Sorting
        $books = $this -> sortBy($books, $sortBy);

        // Pagination
        $books = $books->paginate($noItems);
        return new BookCollection($books);
    }

    public function sortBy($bookTable, $sortBy, $sortOrder = 'desc'){
        // Sort by popular
        switch($sortBy){
            case 'popular':
                $bookTable = $bookTable->leftjoin('review', 'book.id', '=', 'review.book_id')
                    ->selectRaw('book.*, case when COUNT(review.book_id) is null then 0 else COUNT(review.book_id) end as total_review')
                    ->groupBy('book.id')
                    ->orderBy('total_review', $sortOrder);
                break;
            case 'price':
                $bookTable = $bookTable->orderBy('book_price', $sortOrder);
                break;
            case 'title':
                $bookTable = $bookTable->orderBy('book_title', $sortOrder);
                break;
            default:
                $bookTable = $bookTable->orderBy('book_title', $sortOrder);
                break;
        }
        return $bookTable;
    }
}