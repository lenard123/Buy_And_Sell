<?php

namespace App\Policies;

use App\Http\Controllers\Conf;
use App\Model\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Model\Product;
use App\Model\Seller;

class ProductPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function create (User $user)
    {
        return $user->role == Conf::ROLE_SELLER;
    }

    public function reject (User $user, Product $product)
    {
        return $user->role == Conf::ROLE_ADMIN && $product->status == Conf::PRODUCT_PENDING;
    }

    public function approve (User $user, Product $product)
    {
        return $user->role == Conf::ROLE_ADMIN && $product->status == Conf::PRODUCT_PENDING;
    }

    public function viewPending (User $user)
    {
        return $user->role == Conf::ROLE_ADMIN;
    }

    public function viewRejected (User $user)
    {
        return $user->role == Conf::ROLE_ADMIN;
    }

    public function viewAll (User $user)
    {
        return $user->role == Conf::ROLE_ADMIN;
    }
}
