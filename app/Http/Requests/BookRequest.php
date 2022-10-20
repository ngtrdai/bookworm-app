<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
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
            'id' => 'nullable|required|integer',
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
