<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Book;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'author_name' => $this->author->author_name,
            'book_price' => $this->book_price,
            'book_title' => $this->book_title,
            'book_cover_photo' => $this->book_cover_photo,
            'book_category_name' => $this -> category -> category_name,
            'final_price' => Book::finalPrice($this -> id)
        ];
    }
}
