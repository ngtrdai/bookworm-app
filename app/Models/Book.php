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
        return Book::select(Book::raw('
                case
                    when now() >= d.discount_start_date
                    and (now() <= d.discount_end_date
                    or d.discount_end_date is null) then d.discount_price
                    else b.book_price
                end as final_price'))
            -> from('book as b') 
            -> leftjoin('discount as d', 'b.id', '=', 'd.book_id') 
            -> where('b.id', $id) -> first()->final_price;
    }
}
