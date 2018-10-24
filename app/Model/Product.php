<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
    	'id', 'category_id', 'image_id', 
        'image1_id', 'image2_id', 'image3_id',
    	'image4_id', 'name', 'desc', 'price', 'qty'
    ];
    protected $guarded = ['status', 'user_id'];
}
