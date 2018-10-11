<?php

namespace App\Http\Controllers\API\v1\Order;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Model\Order;
use App\Model\OrderItem;
use App\Model\Product;
use DB;
use Illuminate\Http\Request;

class AddController extends Controller
{

	/**
	 * 1st Validate the request
	 * 2nd Create Orders for different sellers
	 * 3rd Transfer products from cart to order
	 * 4th Subtract the quantity of product
	 * 5th 
	 */

    public function __invoke (Request $request)
    {
    	if ($request->user()->cant('add', Order::class))
    		return Util::err('only a buyer can add an order.');

    	$this->validateRequest($request);

    	if ($request->user()->carts->count() < 1)
    		return Util::err('You have no item in your carts.');

    	$this->addOrder();
		
		return $request->user()->orders;
    }

    private function addOrder()
    {
    	DB::transaction(function () {

    		//Get Sellers
			$sellers = request()->user()->carts->each(function($cart){
				$cart->seller_id = $cart->product->user_id;
			})->unique('seller_id');

			foreach ($sellers as $seller) {

				//Create an order for different sellers
				$order = new Order;
				$order->user_id = request()->user()->id;
				$order->seller_id = $seller->seller_id;
				$order->fill(request()->all());
				$order->save();

				foreach (request()->user()->carts as $cart) {
					if ($cart->product->user_id !== $seller->seller_id)	continue;

					//Move the products from cart to orders
					$item = new OrderItem;
					$item->order_id = $order->id;
					$item->product_id = $cart->product_id;
					$item->qty = $cart->qty;
					$item->save();

					//Subtract the product quantity
					$product = Product::find($cart->product_id);
					$product->qty -= $cart->qty;
					$product->save();

					//Delete Category after moving
					$cart->delete();
				}
			}

    	});
    }

    private function validateRequest (Request $request)
    {
    	$this->validate($request, [
    		'fname' => 'required',
    		'lname' => 'required',
    		'address1' => 'required',
    		'phone' => 'required',
    		'city' => 'required',
    		'state' => 'required',
    		'postal_code' => 'required|numeric'
    	]);
    }
}
