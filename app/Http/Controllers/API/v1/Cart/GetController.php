<?php

namespace App\Http\Controllers\API\v1\Cart;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GetController extends Controller
{
    public function __invoke (Request $request)
    {
    	return $request->user()->carts->each(function($item){
    		$item->product;
    	});
    }
}
