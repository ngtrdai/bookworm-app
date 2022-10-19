<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'order';

    protected $fillable = [
        'user_id',
        'order_date',
        'order_amount',
    ];

    public function items(){
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }
}
