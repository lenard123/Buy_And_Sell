<?php

namespace App\Policies;

use App\Http\Controllers\Conf;
use App\Model\Order;
use App\Model\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderPolicy
{
    use HandlesAuthorization;

    public function add (User $user) {
        return $user->role === Conf::ROLE_BUYER;
    }

    public function view (User $user, Order $order)
    {
    	if ($user->role === Conf::ROLE_BUYER) 
    		return $order->user_id === $user->id;
    	else if ($user->role === Conf::ROLE_SELLER)
    		return $order->seller_id === $user->id;

    	return $user->role === Conf::ROLE_ADMIN;
    }

    public function cancel (User $user, Order $order)
    {
        return $order->user_id === $user->id || $order->seller_id === $user->id;
    }

    public function complete (User $user, Order $order)
    {
        return $order->seller_id === $user->id;
    }
}
