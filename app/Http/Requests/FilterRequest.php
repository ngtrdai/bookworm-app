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

    public function failedValidation($validator)
    {
        $response = response()->json([
            'status' => 'error',
            'message' => $validator->errors()->first(),
        ], 422);
        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }
}
