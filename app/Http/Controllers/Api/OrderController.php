<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostOrderRequest;
use Illuminate\Http\Request;
use App\Repositories\OrderRepository;
/**
 * @OA\Get(
 *      path="/api/order",
 *      operationId="getOrderList",
 *      tags={"Order"},
 *      summary="Get list/filter/sort of products",
 *      description="Returns list/filter/sort of products",
 *      @OA\Response(
 *          response=200,
 *          description="Successful operation"
 *       )
 *)
 */

class OrderController extends Controller
{
    private OrderRepository $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index()
    {
        //
    }
    
    public function store(PostOrderRequest $request)
    {
        $params = $this->orderRepository->filterParams($request);
        $order = $this->orderRepository->createOrder(...$params);
        // add status code 201 to response order json
        $order['status'] = 201;

        return response()->json($order, 201);
    }
}
