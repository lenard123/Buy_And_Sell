<?php

namespace App\Policies;

use App\Http\Controllers\Conf;
use App\Model\User;
use App\Model\Category;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;

    public function before ($user, $ability)
    {
        if ($user->role == Conf::ROLE_ADMIN)
            return true;
    }

    /**
     * Determine whether the user can create categories.
     *
     * @param  \App\Model\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        $role = $user->role;
        return $role == Conf::ROLE_SELLER;
    }

    public function update(User $user, Category $category)
    {
        return $user->id == $category->added_by;
    }

    public function delete(User $user, Category $category)
    {
        return $user->id == $category->added_by;
    }

}
