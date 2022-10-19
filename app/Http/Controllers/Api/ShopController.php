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

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(FilterRequest $request)
    {
        $queryParamsArr = $this->shopRepository->filterQueryParams($request);
        return $this->shopRepository->filterProducts(...$queryParamsArr);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FilterRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(FilterRequest $request, $id)
    {
        //
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
