<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\FilterReviewsRequest;
use App\Http\Requests\PostReviewRequest;
use App\Http\Requests\PostReviewsRequest;
use App\Repositories\ProductRepository;

class ReviewController extends Controller
{

    private ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function index(FilterReviewsRequest $request, $id)
    {
        $validateStatus = $this -> productRepository -> validateIDBook($id);
        if($validateStatus){
            $queryParamsArr = $this -> productRepository -> filterQueryParamsForLoadReviews($request);
            $reviews = $this -> productRepository -> filterReviews($id, ...$queryParamsArr);
        }
        return $reviews;
    }

    public function store(PostReviewRequest $request, $id)
    {
        $validateStatus = $this -> productRepository -> validateIDBook($id);
        if($validateStatus){
            $paramsFiltered = $this -> productRepository -> filterParamsForCreateReview($request);
            $review = $this -> productRepository -> createReview($id, ...$paramsFiltered);
        }
        return $review;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
