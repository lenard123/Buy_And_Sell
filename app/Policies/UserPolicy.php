<?php

namespace App\Policies;

use App\Http\Controllers\Conf;
use App\Model\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
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

    public function createAdmin (User $user)
    {
        return $user->admin_role === Conf::ADMIN_ROLE_MAIN;
    }
}
