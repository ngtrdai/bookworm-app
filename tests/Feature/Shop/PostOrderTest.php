<?php

namespace Tests\Feature\Shop;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostOrderTest extends TestCase
{
    /** @test */

    public function user_can_post_order_product(){
        $response = $this->postJson(route('shop.order.store'), [
            'product_id' => 1,
            'quantity' => 1,
            'total_price' => 100000,
        ]);
        $response->assertStatus(200);
    }
}
