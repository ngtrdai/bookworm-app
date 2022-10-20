<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostOrderRequest extends FormRequest
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
            'items_order' => 'required|array',
            'items_order.*.book_id' => 'required|integer|exists:book,id',
            'items_order.*.quantity' => 'required|integer|min:1',
        ];
    }
}
