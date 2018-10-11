<?php

namespace App\Policies;

use App\Http\Controllers\Conf;
use App\Model\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CartPolicy
{
    use HandlesAuthorization;

    public function add (User $user)
    {
        return $user->role == Conf::ROLE_BUYER;
    }
}
