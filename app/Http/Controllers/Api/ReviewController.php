<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\FilterReviewsRequest;
use App\Http\Requests\PostReviewRequest;
use App\Repositories\ProductRepository;
use App\Http\Resources\ReviewCollection;

class ReviewController extends Controller
{

    private ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function index(FilterReviewsRequest $request)
    {
        $queryParamsArr = $this -> productRepository -> filterQueryParamsForLoadReviews($request);
        $reviews = $this -> productRepository -> filterReviews(...$queryParamsArr);
        return response()->json($reviews, 200);
    }

    public function store(PostReviewRequest $request)
    {
        $paramsFiltered = $this -> productRepository -> filterParamsForCreateReview($request);
        $review = $this -> productRepository -> createReview(...$paramsFiltered);
        return response()->json($review, 200);
    }
}
