<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FilterRequest;
use App\Http\Requests\FilterCategoryRequest;
use App\Repositories\ShopRepository;
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
