<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
    	'id', 'category_id', 'image_id', 
    	'name', 'desc', 'price', 'qty'
    ];
    protected $guarded = ['status', 'user_id'];
}
