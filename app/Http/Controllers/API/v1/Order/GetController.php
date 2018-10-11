<?php

namespace App\Http\Controllers\API\v1\Order;

use App\Http\Controllers\Conf;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Util;
use App\Model\Order;
use App\Model\OrderItem;
use App\Model\User;
use Illuminate\Http\Request;

class GetController extends Controller
{

    public function __invoke (Request $request)
    {
    	return self::getOrders($request);
    }

    public static function getOrders (Request $request)
    {
        $user = $request->user();
        $get = new GetController();

        switch ($user->role) {
            case Conf::ROLE_BUYER:
                return $get->getUser(['user_id' => $user->id]);
                break;
            case Conf::ROLE_SELLER:
                return $get->getUser(['seller_id' => $user->id]);
                break;
            case Conf::ROLE_ADMIN:
                return Order::all();
                break;
            default:
                return Util::err('Unauthorized');
                break;
        }
    }

    private function getUser ($param)
    {
        $orders = Order::where($param)
                    ->latest()
                    ->get()
                    ->each(function($order){
                        $user = User::find($order->user_id);
                        $seller = User::find($order->seller_id);
                        $order->user_name = $user->fname.' '.$user->lname;
                        $order->seller_name = $seller->fname.' '.$seller->lname;
                        $order_items = OrderItem::where('order_id', $order->id)->get();
                        $price = 0;
                        $qty = 0;
                        foreach ($order_items as $order_item) {
                            $price += $order_item->product->price*$order_item->qty;
                            $qty += $order_item->qty;
                        }
                        $order->qty = $qty;
                        $order->price = $price;
                    });
        return $orders;
    }

    public function byId(Request $request, $id)
    {
        $order = Order::find($id);
        $order->order_items->each(function($x){$x->product;});
        if ($request->user()->cant('view', $order))
            return Util::err('Unauthorized');
        return $order;
    }
}
