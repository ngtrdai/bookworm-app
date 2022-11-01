<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
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
        if(Request() -> routeIs('auth.signup')){
            return [
                'first_name' => 'required|string|max:50',
                'last_name' => 'required|string|max:50',
                'email' => 'required|email|unique:user|max:70',
                'password' => 'required|string|min:6|max:50',
            ];
        }
        elseif(Request() -> routeIs('auth.signin')){
            return [
                'email' => 'required|email|exists:user,email',
                'password' => 'required|string|min:6'
            ];
        }
    }

    public function messages()
    {
        if(Request() -> routeIs('auth.signup')){
            return [
                'first_name.required' => 'First name is required',
                'first_name.string' => 'First name must be a string',
                'first_name.max' => 'First name must be less than 50 characters',
                'last_name.required' => 'Last name is required',
                'last_name.string' => 'Last name must be a string',
                'last_name.max' => 'Last name must be less than 50 characters',
                'email.required' => 'Email is required',
                'email.email' => 'Email must be a valid email',
                'email.unique' => 'Email already exists',
                'email.max' => 'Email must be less than 70 characters',
                'password.required' => 'Password is required',
                'password.string' => 'Password must be a string',
                'password.min' => 'Password must be at least 6 characters',
                'password.max' => 'Password must be less than 50 characters',
            ];
        }
        elseif(Request() -> routeIs('auth.signin')){
            return [
                'email.required' => 'Email is required',
                'email.email' => 'Email must be a valid email',
                'password.required' => 'Password is required',
                'password.string' => 'Password must be a string',
                'password.min' => 'Password must be at least 6 characters',
            ];
        }
    }
}
