<?php

namespace App\Http\Controllers\API\v1\Order;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Conf;
use App\Http\Controllers\Util;
use App\Model\Order;
use DB;

class CancelController extends Controller
{
	private $id;
    public function __invoke (Request $request, $id)
    {
    	$this->id = $id;

    	if (!Util::isValidPassword($request)) 
    		return Util::err('Invalid password');

    	$order = Order::find($id);
    	
    	if ($request->user()->cant('cancel', $order))
    		return Util::err('You aren\'t authorize to cancel this order.');

    	$this->cancelOrder($id);

    	return GetController::getOrders($request);
    }

    private function cancelOrder ($id)
    {
    	DB::transaction(function(){
    		$order = Order::find($this->id);
    		$order_items = $order->order_items;

    		foreach ($order_items as $order_item) {
    			$product = $order_item->product;
    			$product->qty += $order_item->qty;
    			$product->save();
    		}

    		$order->status = Conf::ORDER_CANCELLED;
    		$order->save();
    	});
    }
}
