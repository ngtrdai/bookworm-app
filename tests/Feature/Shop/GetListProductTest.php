<?php

namespace Tests\Feature\Shop;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetListProductTest extends TestCase
{
    /** @test */
    public function it_can_get_list_product()
    {
        $response = $this->get('/api/shop');
        $response->assertStatus(200);
    }
}
