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
            'items_order.*.quantity' => 'required|integer|min:1|max:'.env('MAX_NUMBER_OF_ITEMS_ORDER'),
        ];
    }

    public function failedValidation($validator)
    {
        $errors = $validator->errors();
        $newErrors = [];
        foreach ($errors->get('items_order.*.book_id') as $error) {
            $newErrors['book_id'][] = $error;
        }
        $newErrors['quantity'] = $errors->get('items_order.*.quantity');

        $response = response()->json([
            'message' => 'The given data was invalid.',
            'errors' => $newErrors,
        ], 422);
        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }

    public function messages()
    {
        return [
            'items_order.*.book_id.required' => 'Required: :index',
            'items_order.*.book_id.integer' => 'Integer: :index',
            'items_order.*.book_id.exists' => 'Exists: :input',
            'items_order.*.quantity.required' => 'Required: :index',
            'items_order.*.quantity.integer' => 'Integer: :index',
            'items_order.*.quantity.min' => 'Min: :index',
            'items_order.*.quantity.max' => 'Max: :index',
        ];
    }


}
