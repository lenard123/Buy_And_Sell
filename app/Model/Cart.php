<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['user_id', 'product_id', 'qty'];

    public function product ()
    {
    	return $this->belongsTo('App\Model\Product');
    }
}
