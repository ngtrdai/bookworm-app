<?php

namespace App\Repositories;

use App\Models\Book;
use App\Models\Review;
use Illuminate\Support\Facades\Validator;

class ProductRepository{

    public function validateIDBook($id){
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer|exists:book,id',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first(),
            ], 400);
        }
        return true;
    }

    public function getProductById($id){
        $bookDetail = Book::find($id);
        return $bookDetail;
    }

    public function filterQueryParamsForLoadReviews($request){
        $bookId = $request->book_id;
        $rating = $request->rating;
        $noItems = $request->no_items !== null ? $request->no_items : env('DEFAULT_NO_OF_ITEMS_FOR_REVIEWS');
        $sortBy = $request->sort_by !== null ? $request->sort_by : env('DEFAUT_SORT_BY_FOR_REVIEWS');
        return [$bookId, $rating, $sortBy, $noItems];
    }

    public function filterReviews($id, $rating, $sortBy, $noItems){
        $reviews = Review::where('book_id', $id)
                        -> when($rating !== null, function($query) use ($rating){
                            return $query->where('rating_start', $rating);
                        });
        $reviews = $this -> sortByForReview($reviews, $sortBy) -> paginate($noItems);
        return $reviews;
    }

    public function sortByForReview($reviewTable, $sortBy){
        // Sort by popular
        switch($sortBy){
            case 'newest':
                $reviewTable = $reviewTable -> orderBy('review_date', 'desc');
                break;
            case 'oldest':
                $reviewTable = $reviewTable -> orderBy('review_date', 'asc');
                break;
            default:
                break;
        }
        return $reviewTable;
    }

    public function filterParamsForCreateReview($request){
        $bookId = $request->book_id;
        $title = $request->title;
        $detail = $request->detail;
        $rating = $request->rating;
        $reviewDate = date('Y-m-d H:i:s');
        return [$bookId, $title, $detail, $rating, $reviewDate];
    }

    public function createReview($bookId, $title, $detail, $rating, $reviewDate){
        $review = Review::create([
            'book_id' => $bookId,
            'review_title' => $title,
            'review_details' => $detail,
            'rating_start' => $rating,
            'review_date' => $reviewDate,
        ]);
        return $review;
    }

    public function getRatingAvg($id){
        $ratingAvg = Review::where('book_id', $id) -> avg('rating_start');
        return $ratingAvg;
    }

    public function getCountStars($bookId){
        // If star not rated, set count = 0 and sort by rating_start
        
        $countStars = Review::selectRaw('rating_start, count(rating_start) as count_rating_start')
                        ->  where('book_id', $bookId)
                        ->  groupBy('rating_start')
                        ->  orderBy('rating_start', 'desc')
                        ->  get();

        for($i = 5; $i >= 1; $i--){
            $isExist = false;
            foreach($countStars as $countStar){
                if($countStar -> rating_start == $i){
                    $isExist = true;
                    break;
                }
            }
            if(!$isExist){
                $countStars -> push((object) ['rating_start' => $i, 'count_rating_start' => 0]);
            }
        }
        return $countStars;
    }
}