<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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


}
