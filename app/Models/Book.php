<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';

    public function author()
    {
        // Liên kết one-one giữa bảng book và bảng author
        return $this->belongsTo(Author::class);
    }

    public function category()
    {
        // Liên kết one-one giữa bảng book và bảng category
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        // Liên kết one-many giữa bảng book và bảng review
        return $this->hasMany(Review::class);
    }

    public static function finalPrice($id)
    {
        $finalPrice = Book::leftjoin('discount', 'book.id', '=', 'discount.book_id')
                        ->  selectRaw('case
                                            when now() >= discount.discount_start_date
                                            and (now() <= discount.discount_end_date
                                            or discount.discount_end_date is null) then discount.discount_price 
                                            else book.book_price
                                        end as final_price')
                        ->  where('book.id', $id) -> first()->final_price;
        return $finalPrice;
    }
}
