<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
    	'fname', 'lname', 'address1', 'address2', 
    	'phone', 'city', 'state', 'postal_code'
    ];

    public function user()
    {
    	return $this->belongsTo('App\Model\User');
    }

    public function order_items()
    {
    	return $this->hasMany('App\Model\OrderItem');
    }
}
