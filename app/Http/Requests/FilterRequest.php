<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'category' => 'nullable|integer|exists:category,id',
            'author' => 'nullable|integer|exists:author,id',
            'rating' => 'nullable|numeric|min:1|max:5',
            'sort_by' => 'nullable|string|in:' . env('SORT_BY_ARRAY'),
            'no_items' => 'nullable|integer',
        ];
    }

    public function messages(){
        return [
            'category.exists' => 'Category does not exist',
            'author.exists' => 'Author does not exist',
            'rating.min' => 'Rating must be between 1 and 5',
            'rating.max' => 'Rating must be between 1 and 5',
            'sort_by.in' => 'Sort by must be one of the following: ' . env('SORT_BY_ARRAY'),
            'no_items.integer' => 'Number of items must be an integer',
        ];
    }
}
