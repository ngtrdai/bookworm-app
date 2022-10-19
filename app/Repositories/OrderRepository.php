<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\Book;

class OrderRepository{

    public function filterParams($request){
        $amount = 0;
        $userId = $request->user_id;
        $itemsOrder = $request->items_order;
        foreach($itemsOrder as $key => $item){
            $finalPrice = Book::finalPrice($item['book_id']);
            $itemsOrder[$key]['book_price'] = $finalPrice;
            $itemsOrder[$key]['total_price'] = $finalPrice * $item['quantity'];
            $amount += $itemsOrder[$key]['total_price'];
        }
        return [$userId, $itemsOrder, $amount];
    }

    public function createOrder($userId, $itemsOrder, $amount){
        // Thêm vào bảng order vơi user_id, order_date và order_amount
        $order = Order::create([
            'user_id' => $userId,
            'order_date' => now(),
            'order_amount' => $amount,
        ]);
        // Thêm các item vào bảng order_item với order_id vừa tạo
        foreach($itemsOrder as $item){
            $order->items()->create([
                'order_id' => $order->id,
                'book_id' => $item['book_id'],
                'quantity' => $item['quantity'],
                'price' => $item['total_price'],
            ]);
        }
        return $order;
    }
}