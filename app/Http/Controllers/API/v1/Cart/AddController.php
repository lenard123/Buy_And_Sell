<?php

namespace App\Http\Controllers\API\v1\Cart;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Model\Cart;

class AddController extends Controller
{
    public function __invoke (Request $request)
    {
    	if ($request->user()->cant('add', Cart::class))
    		return Util::err('Only a buyer can add a cart.');

    	$this->validateRequest($request);

    	$cart = Cart::updateOrCreate([
    		'user_id'=>$request->user()->id, 
    		'product_id'=>$request->product_id,
    	], ['qty'=>$request->qty]);

        if ($request->qty < 1)
            $cart->delete();

    	return response('Updated');

    }

    private function validateRequest (Request $request)
    {
    	$this->validate($request, [
    		'qty' => 'required|numeric',
    		'product_id' => 'required|numeric|exists:products,id'
    	]);
    }
}
