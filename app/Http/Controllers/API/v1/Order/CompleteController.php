<?php

namespace App\Http\Controllers\API\v1\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Http\Controllers\Conf;
use App\Model\Order;

class CompleteController extends Controller
{
    public function __invoke (Request $request, $id)
    {
    	if (!Util::isValidPassword($request))
    		return Util::err('Invalid password');

    	$order = Order::find($id);

    	if ($request->user()->cant('complete', $order))
    		return Util::err('You are not authorize to comple an order');

    	$order->status = Conf::ORDER_COMPLETED;
    	$order->save();

    	return GetController::getOrders($request);
    }
}
