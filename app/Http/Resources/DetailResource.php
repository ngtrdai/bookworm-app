<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;



class DetailResource extends JsonResource
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
            'book_title' => $this->book_title,
            'book_author_name' => $this->author->author_name,
            'book_summary' => $this->book_summary,
            'book_cover_photo' => $this->book_cover_photo,
            'book_category_name' => $this->category->category_name,
            'book_price' => $this->book_price,
            'final_price' => $this->finalPrice($this->id)
        ];
    }
}
