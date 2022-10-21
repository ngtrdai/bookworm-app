<?php

namespace Tests\Feature\Shop;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\Response;

class GetListProductTest extends TestCase
{
    /** @test */
    public function it_can_get_list_product_not_filtering_sorting_no_items_test()
    {
        $response = $this->get('/api/shop');
        $response->assertStatus(Response::HTTP_OK);
        
    }
}
