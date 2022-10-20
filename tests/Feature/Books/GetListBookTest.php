<?php

namespace Tests\Feature\Books;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\Response;
use Illuminate\Testing\Fluent\AssertableJson;

class GetListBookTest extends TestCase
{
    /** @test */
    public function it_should_return_a_collection_of_books()
    {
        $response = $this->getJson(route('books.getListBooks'));
        $response -> assertStatus(Response::HTTP_OK);
        $response -> assertJson(fn (AssertableJson $json) =>
            $json -> has('data')
                ->has('data.0',fn (AssertableJson $json) =>
                    $json -> whereType('id', 'integer')
                          -> whereType('author_name', 'string')
                          -> whereType('book_price', 'string')
                          -> whereType('book_title', 'string')
                          -> whereType('book_cover_photo', 'string')
                          -> whereType('book_category_name', 'string')
                          -> whereType('final_price', 'string')
                          -> etc()
                )
        );
    }
}
