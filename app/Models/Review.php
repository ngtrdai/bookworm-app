<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'review';

    protected $fillable = [
        'book_id',
        'review_title',
        'review_details',
        'rating_start',
        'review_date'
    ];

    public function book()
    {
        // Liên kết one-one giữa bảng review và bảng book
        return $this->belongsTo(Book::class);
    }

    public static function avgRatingStar($bookId){
        $avgRating = Review::selectRaw('avg(rating_start) as avg_rating')
                        ->  where('book_id', $bookId) -> first()->avg_rating;
        return $avgRating;
    }

    public static function countStars($bookId, $sortBy = 'rating_start', $sort = 'desc'){
        // Đếm số lượng của mỗi sao từ 1 đến 5
        $countStars = Review::selectRaw('rating_start, count(rating_start) as count_rating_start')
                        ->  where('book_id', $bookId)
                        ->  groupBy('rating_start')
                        ->  orderBy($sortBy, $sort)
                        ->  get();
        return $countStars;
    }
}
