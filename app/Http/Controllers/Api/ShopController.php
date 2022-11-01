<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FilterRequest;
use App\Repositories\ShopRepository;
use App\Http\Resources\BookCollection;
use App\Http\Resources\FilterResource;
use Illuminate\Http\Request;
/**
 * @OA\Get(
 *      path="/api/shop",
 *      operationId="getListShopByFilteringAndSorting",
 *      tags={"Shop"},
 *      summary="Get list/filter/sort of products",
 *      description="Returns list/filter/sort of products",
 *      @OA\Response(
 *          response=200,
 *          description="Successful operation"
 *       )
 *)
 */

class ShopController extends Controller
{

    private ShopRepository $shopRepository;
    public function __construct(ShopRepository $shopRepository)
    {
        $this->shopRepository = $shopRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(FilterRequest $request)
    {
        $queryParamsArr = $this->shopRepository->filterQueryParams($request);
        $products = $this->shopRepository->filterProducts(...$queryParamsArr);
        return new BookCollection($products);
    }

    public function getListFiltering(){
        return new FilterResource([]);
    }
}