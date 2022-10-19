<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FilterRequest;
use App\Repositories\ShopRepository;

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

    public function getListProducts(FilterRequest $request){
        $queryParamsArr = $this->shopRepository->filterQueryParams($request);
        return $this->shopRepository->filterProducts(...$queryParamsArr);
    }
}
